/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
const savePolicyInfoClient = (state: any, { payload }: any) => {
  /**
   * 参数说明
   * value - 修改值
   * clientId - 列表匹配值(用于是否初始化对象)
   * roles - 当前修改item的角色列表
   * key - 修改的字段key
   */
  const { value, clientId, roles, key } = payload;

  const nextState = produce(state, (draftState: any) => {
    // for PH
    const emailFunction = () => {
      if (
        !!lodash.find(draftState.processData.policyInfo?.policyDespatchAddressList, { clientId })
      ) {
        draftState.processData.policyInfo.policyDespatchAddressList = lodash.map(
          draftState.processData?.policyInfo.policyDespatchAddressList,
          (client: any) => {
            return client.clientId === clientId
              ? {
                  ...client,
                  email: value,
                }
              : client;
          }
        );
      }
    };
    const newConfigs: any = {
      CUS001: {
        initClientId: 'mainInsuredClientId',
        list: [
          {
            type: 'name',
            field: 'firstName',
            path: 'clientInfoList',
          },
          {
            type: 'email',
            field: 'email',
            path: 'clientContactList',
            extraEmailFunction: emailFunction,
          },
          {
            type: 'dob',
            field: 'dob',
            path: 'clientInfoList',
          },
        ],
      },
      CUS002: {
        initClientId: 'mainOwnerClientId',
        list: [
          {
            type: 'name',
            field: 'ownerFullName',
            path: 'policyInfoList',
            mapKey: 'ownerClientId',
          },
        ],
      },
    };

    lodash.map(roles, (roleKey: any) => {
      const { initClientId, list = [] } = newConfigs?.[roleKey] || {};
      const { type, field, path, extraEmailFunction, mapKey } =
        lodash.find(list, (item: any) => key === item?.type) || {};
      if (!!type) {
        // 初始化数据
        if (
          !lodash.find(
            draftState.processData.policyInfo[path],
            (item: any) => item?.[mapKey || 'clientId'] === clientId
          )
        ) {
          if (!lodash.isArray(draftState.processData.policyInfo[path])) {
            draftState.processData.policyInfo[path] = [];
          }

          draftState.processData.policyInfo[path].push({
            clientId: clientId || draftState.processData.policyInfo?.[initClientId] || '',
            [field]: value,
          });
        } else {
          // 修改数据
          draftState.processData.policyInfo[path] = lodash.map(
            draftState.processData?.policyInfo[path],
            (item: any) => {
              return item?.[mapKey || 'clientId'] === clientId
                ? {
                    ...item,
                    [field]: value,
                  }
                : item;
            }
          );
        }
      }
      if (lodash.isFunction(extraEmailFunction)) {
        extraEmailFunction();
      }
    });
  });

  return { ...nextState };
};

export default savePolicyInfoClient;
