export const getBaseURL = () => {
  return window.env.REACT_APP_BASE_API_URL;
};

export const getHeaders = () => {
  return {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
};
