const getEnvironmentVariable = (name: string): string | undefined => {
  if (process.env && process.env[name]) {
    return process.env[name];
  }
  return undefined;
};

export const REACT_APP_GOOGLE_BOOKS_API_KEY = getEnvironmentVariable('REACT_APP_GOOGLE_BOOKS_API_KEY');
