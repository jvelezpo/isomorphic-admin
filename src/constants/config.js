export const DEVELOPMENT = 'development';
export const STAGE = 'stage';
export const PRODUCTION = 'production';
export const NODE_ENV = process.env.REACT_APP_NODE_ENV || DEVELOPMENT;
export const LOCAL_DIR = process.env.REACT_APP_LOCAL_DIR || 'http://localhost:5000';

export function getApiUrl() {
  switch (NODE_ENV) {
    case PRODUCTION:
      return 'https://api.payfully.co';
    case STAGE:
      return 'https://api-stage.payfully.co';
    default:
      return LOCAL_DIR;
  }
}
