import { formUtils } from 'basic/components/Form';

// 总数不为0
export const VLD_000006 = (total: number,totalAmount: number,totalPercentage: number) =>{
  return (Number(total) === 0&&!formUtils.queryValue(totalAmount)&&!formUtils.queryValue(totalPercentage)) ? [{ field: 'errorTotalWithdrawAmount' }] : []
}
  ;

// 不能超过总份数
export const VLD_000291 = (fundList: object[]) =>
  fundList?.filter(
    (item: any) =>
      Number(formUtils.queryValue(item?.withdrawNumberOfUnits)) > Number(formUtils.queryValue(item?.numberOfUnits))
  );

// 不能超过总的金额
export const VLD_000292 = (fundList: object[]) =>
  fundList.filter((item: any) => {
    const withdrawAmount = Number(formUtils.queryValue(item.withdrawAmount));
    return (
      withdrawAmount &&
      withdrawAmount !== 0 &&
      withdrawAmount > Number(formUtils.queryValue(item?.totalFundValue))
    );
  });

// checked，不能都不填
export const VLD_000289 = (usTaxDeclarations: any) => {
  const usTax = formUtils.cleanValidateData(usTaxDeclarations);

  return usTax?.checked && !usTax?.cardNo && !usTax?.identificationNumber ? [{}] : [];
};
