import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import DistributionChannel from 'process/NB/ManualUnderwriting/DistributionChannel/DistributionChannel-Field/ReadOnly';

const Distributionchannel = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/searchAllCfgBranchCode`,
    });
    dispatch({
      type: `${NAMESPACE}/searchAllCfgBankCode`,
    });
  }, []);

  return <DistributionChannel />;
};

Distributionchannel.displayName = 'distributionchannel';

export default Distributionchannel;
