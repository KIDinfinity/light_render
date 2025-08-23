import { useEffect, useMemo } from 'react';
import lodash from 'lodash';
import {  useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  const campaignList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.campaignList,
    shallowEqual
  );
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getCampaignList`,
    });
  }, []);
  return useMemo(() => {
    return lodash.map(campaignList, (item: any) => {
      const { dictCode, campaignCode, campaignName } = item;

      return {
        ...item,
        dictCode: dictCode || campaignCode,
        dictName: campaignName,
      };
    });
  }, [campaignList]);
};
