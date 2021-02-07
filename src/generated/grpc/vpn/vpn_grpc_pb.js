// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var vpn_pb = require('./vpn_pb.js');

function serialize_vpn_ConnectRequest(arg) {
  if (!(arg instanceof vpn_pb.ConnectRequest)) {
    throw new Error('Expected argument of type vpn.ConnectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vpn_ConnectRequest(buffer_arg) {
  return vpn_pb.ConnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vpn_ConnectResponse(arg) {
  if (!(arg instanceof vpn_pb.ConnectResponse)) {
    throw new Error('Expected argument of type vpn.ConnectResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vpn_ConnectResponse(buffer_arg) {
  return vpn_pb.ConnectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vpn_CreateRequest(arg) {
  if (!(arg instanceof vpn_pb.CreateRequest)) {
    throw new Error('Expected argument of type vpn.CreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vpn_CreateRequest(buffer_arg) {
  return vpn_pb.CreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vpn_CreateResponse(arg) {
  if (!(arg instanceof vpn_pb.CreateResponse)) {
    throw new Error('Expected argument of type vpn.CreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vpn_CreateResponse(buffer_arg) {
  return vpn_pb.CreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vpn_DeleteRequest(arg) {
  if (!(arg instanceof vpn_pb.DeleteRequest)) {
    throw new Error('Expected argument of type vpn.DeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vpn_DeleteRequest(buffer_arg) {
  return vpn_pb.DeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vpn_DeleteResponse(arg) {
  if (!(arg instanceof vpn_pb.DeleteResponse)) {
    throw new Error('Expected argument of type vpn.DeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vpn_DeleteResponse(buffer_arg) {
  return vpn_pb.DeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vpn_DisconnectRequest(arg) {
  if (!(arg instanceof vpn_pb.DisconnectRequest)) {
    throw new Error('Expected argument of type vpn.DisconnectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vpn_DisconnectRequest(buffer_arg) {
  return vpn_pb.DisconnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vpn_DisconnectResponse(arg) {
  if (!(arg instanceof vpn_pb.DisconnectResponse)) {
    throw new Error('Expected argument of type vpn.DisconnectResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vpn_DisconnectResponse(buffer_arg) {
  return vpn_pb.DisconnectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vpn_GetSessionRequest(arg) {
  if (!(arg instanceof vpn_pb.GetSessionRequest)) {
    throw new Error('Expected argument of type vpn.GetSessionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vpn_GetSessionRequest(buffer_arg) {
  return vpn_pb.GetSessionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vpn_GetSessionResponse(arg) {
  if (!(arg instanceof vpn_pb.GetSessionResponse)) {
    throw new Error('Expected argument of type vpn.GetSessionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vpn_GetSessionResponse(buffer_arg) {
  return vpn_pb.GetSessionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vpn_SubscribeToSessionResponse(arg) {
  if (!(arg instanceof vpn_pb.SubscribeToSessionResponse)) {
    throw new Error('Expected argument of type vpn.SubscribeToSessionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vpn_SubscribeToSessionResponse(buffer_arg) {
  return vpn_pb.SubscribeToSessionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vpn_SubsribeToSessionRequest(arg) {
  if (!(arg instanceof vpn_pb.SubsribeToSessionRequest)) {
    throw new Error('Expected argument of type vpn.SubsribeToSessionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vpn_SubsribeToSessionRequest(buffer_arg) {
  return vpn_pb.SubsribeToSessionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var VpnServiceService = exports.VpnServiceService = {
  create: {
    path: '/vpn.VpnService/Create',
    requestStream: false,
    responseStream: false,
    requestType: vpn_pb.CreateRequest,
    responseType: vpn_pb.CreateResponse,
    requestSerialize: serialize_vpn_CreateRequest,
    requestDeserialize: deserialize_vpn_CreateRequest,
    responseSerialize: serialize_vpn_CreateResponse,
    responseDeserialize: deserialize_vpn_CreateResponse,
  },
  delete: {
    path: '/vpn.VpnService/Delete',
    requestStream: false,
    responseStream: false,
    requestType: vpn_pb.DeleteRequest,
    responseType: vpn_pb.DeleteResponse,
    requestSerialize: serialize_vpn_DeleteRequest,
    requestDeserialize: deserialize_vpn_DeleteRequest,
    responseSerialize: serialize_vpn_DeleteResponse,
    responseDeserialize: deserialize_vpn_DeleteResponse,
  },
  connect: {
    path: '/vpn.VpnService/Connect',
    requestStream: false,
    responseStream: false,
    requestType: vpn_pb.ConnectRequest,
    responseType: vpn_pb.ConnectResponse,
    requestSerialize: serialize_vpn_ConnectRequest,
    requestDeserialize: deserialize_vpn_ConnectRequest,
    responseSerialize: serialize_vpn_ConnectResponse,
    responseDeserialize: deserialize_vpn_ConnectResponse,
  },
  disconnect: {
    path: '/vpn.VpnService/Disconnect',
    requestStream: false,
    responseStream: false,
    requestType: vpn_pb.DisconnectRequest,
    responseType: vpn_pb.DisconnectResponse,
    requestSerialize: serialize_vpn_DisconnectRequest,
    requestDeserialize: deserialize_vpn_DisconnectRequest,
    responseSerialize: serialize_vpn_DisconnectResponse,
    responseDeserialize: deserialize_vpn_DisconnectResponse,
  },
  getSession: {
    path: '/vpn.VpnService/GetSession',
    requestStream: false,
    responseStream: false,
    requestType: vpn_pb.GetSessionRequest,
    responseType: vpn_pb.GetSessionResponse,
    requestSerialize: serialize_vpn_GetSessionRequest,
    requestDeserialize: deserialize_vpn_GetSessionRequest,
    responseSerialize: serialize_vpn_GetSessionResponse,
    responseDeserialize: deserialize_vpn_GetSessionResponse,
  },
  subscribeToSession: {
    path: '/vpn.VpnService/SubscribeToSession',
    requestStream: false,
    responseStream: true,
    requestType: vpn_pb.SubsribeToSessionRequest,
    responseType: vpn_pb.SubscribeToSessionResponse,
    requestSerialize: serialize_vpn_SubsribeToSessionRequest,
    requestDeserialize: deserialize_vpn_SubsribeToSessionRequest,
    responseSerialize: serialize_vpn_SubscribeToSessionResponse,
    responseDeserialize: deserialize_vpn_SubscribeToSessionResponse,
  },
};

exports.VpnServiceClient = grpc.makeGenericClientConstructor(VpnServiceService);
