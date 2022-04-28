import prompts from 'prompts';
import { guildIdInput, initialChoices } from '#lib/prompts';

export async function initialResponse() {
  let guildId: string | undefined = undefined;

  const response = await prompts(initialChoices);

  if (!response.commandType || !response.commandLevel) {
    process.exit(1);
  }

  const { commandType, commandLevel } = response;

  if (response.commandLevel === 'guild-command') {
    const guildResponse = await prompts(guildIdInput);

    if (!guildResponse.guildId) {
      process.exit(1);
    }

    guildId = guildResponse.guildId;
  }
  return { commandType, commandLevel, guildId };
}
