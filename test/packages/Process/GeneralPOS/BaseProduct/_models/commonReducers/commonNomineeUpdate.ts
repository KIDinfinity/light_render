import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import { v4 as uuidv4 } from 'uuid';

const updateTypeFn = {
  [OperationTypeEnum.ADD]: (state, cf, otherParams) => {
    const { transactionPath, otherData, changeType, clientIndex } = otherParams;

    let newData = lodash.get(state, `${transactionPath}.clientInfoList`, []);
    if (changeType) {
      newData = lodash.get(
        state,
        `${transactionPath}.clientInfoList[${clientIndex}].${changeType}`,
        []
      );
    }

    if (!lodash.isArray(newData)) {
      newData = [];
    }

    if (changeType) {
      newData.push({
        ...cf,
        ...otherData,
      });
      lodash.set(state, `${transactionPath}.clientInfoList[${clientIndex}].${changeType}`, newData);
    } else {
      newData.push({
        ...cf,
        ...otherData,
        id: uuidv4(),
        roleList: [
          {
            customerRole: 'CUS003',
            ...otherData,
          },
        ],
      });
      lodash.set(state, `${transactionPath}.clientInfoList`, newData);
    }
    return state;
  },

  [OperationTypeEnum.UPDATE]: (state, cf, otherParams) => {
    const {
      transactionPath,
      validating,
      changeTypeIndex,
      clientIndex,
      otherData,
      section,
    } = otherParams;
    const newData = lodash.get(state, `${transactionPath}.clientInfoList[${clientIndex}]`, {});
    const dedupCheckKeyList = state.dedupCheckKey;
    const cfKeys = lodash.keys(cf);

    if (
      !validating &&
      state?.isDecision &&
      lodash.findIndex(
        dedupCheckKeyList,
        (keyItem) => keyItem.sectionId === section && lodash.hasIn(cf, keyItem.fieldId)
      ) > -1 &&
      formUtils.queryValue(cf[cfKeys[0]]) !== formUtils.queryValue(newData[cfKeys[0]])
    ) {
      lodash.set(
        state,
        `${transactionPath}.needDuplicateCheckList`,
        lodash.uniq([
          ...(lodash.get(state, `${transactionPath}.needDuplicateCheckList`) || []),
          newData?.clientSeq,
        ])
      );
    }

    if (
      !validating &&
      lodash.hasIn(cf, 'relationship') &&
      formUtils.queryValue(cf.relationship !== '019')
    ) {
      cf.otherRelationship = null;
    }
    lodash.set(state, `${transactionPath}.clientInfoList[${clientIndex}]`, {
      ...newData,
      ...cf,
      ...otherData,
    });
    return state;
  },

  [OperationTypeEnum.LISTINFOUPDATE]: (state, cf, otherParams) => {
    const {
      transactionPath,
      validating,
      changeTypeIndex,
      clientIndex,
      otherData,
      changeType,
    } = otherParams;
    const newData = lodash.get(
      state,
      `${transactionPath}.clientInfoList[${clientIndex}].${changeType}[${changeTypeIndex}]`,
      {}
    );
    if (lodash.has(cf, 'contactDisplayName') && !validating) {
      cf.contactDisplayName.value = formatMessageApi({
        Dropdown_CFG_ContactCountryCode: cf.contactDisplayName.value,
      });
    }
    lodash.set(
      state,
      `${transactionPath}.clientInfoList[${clientIndex}].${changeType}[${changeTypeIndex}]`,
      {
        ...newData,
        ...cf,
        ...otherData,
      }
    );

    return state;
  },
  [OperationTypeEnum.DELETE]: (state, cf, otherParams) => {
    const { transactionPath, changeTypeIndex, clientIndex, changeType } = otherParams;
    let newData = lodash.get(
      state,
      `${transactionPath}.clientInfoList[${clientIndex}].${changeType}`,
      []
    );
    if (lodash.isEmpty(changeType)) {
      newData = lodash.get(state, `${transactionPath}.clientInfoList`, []);
      const clientSeq = newData[clientIndex]?.clientSeq;
      const identificationClientResultList = lodash.get(
        state,
        `${transactionPath}.identificationClientResultList`,
        []
      );
      const identificationList = lodash.get(state, `${transactionPath}.identificationList`, []);
      const identificationIndex = identificationList?.findIndex(
        (item) => item.clientSeq === clientSeq
      );
      const resultIndex = identificationClientResultList?.findIndex(
        (item) => item.clientSeq === clientSeq
      );

      identificationList?.splice(identificationIndex, 1);
      identificationClientResultList?.splice(resultIndex, 1);
      newData?.splice(clientIndex, 1);
    } else {
      newData?.splice(changeTypeIndex, 1);
    }

    return state;
  },
};

export default updateTypeFn;
