// package: vpn
// file: vpn.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CreateRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): CreateRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateRequest): CreateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateRequest;
    static deserializeBinaryFromReader(message: CreateRequest, reader: jspb.BinaryReader): CreateRequest;
}

export namespace CreateRequest {
    export type AsObject = {
        userId: string,
    }
}

export class CreateResponse extends jspb.Message { 
    getCredentials(): string;
    setCredentials(value: string): CreateResponse;

    getStatus(): VpnSessionStatus;
    setStatus(value: VpnSessionStatus): CreateResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateResponse): CreateResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateResponse;
    static deserializeBinaryFromReader(message: CreateResponse, reader: jspb.BinaryReader): CreateResponse;
}

export namespace CreateResponse {
    export type AsObject = {
        credentials: string,
        status: VpnSessionStatus,
    }
}

export class DeleteRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): DeleteRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteRequest): DeleteRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteRequest;
    static deserializeBinaryFromReader(message: DeleteRequest, reader: jspb.BinaryReader): DeleteRequest;
}

export namespace DeleteRequest {
    export type AsObject = {
        userId: string,
    }
}

export class DeleteResponse extends jspb.Message { 
    getStatus(): VpnSessionStatus;
    setStatus(value: VpnSessionStatus): DeleteResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteResponse): DeleteResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteResponse;
    static deserializeBinaryFromReader(message: DeleteResponse, reader: jspb.BinaryReader): DeleteResponse;
}

export namespace DeleteResponse {
    export type AsObject = {
        status: VpnSessionStatus,
    }
}

export class ConnectRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): ConnectRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConnectRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ConnectRequest): ConnectRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConnectRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConnectRequest;
    static deserializeBinaryFromReader(message: ConnectRequest, reader: jspb.BinaryReader): ConnectRequest;
}

export namespace ConnectRequest {
    export type AsObject = {
        userId: string,
    }
}

export class ConnectResponse extends jspb.Message { 
    getStatus(): VpnSessionStatus;
    setStatus(value: VpnSessionStatus): ConnectResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConnectResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ConnectResponse): ConnectResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConnectResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConnectResponse;
    static deserializeBinaryFromReader(message: ConnectResponse, reader: jspb.BinaryReader): ConnectResponse;
}

export namespace ConnectResponse {
    export type AsObject = {
        status: VpnSessionStatus,
    }
}

export class DisconnectRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): DisconnectRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DisconnectRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DisconnectRequest): DisconnectRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DisconnectRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DisconnectRequest;
    static deserializeBinaryFromReader(message: DisconnectRequest, reader: jspb.BinaryReader): DisconnectRequest;
}

export namespace DisconnectRequest {
    export type AsObject = {
        userId: string,
    }
}

export class DisconnectResponse extends jspb.Message { 
    getStatus(): VpnSessionStatus;
    setStatus(value: VpnSessionStatus): DisconnectResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DisconnectResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DisconnectResponse): DisconnectResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DisconnectResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DisconnectResponse;
    static deserializeBinaryFromReader(message: DisconnectResponse, reader: jspb.BinaryReader): DisconnectResponse;
}

export namespace DisconnectResponse {
    export type AsObject = {
        status: VpnSessionStatus,
    }
}

export class GetSessionRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): GetSessionRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSessionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetSessionRequest): GetSessionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSessionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSessionRequest;
    static deserializeBinaryFromReader(message: GetSessionRequest, reader: jspb.BinaryReader): GetSessionRequest;
}

export namespace GetSessionRequest {
    export type AsObject = {
        userId: string,
    }
}

export class GetSessionResponse extends jspb.Message { 
    getCredentials(): string;
    setCredentials(value: string): GetSessionResponse;

    getStatus(): VpnSessionStatus;
    setStatus(value: VpnSessionStatus): GetSessionResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSessionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetSessionResponse): GetSessionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSessionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSessionResponse;
    static deserializeBinaryFromReader(message: GetSessionResponse, reader: jspb.BinaryReader): GetSessionResponse;
}

export namespace GetSessionResponse {
    export type AsObject = {
        credentials: string,
        status: VpnSessionStatus,
    }
}

export class SubsribeToSessionRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): SubsribeToSessionRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubsribeToSessionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SubsribeToSessionRequest): SubsribeToSessionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubsribeToSessionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubsribeToSessionRequest;
    static deserializeBinaryFromReader(message: SubsribeToSessionRequest, reader: jspb.BinaryReader): SubsribeToSessionRequest;
}

export namespace SubsribeToSessionRequest {
    export type AsObject = {
        userId: string,
    }
}

export class SubscribeToSessionResponse extends jspb.Message { 
    getStatus(): VpnSessionStatus;
    setStatus(value: VpnSessionStatus): SubscribeToSessionResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubscribeToSessionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SubscribeToSessionResponse): SubscribeToSessionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubscribeToSessionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubscribeToSessionResponse;
    static deserializeBinaryFromReader(message: SubscribeToSessionResponse, reader: jspb.BinaryReader): SubscribeToSessionResponse;
}

export namespace SubscribeToSessionResponse {
    export type AsObject = {
        status: VpnSessionStatus,
    }
}

export enum VpnSessionStatus {
    NONE = 0,
    CREATE_REQUEST_SENT = 1,
    CREATE_REQUEST_ACKNOWLEDGED = 2,
    CREATE_REQUEST_APPROVED = 3,
    CREATE_REQUEST_DENIED = 4,
    CREATE_REQUEST_ERROR = 5,
    CONNECT_REQUEST_SENT = 6,
    CONNECT_REQUEST_ACKNOWLEDGED = 7,
    CONNECT_REQUEST_APPROVED = 8,
    CONNECT_REQUEST_DENIED = 9,
    CONNECT_REQUEST_ERROR = 10,
    DISCONNECT_REQUEST_SENT = 11,
    DISCONNECT_REQUEST_ACKNOWLEDGED = 12,
    DISCONNECT_REQUEST_APPROVED = 13,
    DISCONNECT_REQUEST_DENIED = 14,
    DISCONNECT_REQUEST_ERROR = 15,
    DELETE_REQUEST_SENT = 16,
    DELETE_REQUEST_ACKNOWLEDGED = 17,
    DELETE_REQUEST_APPROVED = 18,
    DELETE_REQUEST_DENIED = 19,
    DELETE_REQUEST_ERROR = 20,
    IDLE = 21,
    CONNECTED = 22,
    DISCONNECTED = 23,
    ERROR = 24,
}
