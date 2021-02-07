// package: vpn
// file: vpn.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as vpn_pb from "./vpn_pb";

interface IVpnServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    create: IVpnServiceService_ICreate;
    delete: IVpnServiceService_IDelete;
    connect: IVpnServiceService_IConnect;
    disconnect: IVpnServiceService_IDisconnect;
    getSession: IVpnServiceService_IGetSession;
    subscribeToSession: IVpnServiceService_ISubscribeToSession;
}

interface IVpnServiceService_ICreate extends grpc.MethodDefinition<vpn_pb.CreateRequest, vpn_pb.CreateResponse> {
    path: "/vpn.VpnService/Create";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vpn_pb.CreateRequest>;
    requestDeserialize: grpc.deserialize<vpn_pb.CreateRequest>;
    responseSerialize: grpc.serialize<vpn_pb.CreateResponse>;
    responseDeserialize: grpc.deserialize<vpn_pb.CreateResponse>;
}
interface IVpnServiceService_IDelete extends grpc.MethodDefinition<vpn_pb.DeleteRequest, vpn_pb.DeleteResponse> {
    path: "/vpn.VpnService/Delete";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vpn_pb.DeleteRequest>;
    requestDeserialize: grpc.deserialize<vpn_pb.DeleteRequest>;
    responseSerialize: grpc.serialize<vpn_pb.DeleteResponse>;
    responseDeserialize: grpc.deserialize<vpn_pb.DeleteResponse>;
}
interface IVpnServiceService_IConnect extends grpc.MethodDefinition<vpn_pb.ConnectRequest, vpn_pb.ConnectResponse> {
    path: "/vpn.VpnService/Connect";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vpn_pb.ConnectRequest>;
    requestDeserialize: grpc.deserialize<vpn_pb.ConnectRequest>;
    responseSerialize: grpc.serialize<vpn_pb.ConnectResponse>;
    responseDeserialize: grpc.deserialize<vpn_pb.ConnectResponse>;
}
interface IVpnServiceService_IDisconnect extends grpc.MethodDefinition<vpn_pb.DisconnectRequest, vpn_pb.DisconnectResponse> {
    path: "/vpn.VpnService/Disconnect";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vpn_pb.DisconnectRequest>;
    requestDeserialize: grpc.deserialize<vpn_pb.DisconnectRequest>;
    responseSerialize: grpc.serialize<vpn_pb.DisconnectResponse>;
    responseDeserialize: grpc.deserialize<vpn_pb.DisconnectResponse>;
}
interface IVpnServiceService_IGetSession extends grpc.MethodDefinition<vpn_pb.GetSessionRequest, vpn_pb.GetSessionResponse> {
    path: "/vpn.VpnService/GetSession";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vpn_pb.GetSessionRequest>;
    requestDeserialize: grpc.deserialize<vpn_pb.GetSessionRequest>;
    responseSerialize: grpc.serialize<vpn_pb.GetSessionResponse>;
    responseDeserialize: grpc.deserialize<vpn_pb.GetSessionResponse>;
}
interface IVpnServiceService_ISubscribeToSession extends grpc.MethodDefinition<vpn_pb.SubsribeToSessionRequest, vpn_pb.SubscribeToSessionResponse> {
    path: "/vpn.VpnService/SubscribeToSession";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<vpn_pb.SubsribeToSessionRequest>;
    requestDeserialize: grpc.deserialize<vpn_pb.SubsribeToSessionRequest>;
    responseSerialize: grpc.serialize<vpn_pb.SubscribeToSessionResponse>;
    responseDeserialize: grpc.deserialize<vpn_pb.SubscribeToSessionResponse>;
}

export const VpnServiceService: IVpnServiceService;

export interface IVpnServiceServer extends grpc.UntypedServiceImplementation {
    create: grpc.handleUnaryCall<vpn_pb.CreateRequest, vpn_pb.CreateResponse>;
    delete: grpc.handleUnaryCall<vpn_pb.DeleteRequest, vpn_pb.DeleteResponse>;
    connect: grpc.handleUnaryCall<vpn_pb.ConnectRequest, vpn_pb.ConnectResponse>;
    disconnect: grpc.handleUnaryCall<vpn_pb.DisconnectRequest, vpn_pb.DisconnectResponse>;
    getSession: grpc.handleUnaryCall<vpn_pb.GetSessionRequest, vpn_pb.GetSessionResponse>;
    subscribeToSession: grpc.handleServerStreamingCall<vpn_pb.SubsribeToSessionRequest, vpn_pb.SubscribeToSessionResponse>;
}

