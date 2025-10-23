import React from 'react';

const Context = React.createContext<{
  visibleLinkTriggerConfig: any;
}>({
  visibleLinkTriggerConfig: {},
});

export default Context;
