import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageLoadingRule from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageLoadingRule';

export default ({ coverageId, dicts, rangeMax, rangeMin }: any) => {
  const loadingRule = useGetCoverageLoadingRule({ coverageId });
  return useMemo(() => {
    return (!lodash.isEmpty(loadingRule) && lodash.chain(rangeMax).toString().isEmpty().value()) ||
      lodash.isEmpty(loadingRule)
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
            const max = rangeMax.toString().match(/^((2[5-9])|([3-9]\d)|([1-9]\d{2,9}))(\.0)?$/)
              ? Number(rangeMax) / 100
              : Number(rangeMax);
            const min = rangeMin.toString().match(/^((2[5-9])|([3-9]\d)|([1-9]\d{2,9}))(\.0)?$/)
              ? Number(rangeMin) / 100
              : Number(rangeMin);

            return dictItem >= min && dictItem <= max;
          })
          .orderBy((item) => lodash.toNumber(item?.dictCode))
          .value();
  }, [dicts, rangeMax, rangeMin, loadingRule]);
};
