// next.config.js
// https://nextjs.org/docs/api-reference/next.config.js/introduction

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Ajv = require('ajv').default;

const readYamlConfig = (configPath, schemaPath) => {
  try {
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const ajv = new Ajv({ useDefaults: true, removeAdditional: true });
    const validate = ajv.compile(schema);

    const data = yaml.load(fs.readFileSync(configPath, 'utf8'));
    // Validation modifies the configuration data by adding defaults and
    // removing additional properties.
    validate(data);

    return data;
  } catch (err) {
    console.error(`Configuration (${configPath}) could not be read.`, err);
    process.exit(1);
  }
};

const readPublicYamlConfig = () => {
  const p = process.env.TS_CONFIG_PATH || 'times-square.config.yaml';
  const configPath = path.isAbsolute(p) ? p : path.join(process.cwd(), p);
  console.log(`Reading public Times Square config from ${configPath}`);
  const schemaPath = path.join(__dirname, 'times-square.config.schema.json');
  const data = readYamlConfig(configPath, schemaPath);
  return data;
};

module.exports = (phase, { defaultConfig }) => {
  const publicYamlConfig = readPublicYamlConfig();
  const basePath = '/times-square';

  const config = {
    ...defaultConfig,
    basePath,
    publicRuntimeConfig: {
      ...publicYamlConfig,
      basePath,
    },
    async rewrites() {
      // For both the source and destination, don't include the basePath
      // prefix for internal (same host) paths; next will apply it
      // automatically.
      return [
        {
          source: '/api/v1/pages/:page/html',
          destination: '/api/dev/times-square/v1/pages/:page/html',
        },
      ];
    },
  };
  return config;
};
