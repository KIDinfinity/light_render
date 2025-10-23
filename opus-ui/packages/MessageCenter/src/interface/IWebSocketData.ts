import type { ChatStatus } from '../constants';

export default interface IWebSocketData {
  state: ChatStatus;
}
