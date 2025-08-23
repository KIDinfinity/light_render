import { useCallback, useEffect, useMemo, useContext } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { Region, tenant } from '@/components/Tenant';
import { CoverageType, SubProductType, UnderWritingApproach } from '../../_enum';
import Context from 'basic/components/Elements/Context';
import CaseCategory from 'enum/CaseCategory';
//caseContainer下的的useJudgeIsGBSN用的Context不同，取到的caseCategory不同，为了不影响那里的功能这里独立建一个
export const useJudgeIsGBSN = () => {
  const { caseCategory } = useContext(Context);
  return [CaseCategory.BP_NB_CTG005, CaseCategory.BP_NB_CTG003].includes(caseCategory);
};
export const useModelTakeOverFlag = () => {
  const takeOverFlag = useSelector(
    ({ [NAMESPACE]: model }: any) => model?.modalData?.takeOver?.takeOverFlag,
    shallowEqual
  );
  return useMemo(() => {
    return takeOverFlag;
  }, [takeOverFlag]);
};
export const useModelTakeOverList = () => {
  const takeOverList = useSelector(
    ({ [NAMESPACE]: model }: any) => model?.modalData?.takeOver?.takeOverList,
    shallowEqual
  );
  return useMemo(() => {
    return takeOverList;
  }, [takeOverList]);
};
export const useTakeOverFlay = () => {
  const takeOverFlag = useSelector(
    ({ [NAMESPACE]: model }: any) => model?.processData?.takeOver?.takeOverFlag,
    shallowEqual
  );
  return useMemo(() => {
    return takeOverFlag;
  }, [takeOverFlag]);
};
export const useShowModelTakeOverTable = () => {
  const takeOverFlag =
    useSelector(
      ({ [NAMESPACE]: model }: any) => model?.modalData?.takeOver?.takeOverFlag,
      shallowEqual
    ) || '';
  return useMemo(() => {
    return formUtils.queryValue(takeOverFlag) === 'Y';
  }, [takeOverFlag]);
};
export const useShowTakeOverTable = () => {
  const takeOverFlag =
    useSelector(
      ({ [NAMESPACE]: model }: any) => model?.processData?.takeOver?.takeOverFlag,
      shallowEqual
    ) || '';
  return useMemo(() => {
    return formUtils.queryValue(takeOverFlag) === 'Y';
  }, [takeOverFlag]);
};
export const useShowTakeOver = () => {
  const coverageList = useSelector(
    ({ [NAMESPACE]: model }: any) => model?.processData?.coverageList,
    shallowEqual
  );
  const regionCode = tenant.region();
  const isGBSN = useJudgeIsGBSN();
  return useMemo(() => {
    return (
      regionCode === Region.MY &&
      isGBSN &&
      lodash
        .chain(coverageList)
        .some((coverageItem: any) => {
          return (
            formUtils.queryValue(coverageItem?.isMain === CoverageType.BasicProduct) &&
            formUtils.queryValue(coverageItem?.underwritingApproach) !== UnderWritingApproach.SIO
          );
        })
        .value() &&
      lodash
        .chain(coverageList)
        .some((coverageItem: any) => {
          return (
            formUtils.queryValue(coverageItem?.isMain === CoverageType.Rider) &&
            formUtils.queryValue(coverageItem?.subProductType) === SubProductType.MedicalRider
          );
        })
        .value()
    );
  }, [coverageList, isGBSN, regionCode]);
};

export const useTakeOverList = () => {
  const takeOverList = useSelector(
    ({ [NAMESPACE]: model }: any) => model?.processData?.takeOver?.takeOverList,
    shallowEqual
  );
  const productConfigDict = useSelector(
    ({ [NAMESPACE]: model }: any) => model?.modalData?.takeOver?.productConfig,
    shallowEqual
  );
  return useMemo(() => {
    return lodash.map(takeOverList, (item: any) => {
      const { policyNo, productCode } = lodash.pick(item, ['policyNo', 'productCode']);
      const productConfig = productConfigDict?.[policyNo];
      const productInfo = lodash.find(
        productConfig,
        (config) => config?.productCode === productCode
      );
      if (productInfo) {
        const { coverageNo, lifeNo, riderNo } = productInfo;
        return {
          ...item,
          coverageNo,
          lifeNo,
          riderNo,
        };
      }
      return item;
    });
  }, [productConfigDict, takeOverList]);
};
export const useProductDicts = (policyNo: string) => {
  const productConfig = useSelector(
    ({ [NAMESPACE]: model }: any) => model?.modalData?.takeOver?.productConfig?.[policyNo],
    shallowEqual
  );
  return useMemo(() => {
    return lodash.map(productConfig, (item: any) => ({
      dictCode: item?.productCode,
      dictName: item?.productName,
    }));
  }, [productConfig]);
};
export const useInitProductConfig = () => {
  const dispatch = useDispatch();
  const takeOverList = useSelector(
    ({ [NAMESPACE]: model }: any) => model?.processData?.takeOver?.takeOverList,
    shallowEqual
  );
  useEffect(() => {
    if (!takeOverList) return;
    const policyNoList = takeOverList
      .map((i: any) => i.policyNo)
      .filter((i: string) => !!i) as string[];
    lodash.uniq(policyNoList).forEach((policyNo) => {
      dispatch({
        type: `${NAMESPACE}/fetchProductConfig`,
        payload: {
          policyNo,
        },
      });
    });
  }, [dispatch, takeOverList]);
};
export const useFetchProductConfig = () => {
  const dispatch = useDispatch();
  const fetchConfig = useCallback(
    (policyNo: string) => {
      dispatch({
        type: `${NAMESPACE}/fetchProductConfig`,
        payload: {
          policyNo,
        },
      });
    },
    [dispatch]
  );
  return fetchConfig;
};
