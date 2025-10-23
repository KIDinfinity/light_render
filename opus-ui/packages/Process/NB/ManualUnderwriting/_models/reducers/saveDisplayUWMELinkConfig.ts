import lodash from 'lodash';

export default (state: any, action: any) => {
  const displayUWMELink = lodash.get(action, 'payload.displayUWMELink', false);

  return {
    ...state,
    displayUWMELink,
  };
};
