interface Socket {
  url: string, path: string
}

interface IConfig {
  app: {name: string}
  server: {local: string, prod: string}
  socket: {local: Socket, prod: Socket}
  api(): string
  socketApi(): Socket
}

export const config: IConfig = {
  app: {
    name: 'Some S'
  },
  server: {
    local: 'http://localhost:4848/backend/api/v1',
    prod: ''
  },
  socket: {
    local: {url: 'http://localhost:4848', path: '/sockets'},
    prod: {url: '', path: '/sockets'}
  },
  api() {
    // if (window.location.hostname === 'some prod url in future') {
    //   return this.server.prod;
    // }

    return this.server.local;
  },
  socketApi() {
    // if (window.location.hostname === 'some prod url in future') {
    //   return this.socket.prod;
    // }

    return this.socket.local;
  },
};
