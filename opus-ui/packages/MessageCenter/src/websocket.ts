import lodash from 'lodash';
import websocketConfig from '@/../config/websocket.config';
import { WebSocketReadyState } from './constants';

interface SocketOptions {
  reconnectTimes: number;
  reconnectTime: number;
  heartCheckTime: number;
  serverTimeoutTime: number;
  url: string;
}

const initOptions = {
  reconnectTimes: 5,
  reconnectTime: 5000,
  heartCheckTime: 3000,
  serverTimeoutTime: 3000,
  url: '',
};

export default (opt: any) => {
  class WebSocketRec {
    constructor(options: SocketOptions = initOptions) {
      const optionsMerge = lodash.merge(initOptions, options);
      this.options = optionsMerge;

      this.reconnectTimes = optionsMerge.reconnectTimes;
      this.reconnectTime = optionsMerge.reconnectTime;
      this.heartCheckTime = optionsMerge.heartCheckTime;
      this.serverTimeoutTime = optionsMerge.serverTimeoutTime;

      this.lockReconnect = false;
      this.closeByHandle = false;
    }

    options: SocketOptions;

    Socket: any;

    reconnectTimes: number;

    reconnectTime: number;

    heartCheckTime: number;

    serverTimeoutTime: number;

    lockReconnect: boolean; // 重连锁

    reconnectTick?: number; // 重连计时器

    heartCheckTick?: number; // 心跳计时器

    serverTimeoutTick?: number; // 服务端超时连接计时器

    closeByHandle: boolean; // 是否手动关闭

    createWebSocket = () => {
      this.Socket = new WebSocket(this.options.url);
    };

    handleEvent = () => {
      this.Socket.onopen = (e: any) => {
        this.onopen(e);
        this.send(JSON.stringify(opt));
        this.heartCheck();
      };
      this.Socket.onmessage = (e: any) => {
        if (e.data !== 'pong') {
          this.onmessage(e);
        }
        this.heartCheck();
      };
      this.Socket.onclose = (e: any) => {
        // eslint-disable-next-line no-console
        console.log('websocket-onclose', e);
        this.onclose(e);
        if (!this.closeByHandle) {
          this.reconnect();
        }
      };
      this.Socket.onerror = (e: any) => {
        // eslint-disable-next-line no-console
        console.log('websocket-onerror', e);
        this.onerror(e);
        this.reconnect();
      };
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onmessage = (e: any) => {};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onopen = (e: any) => {};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onclose = (e: any) => {};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onerror = (e: any) => {};

    clearTicks = (ticks?: number | (number | undefined)[]) => {
      if (lodash.isArray(ticks)) {
        ticks.forEach((tick) => lodash.isNumber(tick) && clearTimeout(tick));
      }
      if (lodash.isNumber(ticks)) clearTimeout(ticks as number);
    };

    reconnect = () => {
      if (this.lockReconnect) {
        return;
      }
      this.clearTicks(this.reconnectTick);
      this.reconnectTick = setTimeout(() => {
        if (this.reconnectTimes > 0) {
          this.reconnectTimes -= 1;
          this.open();
        } else {
          this.lockReconnect = true; // 重连锁，设置为true则reconnectTimes次数超过则不再重新尝试建立连接，设置为false则无限次尝试建立连接
        }
      }, this.reconnectTime);
    };

    heartCheck = () => {
      this.clearTicks([this.heartCheckTick, this.serverTimeoutTick]);
      this.heartCheckTick = setTimeout(() => {
        if (this.Socket.readyState === WebSocketReadyState.OPEN) {
          this.send('ping');
        }

        this.serverTimeoutTick = setTimeout(() => {
          this.Socket.close();
        }, this.serverTimeoutTime);
      }, this.heartCheckTime);
    };

    open = () => {
      this.closeByHandle = false;
      this.createWebSocket();
      this.handleEvent();
    };

    send = (mesg: string | object) => {
      if (lodash.isEmpty(mesg)) return;
      let dataMesg = '';
      if (lodash.isString(mesg)) {
        dataMesg = mesg;
      } else if (lodash.isObjectLike(mesg)) {
        dataMesg = JSON.stringify(mesg);
      }
      this.Socket.send(dataMesg);
    };

    close = () => {
      this.clearTicks([this.reconnectTick, this.heartCheckTick, this.serverTimeoutTick]);
      this.closeByHandle = true;
      this.Socket.close();
    };
  }

  const webSocketRec = new WebSocketRec(websocketConfig);
  webSocketRec.open();

  return webSocketRec;
};
