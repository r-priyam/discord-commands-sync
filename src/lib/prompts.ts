import pc from 'picocolors';
import type { PromptObject } from 'prompts';
import type { APIApplicationCommand } from 'discord-api-types/v10';

export const initialChoices: PromptObject[] = [
  {
    type: 'select',
    name: 'commandType',
    message: 'Choose what you want to delete?',
    choices: [
      { title: 'Chat Input Command (Slash)', value: 'chat-input-command' },
      { title: 'Message Command (Context Menu)', value: 'message-command' }
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

export const confirmObject = (command: APIApplicationCommand): PromptObject[] => {
  return [
    {
      type: 'confirm',
      name: 'confirm',
      message: `Confirm if you want to ${pc.red('DELETE')} ${pc.blue('COMMAND:')} ${pc.yellow(command.name)} (${pc.yellow(
        `Description - ${command.description}` || 'No Description'
      )})`
    }
  ];
};
