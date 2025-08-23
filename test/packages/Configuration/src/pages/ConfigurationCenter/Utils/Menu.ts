import lodash from 'lodash';
import * as  FlattenJS from 'flattenjs';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { CurrentMenuProps } from './Typings';
import { FunCCCode, FunDataImageControl, FuncMenu } from './Constant';
// @ts-ignore

class MenuUtils {
  // 处理菜单, 排序，国际化， 扁平化
  handleMenu = (menu: CurrentMenuProps[] = [], permissionMenus: string[] = []) => {
    const menuTemp: CurrentMenuProps[] = [];
    const mapMenu = (arr: CurrentMenuProps[]) => {
      const tempArr = lodash
        .sortBy(arr, 'sequence')
        ?.filter((item) =>
          permissionMenus?.length
            ? lodash.some(permissionMenus, (el: string) => el === item?.functionCode)
            : true
        );
      return lodash.map(tempArr, (el) => {
        if (el.subFunctionList && el.subFunctionList.length) {
          // eslint-disable-next-line no-param-reassign
          el.subFunctionList = mapMenu(el.subFunctionList);
          lodash.set(el, 'subFunctionList', lodash.sortBy(el.subFunctionList, 'sequence'));
        }
        menuTemp.push(this.handlerFormatMessage(el));
        return el;
      });
    };
    const sortMenu = mapMenu(menu);

    const menuArrs = lodash.filter(sortMenu, (el) => !lodash.includes(FuncMenu, el.functionCode));
    const ccMenu = lodash.filter(menu, (el) => lodash.includes(FuncMenu, el.functionCode));
    const newMenu = ccMenu ? menuArrs.concat(ccMenu) : menuArrs;

    const { defaultMenu, openKeys } = this.getDefaultMenu(newMenu);

    return {
      menu: newMenu,
      menuTemp,
      defaultMenu,
      openKeys,
      dataImageMenu: this.getImageFunction(menuTemp),
    };
  };

  handlerFormatMessage = (el: CurrentMenuProps): CurrentMenuProps => {
    const label = `configurationcenter.menu.${el.functionCode}`;
    const formatFunction = formatMessageApi({ Label_BIZ_Claim: label });
    if (formatFunction !== label) {
      lodash.set(el, 'functionName', formatFunction);
    }
    return el;
  };

  getDefaultMenu = (menu: CurrentMenuProps[] = []) => {
    const openKeys: any[] = [];
    let defaultMenu = {};

    const mapMenu = (menuTemp: CurrentMenuProps[] = []) => {
      const menuFirst = menuTemp[0];
      if (menuFirst?.subFunctionList.length > 0) {
        mapMenu(menuFirst.subFunctionList);
        openKeys.push(menuFirst.id);
      } else {
        defaultMenu = menuFirst;
      }
    };

    mapMenu(menu);

    return {
      defaultMenu,
      openKeys,
    };
  };

  // 获取父菜单
  getParentMenu = (menu: CurrentMenuProps[] = [], currentMenu: CurrentMenuProps) => {
    let menuRoot;
    const mapMenu = (arr: CurrentMenuProps[], root: string[] = []) =>
      lodash.map(arr, (el: CurrentMenuProps) => {
        if (
          el.subFunctionList &&
          lodash.isArray(el.subFunctionList) &&
          el.subFunctionList.length > 0
        ) {
          mapMenu(el.subFunctionList, root.concat([el.id]));
        } else if (el.id === currentMenu.id) {
          menuRoot = root;
        }
        return el;
      });
    mapMenu(menu);
    return menuRoot;
  };

  // 获取Data Image菜单
  getImageFunction = (menuTemp: CurrentMenuProps[]) => {
    return lodash.find(menuTemp, (el: CurrentMenuProps) => el.functionCode === FunDataImageControl);
  };

  // 根据functionCode获取菜单
  getFunctionByCode = (menuTemp: CurrentMenuProps[], functionCode: string) => {
    return lodash.find(menuTemp, (el: CurrentMenuProps) => el.functionCode === functionCode);
  };

  /**
   * 是否配置中心菜单?
   *   是：实时更改，
   *   否：版本控制
   */
  isUnderVersionControl = (
    menu: CurrentMenuProps[] = [],
    currentMenu: CurrentMenuProps
  ): boolean => {
    const { functionCode } = currentMenu || {};
    const menuMap = FlattenJS.convert(menu);
    const ccKey: string = lodash.findKey(menuMap, (el) => el === FunCCCode) || '';
    const ccPrefix: string = ccKey.substr(0, ccKey.lastIndexOf('.') + 1);
    const curKey: string = lodash.findKey(menuMap, (el) => el === functionCode) || '';
    const curPrefix: string = curKey.substr(0, curKey.lastIndexOf('.'));
    return !lodash.startsWith(curPrefix, ccPrefix);
  };
}

export const {
  handleMenu,
  getParentMenu,
  isUnderVersionControl,
  getFunctionByCode,
  getImageFunction,
} = new MenuUtils();
