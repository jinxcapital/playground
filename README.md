# @jinxcapital/playground

## Setup

### Dependencies

```bash
# switch to correct node version
nvm install

# install dependencies
yarn
```


### VSCode

#### Plugins

- https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

#### Workspace settings

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  },
  "eslint.validate": [
    "javascript",
    "typescript",
  ],
}
```

## Linting

```bash
# lint
yarn lint

# automatically try to fix linting errors
yarn lint:fix
```

## Usage

### ens-to-address

```bash
# resolve maniac.eth to address
yarn w3:ens-to-address --ens=maniac.eth
```

### read-balance

```bash
# read balance of 0x2eB5e5713A874786af6Da95f6E4DEaCEdb5dC246
yarn w3:read-balance --address=0x2eB5e5713A874786af6Da95f6E4DEaCEdb5dC246
```

### read-contract

```bash
# cryptopunks
yarn w3:read-contract:cryptopunks

# azuki
yarn w3:read-contract:azuki

# edenhorde
yarn w3:read-contract:edenhorde
```
