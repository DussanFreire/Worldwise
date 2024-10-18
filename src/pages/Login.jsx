import { GoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PageNav from '../components/PageNav';
import { useAuth } from '../contexts/AuthContext';
import styles from './Login.module.css';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/app', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <div className={styles.form}>
        <h1>Log in</h1>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const token = credentialResponse?.credential;

            if (token) {
              login(token);
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </main>
  );
}
