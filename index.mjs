#!/usr/bin/env node

import zxp from "zxp-sign-cmd";
import minimist from "minimist";
import chalk from "chalk";

const { env, argv } = process;
const { input, output, timestamp } = minimist(argv.slice(2), {
  string: ["input", "output", "timestamp"],
  alias: {
    i: "input",
    o: "output",
    t: "timestamp",
  },
  default: {
    i: env.ZXP_INPUT,
    o: env.ZXP_OUTPUT,
    t: env.ZXP_TIMESTAMP ?? "http://timestamp.digicert.com/",
  },
});

if (!input) {
  console.error(
    chalk.red(
      "ERROR: Missing --input or -i argument or ZXP_INPUT environment variable",
    ),
  );
  process.exit(1);
}

if (!output) {
  console.error(
    chalk.red(
      "ERROR: Missing --output or -o argument or ZXP_OUTPUT environment variable",
    ),
  );
  process.exit(1);
}

const certEnv = {
  country: "ZXP_CERT_COUNTRY",
  province: "ZXP_CERT_PROVINCE",
  org: "ZXP_CERT_ORG",
  name: "ZXP_CERT_NAME",
  password: "ZXP_CERT_PASSWORD",
  output: "ZXP_CERT_OUTPUT",
};

// Set defaults
env.ZXP_CERT_OUTPUT = `${env.ZXP_CERT_NAME}-cert`;

const cert = {};

for (const [key, value] of Object.entries(certEnv)) {
  if (!env[value]) {
    console.error(chalk.red(`ERROR: Missing ${value} environment variable`));
    process.exit(1);
  }
  cert[key] = value;
}

await zxp.selfSignedCert(cert);
await zxp.sign({
  input,
  output,
  timestamp,
  cert: cert.output,
  password: cert.password,
});
