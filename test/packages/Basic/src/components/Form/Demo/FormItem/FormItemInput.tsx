import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { FormSection, FormItemInput } from 'basic/components/Form';

export default ({ form }: any) => {
  return (
    <>
      <FormSection title="FormItemInput" layConf={6} isMargin={false}>
        <FormItemInput required form={form} formName="FormItemInput" labelId="FormItemInput" />
        <FormItemInput required form={form} formName="FormItemInput" labelId="Inline" isInline />
        <FormItemInput
          required
          form={form}
          formName="FormItemInput"
          labelId="warnningMessage"
          warningMessage={[{ message: 'warnning', messageType: '1' }]}
        />
        <FormItemInput
          required
          form={form}
          formName="FormItemInput"
          labelId="errorMessage"
          warningMessage={[{ message: 'error', messageType: '3' }]}
        />
      </FormSection>
    </>
  );
};
