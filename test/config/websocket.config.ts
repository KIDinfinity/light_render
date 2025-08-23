let prefix = 'ws';

if (location.protocol.match(/https/)) {
  prefix = 'wss';
}

export default {
  reconnectTimes: 5, // 重连次数 ，默认3次;
  reconnectTime: 3000, // 重连延时 ，默认5000毫秒;
  heartCheckTime: 5000, // 心跳检测周期 ，默认10000毫秒;
  serverTimeoutTime: 5000, // 握手连接超时 ，默认15000毫秒;

  url: `${prefix}://${window.location.host}/api/mc/ws`, // deploy
  // url: `${prefix}://10.22.28.131:8081/api/mc/ws`,// CI
  // url: `${prefix}://10.22.28.133:8081/api/mc/ws`, // DIT
  // url: `${prefix}://10.22.42.2:8081/api/mc/ws`, // SIT
  // url: `${prefix}://10.22.42.2:8082/api/mc/ws`, // presit
  // url: `${prefix}:/10.22.40.43:9100/api/mc/ws`, // sit-jp
  // url: `${prefix}://10.22.60.2:8081/api/mc/ws` // hk-sit
};