export interface IVpnServiceClient {
    create(request: vpn_pb.CreateRequest, callback: (error: grpc.ServiceError | null, response: vpn_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    create(request: vpn_pb.CreateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vpn_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    create(request: vpn_pb.CreateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vpn_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    delete(request: vpn_pb.DeleteRequest, callback: (error: grpc.ServiceError | null, response: vpn_pb.DeleteResponse) => void): grpc.ClientUnaryCall;
    delete(request: vpn_pb.DeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vpn_pb.DeleteResponse) => void): grpc.ClientUnaryCall;
    delete(request: vpn_pb.DeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vpn_pb.DeleteResponse) => void): grpc.ClientUnaryCall;
    connect(request: vpn_pb.ConnectRequest, callback: (error: grpc.ServiceError | null, response: vpn_pb.ConnectResponse) => void): grpc.ClientUnaryCall;
    connect(request: vpn_pb.ConnectRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vpn_pb.ConnectResponse) => void): grpc.ClientUnaryCall;
    connect(request: vpn_pb.ConnectRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vpn_pb.ConnectResponse) => void): grpc.ClientUnaryCall;
    disconnect(request: vpn_pb.DisconnectRequest, callback: (error: grpc.ServiceError | null, response: vpn_pb.DisconnectResponse) => void): grpc.ClientUnaryCall;
    disconnect(request: vpn_pb.DisconnectRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vpn_pb.DisconnectResponse) => void): grpc.ClientUnaryCall;
    disconnect(request: vpn_pb.DisconnectRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vpn_pb.DisconnectResponse) => void): grpc.ClientUnaryCall;
    getSession(request: vpn_pb.GetSessionRequest, callback: (error: grpc.ServiceError | null, response: vpn_pb.GetSessionResponse) => void): grpc.ClientUnaryCall;
    getSession(request: vpn_pb.GetSessionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vpn_pb.GetSessionResponse) => void): grpc.ClientUnaryCall;
    getSession(request: vpn_pb.GetSessionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vpn_pb.GetSessionResponse) => void): grpc.ClientUnaryCall;
    subscribeToSession(request: vpn_pb.SubsribeToSessionRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<vpn_pb.SubscribeToSessionResponse>;
    subscribeToSession(request: vpn_pb.SubsribeToSessionRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<vpn_pb.SubscribeToSessionResponse>;
}

export class VpnServiceClient extends grpc.Client implements IVpnServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public create(request: vpn_pb.CreateRequest, callback: (error: grpc.ServiceError | null, response: vpn_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    public create(request: vpn_pb.CreateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vpn_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    public create(request: vpn_pb.CreateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vpn_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    public delete(request: vpn_pb.DeleteRequest, callback: (error: grpc.ServiceError | null, response: vpn_pb.DeleteResponse) => void): grpc.ClientUnaryCall;
    public delete(request: vpn_pb.DeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vpn_pb.DeleteResponse) => void): grpc.ClientUnaryCall;
    public delete(request: vpn_pb.DeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vpn_pb.DeleteResponse) => void): grpc.ClientUnaryCall;
    public connect(request: vpn_pb.ConnectRequest, callback: (error: grpc.ServiceError | null, response: vpn_pb.ConnectResponse) => void): grpc.ClientUnaryCall;
    public connect(request: vpn_pb.ConnectRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vpn_pb.ConnectResponse) => void): grpc.ClientUnaryCall;
    public connect(request: vpn_pb.ConnectRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vpn_pb.ConnectResponse) => void): grpc.ClientUnaryCall;
    public disconnect(request: vpn_pb.DisconnectRequest, callback: (error: grpc.ServiceError | null, response: vpn_pb.DisconnectResponse) => void): grpc.ClientUnaryCall;
    public disconnect(request: vpn_pb.DisconnectRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vpn_pb.DisconnectResponse) => void): grpc.ClientUnaryCall;
    public disconnect(request: vpn_pb.DisconnectRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vpn_pb.DisconnectResponse) => void): grpc.ClientUnaryCall;
    public getSession(request: vpn_pb.GetSessionRequest, callback: (error: grpc.ServiceError | null, response: vpn_pb.GetSessionResponse) => void): grpc.ClientUnaryCall;
    public getSession(request: vpn_pb.GetSessionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vpn_pb.GetSessionResponse) => void): grpc.ClientUnaryCall;
    public getSession(request: vpn_pb.GetSessionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vpn_pb.GetSessionResponse) => void): grpc.ClientUnaryCall;
    public subscribeToSession(request: vpn_pb.SubsribeToSessionRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<vpn_pb.SubscribeToSessionResponse>;
    public subscribeToSession(request: vpn_pb.SubsribeToSessionRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<vpn_pb.SubscribeToSessionResponse>;
}
