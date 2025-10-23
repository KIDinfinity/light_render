import { useEffect } from 'react';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useDispatch } from 'dva';
import useGetFacultativeOptionFieldVisible from './useGetFacultativeOptionFieldVisible';

interface IParams {
  coverageId: string;
  productCode: string;
}

export default ({ coverageId, productCode }: IParams) => {
  const facultativeOptionVisible = useGetFacultativeOptionFieldVisible({ productCode });
  const dispatch = useDispatch();

  useEffect(() => {
    if (facultativeOptionVisible) {
      dispatch({
        type: `${NAMESPACE}/clearCoverageFacultativeValues`,
        payload: {
          coverageId,
        },
      });
    }
  }, [coverageId, facultativeOptionVisible]);
};
