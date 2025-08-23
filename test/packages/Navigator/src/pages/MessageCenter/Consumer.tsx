import React, { useContext } from 'react';
import Context from './Context';

export default ({ children, ...rest }) => {
  const { messageList, addMessage, removeMessage, clearMessage } = useContext(Context);

  return children
    ? React.Children.map(children, (child) =>
        React.cloneElement(
          child,
          { rest, messageList, addMessage, removeMessage, clearMessage },
          children
        )
      )
    : null;
};
