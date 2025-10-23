import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useMemo } from 'react';
import lodash from 'lodash';
import useGetFacultativeOptionVisible from './useGetFacultativeOptionVisible';
import { useGetCoverageList } from 'opus/NewBusiness/ManualUnderwriting/_hooks';
import useProceedGetFacultativeInfo from './useProceedGetFacultativeInfo';

interface IParams {
  productCode: string;
}

export default ({ productCode }: IParams) => {
  const facultativeInfo = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.facultativeInfo;
  }, shallowEqual);
  const facultativeOptionVisible = useGetFacultativeOptionVisible();

  const isProceedGetFacultativeInfo = useProceedGetFacultativeInfo();
  const coverageList = useGetCoverageList();
  const coverage = lodash.find(coverageList, { coreCode: productCode });
  const facultativePackageCode = coverage?.coverageDecision?.facultativePackageCode;
  const { displayFlag } = lodash.find(facultativeInfo, { productCode }) || { displayFlag: false };

  return useMemo(() => {
    const fieldDisplay = isProceedGetFacultativeInfo ? displayFlag : !!facultativePackageCode;
    return facultativeOptionVisible && fieldDisplay;
  }, [displayFlag, isProceedGetFacultativeInfo, facultativePackageCode, facultativeOptionVisible]);
};
