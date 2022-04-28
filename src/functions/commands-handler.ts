import pc from 'picocolors';
import prompts from 'prompts';
import type { REST } from '@discordjs/rest';
import { commandDeleteChoices, confirmObject } from '#lib/prompts';
import { deleteGuildApplicationCommand } from '#functions/delete/guild-command';
import { fetchGuildApplicationCommands } from '#functions/fetch/guild-commands';
import { fetchGlobalApplicationCommands } from '#functions/fetch/global-command';
import { deleteGlobalApplicationCommand } from '#functions/delete/global-command';
import { APIApplicationCommand, ApplicationCommandType } from 'discord-api-types/v10';

export async function commandHandler(rest: REST, commandType: ApplicationCommandType, clientId: string, commandLevel: string, guildId?: string) {
  let commands: APIApplicationCommand[];

  if (commandType === ApplicationCommandType.ChatInput) {
    commands =
      commandLevel === 'global-command'
        ? await fetchGlobalApplicationCommands(rest, ApplicationCommandType.ChatInput, clientId)
        : await fetchGuildApplicationCommands(rest, ApplicationCommandType.ChatInput, clientId, guildId!);

    if (commands.length === 0) {
      console.log(pc.bold(pc.red('Received 0 chat input command, exiting!')));
      process.exit(1);
    }
  } else if (commandType === ApplicationCommandType.Message) {
    commands =
      commandLevel === 'global-command'
        ? await fetchGlobalApplicationCommands(rest, ApplicationCommandType.Message, clientId)
        : await fetchGuildApplicationCommands(rest, ApplicationCommandType.Message, clientId, guildId!);

    if (commands.length === 0) {
      console.log(pc.bold(pc.red('Received 0 application message command, exiting!')));
      process.exit(1);
    }
  } else {
    commands =
      commandLevel === 'global-command'
        ? await fetchGlobalApplicationCommands(rest, ApplicationCommandType.User, clientId)
        : await fetchGuildApplicationCommands(rest, ApplicationCommandType.User, clientId, guildId!);

    if (commands.length === 0) {
      console.log(pc.bold(pc.red('Received 0 application user command, exiting!')));
      process.exit(1);
    }
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
