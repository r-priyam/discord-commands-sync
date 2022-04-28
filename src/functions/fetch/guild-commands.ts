import ora from 'ora';
import pc from 'picocolors';
import type { REST } from '@discordjs/rest';
import { Routes, APIApplicationCommand, ApplicationCommandType } from 'discord-api-types/v10';

export async function fetchGuildApplicationCommands(rest: REST, commandType: ApplicationCommandType, clientId: string, guildId: string) {
  const spinner = ora('Fetching guild application commands').start();
  const commands = (await rest.get(Routes.applicationGuildCommands(clientId, guildId))) as APIApplicationCommand[];
  spinner.succeed(pc.bold(pc.green('Guild application commands fetched')));

  if (commands.length === 0) {
    spinner.fail(pc.bold(pc.red('No global application commands found, exiting!')));
    process.exit(0);
  }

  if (commandType === ApplicationCommandType.Message) {
    return commands.filter((command) => command.type === ApplicationCommandType.Message);
  }

  return commands.filter((command) => command.type === ApplicationCommandType.User);
}
