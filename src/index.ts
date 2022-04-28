#!/usr/bin/env node

import { REST } from '@discordjs/rest';
import { checkEnvExists } from '#functions/check-env';
import { messageHandler } from '#functions/message-handler';
import { initialResponse } from '#functions/initial-response';
import { chatInputHandler } from '#functions/chat-input-handler';

const env = await checkEnvExists();

const rest = new REST({ version: '10' }).setToken(env.token);

const { commandType, commandLevel, guildId } = await initialResponse();

if (commandType === 'chat-input-command') {
  await chatInputHandler(rest, env.clientId, commandLevel, guildId);
}

if (commandType === 'message-command') {
  await messageHandler(rest, env.clientId, commandLevel, guildId);
}
