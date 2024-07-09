import { useCallback } from 'react';
import HTTP from '../HTTP';
import useAuth from './useAuth';
import useIsLoginState from './useIsLoginState';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { setIsLogin } = useIsLoginState();

  return useCallback(async () => {
    try {
      const response = await HTTP.get('/api/v1/auth/access-token');
      setAuth(prev => {
        return {
          ...prev,
          roles: [response.data.response.role],
          accessToken: response.data.response.accessToken
        }
      });
      setIsLogin(true);
      return response.data.response.accessToken;
    } catch (error) {
      setIsLogin(false);
    }
  },[setAuth, setIsLogin]);
};

export default useRefreshToken;
