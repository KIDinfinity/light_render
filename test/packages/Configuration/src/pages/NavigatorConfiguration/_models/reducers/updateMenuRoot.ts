import { getParentMenu } from 'configuration/pages/ConfigurationCenter/Utils/Menu';

export default (state: any, action: any) => {
  const { menu, currentMenu } = action.payload;
  const menuRoot = getParentMenu(menu, currentMenu);

  return {
    ...state,
    menuRoot,
  };
};
