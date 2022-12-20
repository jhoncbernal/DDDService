require('dotenv').config();

declare const process: any;
const env = process.env;
export const PROJECT = {
  name: env.PROJECT_NAME,
  mode: env.PROJECT_MODE,
  environment: env.PROJECT_MODE === 'staging' ? 'production' : env.PROJECT_MODE,
  version: env.PROJECT_VERSION
};

export const SERVER = {
  hostname: env.SERVER_HOSTNAME,
  port: env.SERVER_PORT
};

export const SWAGGER = {
  isPublic: env.SWAGGER_IS_PUBLIC,
  html: env.SWAGGER_HTML_ENDPOINT,
  json: env.SWAGGER_JSON_ENDPOINT
};

export const JWT = {
  secretKey: env.JWT_SECRET_KEY
};

export const MONGO_DB = {
  hostname: env.MONGODB_HOSTNAME,
  port: env.MONGODB_PORT,
  database: env.MONGODB_DATABASE,
  username: env.MONGODB_USERNAME,
  password: env.MONGODB_PASSWORD
};

export const TTL = {
  day: 86400,
  week: 604800,
  month: 2592000,
  bimester: 5184000,
  trimester: 7776000,
  semester: 15552000,
  year: 31104000
};

export const AIRBRAKE = {
  projectId: env.AIRBRAKE_PROJECT_ID,
  projectKey: env.AIRBRAKE_PROJECT_KEY
};

export const CACHE = {
  isSecure: env.REDIS_IS_SECURE ?? false,
  hostname: env.REDIS_HOSTNAME,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD
};

export const TEST = {
  type: env.NODE_TEST || 'integration',
  isDefined: env.JEST_WORKER_ID !== undefined
};

export const PROCESS = {
  isMaster: !env.INSTANCE_ID || env.INSTANCE_ID === '0'
};

export const RATE_LIMIT = {
  duration: env.RATE_LIMIT_DURATION_MS,
  maxRequestsInDurationFrame: env.RATE_LIMIT_MAX_REQUESTS_WITHIN_DURATION
};

export const DATADOG = {
  key: env.DD_API_KEY,
  hostname: env.DD_HOSTNAME,
  site: env.DD_SITE,
  port: env.DD_PORT
};

export const EVENT_BUSES = {
  selected: env.EVENT_BUS_SELECTED,
  buses: {
    inMemory: env.IN_MEMORY_EVENT_BUS
  }
};
