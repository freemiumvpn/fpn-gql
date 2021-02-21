import { UserInputError } from 'apollo-server-express'
import express from 'express'

import { getEnv } from '../env'
import { SignatureVerification } from '../middlewares/signedUrl/Signature'
import { signedUrl } from '../middlewares/signedUrl/signedUrl'
import { VpnGrpc } from '../modules/vpn/vpn.grpc'

const env = getEnv()

const vpnRouter = express.Router()
const ATTACHMENT_FILE_NAME = 'freemiumpn.ovpn'

vpnRouter.get('/download', async (req, res) => {
  try {
    const url = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.url}`
    const verificationStatus = signedUrl.verify(url)
    if (verificationStatus !== SignatureVerification.OK) {
      throw new Error(String(verificationStatus))
    }

    const { userId } = req.query
    if (!userId) {
      throw new UserInputError('UserId not found')
    }

    const vpnGrpc = new VpnGrpc(env.grpc.vpn)

    const response = await vpnGrpc.createClient(userId as string)
    const credentials = response.getCredentials()

    res.set({
      'Content-Type': 'text/plain',
      'Content-Disposition': `attachment; filename=${ATTACHMENT_FILE_NAME}`,
    })

    res.send(credentials)
  } catch (error) {
    res.status(500).send(error).end()
  }
  res.status(500).end()
})

export { vpnRouter }
