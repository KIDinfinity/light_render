import { LS, LSKey } from '@/utils/cache';
import updateMenuRoot from './updateMenuRoot';
import saveMenuOpenKeys from './saveMenuOpenKeys';
import saveCurrentMenu from './saveCurrentMenu';

export default (state: any, action: any) => {
  const { menu, menuTemp, openKeys, currentMenu } = action.payload;
  LS.setItem(LSKey.CONFIG_MENUDATA, { openKeys, currentMenu });
  let newState = updateMenuRoot(state, {
    type: 'updateMenuRoot',
    payload: {
      menu,
      currentMenu,
    },
  });
  if (openKeys) {
    newState = saveMenuOpenKeys(newState, {
      type: 'saveMenuOpenKeys',
      payload: {
        openKeys,
      },
    });
  }

  newState = saveCurrentMenu(newState, {
    type: 'saveCurrentMenu',
    payload: {
      currentMenu,
    },
  });
  return {
    ...newState,
    menu,
    menuTemp,
  };
};
