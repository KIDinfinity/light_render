import { useEffect } from 'react';
import useGetFacultativeOptionVisible from './useGetFacultativeOptionVisible';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useDispatch } from 'dva';

export default () => {
  const facultativeOptionVisible = useGetFacultativeOptionVisible();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!facultativeOptionVisible) {
      dispatch({ type: `${NAMESPACE}/clearAllFacultativeValues` });
    }
  }, [facultativeOptionVisible]);
};
