import React from 'react';
import { Form } from 'antd';
import SelectPlus from 'basic/components/Form/FormItem/FormItemSelectPlus/SelectPlus';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import useHandleSearchMedicalProviderCallback from 'bpm/pages/Envoy/hooks/useHandleSearchMedicalProviderCallback';

export default ({ name, value, disabled, onChange, errorMessage, hideLabel, required }: any) => {
  const handleSearch = useHandleSearchMedicalProviderCallback();
  const id= "medicalProvider"
  return (
    <>
      <Form.Item
        required={required}
        label={
          !hideLabel && (
            <>
              {errorMessage?.length ? <LabelTip title={errorMessage} /> : null}
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.medical-provider',
              })}
            </>
          )
        }
      >
        <SelectPlus
          name={name}
          id={id}
          disabled={disabled}
          value={value}
          onChange={onChange}
          setVisible={() => {}}
          searchCustom={handleSearch}
        />
      </Form.Item>
    </>
  );
};
