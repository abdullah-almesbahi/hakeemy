<p align="center">
  <img src="https://www.hakeemy.com/images/logo-arabic.png" height="30" /><br/>
  <span><b>Hakeemy</b></span><br/>
  <span><a href="https://play.google.com/store/apps/details?id=com.hakeemy" target="_blank">Android</a>, <a href="https://itunes.apple.com/sa/app/hakeemy?mt=8" target="_blank">iOS</a>, <a href="https://www.hakeemy.com" target="_blank">Web</a> & <a href="https://github.com/abdullah-almesbahi/hakeemy/releases" target="_self">Desktop</a> with <b>95%+ code sharing</b> between them<br/><i>thanks to React Native + React Native Web</i></span><br/>
  <p align="center">
    <a href="https://itunes.apple.com/sa/app/hakeemy" target="_blank"><img alt="Download on the App Store" height="50" src="https://user-images.githubusercontent.com/619186/52173137-d416fd00-2764-11e9-98c1-77607061f188.png" /></a>
    <a href="https://play.google.com/store/apps/details?id=com.hakeemy" target="_blank"><img alt="Get it on Google Play" height="50" src="https://user-images.githubusercontent.com/619186/52173136-d416fd00-2764-11e9-9599-7c098c14bb37.png" /></a>
  </p>
</p>

<br/>

## Tech Stack

- [TypeScript](https://github.com/Microsoft/TypeScript)
- [Create React App](https://github.com/facebook/create-react-app)
- [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) (Monorepo)
- [React](https://github.com/facebook/react) with [Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Native](https://github.com/facebook/react-native)
- [React Native Web](https://github.com/necolas/react-native-web)
- [Redux](https://github.com/reduxjs/react-redux)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [Redux Saga](https://github.com/redux-saga/redux-saga/)
- [Reselect](https://github.com/reduxjs/reselect)
- [GraphQL](https://github.com/facebook/graphql)
- [zeit.co/now](https://zeit.co/now)
- [prisma.io](https://www.prisma.io/)

<br/>

### Running it locally

#### Requirements

- [Yarn](https://yarnpkg.com/)
- [nodejs.org](http://nodejs.org/) 8 is required because of AWS. No, they don't support 10 yet.
- [docker-compose](https://www.docker.com/products/docker-engine)
- [yarnpkg.com](https://yarnpkg.com/en/)
- [prisma-cli](https://www.prisma.io/docs/prisma-cli-and-configuration/using-the-prisma-cli-alx4/)

> **Note:** On Windows, you might need to install Bash commands (e.g. via [git-scm](https://git-scm.com/downloads) or via [linux bash shell](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/))

That's it. It will start three workers: `TypeScript compilation watcher`, `Web server` (create-react-app) and the `Mobile server` (react-native packager). The browser will open automatically.

> Alternatives to `yarn dev`: `yarn dev:web`, `yarn dev:desktop`, `yarn dev:mobile`

To open the mobile projects, use:

- `yarn xcode`
- `yarn studio`

## Setup project

- `git clone https://github.com/abdullah-almesbahi/hakeemy`
- `cd hakeemy`
- `yarn`
- `yarn env dev`

## Tasks

- `yarn dev` start development
- `yarn gen` after `api/schema.graphql` change
- `yarn env dev` copy `.env.dev` to `.env`
- `yarn env prod` copy `.env.prod` to `.env`
- `yarn build` local build
- `yarn start` local start
- `yarn test` before commit
- `now` deploy to <https://name-xxxxxxxxx.now.sh>
- `now && now alias` deploy to aliased custom domain
