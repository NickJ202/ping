export type AssetType = {
	data: {
		id: string;
		title: string;
		description: string;
		topic: string;
		type: string;
		implementation: string;
		license: string;
		renderWith: string | null;
		dateCreated: number;
		blockHeight: number;
		creator: string;
		udl?: UDLType;
	};
	orders?: OrderBookPairOrderType[];
	stamps?: { total: number; vouched: number };
};

export type LicenseValueType = {
	key: string;
	value: string;
	icon?: string;
	endText?: string;
};

export type UDLType = {
	license: LicenseValueType;
	access: LicenseValueType;
	accessFee: LicenseValueType;
	derivation: LicenseValueType;
	derivationFee: LicenseValueType;
	commercial: LicenseValueType;
	commercialFee: LicenseValueType;
	paymentMode: LicenseValueType;
};

export type AssetDetailType = AssetType & {
	state: any;
	orders: any;
};

export type SellArgs = {
	assetId: string;
	price: number;
	qty: number;
	collection?: string;
	wallet: any;
	walletAddress: string | null;
};

export type BuyArgs = {
	assetId: string;
	spend: number;
	wallet: any;
	walletAddress: string | null;
};

export type CancelArgs = {
	orderId: string;
	wallet: any;
	walletAddress: string | null;
};

export type EnvType = {
	orderBookContract: string;
	currency: string;
	currencyContract: string;
	arClient: ArweaveClientType;
};

export type InitArgs = {
	currency: 'U';
	arweaveGet: any;
	arweavePost: any;
	arweaveBundlr?: any;
	bundlrKey: any;
	warp: any;
	warpDreNode: string;
};

export type ApiClientInitArgs = {
	arClient: ArweaveClientType;
	orderBookContract: string;
};

export type AssetArgsType = {
	ids: string[] | null;
	owner: string | null;
	uploader: string | null;
	cursor: string | null;
	reduxCursor: string | null;
	walletAddress: string | null;
};

export type AssetArgsClientType = AssetArgsType & {
	arClient: any;
	useArweaveBundlr?: boolean;
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

export type GetCollectionsArgs = {
	arClient: any;
};

export type GetCollectionArgs = {
	arClient: any;
	collectionId: string;
};

export type SearchReturnType = {
	assets: AssetType[];
};

export type SearchArgs = AssetArgsType & {
	term: string;
};

export type ApiClientType = {
	arClient: ArweaveClientType;
	orderBookContract: string;
	init: (args: ApiClientInitArgs) => ApiClientType;
	createAsset: (args: AssetCreateArgsType) => Promise<string>;
	getAssetsByChannel: (args: AssetArgsType) => Promise<AssetsResponseType>;
	getAssetById: (args: {assetId: string}) => Promise<GQLResponseType | null>;
	getProfile: (args: { walletAddress: string }) => Promise<ProfileType>;
};

export type WriteContractArgs = {
	contract: string;
	wallet: any;
	input: any;
	options?: any;
};

export type ValidateAssetArgs = {
	asset: string;
	assetState: any;
	arClient: ArweaveClientType;
};

export type ValidateSellArgs = {
	sellArgs: SellArgs;
	assetState: any;
	orderBookState: any;
};

export type ValidateBuyArgs = {
	buyArgs: BuyArgs;
	assetState: any;
	orderBookState: any;
	currencyContract: string;
};

export type TransactionFlowArgs = {
	from: string;
	to: string;
	orderBookState: any;
	arClient: ArweaveClientType;
	env: EnvType;
};

export type ArweaveClientInitArgs = {
	arweaveGet: any;
	arweavePost: any;
	bundlrKey: any;
	warp: any;
	warpDreNode: string;
};

export type ArweaveClientType = {
	init: (args: ArweaveClientInitArgs) => ArweaveClientType;
	arweaveGet: any;
	arweavePost: any;
	bundlr: any;
	warpDefault: any;
	writeContract: (args: WriteContractArgs) => Promise<any>;
	read: (id: string) => Promise<any>;
	options: any;
};

export type ClientType = {
	env: EnvType;
	init: (args: InitArgs) => ClientType;
	api: ApiClientType;
};

export type PagingType = {
	limit: number;
	items: number;
	page: number;
};

export type BalanceType = {
	contract_tx_id: string;
	token_ticker: string;
	token_name: string;
	balance: string;
	sort_key: string;
};

export type UserBalancesType = {
	paging: PagingType;
	balances: BalanceType[];
};

export type OrderBookPairType = {
	pair: [string, string];
	orders: OrderBookPairOrderType[];
};

export type OrderBookPairOrderType = {
	creator: string;
	id: string;
	originalQuantity: number;
	price: number;
	quantity: number;
	token: string;
	transfer: string;
	currency?: string;
};

export enum CursorEnum {
	GQL = 'gql',
	idGQL = 'idGQL',
}

export type CursorObjectKeyType = CursorEnum.GQL | CursorEnum.idGQL | null;

export type GQLResponseType = {
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

export type AssetsResponseType = {
	nextCursor: string | null;
	previousCursor: string | null;
	assets: GQLResponseType[];
};

export type CollectionsResponseType = {
	nextCursor: string | null;
	previousCursor: string | null;
	collections: CollectionType[];
};

export type AGQLResponseType = { data: GQLResponseType[]; nextCursor: string | null };

export type ProfileType = {
	handle: string | null;
	avatar: string | null;
	twitter: string | null;
	discord: string | null;
	walletAddress?: string;
};

export type CollectionType = {
	id: string;
	banner: string;
	thumbnail: string;
	name: string;
	title: string;
	description: string;
	type: string;
	creator: ProfileType;
	stamps?: { total: number; vouched: number };
};

export type CollectionAssetType = CollectionType & {
	assets: string[];
};

export type CollectionManifestType = {
	type: string;
	items: string[];
};

export type ActivityElementType = {
	id: string;
	dataProtocol: string | null;
	dataSource: string;
	dateCreated: number;
	owner: string;
	protocolName: string | null;
	stamps?: { total: number; vouched: number };
};

export type ActivityResponseType = {
	activity: ActivityElementType[];
	nextCursor: string | null;
	previousCursor: string | null;
};

export type CommentType = {
	id: string;
	dataSource: string;
	owner: string;
	stamps?: { total: number; vouched: number };
};

export type CommentDetailType = {
	text: string;
};

export type CommentsResponseType = {
	comments: CommentType[];
	nextCursor: string | null;
	previousCursor: string | null;
};

export type TagType = { name: string; value: string };