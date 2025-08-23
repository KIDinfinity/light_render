import { formUtils } from 'basic/components/Form';

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
