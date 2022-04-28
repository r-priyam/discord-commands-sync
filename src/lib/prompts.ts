import type { PromptObject } from 'prompts';
import type { APIApplicationCommand } from 'discord-api-types/v10';

export const initialChoices: PromptObject[] = [
  {
    type: 'select',
    name: 'commandType',
    message: 'Choose what you want to delete?',
    choices: [
      { title: 'Chat Input Command (Slash)', value: 'chat-input-command' },
      { title: 'User Command (Context Menu)', value: 'user-command' }
    ]
  },
  {
    type: 'select',
    name: 'commandLevel',
    message: 'Choose the command level?',
    choices: [
      { title: 'Global', value: 'global-command' },
      { title: 'Guild', value: 'guild-command' }
    ]
  }
];

export const guildIdInput: PromptObject[] = [
  {
    type: 'text',
    name: 'guildId',
    message: 'Please enter the guild id to delete command for'
  }
];

export const commandDeleteChoices = (commands: APIApplicationCommand[]): PromptObject[] => {
  return [
    {
      type: 'select',
      name: 'commandType',
      message: 'Which command you want to delete?',
      choices: commands.map((command) => ({
        title: command.name,
        value: JSON.stringify({ ...command })
      }))
    }
  ];
};
