import ora from 'ora';
import pc from 'picocolors';
import type { REST } from '@discordjs/rest';
import { type APIApplicationCommand, Routes } from 'discord-api-types/v10';

export async function deleteGuildApplicationCommand(rest: REST, clientId: string, command: APIApplicationCommand) {
  const spinner = ora(pc.yellow(`Attempting to delete ${command.name} (ID: ${command.id}) command`)).start();

  await rest.delete(Routes.applicationGuildCommand(clientId, command.guild_id!, command.id));
  spinner.succeed(pc.bold(pc.green(`Successfully deleted ${command.name} command`)));
  process.exit(1);
}
