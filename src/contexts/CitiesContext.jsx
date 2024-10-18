import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback
} from 'react';
import {
  createEditCity,
  deleteCityByMail,
  getCitiesByUser
} from '../service/CityApi';
import { useAuth } from './AuthContext';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      };

    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: state.cities.find((c) => c.cityName === action.payload)
      };

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      };

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.cityName !== action.payload),
        currentCity: {}
      };

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { user, loading } = useAuth();

  useEffect(
    function () {
      async function fetchCities() {
        if (!loading) {
          dispatch({ type: 'loading' });
          try {
            const usersCities = await getCitiesByUser(user?.email);
            dispatch({ type: 'cities/loaded', payload: usersCities });
          } catch {
            dispatch({
              type: 'rejected',
              payload: 'There was an error loading cities...'
            });
          }
        }
      }
      fetchCities();
    },
    [loading, user, user?.email]
  );

  const getCity = useCallback(async function getCity(cityName) {
    dispatch({ type: 'loading' });

    try {
      dispatch({
        type: 'city/loaded',
        payload: cityName
      });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the city...'
      });
    }
  }, []);

  async function createCity(city) {
    const newCity = { ...city, userEmail: user?.email };
    await createEditCity(newCity);
    dispatch({ type: 'loading' });

    try {
      dispatch({ type: 'city/created', payload: newCity });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating the city...'
      });
    }
  }

  async function deleteCity(cityName) {
    await deleteCityByMail(cityName, user?.email);

    dispatch({ type: 'loading' });
    try {
      dispatch({ type: 'city/deleted', payload: cityName });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the city...'
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
