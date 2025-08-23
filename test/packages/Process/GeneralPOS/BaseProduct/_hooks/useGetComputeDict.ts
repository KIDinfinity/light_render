import { useMemo } from 'react';
import lodash from 'lodash';

export default function useGetComputeDict({ loadingRuleIsEmpty, min, max, dicts }) {
  return useMemo(() => {
    return (!lodash.isEmpty(loadingRuleIsEmpty) &&
      lodash.chain(max).toString().isEmpty().value()) ||
      lodash.isEmpty(loadingRuleIsEmpty)
      ? lodash
          .chain(dicts)
          .filter((item: any) =>
            lodash.endsWith(item?.dictName, '%')
              ? lodash.toNumber(item?.dictName.substring(0, item?.dictName.length - 1)) >= 0 &&
                lodash.toNumber(item?.dictName.substring(0, item?.dictName.length - 1)) <= 1000
              : lodash.toNumber(item?.dictName) >= 0 && lodash.toNumber(item?.dictName) <= 1000
          )
          .orderBy((item) => lodash.toNumber(item?.dictCode))
          .value()
      : lodash
          .chain(dicts)
          .filter((item: any) => {
            const dictItem = item?.dictCode.match(/^((2[5-9])|([3-9]\d)|([1-9]\d{2,9}))(\.0)?$/)
              ? Number(item?.dictCode) / 100
              : Number(item?.dictCode);
            const maxNumber = max.toString().match(/^((2[5-9])|([3-9]\d)|([1-9]\d{2,9}))(\.0)?$/)
              ? Number(max) / 100
              : Number(max);
            const minNumber = min.toString().match(/^((2[5-9])|([3-9]\d)|([1-9]\d{2,9}))(\.0)?$/)
              ? Number(min) / 100
              : Number(min);

            return dictItem >= minNumber && dictItem <= maxNumber;
          })
          .orderBy((item) => lodash.toNumber(item?.dictCode))
          .value();
  }, [loadingRuleIsEmpty, min, max, dicts]);
}
