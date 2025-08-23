/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { ChecklistVarMapEnum } from 'process/GeneralPOS/common/Enum';
import { combinName } from 'process/GeneralPOS/common/utils';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, transactionId, remark, validating, doubleTransaction } = payload;
    const transfer = Object.entries(changedFields);
    const roleKey = ['owner', 'payor', 'insured'];
    if (!lodash.isArray(draftState.entities.transactionTypesMap[transactionId].checkList)) {
      draftState.entities.transactionTypesMap[transactionId].checkList = [];
    }

    // 如果remark配置里面的attatchField 对应的name一样，
    // 那么对changedFields并且对应的name一样的field 做一样的修改。
    if (!validating) {
      transfer.forEach(([key, value]) => {
        let checkCode = key;
        let valueKey = key;
        let isOtherChange = false;
        // 处理固定格式数据 idCardNo-expiryDate => codeIndex=idCardNo  code=expiryDate;
        const splitKey = key.split('-');
        if (splitKey.length > 1) {
          checkCode = splitKey[0];
          valueKey = splitKey[1];
          // otherData
          isOtherChange = true;
        }

        const codeIndex = draftState.entities.transactionTypesMap[
          transactionId
        ].checkList.findIndex((item) => item.code === checkCode);

        if (codeIndex < 0) {
          const data = {
            code: checkCode,
            value: !isOtherChange ? 'Y' : 'N',
            [checkCode]: value,
          };

          if (isOtherChange) {
            data[valueKey] = value;
          }

          draftState.entities.transactionTypesMap[transactionId].checkList.push(data);
        } else {
          const data = {
            ...draftState.entities.transactionTypesMap[transactionId].checkList[codeIndex],
          };

          if (!isOtherChange) {
            data.value = value;
            data[data.code] = value;
          } else {
            data[valueKey] = value;
            data[data[valueKey]] = value;
          }
          draftState.entities.transactionTypesMap[transactionId].checkList[codeIndex] = data;
        }
      });
      const policyInfo = draftState?.processData?.policyInfo;
      const { clientInfoList } = policyInfo || {};

      const [[changeKey, changeValue]] = transfer;
      const splitKey = changeKey.split('-');

      const linkField =
        remark
          ?.filter((item) => /^\$\{(.*)\}$/gi.test(item?.attatchField))
          ?.map((item) => ({
            ...item,
            ownerName: combinName(
              clientInfoList?.find(
                (clientItem) =>
                  clientItem.clientId ===
                  policyInfo?.[ChecklistVarMapEnum?.[/^\$\{(.*)\}$/.exec(item?.attatchField)?.[1]]]
              )
            ),
          }))
          ?.filter((item) => item?.ownerName) || [];

      let checkCode = changeKey;
      let valueKey = changeKey;
      let isOtherChange = false;

      if (splitKey.length > 1) {
        checkCode = splitKey[0];
        valueKey = splitKey[1];
        isOtherChange = true;
      }

      const changeOwnerName = linkField.find((item) => item?.checkCode === checkCode)?.ownerName;

      if (changeOwnerName) {
        linkField
          .filter((item) => item?.checkCode !== checkCode && item?.ownerName === changeOwnerName)
          .forEach((linkItem) => {
            const codeIndex = draftState.entities.transactionTypesMap[
              transactionId
            ].checkList.findIndex((item) => item.code === linkItem.checkCode);

            if (codeIndex < 0) {
              const data = {
                code: linkItem?.checkCode,
                value: !isOtherChange ? 'Y' : 'N',
                [checkCode]: changeValue,
              };

              if (isOtherChange) {
                data[valueKey] = changeValue;
              }

              draftState.entities.transactionTypesMap[transactionId].checkList.push(data);
            } else {
              const data = {
                ...draftState.entities.transactionTypesMap[transactionId].checkList[codeIndex],
              };

              if (!isOtherChange) {
                data.value = changeValue;
                data[data.code] = changeValue;
              } else {
                data[valueKey] = changeValue;
                data[data[valueKey]] = changeValue;
              }
              draftState.entities.transactionTypesMap[transactionId].checkList[codeIndex] = data;
            }
          });
      }
      if (/(insured)|(payor)|(owner)/i.test(checkCode)) {
        const allRole = roleKey.map((item) =>
          lodash.toLower(checkCode.replace(/(insured)|(payor)|(owner)/gi, item))
        );
        const rolesClientId = {
          insured: policyInfo?.mainInsuredClientId,
          payor: policyInfo?.mainPayorClientId,
          owner: policyInfo?.mainOwnerClientId,
        };
        const currentChangeRole = lodash.toLower(/insured|payor|owner/i.exec(checkCode)[0]);
        const currentChangeRoleValue = draftState.entities.transactionTypesMap[
          transactionId
        ].checkList.find(
          (checkItem) => lodash.toLower(checkItem.code) === lodash.toLower(checkCode)
        );
        lodash.forEach(
          draftState.entities.transactionTypesMap[transactionId].checkList,
          (checkItem, checkIndex) => {
            const changeRoleItem =
              rolesClientId[lodash.toLower(/insured|payor|owner/i.exec(checkItem?.code)?.[0])];

            if (
              allRole.includes(lodash.toLower(checkItem?.code)) &&
              rolesClientId?.[currentChangeRole] === changeRoleItem
            ) {
              draftState.entities.transactionTypesMap[transactionId].checkList[checkIndex] = {
                ...currentChangeRoleValue,
                code: checkItem.code,
              };
            }
          }
        );
      }

      if (doubleTransaction) {
        const transactionIds = lodash.keys(draftState.entities.transactionTypesMap);
        lodash.forEach(transactionIds, (transactionIdItem) => {
          if (transactionIdItem !== transactionId) {
            draftState.entities.transactionTypesMap[transactionIdItem].checkList = lodash.cloneDeep(
              draftState.entities.transactionTypesMap[transactionId].checkList
            );
          }
        });
      }
    }
  });
