import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import changeBasicInfoFields from './changeBasicInfoFields';
import saveDiffCilentInfoList from './saveDiffCilentInfoList';
import linkAddressChangeToPolicyAddress from './linkAddressChangeToPolicyAddress';

export default (state: any, action: any) => {
  const { changedFields, id } = action?.payload;
  const defaultCurrentAddressType = state?.defaultCurrentAddressType;
  const fieldsUseRuleMap = new Map();
  const currentAddressField = new Map();
  // 筛选出来 current address 关联的field
  lodash
    .chain(changedFields)
    .entries()
    .forEach(([field, value]) => {
      const reg = /(^currentAddress[1-6]?$)|(country)|(currentZipCode)/;
      if (reg.test(field)) {
        currentAddressField.set(field, value);
      } else {
        if (field !== 'communicationLane') {
          fieldsUseRuleMap.set(field, value);
        }
      }
    })
    .value();
  const nextState = changeBasicInfoFields(state, {
    payload: {
      changedFields: Object.fromEntries(fieldsUseRuleMap),
      id,
    },
  });
  let finalState = produce(nextState, (draftState) => {
    let addressList =
      lodash
        .chain(draftState)
        .get('businessData.policyList[0].clientInfoList')
        .find((item: any) => item?.id === id, {})
        .get('addressList', [])
        .value() || [];
    const clientIndex = lodash
      .chain(draftState)
      .get('businessData.policyList[0].clientInfoList')
      .findIndex((item: any) => item?.id === id)
      .value();

    if (
      !lodash.some(
        addressList,
        (item) => formUtils.queryValue(item?.addrType) === defaultCurrentAddressType
      )
    ) {
      addressList = lodash.merge(addressList, [
        ...addressList,
        {
          addrType: defaultCurrentAddressType,
        },
      ]);
    }
    addressList = lodash.map(addressList, (item: any) => {
      const draftData = {
        ...item,
      };
      if (draftData?.addrType === defaultCurrentAddressType) {
        const newData = draftData;
        lodash
          .chain(Object.fromEntries(currentAddressField))
          .entries()
          .forEach(([key, value]) => {
            const targetField = (() => {
              // currentAddres7 -> address7
              return lodash.lowerFirst(key.replace(/current/i, ''));
            })();
            newData[targetField] = value;
          })
          .value();
        return newData;
      } else {
        return draftData;
      }
    });
    lodash.set(
      draftState,
      `businessData.policyList[0].clientInfoList[${clientIndex}].addressList`,
      addressList
    );
  });
  finalState = linkAddressChangeToPolicyAddress(finalState, {
    payload: {
      id,
      changedFields,
    },
  });
  finalState = saveDiffCilentInfoList(finalState, {
    payload: {
      preState: nextState,
      id,
    },
  });
  return { ...finalState };
};
