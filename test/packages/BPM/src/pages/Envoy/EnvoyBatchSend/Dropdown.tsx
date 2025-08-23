import React from 'react';
import { Select } from 'antd';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetBatchSendEnvoyOptions from 'bpm/pages/Envoy/hooks/useGetBatchSendEnvoyOptions';
import useHandleBatchEnvoySelectCallback from 'bpm/pages/Envoy/hooks/useHandleBatchEnvoySelectCallback';

const DropDown = () => {
  const options = useGetBatchSendEnvoyOptions();
  const handleSelect = useHandleBatchEnvoySelectCallback();
  const batchEnvoySelected = useSelector(
    (state: any) => state.envoyController?.batchEnvoySelected,
    shallowEqual
  );
  return (
    <>
      <Select mode="multiple" onChange={handleSelect} value={batchEnvoySelected}>
        {lodash.map(options, (option: any) => {
          return <Select.Option key={option?.id}>{option.name}</Select.Option>;
        })}
      </Select>
    </>
  );
};

DropDown.displayName = 'dropdown';

export default DropDown;
