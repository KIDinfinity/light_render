import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { FormSection, FormItemNumber } from 'basic/components/Form';

export default ({ form }: any) => {
  return (
    <>
      <FormSection title="FormItemNumber" layConf={6} isMargin={false}>
        <FormItemNumber
          required
          form={form}
          formName="FormItemNumber"
          labelId="FormItemNumber"
          precision={0}
        />
        {/* <FormItemNumber required form={form} formName="FormItemNumber" labelId="inline" isInline />
        <FormItemNumber
          required
          form={form}
          formName="FormItemNumber"
          labelId="isShowCalculation"
          isShowCalculation
        />
        <FormItemNumber
          required
          form={form}
          formName="FormItemNumber"
          labelId="labelRight"
          labelRight
        />
        <FormItemNumber
          required
          form={form}
          formName="FormItemNumber"
          labelId="onHover"
          recoverValue={0}
          OnRecover={OnRecover}
          onHover
          isInline
        /> */}
      </FormSection>
    </>
  );
};
