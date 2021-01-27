import { BehaviorSubject } from 'rxjs'

import { VpnSession, VpnSessionStatus } from '../../generated/graphql'

const vpnSession$ = new BehaviorSubject<VpnSession>({
  __typename: 'VpnSession',
  id: '',
  status: VpnSessionStatus.None,
})

export { vpnSession$ }
