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

export const EVENT_BUS_RABBITMQ = {
  hostname: env.EVENT_BUS_RABBITMQ_HOSTNAME,
  port: env.EVENT_BUS_RABBITMQ_PORT,
  username: env.EVENT_BUS_RABBITMQ_USERNAME,
  password: env.EVENT_BUS_RABBITMQ_PASSWORD,
  queue: env.EVENT_BUS_RABBITMQ_QUEUE,
  exchange: env.EVENT_BUS_RABBITMQ_EXCHANGE,
  retries: env.EVENT_BUS_RABBITMQ_RETRIES,
  interval: env.EVENT_BUS_RABBITMQ_INTERVAL
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

export const CREDENTIALS_SERVICE = {
  url: env.CREDENTIALS_SERVICE_URL,
  token: env.CREDENTIALS_SERVICE_TOKEN
};

export const CONVERTER_SERVICE = {
  url: env.CONVERTER_SERVICE_URL,
  method: 'POST'
};

export const AIRBRAKE = {
  projectId: env.AIRBRAKE_PROJECT_ID,
  projectKey: env.AIRBRAKE_PROJECT_KEY
};

export const CACHE = {
  isSecure: env.REDIS_IS_SECURE ?? false,
  hostname: env.REDIS_HOSTNAME,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  database: {
    credentials: env.REDIS_DB_CREDENTIALS,
    cancellations: env.REDIS_DB_CANCELLATIONS,
    labels: env.REDIS_DB_LABELS,
    rates: env.REDIS_DB_RATES,
    pickup: env.REDIS_DB_PICKUP,
    tracking: env.REDIS_DB_TRACKING,
    branchOffices: env.REDIS_DB_BRANCH_OFFICES
  }
};

export const TEST = {
  type: env.NODE_TEST || 'integration',
  isDefined: env.JEST_WORKER_ID !== undefined
};

export const PROCESS = {
  isMaster: !env.INSTANCE_ID || env.INSTANCE_ID === '0'
};

export const KAFKA = {
  brokers: env.KAFKA_BROKERS,
  prefix: env.KAFKA_PREFIX,
  groupId: `${env.KAFKA_PREFIX}${env.KAFKA_GROUP_ID}`,
  trustedCert: env.KAFKA_TRUSTED_CERT,
  clientCert: env.KAFKA_CLIENT_CERT,
  clientCertKey: env.KAFKA_CLIENT_CERT_KEY,
  port: env.KAFKA_PORT
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

export const NEWRELIC = {
  licenseKey: env.NEW_RELIC_KEY
};

export const GCP = {
  topic: env.GCP_TOPIC,
  subscription: env.GCP_SUBSCRIPTION,
  projectId: env.GCP_PROJECT_ID,
  type: env.GCP_TYPE,
  privateKey: env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: env.GCP_CLIENT_EMAIL,
  clientId: env.GCP_CLIENT_ID
};

export const EVENT_BUSES = {
  selected: env.EVENT_BUS_SELECTED,
  buses: {
    kafka: env.KAFKA_EVENT_BUS,
    pubSub: env.PUBSUB_EVENT_BUS,
    inMemory: env.IN_MEMORY_EVENT_BUS
  }
};
