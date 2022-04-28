import ora from 'ora';
import pc from 'picocolors';
import type { REST } from '@discordjs/rest';
import { Routes, APIApplicationCommand, ApplicationCommandType } from 'discord-api-types/v10';

export async function fetchGlobalApplicationCommands(rest: REST, clientId: string) {
  const spinner = ora('Fetching global application commands').start();
  const commands = (await rest.get(Routes.applicationCommands(clientId))) as APIApplicationCommand[];

  if (commands.length === 0) {
    spinner.fail(pc.bold(pc.red('No global application commands found, exiting!')));
    process.exit(0);
  }

  spinner.succeed(pc.bold(pc.green('Global application commands fetched')));
  return commands.filter((command) => command.type === ApplicationCommandType.ChatInput);
}
