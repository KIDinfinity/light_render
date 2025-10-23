import { useMemo } from 'react';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useSelector } from 'dva';
import useGetBasicProductSkipSnapshot from './useGetBasicProductSkipSnapshot';

interface IParams {
  mode: 'edit' | 'show';
}

export default ({ mode }: IParams) => {
  const basicProduct = useGetBasicProductSkipSnapshot();

  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );
  const expand = !!expandedClientId;

  return useMemo(() => {
    const show = basicProduct?.productCenterFeature?.fatcaInd !== 'No';

    return mode === 'show' ? show && expand : show;
  }, [mode, basicProduct, expand]);
};
