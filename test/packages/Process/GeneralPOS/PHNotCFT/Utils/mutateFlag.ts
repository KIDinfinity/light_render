
export default data => {
  const flag = data.transactionTypes[0].usTaxInformation?.taxDeclarationsFlag;
  if(flag !== void 0) {
    data.transactionTypes[0].usTaxInformation.taxDeclarationsFlag = {
      0: 'N',
      1: 'Y',
      'N': 'N',
      'Y': 'Y',
    }[flag]
  }
  return data
}
