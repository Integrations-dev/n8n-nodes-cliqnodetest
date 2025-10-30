import { INodeType, INodeTypeDescription, NodeConnectionType, ILoadOptionsFunctions, IDataObject, IExecuteFunctions, NodeOperationError } from 'n8n-workflow';

import {
    CliqApiRequest,
    getTeamsList,
    getChannelsWithUniqueNameList,
    getChannelsList,
    getChatsList,
    getUserStatusesList,
    getUsersList
} from './CommonUtils';

import { messageFields, messageOperations } from './resources/MessageResource';
import { userFields, userOperations } from './resources/UsersResource';
import { channelFields, channelOperations } from './resources/ChannelResource';
import { teamFields, teamOperations } from './resources/TeamResource';


export class ZohoCliq implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Zoho Cliq ( As Per In-App Content )',
        name: 'zohoCliqInapp',
        icon: 'file:cliq.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Consume Zoho Cliq API',
        defaults: {
            name: 'Zoho Cliq',
        },
        inputs: ['main'] as NodeConnectionType[],
        outputs: ['main'] as NodeConnectionType[],
        credentials: [
            {
                name: 'zohoCliqOAuth2Api',
                required: true,
            },
        ],

        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Message',
                        value: 'Message',
                    },
                    {
                        name: 'User',
                        value: 'Users',
                    },
                    {
                        name: 'Channel',
                        value: 'Channel',
                    },
                    {
                        name: 'Team',
                        value: 'Team'
                    }
                ],
                default: 'Message',
            },

            
            
            ...messageOperations,
            ...messageFields,

            ...userOperations,
            ...userFields,

            ...channelOperations,
            ...channelFields,

            ...teamOperations,
            ...teamFields,
        ],
		usableAsTool: true
    };

    methods = {
        loadOptions: {
            async getTeams(this: ILoadOptionsFunctions) {
                return getTeamsList.call(this);
            },

            async getChannels(this: ILoadOptionsFunctions) {
                return getChannelsList.call(this);
            },

            async getChannelsWithUniqueName(this: ILoadOptionsFunctions) {
                return getChannelsWithUniqueNameList.call(this);
            },

            async getUsers(this: ILoadOptionsFunctions) {
                return getUsersList.call(this);
            },

            async getChats(this: ILoadOptionsFunctions) {
                return getChatsList.call(this);
            },

            async getUserStatuses(this: ILoadOptionsFunctions) {
                return getUserStatusesList.call(this);
            }
        },
    };

    async execute(this: IExecuteFunctions) {
        const items = this.getInputData();
        const returnData: IDataObject[] = [];

        for (let i = 0; i < items.length; i++) {
            try {
                const resource = this.getNodeParameter('resource', i) as string;
                const operation = this.getNodeParameter('operation', i) as string;

                if (resource === 'Message' && (operation === 'Channel' || operation === 'ChannelAsBot')) {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    const text = this.getNodeParameter('text', i) as string;
                    const botUniqueName = this.getNodeParameter('botUniqueName', i, '') as string;
                    const sync = this.getNodeParameter('sync', i, false) as boolean;

                    const botName = this.getNodeParameter('botName', i, '') as string;
                    const botIconURL = this.getNodeParameter('botIconURL', i, '') as string;
                    const cardTheme = this.getNodeParameter('cardTheme', i, 'none') as string;
                    const cardTitle = this.getNodeParameter('cardTitle', i, '') as string;
                    const cardIconURL = this.getNodeParameter('cardIconURL', i, '') as string;
                    const cardThumbnailURL = this.getNodeParameter('cardThumbnailURL', i, '') as string;

                    let channel_id = "";
                    const queryString: IDataObject = {};

                    const botObject: IDataObject = {};
                    const cardObject: IDataObject = {};

                    if (botName) {
                        botObject.name = botName;
                    }

                    if (botIconURL) {
                        botObject.image = botIconURL;
                    }

                    if (cardTheme && cardTheme !== 'none') {
                        cardObject.theme = cardTheme;

                        if (cardTitle) {
                            cardObject.title = cardTitle;
                        }

                        if (cardIconURL) {
                            cardObject.icon = cardIconURL;
                        }

                        if (cardThumbnailURL) {
                            cardObject.thumbnail = cardThumbnailURL;
                        }
                    }


                    const body: IDataObject = {
                        text,
                        sync_message: sync,
                    };

                    if (Object.keys(botObject).length > 0) {
                        body.bot = botObject;
                    }

                    if (Object.keys(cardObject).length > 0) {
                        body.card = cardObject;
                    }

                    if (customChannelId) {
                        channel_id = customChannelId;
                    } else if (channel) {
                        channel_id = channel;
                    } else {
                        throw new NodeOperationError(this.getNode(),'You must select a channel or provide a channel ID.');
                    }

                    if (botUniqueName) {
                        queryString.bot_unique_name = botUniqueName;
                    }

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/message`, body, queryString);
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Message' && operation === 'Chat') {
                    const chat = this.getNodeParameter('chat', i, '') as string;
                    const customChatId = this.getNodeParameter('customChatId', i, '') as string;
                    const text = this.getNodeParameter('text', i) as string;
                    const sync = this.getNodeParameter('sync', i, false) as boolean;

                    const botName = this.getNodeParameter('botName', i, '') as string;
                    const botIconURL = this.getNodeParameter('botIconURL', i, '') as string;
                    const cardTheme = this.getNodeParameter('cardTheme', i, 'none') as string;
                    const cardTitle = this.getNodeParameter('cardTitle', i, '') as string;
                    const cardIconURL = this.getNodeParameter('cardIconURL', i, '') as string;
                    const cardThumbnailURL = this.getNodeParameter('cardThumbnailURL', i, '') as string;

                    const botObject: IDataObject = {};
                    const cardObject: IDataObject = {};

                    if (botName) {
                        botObject.name = botName;
                    }

                    if (botIconURL) {
                        botObject.image = botIconURL;
                    }

                    if (cardTheme && cardTheme !== 'none') {
                        cardObject.theme = cardTheme;

                        if (cardTitle) {
                            cardObject.title = cardTitle;
                        }

                        if (cardIconURL) {
                            cardObject.icon = cardIconURL;
                        }

                        if (cardThumbnailURL) {
                            cardObject.thumbnail = cardThumbnailURL;
                        }
                    }

                    let chat_id = "";
                    const body: IDataObject = {
                        text,
                        sync_message: sync,
                    };

                    if (Object.keys(botObject).length > 0) {
                        body.bot = botObject;
                    }

                    if (Object.keys(cardObject).length > 0) {
                        body.card = cardObject;
                    }

                    if (customChatId) {
                        chat_id = customChatId;
                    } else if (chat) {
                        chat_id = chat;
                    } else {
                        throw new NodeOperationError(this.getNode(),'You must select a chat or provide a chat ID.');
                    }
                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/chats/${chat_id}/message`, body);
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Message' && operation === 'DM') {
                    const user = this.getNodeParameter('user', i, '') as string;
                    const customEmailID = this.getNodeParameter('customUserId', i, '') as string;
                    const text = this.getNodeParameter('text', i) as string;
                    const sync = this.getNodeParameter('sync', i, false) as boolean;

                    const botName = this.getNodeParameter('botName', i, '') as string;
                    const botIconURL = this.getNodeParameter('botIconURL', i, '') as string;
                    const cardTheme = this.getNodeParameter('cardTheme', i, 'none') as string;
                    const cardTitle = this.getNodeParameter('cardTitle', i, '') as string;
                    const cardIconURL = this.getNodeParameter('cardIconURL', i, '') as string;
                    const cardThumbnailURL = this.getNodeParameter('cardThumbnailURL', i, '') as string;

                    const botObject: IDataObject = {};
                    const cardObject: IDataObject = {};

                    if (botName) {
                        botObject.name = botName;
                    }

                    if (botIconURL) {
                        botObject.image = botIconURL;
                    }

                    if (cardTheme && cardTheme !== 'none') {
                        cardObject.theme = cardTheme;

                        if (cardTitle) {
                            cardObject.title = cardTitle;
                        }

                        if (cardIconURL) {
                            cardObject.icon = cardIconURL;
                        }

                        if (cardThumbnailURL) {
                            cardObject.thumbnail = cardThumbnailURL;
                        }
                    }

                    let email_Id = "";
                    const body: IDataObject = {
                        text,
                        sync_message: sync,
                    };

                    if (Object.keys(botObject).length > 0) {
                        body.bot = botObject;
                    }

                    if (Object.keys(cardObject).length > 0) {
                        body.card = cardObject;
                    }

                    if (customEmailID) {
                        email_Id = customEmailID;
                    } else if (user) {
                        email_Id = user;
                    } else {
                        throw new NodeOperationError(this.getNode(),'You must select a user or provide a email ID.');
                    }

                    console.log(body)

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/buddies/${email_Id}/message`, body);
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Users' && operation === 'retrieveUser') {
                    const ID = this.getNodeParameter('emailIDorZUID', i, '') as string;

                    if (!ID) {
                        throw new NodeOperationError(this.getNode(),'You must provide an email ID/ ZUID.');
                    }

                    const queryString: IDataObject = {
                        fields: 'all',
                    }

                    const responseData = await CliqApiRequest.call(this, 'GET', `api/v2/users/${ID}`, {}, queryString);
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Message' && operation === 'Thread') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    const messageId = this.getNodeParameter('messageId', i) as string;
                    const threadTitle = this.getNodeParameter('threadTitle', i) as string;
                    const postInParentChannel = this.getNodeParameter('postInChannel', i) as boolean;
                    let channel_id = "";
                    const text = this.getNodeParameter('text', i) as string;
                    const sync = this.getNodeParameter('sync', i, false) as boolean;

                    const botName = this.getNodeParameter('botName', i, '') as string;
                    const botIconURL = this.getNodeParameter('botIconURL', i, '') as string;
                    const cardTheme = this.getNodeParameter('cardTheme', i, 'none') as string;
                    const cardTitle = this.getNodeParameter('cardTitle', i, '') as string;
                    const cardIconURL = this.getNodeParameter('cardIconURL', i, '') as string;
                    const cardThumbnailURL = this.getNodeParameter('cardThumbnailURL', i, '') as string;

                    const botObject: IDataObject = {};
                    const cardObject: IDataObject = {};

                    if (botName) {
                        botObject.name = botName;
                    }

                    if (botIconURL) {
                        botObject.image = botIconURL;
                    }

                    if (cardTheme && cardTheme !== 'none') {
                        cardObject.theme = cardTheme;

                        if (cardTitle) {
                            cardObject.title = cardTitle;
                        }

                        if (cardIconURL) {
                            cardObject.icon = cardIconURL;
                        }

                        if (cardThumbnailURL) {
                            cardObject.thumbnail = cardThumbnailURL;
                        }
                    }

                    if (customChannelId) {
                        channel_id = customChannelId;
                    } else if (channel) {
                        channel_id = channel;
                    } else {
                        throw new NodeOperationError(this.getNode(),'You must select a channel or provide a channel ID.');
                    }

                    const body: IDataObject = {
                        thread_title: threadTitle,
                        text: text,
                        thread_message_id: messageId,
                        post_in_parent: postInParentChannel,
                        sync_message: sync,
                    };

                    if (Object.keys(botObject).length > 0) {
                        body.bot = botObject;
                    }

                    if (Object.keys(cardObject).length > 0) {
                        body.card = cardObject;
                    }

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/message`, body);
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Users' && operation === 'addUserStatus') {
                    const statusCode = this.getNodeParameter('statusCode', i, '') as string;
                    const statusMessage = this.getNodeParameter('statusMessage', i, '') as string;

                    const body: IDataObject = {
                        code: statusCode,
                        message: statusMessage,
                    };

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/statuses`, body);
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Users' && operation === 'setUserStatus') {
                    const status = this.getNodeParameter('status', i, '') as string;

                    if (!status) {
                        throw new NodeOperationError(this.getNode(),'You must provide a status.');
                    }

                    const responseData = await CliqApiRequest.call(this, 'PUT', `api/v2/statuses/${status}/set`, {});
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Channel' && operation === 'addUsersToChannel') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    const userEmails = this.getNodeParameter('userEmails', i, '') as string;
                    let channel_id = "";

                    if (customChannelId) {
                        channel_id = customChannelId;
                    } else if (channel) {
                        channel_id = channel;
                    } else {
                        throw new NodeOperationError(this.getNode(),'You must select a channel or provide a channel ID.');
                    }

                    const body: IDataObject = {
                        email_ids: userEmails.split(',').map(email => email.trim()),
                    };

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/members`, body);
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Channel' && operation === 'removeChannelMember') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    const userEmails = this.getNodeParameter('userEmails', i, '') as string;
                    let channel_id = "";

                    if (customChannelId) {
                        channel_id = customChannelId;
                    }
                    else if (channel) {
                        channel_id = channel;
                    }
                    else {
                        throw new NodeOperationError(this.getNode(),'You must select a channel or provide a channel ID.');
                    }

                    const body: IDataObject = {
                        email_ids: userEmails.split(',').map(email => email.trim()),
                    };

                    const responseData = await CliqApiRequest.call(this, 'DELETE', `api/v2/channels/${channel_id}/members`, body);
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Channel' && operation === 'addBotToChannel') {
                    const botUniqueName = this.getNodeParameter('botUniqueName', i, '') as string;
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelUniquename = this.getNodeParameter('customChannelId', i, '') as string;
                    let channel_unique_name = "";

                    if (customChannelUniquename) {
                        channel_unique_name = customChannelUniquename;
                    } else if (channel) {
                        channel_unique_name = channel;
                    } else {
                        throw new NodeOperationError(this.getNode(),'You must select a channel or provide a channel ID.');
                    }

                    const body: IDataObject = {
                        channel_unique_name: channel_unique_name,
                    };

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/bots/${botUniqueName}/associate`, body);
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Channel' && operation === 'archiveChannel') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    let channel_id = "";

                    if (customChannelId) {
                        channel_id = customChannelId;
                    } else if (channel) {
                        channel_id = channel;
                    } else {
                        throw new NodeOperationError(this.getNode(),'You must select a channel or provide a channel ID.');
                    }

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/archive`, {});
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Channel' && operation === 'deleteChannel') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    let channel_id = "";

                    if (customChannelId) {
                        channel_id = customChannelId;
                    } else if (channel) {
                        channel_id = channel;
                    } else {
                        throw new NodeOperationError(this.getNode(),'You must select a channel or provide a channel ID.');
                    }

                    const responseData = await CliqApiRequest.call(this, 'DELETE', `api/v2/channels/${channel_id}`, {});
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Channel' && operation === 'unarchiveChannel') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    let channel_id = "";

                    if (customChannelId) {
                        channel_id = customChannelId;
                    } else if (channel) {
                        channel_id = channel;
                    } else {
                        throw new NodeOperationError(this.getNode(),'You must select a channel or provide a channel ID.');
                    }

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/unarchive`, {});
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Channel' && operation === 'fetchChannel') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    let channel_id = "";

                    if (customChannelId) {
                        channel_id = customChannelId;
                    } else if (channel) {
                        channel_id = channel;
                    } else {
                        throw new NodeOperationError(this.getNode(),'You must select a channel or provide a channel ID.');
                    }


                    const responseData = await CliqApiRequest.call(this, 'GET', `api/v2/channels/${channel_id}`, {});
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Team' && operation === 'fetchTeam') {
                    const team = this.getNodeParameter('team', i, '') as string;
                    const teamId = this.getNodeParameter('teamId', i, '') as string;
                    let team_id = "";

                    if (teamId) {
                        team_id = teamId;
                    } else if (team) {
                        team_id = team;
                    } else {
                        throw new NodeOperationError(this.getNode(),'You must select a team or provide a team ID.');
                    }

                    const responseData = await CliqApiRequest.call(this, 'GET', `api/v2/teams/${team_id}`, {});
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Message' && operation === 'pinMessage') {
                    const chat = this.getNodeParameter('chat', i, '') as string;
                    const expiry_time = this.getNodeParameter('time', i, '') as string;
                    const preDefinedTime = this.getNodeParameter('expiryTime', i, '') as string;
                    const notify = this.getNodeParameter('notify', i, false) as boolean;
                    const customChatId = this.getNodeParameter('customChatId', i, '') as string;
                    const messageId = this.getNodeParameter('messageId', i) as string;
                    let expiryTime = expiry_time ? expiry_time : preDefinedTime;

                    console.log("Expiry Time : " + expiryTime);

                    // Get current timestamp in milliseconds
                    const currentTime = Date.now(); // already in milliseconds

                    if (expiryTime && expiryTime !== 'indefinite' && expiryTime !== "-1") {
                        // Ensure expiryTime is treated as milliseconds
                        const expiryMillis = parseInt(expiryTime);
                        const newExpiryTime = currentTime + expiryMillis;
                        expiryTime = newExpiryTime + ""; // convert to string if needed
                    }

                    const chat_id = customChatId ? customChatId : chat;


                    if (!chat_id) {
                        throw new NodeOperationError(this.getNode(),'You must select a chat or provide a chat ID.');
                    }

                    const body: IDataObject = {
                        id: messageId,
                        expiry_time: expiryTime,
                        notify: notify,
                    };

                    console.log(body);
                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/chats/${chat_id}/stickymessage`, body);
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Channel' && operation === 'createChannel') {
                    const channelName = this.getNodeParameter('channelName', i, '') as string;
                    const channelDescription = this.getNodeParameter('channelDescription', i, '') as string;
                    const level = this.getNodeParameter('level', i, '') as string;
                    const teams = this.getNodeParameter('teams', i, []) as string[];
                    const channelEmailIDs = this.getNodeParameter('channelEmailIDs', i, '') as string;
                    const visibility = this.getNodeParameter('visibility', i, false) as boolean;

                    const body: IDataObject = {
                        name: channelName,
                        description: channelDescription,
                        level: level,
                    };

                    if (level === 'team') {
                        if (teams.length === 0) {
                            throw new NodeOperationError(this.getNode(),'You must select at least one team when level is set to team.');
                        }
                        body.team_ids = teams;
                    }

                    if (['private', 'external', 'organization'].includes(level) && channelEmailIDs) {
                        body.email_ids = channelEmailIDs.split(',').map(email => email.trim());
                    }

                    if (['organization', 'team'].includes(level)) {
                        body.invite_only = visibility;
                    }

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/channels`, body);
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Channel' && operation === 'updateChannel') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    const channelName = this.getNodeParameter('channelName', i, '') as string;
                    const channelDescription = this.getNodeParameter('channelDescription', i, '') as string;
                    const level = this.getNodeParameter('level', i, '') as string;
                    const teams = this.getNodeParameter('teams', i, []) as string[];
                    const channelEmailIDs = this.getNodeParameter('channelEmailIDs', i, '') as string;
                    const visibility = this.getNodeParameter('visibility', i, false) as boolean;
                    let channel_id = "";

                    if (customChannelId) {
                        channel_id = customChannelId;
                    } else if (channel) {
                        channel_id = channel;
                    } else {
                        throw new NodeOperationError(this.getNode(),'You must select a channel or provide a channel ID.');
                    }

                    const body: IDataObject = {
                        name: channelName,
                        description: channelDescription,
                        level: level,
                    };

                    if (level === 'team') {
                        if (teams.length === 0) {
                            throw new NodeOperationError(this.getNode(),'You must select at least one team when level is set to team.');
                        }
                        body.team_ids = teams;
                    }

                    if (['private', 'external', 'organization'].includes(level) && channelEmailIDs) {
                        body.email_ids = channelEmailIDs.split(',').map(email => email.trim());
                    }

                    if (['organization', 'team'].includes(level)) {
                        body.invite_only = visibility;
                    }

                    const responseData = await CliqApiRequest.call(this, 'PUT', `api/v2/channels/${channel_id}`, body);
                    console.log(responseData);
                    returnData.push(responseData);
                } else if (resource === 'Message' && operation === 'updateThreadState') {
                    const threadChatId = this.getNodeParameter('threadChatId', i, '') as string;
                    const state = this.getNodeParameter('state', i, '') as string;
                    const queryString: IDataObject = {};
                    const body: IDataObject = {
                        action: state,
                    };

                    const responseData = await CliqApiRequest.call(this, 'PUT', `api/v2/threads/${threadChatId}`, body, queryString);
                    console.log(responseData);
                    returnData.push(responseData);
                }
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ error: error.message });
                    continue;
                }
                throw error;
            }
        }

        return [this.helpers.returnJsonArray(returnData)];
    }
}