import React, { useReducer } from 'react';
import lodash from 'lodash';
import Context from './Context';

interface IMessage {
  id: string;
  description: string;
}

interface IState {
  messageList: IMessage[];
}

enum ActionType {
  Add = 'add',
  Remove = 'remove',
  Clear = 'clear',
}

interface IAction {
  type: ActionType;
  payload: IMessage;
}

const initialState: IState = { messageList: [] };

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ActionType.Add:
      if (lodash.isPlainObject(action.payload) && action.payload.id) {
        return { messageList: state.messageList.concat(action.payload) };
      }

      return state;
    case ActionType.Remove:
      if (action.payload) {
        return {
          messageList: state.messageList.filter((message) => message.id !== action.payload),
        };
      }

      return state;
    case ActionType.Clear:
      return { messageList: [] };
    default:
      return state;
  }
};

export default ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider
      value={{
        messageList: state.messageList,
        addMessage: (message) =>
          dispatch({
            type: 'add',
            payload: message,
          }),
        removeMessage: (id) =>
          dispatch({
            type: 'remove',
            payload: id,
          }),
        clearMessage: () =>
          dispatch({
            type: 'clear',
          }),
      }}
    >
      {children}
    </Context.Provider>
  );
};
