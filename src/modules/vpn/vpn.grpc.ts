import * as grpc from '@grpc/grpc-js'

import { VpnServiceClient } from '../../generated/grpc/vpn/vpn_grpc_pb'
import {
  CreateRequest,
  CreateResponse,
  DeleteRequest,
  DeleteResponse,
} from '../../generated/grpc/vpn/vpn_pb'

class VpnGrpc {
  private client: VpnServiceClient

  constructor(
    address: string,
    client: VpnServiceClient = new VpnServiceClient(
      address,
      grpc.credentials.createInsecure()
    )
  ) {
    this.client = client
  }

  createClient = (userId: string): Promise<CreateResponse> => {
    const request = new CreateRequest()
    request.setUserId(userId)

    return new Promise((resolve, reject) => {
      this.client.create(request, (err, response) => {
        if (err) {
          reject(err)
        }

        resolve(response)
      })
    })
  }

  deleteClient = (userId: string): Promise<DeleteResponse> => {
    const request = new DeleteRequest()
    request.setUserId(userId)

    return new Promise((resolve, reject) => {
      this.client.delete(request, (err, response) => {
        if (err) {
          reject(err)
        }

        resolve(response)
      })
    })
  }
}

export { VpnGrpc }
