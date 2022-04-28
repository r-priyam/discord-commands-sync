import ora from 'ora';
import pc from 'picocolors';
import type { REST } from '@discordjs/rest';
import { Routes, APIApplicationCommand, ApplicationCommandType } from 'discord-api-types/v10';

export async function fetchGlobalApplicationCommands(rest: REST, commandType: ApplicationCommandType, clientId: string) {
  const spinner = ora('Fetching global application commands').start();
  const commands = (await rest.get(Routes.applicationCommands(clientId))) as APIApplicationCommand[];
  spinner.succeed(pc.bold(pc.green('Global application commands fetched')));

  if (commands.length === 0) {
    spinner.fail(pc.bold(pc.red('No global application commands found, exiting!')));
    process.exit(0);
  }

  if (commandType === ApplicationCommandType.ChatInput) {
    return commands.filter((command) => command.type === ApplicationCommandType.ChatInput);
  }

  if (commandType === ApplicationCommandType.Message) {
    return commands.filter((command) => command.type === ApplicationCommandType.Message);
  }

  return commands.filter((command) => command.type === ApplicationCommandType.User);
}
