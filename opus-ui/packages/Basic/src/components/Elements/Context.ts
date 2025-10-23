import React from 'react';

const Context = React.createContext<{
  state: any;
  roleDisplayConfigCode: string;
  caseCategory: string;
  activityCode: string;
}>({
  state: {},
  roleDisplayConfigCode: '',
  caseCategory: '',
  activityCode: '',
});

export default Context;
