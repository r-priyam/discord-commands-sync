import type { PromptObject } from 'prompts';

export const initialChoices: PromptObject[] = [
  {
    type: 'select',
    name: 'commandType',
    message: 'Choose what you want to delete?',
    choices: [
      { title: 'Application Command (Slash)', value: 'application-command' },
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
