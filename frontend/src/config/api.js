// API configuration
const getApiUrl = () => {
  // Production (Netlify)
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || 'https://share-your-thoughts-backend-f9ww.onrender.com';
  }
  // Development (local)
  return 'http://localhost:5000/api';
};

export const API_URL = getApiUrl();

// For axios default config
export const setupAxios = (axios) => {
  axios.defaults.baseURL = API_URL;
};