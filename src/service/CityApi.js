import { supabase } from '../supabase/supabase.config';

const TABLE_NAME = 'cities';

export async function getCitiesByUser(userEmail) {
  const { data: cities, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('userEmail', userEmail);

  if (error) {
    console.error(error);
    throw new Error('Cities could not be loaded');
  }
  return cities;
}

export async function deleteCityByMail(cityName, userEmail) {
  const { data: city, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('userEmail', userEmail)
    .eq('cityName', cityName);
  if (error) {
    console.error(error);
    throw new Error('City could not be deleted');
  }
  return city;
}

export async function createEditCity(newCity = {}, userEmail) {
  let query = supabase.from(TABLE_NAME);
  if (!userEmail) {
    query = query.insert([{ ...newCity }]);
  } else {
    query = query.update({ ...newCity }).eq('userEmail', userEmail);
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('City could not be created');
  }

  return data;
}
