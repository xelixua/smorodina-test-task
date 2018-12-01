const environment = process.env.TEST_TASK_ENVIRONMENT || 'development';
const config = require(`./config/${environment}`);

export default config;