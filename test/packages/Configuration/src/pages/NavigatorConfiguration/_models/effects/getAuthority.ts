import lodash from 'lodash';
import { FunctionCode } from 'configuration/pages/NavigatorConfiguration/Enum';

enum extraAuthority {
  Fun_venus_uc_user_general_information_update = 'Fun_venus_uc_user_general_information_update',
}
export default function* (_: any, { put, select }: any) {
  const functionData = yield select((state: any) => state.configurationController?.functionData);
  if (functionData?.functionCode) {
    const authMap = {
      add: `${functionData?.functionCode}_add`,
      update: `${functionData?.functionCode}_update`,
    };
    const extra =
      functionData?.functionCode === FunctionCode.Fun_venus_rbac_rbac_group
        ? [extraAuthority.Fun_venus_uc_user_general_information_update]
        : [];
    const resourceCodes = [authMap.add, authMap.update, ...extra];
    const commonAuthorityList = yield select(
      (state: any) => state.authController?.commonAuthorityList
    );
    const authority = resourceCodes.reduce((result, item) => {
      const findItem = commonAuthorityList.find(
        (authorityItem: any) => authorityItem.authorityCode === item
      );
      if (findItem) {
        lodash.set(result, item, findItem.result);
      }
      return result;
    }, {});

    if (authority) {
      // 先保证有add, update配置
      const newOperationList = lodash.filter(
        lodash.compact([...functionData?.operationList, 'add', 'update']),
        (item: string) => {
          return lodash.has(authority, authMap[item]) ? lodash.get(authority, authMap[item]) : true;
        }
      );
      if (authority[extraAuthority.Fun_venus_uc_user_general_information_update]) {
        newOperationList.push(extraAuthority.Fun_venus_uc_user_general_information_update);
      }
      yield put({
        type: 'saveOperationList',
        payload: {
          operationList: newOperationList,
        },
      });
    }
  }
}
