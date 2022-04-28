#!/usr/bin/env node

import { chatInputHandler } from '#functions/application-command-handler';
import { checkEnvExists } from '#functions/check-env';
import { initialResponse } from '#functions/initial-response';
import { REST } from '@discordjs/rest';

const env = await checkEnvExists();

const rest = new REST({ version: '10' }).setToken(env.token);

const { commandType, commandLevel, guildId } = await initialResponse();

if (commandType === 'chat-input-command') {
  await chatInputHandler(rest, env.clientId, commandLevel, guildId);
}
