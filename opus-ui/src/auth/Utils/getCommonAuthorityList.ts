import lodash from 'lodash';
/**
 * demo
 */
// import { SiderEnum, TypeEnum } from '@/enum/GolbalAuthority';
// import SwitchTab from './SwitchTab';
// const authList = getCommonAuthorityList(commonAuthorityList, {
//   data: [
//     SiderEnum.InformationManagement,
//     SiderEnum.EnvoyManagement,
//     SiderEnum.User360Management,
//   ],
//   type: TypeEnum.Menu,
// });

/**
 *
 * @param commonList - 原始数据
 * @param auhList - 需要鉴权的数据
 * return 返回权限列表
 */

export default (commonList: any[], { data, type }: any) => {
  if (lodash.isString(data)) {
    const newItem = lodash.find(commonList, (commonItem: any) => {
      return commonItem.authorityCode === data && commonItem.type === type;
    });
    return (
      newItem || {
        authorityCode: data,
        result: false,
        type,
      }
    );
  }
  if (lodash.isArray(data)) {
    const newList = data.map((item: any) => {
      const newItem = lodash.find(commonList, (commonItem: any) => {
        return commonItem.authorityCode === item && commonItem.type === type;
      });
      return (
        newItem || {
          authorityCode: item,
          result: false,
          type,
        }
      );
    });
    return newList;
  }
};
