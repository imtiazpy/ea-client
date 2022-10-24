import useInterCeptor from './interceptor';

const useApiHelper = () => {
  const axios = useInterCeptor();

  const api = {
    // authentication
    signUp: (data: any, params = {}) =>
      axios.post(`auth/users/`, data, { params: params }),
    login: (data: any, params = {}) =>
      axios.post(`auth/jwt/create/`, data, { params: params }),
    userType: (params={}) => axios.get('auth/users/me/', {params: params}),
  };

  return api;
};

export default useApiHelper;
