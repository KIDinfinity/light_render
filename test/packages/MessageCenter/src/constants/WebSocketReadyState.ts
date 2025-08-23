/**
 * WebSocket连接状态
 */
export enum WebSocketReadyState {
  /**
   * 正在建立连接连接，还没有完成。The connection has not yet been established.
   */
  CONNECTING = 0,
  /**
   * 连接成功建立，可以进行通信。The WebSocket connection is established and communication is possible.
   */
  OPEN = 1,
  /**
   * 连接正在进行关闭握手，即将关闭。The connection is going through the closing handshake.
   */
  CLOSING = 2,
  /**
   * 连接已经关闭或者根本没有建立。The connection has been closed or could not be opened.
   */
  CLOSED = 3,
}
