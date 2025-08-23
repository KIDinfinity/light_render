import React from 'react';

import { FormItemSelectPlus } from 'basic/components/Form';

import { handleDocket } from 'claim/pages/utils/claimUtils';

const Doctor = ({ form, disabled = true, handleChange }: any) => {
  return (
    <FormItemSelectPlus
      disabled={!!disabled}
      form={form}
      formName="doctor"
      labelId="app.navigator.task-detail-of-data-capture.label.name-of-doctor"
      required
      optionShowType="name"
      onSelectCallback={(value: any) => {
        handleChange(value);
      }}
      searchCustom={handleDocket}
      isFreeText
      saveName
    />
  );
};

export default Doctor;
