import client, {
    removeAuthorizationHeader,
    setAuthorizationHeader,
  } from '../../api/client';
  import storage from '../../utils/storage';
  
  export const login = (credentials, remember) => {
    return client.post('/api/auth/login', credentials).then(({ accessToken }) => {
      setAuthorizationHeader(accessToken);
      if(remember){
        storage.set('auth', accessToken)
      }
      
    });
  };
  
  export const logout = () =>
    Promise.resolve().then(() => {
      removeAuthorizationHeader();
      storage.remove('auth');
    });