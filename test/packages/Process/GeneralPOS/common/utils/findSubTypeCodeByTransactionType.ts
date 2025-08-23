
const srvSubTypeMaping = {
  SRV003: /Contact/gi,
  SRV006: /Withdrawal/gi,
};
function findSubTypeCodeByTransactionType(dataMap, typeCode, reg, defaultReturn) {
  const obj = dataMap?.[typeCode]?.[0] || {};

  return (
    obj?.srvTransactionSubTypeList?.find((item: any) =>
      (reg || srvSubTypeMaping?.[typeCode])?.test(item.srvSubTypeName.replace(/\s/g, ''))
    )?.srvSubType ||
    defaultReturn ||
    obj?.srvTransactionSubTypeList?.[0]?.srvSubType
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
