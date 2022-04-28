import ora from 'ora';
import pc from 'picocolors';
import type { REST } from '@discordjs/rest';
import { Routes, APIApplicationCommand, ApplicationCommandType } from 'discord-api-types/v10';

export async function fetchGuildApplicationCommands(rest: REST, clientId: string, guildId: string) {
  const spinner = ora('Fetching guild application commands').start();
  const commands = (await rest.get(Routes.applicationGuildCommands(clientId, guildId))) as APIApplicationCommand[];

  if (commands.length === 0) {
    spinner.fail(pc.bold(pc.red('No guild application commands found, exiting!')));
  }

  spinner.succeed(pc.bold(pc.green('Guild application commands fetched')));
  return commands.filter((command) => command.type === ApplicationCommandType.ChatInput);
}
