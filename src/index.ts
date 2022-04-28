#!/usr/bin/env node

import { REST } from '@discordjs/rest';
import { checkEnvExists } from '#functions/check-env';
import { initialResponse } from '#functions/initial-response';
import { commandHandler } from '#functions/commands-handler';
import { ApplicationCommandType } from 'discord-api-types/v10';

const env = await checkEnvExists();

const rest = new REST({ version: '10' }).setToken(env.token);

const { commandType, commandLevel, guildId } = await initialResponse();

if (commandType === 'chat-input-command') {
  await commandHandler(rest, ApplicationCommandType.ChatInput, env.clientId, commandLevel, guildId);
}

if (commandType === 'message-command') {
  await commandHandler(rest, ApplicationCommandType.Message, env.clientId, commandLevel, guildId);
}

if (commandType === 'user-command') {
  await commandHandler(rest, ApplicationCommandType.User, env.clientId, commandLevel, guildId);
}
