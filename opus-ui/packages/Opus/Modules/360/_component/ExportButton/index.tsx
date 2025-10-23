import Buttons from 'opus/Components/Buttons';
import React from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';

export default () => {
  const activeKey = useSelector((state: any) => state.workspaceSwitchOn?.c360Tab);
  const policyInfoList = useSelector(({ insured360 }: any) => insured360?.policyInfoList) || [];
  const isExportLoading = useSelector(({ insured360 }: any) => insured360?.isExportLoading);
  const dispatch = useDispatch();
  const disabled = lodash.isEmpty(policyInfoList);

  const handleOnClick = async () => {
    dispatch({
      type: 'insured360/getPolicyExport',
      payload: {
        policyInfoList,
      },
    });
  };

  if (activeKey !== 'policy') return <></>;

  return (
    <Buttons.Export loading={isExportLoading} disabled={disabled} handleClick={handleOnClick} />
  );
};
