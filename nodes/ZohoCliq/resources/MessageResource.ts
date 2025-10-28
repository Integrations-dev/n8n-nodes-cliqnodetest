import type { INodeProperties } from "n8n-workflow";

export const messageOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: [
                    'Message',
                ],
            },
        },
        options: [
            {
                name: 'Channel',
                value: 'Channel',
                action: 'Post message to channel',
                description: 'Send message to a channel',
            },
            {
                name: 'Channel as Bot',
                value: 'ChannelAsBot',
                action: 'Post message to channel as bot',
                description: 'Send message to a channel as a bot',
            },
            {
                name: 'Chat',
                value: 'Chat',
                action: 'Post message to chat',
                description: 'Send message to a chat',
            },
            {
                name: 'Direct Message',
                value: 'DM',
                action: 'Post message to user chat',
                description: 'Send message to a user chat',
            },
            {
                name: 'Create a thread',
                value: 'Thread',
                action: 'Create a thread',
                description: 'Create a thread in a channel',
            }
        ],
        default: '',
    },
]

export const messageFields: INodeProperties[] = [
    {
        displayName: 'Channel',
        name: 'channel',
        type: 'options',
        required: true,
        noDataExpression: true,
        placeholder: "Select a channel",
        displayOptions: {
            show: {
                resource: ['Message'],
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
        displayName: 'Channel ID',
        name: 'customChannelId',
        type: 'string',
        required: true,
        placeholder: "Enter the channel ID",
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Channel', "ChannelAsBot", "Thread", 'addUsersToChannel', 'removeChannelMember', 'archiveChannel', 'deleteChannel', 'fetchChannel', 'unarchiveChannel', 'updateChannel'],
                channel: ["Custom_Channel_Selected"]
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
                resource: ['Message'],
                operation: ['ChannelAsBot'],
            },
        },
        default: '',
        placeholder: `Enter the bot's unique name`,
        description: `Send a message in a channel as a bot. The bot must already be a participant in the channel. You can find the bot’s unique name in the bot’s API endpoint URL.`,
    },
    {
        displayName: "User",
        name: 'user',
        type: 'options',
        noDataExpression: true,
        required: true,
        placeholder: "Select a user",
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['DM'],
            },
        },
        options: [], // Placeholder for dynamically fetched users
        default: '',
        typeOptions: {
            loadOptionsMethod: 'getUsers',
        },
    },
    {
        displayName: "Email ID/ ZUID",
        name: 'customUserId',
        type: 'string',
        required: true,
        placeholder: "scott.fisher@zylker.com/631831445",
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['DM'],
                user: ['Custom_User_Selected'],
            },
        },
        default: '',
    },
    {
        displayName: "Chat",
        name: 'chat',
        type: 'options',
        required: true,
        placeholder: "Select a chat",
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['Message'],
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
        type: 'string',
        placeholder: "Enter the message ID",
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Chat', 'pinMessage'],
                chat: ["Custom_Chat_Selected"]
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
                resource: ['Message'],
                operation: ['Thread', 'pinMessage'],
            },
        },
        default: '',
        placeholder: 'Enter the message ID',
    },
    {
        displayName: "Thread Title",
        name: 'threadTitle',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Thread'],
            },
        },
        default: '',
        placeholder: 'Enter the thread title',
    },
    {
        displayName: 'Text',
        name: 'text',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Channel', 'ChannelAsBot', 'Bot', 'Chat', 'DM', 'Thread'],
            },
        },
        default: '',
        placeholder: 'Write your message here',
    },
    {
        displayName: 'Card Theme',
        name: 'cardTheme',
        type: 'options',
        placeholder: "Select card theme",
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Channel', 'ChannelAsBot', 'Bot', 'Chat', 'DM', 'Thread'],
            },
        },
        options: [
            {
                name: 'None',
                value: 'none',
            },
            {
                name: 'Basic',
                value: 'basic',
            },
            {
                name: 'Poll',
                value: 'poll',
            },
            {
                name: 'Modern Inline',
                value: 'modern-inline',
            },
            {
                name: 'Prompt',
                value: 'prompt',
            }
        ],
        default: 'none',
        description: 'Customize your message with a theme. If not specified, a plain text message will be sent.',
    },
    {
        displayName: 'Card Title',
        name: 'cardTitle',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Channel', 'Chat', 'ChannelAsBot', 'Bot', 'DM', 'Thread'],
                cardTheme: ['basic', 'poll', 'modern-inline', 'prompt'],
            },
        },
        default: '',
        placeholder: 'Enter card title',
    },
    {
        displayName: 'Card thumbnail URL',
        name: 'cardThumbnailURL',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Channel', 'Chat', 'ChannelAsBot', 'Bot', 'DM', 'Thread'],
                cardTheme: ['basic', 'poll', 'modern-inline', 'prompt'],
            },
        },
        placeholder: "Enter thumbnail image URL",
        default: '',
    },
    {
        displayName: 'Card icon URL',
        name: 'cardIconURL',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Channel', 'Chat', 'ChannelAsBot', 'Bot', 'DM', 'Thread'],
                cardTheme: ['basic', 'poll', 'modern-inline', 'prompt'],
            },
        },
        placeholder: "Enter icon image URL",
        default: '',
    },
    {
        displayName: 'Bot Name',
        name: 'botName',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Channel', 'Chat', 'ChannelAsBot', 'Bot', 'DM', 'Thread'],
            },
        },
        default: '',
        placeholder: 'Enter bot name',
    },
    {
        displayName: 'Bot Icon URL',
        name: 'botIconURL',
        type: 'string',
        placeholder: "Enter bot icon image URL",
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Channel', 'Chat', 'DM', 'ChannelAsBot', 'Bot', 'Thread'],
            },
        },
        default: '',
    },
    {
        displayName: 'Post in parent channel',
        name: 'postInChannel',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Thread'],
            },
        },
        default: false,
        description: 'If enabled, the parent channel will be notified about this thread creation.',
    },
    {
        displayName: 'Sync Message',
        name: 'sync',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Channel', 'Chat', 'ChannelAsBot', 'Bot', 'DM', 'Thread'],
            },
        },
        default: false,
        description: `If enabled, the Message ID will be returned in the response.`,
    },
]