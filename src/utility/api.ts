import useInterCeptor from './interceptor';

const useApiHelper = () => {
  const axios = useInterCeptor();

  const api = {
    // authentication
    signUp: (data: any, params = {}) =>
      axios.post(`auth/users/`, data, { params: params }),
    login: (data: any, params = {}) =>
      axios.post(`auth/jwt/create/`, data, { params: params }),
    userType: (params = {}) => axios.get(`auth/users/me/`, { params: params }),

    // avatar upload
    uploadAvatar: (data: any, params = {}) =>
      axios.put(`users/avatar-upload/`, data, { params: params }),

    // Jobseeker Profile
    getJSProfile: (params = {}) =>
      axios.get(`job-seekers/profile/`, { params: params }),
    updateJSProfile: (data: any, params = {}) =>
      axios.patch(`job-seekers/profile/`, data, { params: params }),

    //Employer Profile

    //Assessments
    createAssessment: (data: any, params = {}) => axios.post(`assessment/`, data, {params: params}),
    getAssessments: (params = {}) =>
      axios.get(`assessment/assessments/`, { params: params }),
    getPublicAssessments: (params = {}) =>
      axios.get(`assessment/public/`, { params: params }),
    retrievePublicAssessment: (id: any, params = {}) => axios.get(`assessment/public/${id}`, {params: params}),
  };

  return api;
};

export default useApiHelper;
