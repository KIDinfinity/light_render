import { useCallback } from 'react';
import navigator from 'navigator/api';
import { MenuEnum } from '../Menus/enum';

export default () => {
  return useCallback(
    (code) => {
      switch (code) {
        case MenuEnum.RS_Menu_SideBar_ExceptionalCase:
          navigator.SiderWorkSpaceController.send('selectMonitorContent');
        case MenuEnum.RS_Menu_SideBar_ClearSnapshot:
          navigator.SiderWorkSpaceController.send('selectClearSnapshotContent');
        case MenuEnum.RS_Menu_SideBar_AuthorizedUser:
          navigator.SiderWorkSpaceController.send('selectAuthorizedUser');
      }
    },
    [navigator]
  );
};
