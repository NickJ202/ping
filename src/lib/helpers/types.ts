export type MessageType = {
	id: string;
	dateCreated: number;
	message: string;
	owner: string;
	stamps: StampType;
	isRecent?: boolean;
};

export type ChannelHeaderResponseType = {
	id: string;
	groupId: string;
	groupChannel: string;
	messageGroupVersion: string;
	dateCreated: number;
	initialOwner: string;
};

export type ChannelResponseType = {
	data: MessageType[] | null;
	nextCursor: string | null;
	previousCursor: string | null;
};

export type StampType = {
	total: number;
	vouched: number;
	connectedWalletStamped: boolean;
};

export type EnvType = {
	arClient: ArweaveClientType;
};

export type InitArgs = {
	arweave: any;
	arweaveBundlr?: any;
	bundlrKey: any;
	warp: any;
	dreNode: string;
};

export type ApiClientInitArgs = {
	arClient: ArweaveClientType;
};

export type AssetArgsType = {
	ids: string[] | null;
	owners: string[] | null;
	cursor: string | null;
	reduxCursor: string | null;
	walletAddress: string | null;
};

export type AssetArgsClientType = AssetArgsType & {
	arClient: any;
	getStamps: boolean;
	useBundlrGateway?: boolean;
};

export type AssetArgsFetchType = AssetArgsType & {
	getStamps: boolean;
};

export type AssetCreateArgsType = {
	content: any;
	contentType: string;
	title: string;
	description: string;
	type: string;
	topics: string[];
	owner: string;
	ticker: string;
	dataProtocol: string | null;
	dataSource: string | null;
	renderWith: string[] | null;
	channelId: string;
	groupId: string;
};

export type AssetCreateArgsClientType = AssetCreateArgsType & {
	arClient: any;
};

export type ApiClientType = {
	arClient: ArweaveClientType;
	init: (args: ApiClientInitArgs) => ApiClientType;
	createAsset: (args: AssetCreateArgsType) => Promise<string>;
	getAssetsByChannel: (args: AssetArgsFetchType) => Promise<ChannelResponseType>;
	getAssetById: (args: { assetId: string }) => Promise<MessageType | null>;
	getChannelById: (args: { channelId: string }) => Promise<ChannelHeaderResponseType | null>;
	getGroupsByUser: (args: { walletAddress: string }) => Promise<GQLResponseType>;
	createGroup: (args: CreateGroupArgs) => Promise<string>;
	addGroupMember: (args: {
		groupId: string;
		groupTitle: string;
		walletAddress: string;
		wallet: any;
	}) => Promise<string>;
	joinGroup: (args: { groupId: string; groupTitle: string; walletAddress: string; wallet: any }) => Promise<string>;
	addGroupChannel: (args: { groupId: string; channelTitle: string; wallet: any; owner: string }) => Promise<string>;
	getProfiles: (args: { addresses: string[] }) => Promise<ProfileType[]>;
};

export type WriteContractArgs = {
	contract: string;
	wallet: any;
	input: any;
	options?: any;
};

export type ArweaveClientInitArgs = {
	arweave: any;
	bundlrKey: any;
	warp: any;
	dreNode: string;
};

export type ArweaveClientType = {
	init: (args: ArweaveClientInitArgs) => ArweaveClientType;
	arweave: any;
	bundlr: any;
	warp: any;
	writeContract: (args: WriteContractArgs) => Promise<any>;
	read: (id: string) => Promise<any>;
	options: any;
};

export type ClientType = {
	env: EnvType;
	init: (args: InitArgs) => ClientType;
	api: ApiClientType;
};

export enum CursorEnum {
	GQL = 'gql',
	idGQL = 'idGQL',
}

export type CursorObjectKeyType = CursorEnum.GQL | CursorEnum.idGQL | null;

export type GQLNodeResponseType = {
	cursor: string | null;
	node: {
		id: string;
		tags: { [key: string]: any }[];
		data?: {
			size: string;
			type: string;
		};
		block?: {
			height: number;
			timestamp: number;
		};
		owner?: {
			address: string;
		};
		address?: string;
		timestamp?: number;
	};
};

export type TagFilterType = { name: string; values: string[] };

export type GQLResponseType = {
	nextCursor: string | null;
	previousCursor: string | null;
	nodes: GQLNodeResponseType[];
};

export type AGQLResponseType = { data: GQLNodeResponseType[]; nextCursor: string | null };

export type ProfileType = {
	walletAddress?: string;
	handle: string | null;
	avatar: string | null;
	twitter: string | null;
	discord: string | null;
};

export type TagType = { name: string; value: string };

export type KeyValueType = { [key: string]: string };

export type CreateGroupArgs = {
	title: string;
	initialChannel: string;
	logo: {
		src: any;
		buffer: any;
	};
	owner: string;
	privateGroup: boolean;
	wallet: any;
};

export type CreateGroupClientArgs = CreateGroupArgs & {
	arClient: any;
};

export type ChannelType = { id: string; title: string };

export type GroupType = {
	balances: any;
	channels: ChannelType[];
	dateCreated: string;
	logo: string;
	members: MemberType[];
	owner: string;
	title: string;
};

export enum MessageEnum {
	Text = 'text',
}

export type MemberType = { address: string; profileHexCode: string };
