# fpn-gql

The purpose of this service is to serve as an API gateway, it will
generate a client specific API following the Backend-for-frontends pattern.


## Folder Structure

- Logic is co-located in modules
- Cross cutting concerns belong to the context

```
├── context
│   ├── metrics
│   ├── logging
│   ├── errorHandler
│   └── auth
├── modules
│   └── ping
│       ├── ping.gql
│       ├── ping.module.ts
│       ├── ping.resolvers.test.ts
│       └── ping.resolvers.ts
└── utils

```

## Context

- Auth, powered by [Auth0](https://auth0.com/blog/using-m2m-authorization/)
- Logger, powered by [Pino](https://www.nearform.com/blog/the-cost-of-logging/)
