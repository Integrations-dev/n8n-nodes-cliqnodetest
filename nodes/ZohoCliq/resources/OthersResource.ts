import type { INodeProperties } from "n8n-workflow";

export const otherOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: [
                    'Others',
                ],
            },
        },
        options: [
            {
                name: 'Update Thread State',
                value: 'updateThreadState',
                action: 'Update Thread State',
                description: 'Update the state of a thread (close/ reopen)',
            },
            {
                name: 'Add bot to channel',
                value: 'addBotToChannel',
                action: 'Add bot to channel',
                description: 'Add a bot to a channel',
            },
            {
                name: 'Archive channel',
                value: 'archiveChannel',
                action: 'Archive channel',
                description: 'Archive a channel',
            },
            {
                name: 'Create channel',
                value: 'createChannel',
                action: 'Create channel',
                description: 'Create a new channel',
            },
            {
                name: 'Delete channel',
                value: 'deleteChannel',
                action: 'Delete channel',
                description: 'Delete a channel',
            },
            {
                name: 'Fetch channel',
                value: 'fetchChannel',
                action: 'Fetch channel',
                description: 'Fetch details of a specific channel',
            },
            {
                name: 'Unarchive channel',
                value: 'unarchiveChannel',
                action: 'Unarchive channel',
                description: 'Unarchive a channel',
            },
            {
                name: 'Update channel',
                value: 'updateChannel',
                action: 'Update channel',
                description: 'Update details of a specific channel',
            },
            {
                name: 'Fetch Team',
                value: 'fetchTeam',
                action: 'Fetch Team',
                description: 'Fetch details of a specific team',
            },
            {
                name: 'Pin message',
                value: 'pinMessage',
                action: 'Pin message',
                description: 'Pin a message in a channel',
            }
        ],
        default: '',
    },
]

