import pc from 'picocolors';
import prompts from 'prompts';
import type { REST } from '@discordjs/rest';
import type { APIApplicationCommand } from 'discord-api-types/v10';
import { deleteGuildApplicationCommand } from '#functions/delete-guild-command';
import { fetchGuildApplicationCommands } from '#functions/fetch-guild-commands';
import { fetchGlobalApplicationCommands } from '#functions/fetch-global-commands';
import { deleteGlobalApplicationCommand } from '#functions/delete-global-command';

export async function applicationCommandHandler(rest: REST, clientId: string, commandLevel: string, guildId?: string) {
  let commands: APIApplicationCommand[];

  if (commandLevel === 'global-command') {
    commands = await fetchGlobalApplicationCommands(rest, clientId);
  } else {
    commands = await fetchGuildApplicationCommands(rest, clientId, guildId!);
  }

  const commandToDeleteResponse = await prompts([
    {
      type: 'select',
      name: 'commandType',
      message: 'Which command you want to delete?',
      choices: commands.map((command) => ({
        title: command.name,
        value: JSON.stringify({ ...command })
      }))
    }
  ]);

  if (!commandToDeleteResponse.commandType) {
    process.exit(1);
  }

  const commandToDelete = JSON.parse(commandToDeleteResponse.commandType) as APIApplicationCommand;

  const confirmation = await prompts([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Confirm if you want to ${pc.red('DELETE')} ${pc.blue('COMMAND:')} ${pc.yellow(commandToDelete.name)} (${pc.yellow(
        `Description - ${commandToDelete.description}` || 'No Description'
      )})`
    }
  ]);

  if (!confirmation.confirm) {
    process.exit(1);
  }

  if (commandLevel === 'global-command') {
    await deleteGlobalApplicationCommand(rest, clientId, commandToDelete);
  } else {
    await deleteGuildApplicationCommand(rest, clientId, commandToDelete);
  }
}
