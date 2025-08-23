import { formUtils } from 'basic/components/Form';

// 不能超过总份数
export const VLD_000291 = (fundList: object[]) =>
  fundList?.filter(
    (item: any) =>
      Number(formUtils.queryValue(item?.withdrawNumberOfUnits)) >
      Number(formUtils.queryValue(item?.numberOfUnits))
  );
