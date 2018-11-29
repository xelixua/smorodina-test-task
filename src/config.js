const environment = process.env.TEST_TASK_ENVIRONMENT;
const config = require(`./config/${environment}`);

export default config;