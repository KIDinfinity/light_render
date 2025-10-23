const keyMap = [
  ['payableAmount', 'originPayableAmount'],
  ['payableDays', 'originPayableDays'],
  ['claimDecision', 'originClaimDecision'],
  ['remark', 'originRemark'],
];

const getOriginData = payable => {
  return keyMap.reduce((returnObj, [overrideField, originField]) => {
    // 之前的case的这些字段有可能原本就是空
    // if(payable[originField] !== null && payable[originField] !== void 0) {
      returnObj[overrideField] = payable[originField]
    // }
    return returnObj;
  }, {...payable})
}

export { keyMap, getOriginData }
export default getOriginData;
