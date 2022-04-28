import pc from 'picocolors';
import prompts from 'prompts';
import type { REST } from '@discordjs/rest';
import { commandDeleteChoices, confirmObject } from '#lib/prompts';
import { deleteGuildApplicationCommand } from '#functions/delete/guild-command';
import { fetchGuildApplicationCommands } from '#functions/fetch/guild-commands';
import { fetchGlobalApplicationCommands } from '#functions/fetch/global-command';
import { deleteGlobalApplicationCommand } from '#functions/delete/global-command';
import { APIApplicationCommand, ApplicationCommandType } from 'discord-api-types/v10';

export async function chatInputHandler(rest: REST, clientId: string, commandLevel: string, guildId?: string) {
  let commands: APIApplicationCommand[];

  if (commandLevel === 'global-command') {
    commands = await fetchGlobalApplicationCommands(rest, ApplicationCommandType.ChatInput, clientId);
  } else {
    commands = await fetchGuildApplicationCommands(rest, ApplicationCommandType.ChatInput, clientId, guildId!);
  }

  if (commands.length === 0) {
    console.log(pc.bold(pc.red('Received 0 chat input command, exiting!')));
    process.exit(1);
  }

  const commandToDeleteResponse = await prompts(commandDeleteChoices(commands));

  if (!commandToDeleteResponse.commandType) {
    process.exit(1);
  }

  const commandToDelete = JSON.parse(commandToDeleteResponse.commandType) as APIApplicationCommand;

  const confirmation = await prompts(confirmObject(commandToDelete));

  if (!confirmation.confirm) {
    process.exit(1);
  }

  if (commandLevel === 'global-command') {
    await deleteGlobalApplicationCommand(rest, clientId, commandToDelete);
  } else {
    await deleteGuildApplicationCommand(rest, clientId, commandToDelete);
  }
}
