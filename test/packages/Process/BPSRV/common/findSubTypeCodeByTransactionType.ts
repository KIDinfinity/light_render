import lodash from 'lodash';

function findSubTypeCodeByTransactionType(dataMap, typeCode, reg, defaultReturn) {
  return (
    lodash
      .find(dataMap, (item: any) => item.transactionTypeCode === typeCode)
      ?.srvTransactionSubTypeList?.find((item: any) =>
        reg.test(item.srvSubTypeName.replace(/\s/g, ''))
      )?.srvSubType || defaultReturn
  );
}

function findSubTypeCodeByTransactionTypes(triggers: any[]) {
  return triggers
    .filter((item) => item)
    .map((item: any[]) => findSubTypeCodeByTransactionType(...item))
    .join(',');
}

export default findSubTypeCodeByTransactionType;

export { findSubTypeCodeByTransactionType, findSubTypeCodeByTransactionTypes };
