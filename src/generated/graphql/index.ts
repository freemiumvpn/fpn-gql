import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Ping = {
  __typename: 'Ping';
  date: Scalars['String'];
  message: Scalars['String'];
};

export type Query = {
  __typename: 'Query';
  ping: Ping;
  user: User;
  vpn: Vpn;
  vpnSignedUrl: Scalars['String'];
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};


export type QueryVpnArgs = {
  userId?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename: 'Subscription';
  ping: Ping;
};


export type SubscriptionPingArgs = {
  minutes: Scalars['Int'];
};

export type User = {
  __typename: 'User';
  id: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type Vpn = {
  __typename: 'Vpn';
  configuration: Scalars['String'];
};

export enum VpnSessionStatus {
  None = 'NONE',
  CreateRequestSent = 'CREATE_REQUEST_SENT',
  CreateRequestAcknowledged = 'CREATE_REQUEST_ACKNOWLEDGED',
  CreateRequestApproved = 'CREATE_REQUEST_APPROVED',
  CreateRequestDenied = 'CREATE_REQUEST_DENIED',
  CreateRequestError = 'CREATE_REQUEST_ERROR',
  ConnectRequestSent = 'CONNECT_REQUEST_SENT',
  ConnectRequestAcknowledged = 'CONNECT_REQUEST_ACKNOWLEDGED',
  ConnectRequestApproved = 'CONNECT_REQUEST_APPROVED',
  ConnectRequestDenied = 'CONNECT_REQUEST_DENIED',
  ConnectRequestError = 'CONNECT_REQUEST_ERROR',
  DisconnectRequestSent = 'DISCONNECT_REQUEST_SENT',
  DisconnectRequestAcknowledged = 'DISCONNECT_REQUEST_ACKNOWLEDGED',
  DisconnectRequestApproved = 'DISCONNECT_REQUEST_APPROVED',
  DisconnectRequestDenied = 'DISCONNECT_REQUEST_DENIED',
  DisconnectRequestError = 'DISCONNECT_REQUEST_ERROR',
  DeleteRequestSent = 'DELETE_REQUEST_SENT',
  DeleteRequestAcknowledged = 'DELETE_REQUEST_ACKNOWLEDGED',
  DeleteRequestApproved = 'DELETE_REQUEST_APPROVED',
  DeleteRequestDenied = 'DELETE_REQUEST_DENIED',
  DeleteRequestError = 'DELETE_REQUEST_ERROR',
  Idle = 'IDLE',
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
  Error = 'ERROR'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Ping: ResolverTypeWrapper<Ping>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Vpn: ResolverTypeWrapper<Vpn>;
  VpnSessionStatus: VpnSessionStatus;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Ping: Ping;
  String: Scalars['String'];
  Query: {};
  Subscription: {};
  Int: Scalars['Int'];
  User: User;
  Boolean: Scalars['Boolean'];
  Vpn: Vpn;
};

export type PingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ping'] = ResolversParentTypes['Ping']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  ping?: Resolver<ResolversTypes['Ping'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>;
  vpn?: Resolver<ResolversTypes['Vpn'], ParentType, ContextType, RequireFields<QueryVpnArgs, never>>;
  vpnSignedUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  ping?: SubscriptionResolver<ResolversTypes['Ping'], "ping", ParentType, ContextType, RequireFields<SubscriptionPingArgs, 'minutes'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VpnResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vpn'] = ResolversParentTypes['Vpn']> = {
  configuration?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Ping?: PingResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Vpn?: VpnResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
