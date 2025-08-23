import React, { useState } from 'react';
import { FormSection, FormItemCurrency } from 'basic/components/Form';

export default ({ form }: any) => {
  const [currencyCode, setCurerncyCode] = useState('THB');
  const onSuffixChange = (selectCurrency: any) => {
    setCurerncyCode(selectCurrency.currencyCode);
  };
  return (
    <>
      <FormSection title="FormItemCurrency" layConf={6} isMargin={false}>
        <FormItemCurrency
          form={form}
          suffixEditable
          required
          formName="expense"
          labelId="FormItemCurrency"
          hiddenPrefix
          onSuffixChange={onSuffixChange}
          currencyCode={currencyCode}
        />
      </FormSection>
    </>
  );
};