export const otherFields: INodeProperties[] = [
    {
        displayName: 'Team',
        name: 'team',
        type: 'options',
        noDataExpression: true,
        required: true,
        displayOptions: {
            show: {
                resource: ["Others"],
                operation: ['fetchTeam'],
            },
        },
        options: [], // Placeholder for dynamically fetched teams
        default: '',
        typeOptions: {
            loadOptionsMethod: 'getTeams',
        },
        description: 'Select the team to perform the action on.',
        placeholder: "Select a team"
    },
    {
        displayName: 'Team ID',
        name: 'teamId',
        type: 'string',
        required: true,
        placeholder: "Enter a team ID",
        displayOptions: {
            show: {
                resource: ["Others"],
                operation: ['fetchTeam'],
                team: ['Custom_Team_Selected'],
            },
        },
        default: '',
    },
    {
        displayName: 'Channel',
        name: 'channel',
        type: 'options',
        required: true,
        placeholder: "Select a channel",
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ["Others"],
                operation: ['Channel', 'ChannelAsBot', 'Thread', "addUsersToChannel", 'removeChannelMember', 'archiveChannel', 'deleteChannel', 'fetchChannel', 'unarchiveChannel', 'updateChannel'],
            },
        },
        options: [], // Placeholder for dynamically fetched channels
        default: '',
        typeOptions: {
            loadOptionsMethod: 'getChannels',
        },
    },
    {
        displayName: 'Channel',
        name: 'channel',
        type: 'options',
        required: true,
        placeholder: "Select a channel",
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ["Others"],
                operation: ['addBotToChannel'],
            },
        },
        options: [], // Placeholder for dynamically fetched channels
        default: '',
        typeOptions: {
            loadOptionsMethod: 'getChannelsWithUniqueName',
        },
    },
    {
        displayName: 'Channel Unique Name',
        name: 'customChannelId',
        type: 'string',
        placeholder: "Enter the channel unique name",
        required: true,
        displayOptions: {
            show: {
                resource: ["Others"],
                operation: ['addBotToChannel'],
                channel: ['Custom_Channel_Selected'],
            },
        },
        default: '',
    },
    {
        displayName: 'Bot Unique Name',
        name: 'botUniqueName',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['Others'],
                operation: ['addBotToChannel'],
            },
        },
        default: '',
        placeholder: `Enter the bot's unique name`,
        description: `Send a message in a channel as a bot. The bot must already be a participant in the channel. You can find the bot’s unique name in the bot’s API endpoint URL.`,
    },
    {
        displayName: 'Channel ID',
        name: 'customChannelId',
        required: true,
        type: 'string',
        placeholder: "Enter the channel ID",
        displayOptions: {
            show: {
                channel: ['Custom_Channel_Selected'],
                resource: ["Others"],
                operation: ['Channel', "ChannelAsBot", "Thread", 'addUsersToChannel', 'removeChannelMember', 'archiveChannel', 'deleteChannel', 'fetchChannel', 'unarchiveChannel', 'updateChannel'],
            },
        },
        default: '',
    },

    {
        displayName: "Chat",
        name: 'chat',
        required: true,
        type: 'options',
        noDataExpression: true,
        placeholder: "Select a chat",
        displayOptions: {
            show: {
                resource: ['Others'],
                operation: ['Chat', 'pinMessage'],
            },
        },
        options: [], // Placeholder for dynamically fetched chats
        default: '',
        typeOptions: {
            loadOptionsMethod: 'getChats',
        },
    },
    {
        displayName: "Chat ID",
        name: 'customChatId',
        required: true,
        placeholder: "Enter the chat ID",
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Others'],
                operation: ['Chat', 'pinMessage'],
                chat: ['Custom_Chat_Selected'],
            },
        },
        default: '',
    },

    //Create Thread
    {
        displayName: 'Message ID',
        name: 'messageId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['Others'],
                operation: ['Thread', 'pinMessage'],
            },
        },
        default: '',
        placeholder: 'Enter the message ID',
    },
    {
        displayName: 'Expiry Time',
        name: 'expiryTime',
        type: 'options',
        placeholder: "Select a expiry time",
        required: true,
        displayOptions: {
            show: {
                resource: ['Others'],
                operation: ['pinMessage'],
            },
        },
        options: [
            {
                name: 'Forever',
                value: -1,
            },
            {
                name: '1 Hour',
                value: 3600000,
            },
            {
                name: '2 Hours',
                value: 7200000,
            },
            {
                name: '4 Hours',
                value: 14400000,
            },
            {
                name: '8 Hours',
                value: 28800000,
            },
            {
                name: '12 Hours',
                value: 43200000,
            },
            {
                name: '1 Day',
                value: 86400000,
            },
            {
                name: '1 Week',
                value: 604800000,
            },
            {
                name: 'Custom',
                value: 'custom',
            }
        ],
        default: -1,
    },
    {
        displayName: 'Expiry Time in Milliseconds',
        name: 'time',
        type: 'string',
        required: true,
        placeholder: "Enter the expiry time",
        displayOptions: {
            show: {
                resource: ['Others'],
                operation: ['pinMessage'],
                expiryTime: ['custom']
            },
        },
        default: '',
    },
    {
        displayName: 'Notify Members',
        name: 'notify',
        type: 'boolean',
        required: true,
        displayOptions: {
            show: {
                resource: ['Others'],
                operation: ['pinMessage'],
            },
        },
        default: false,
    },

    {
        displayName: 'Channel Name',
        name: 'channelName',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['Others'],
                operation: ['createChannel', 'updateChannel'],
            },
        },
        default: '',
        placeholder: 'Enter the channel name',
    },
    {
        displayName: 'Channel Description',
        name: 'channelDescription',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Others'],
                operation: ['createChannel', 'updateChannel'],
            },
        },
        default: '',
        placeholder: 'Enter a description for the channel',
    },
    {
        displayName: 'Channel type',
        name: 'level',
        type: 'options',
        required: true,
        placeholder: "Select the type of channel",
        displayOptions: {
            show: {
                resource: ['Others'],
                operation: ['createChannel', 'updateChannel'],
            },
        },
        options: [
            {
                name: 'Organization - Anyone in your organization can access and join.',
                value: 'organization'
            },
            {
                name: 'Team - Only selected members of your organization group can access and join.',
                value: 'team'
            },
            {
                name: 'Personal - Only invited users from your organization can join',
                value: 'private'
            },
            {
                name: 'External - Invited users from any organization can join',
                value: 'external'
            }
        ],
        default: 'private',
    },
    {
        displayName: 'Select your teams',
        name: 'teams',
        type: 'multiOptions',
        placeholder: "Select your teams",
        required: true,
        displayOptions: {
            show: {
                resource: ['Others'],
                operation: ['createChannel', 'updateChannel'],
                level: ['team'],
            },
        },
        options: [],
        default: [],
        typeOptions: {
            loadOptionsMethod: 'getTeams',
        },
    },
    {
        displayName: "Email address",
        name: 'channelEmailIDs',
        placeholder: "Enter the email address of the user",
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Others'],
                operation: ['createChannel', 'updateChannel'],
                level: ['private', 'external', 'organization'],
            },
        },
        default: '',
        description: 'Enter the email addresses of users to be added to the channel. Separate multiple email addresses with commas.',
    },
    {
        displayName: 'Visibility',
        name: 'visibility',
        type: 'boolean',
        displayOptions: {
            show: {
                level: ['organization', 'team'], // This ensures the field is shown only when "level" is "organization"
            },
        },
        default: false,
        description: 'Set whether the channel is visible to everyone in the organization/ Team.',
    },

    {
        displayName: 'Thread Chat Id',
        name: 'threadChatId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['Others'],
                operation: ['updateThreadState'],
            },
        },
        default: '',
        placeholder: 'Enter the thread chat ID',
    },
    {
        displayName: 'Thread status',
        name: 'state',
        type: 'options',
        required: true,
        placeholder: "Select the thread action",
        displayOptions: {
            show: {
                resource: ['Others'],
                operation: ['updateThreadState'],
            },
        },
        options: [
            {
                name: 'Close',
                value: 'close',
            },
            {
                name: 'Reopen',
                value: 'reopen',
            }
        ],
        default: '',
    }
]