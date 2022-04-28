import ora from 'ora';
import pc from 'picocolors';
import { parseEnv, readEnv } from '#lib/utils';

export async function checkEnvExists() {
  const spinner = ora('').start();
  const envVars = parseEnv(await readEnv('.env'));

  if (Object.keys(envVars).length === 0) {
    spinner.fail(pc.red(`${pc.bold('BOT_TOKEN')} and ${pc.bold('BOT_CLIENT_ID')} not found in env file. Please set!`));
    process.exit(0);
  } else if (!envVars.hasOwnProperty('BOT_TOKEN')) {
    spinner.fail(pc.red(`${pc.bold('BOT_TOKEN')} not found in env file. Please set!`));
    process.exit(0);
  } else if (!envVars.hasOwnProperty('BOT_CLIENT_ID')) {
    spinner.fail(pc.red(`${pc.bold('BOT_CLIENT_ID')} not found in env file. Please set!`));
    process.exit(0);
  }

  spinner.succeed(pc.green('Successfully validated environment variables'));
  return { token: envVars.BOT_TOKEN, clientId: envVars.BOT_CLIENT_ID };
}
