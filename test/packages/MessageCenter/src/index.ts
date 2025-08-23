import MessageCenterContext from './Context';

const { Provider } = MessageCenterContext;

export { MessageCenterContext as MCContext, Provider as MessageCenterProvider };
export { LifeCircle, PurposeCode, WebSocketReadyState, ChatStatus, HandlerUUID } from './constants';

export { default } from './Provider';

export interface IData {
  lifeCircle: LifeCircle;
  data: any;
}
