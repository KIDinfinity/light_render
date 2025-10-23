import React from 'react';
import { Form } from 'antd';
import { FormRegister } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import SectionLayout from './SectionLayout';

const FormSection = ({ form, section, layoutName, children, register, localConfig }: any) => {
  const config = useGetSectionAtomConfig({
    localConfig,
    section,
  });

  return (
    <div>
      <FormRegister form={form} register={register} localConfig={localConfig}>
        <Form layout="vertical">
          <SectionLayout layoutName={layoutName} form={form} config={config}>
            {children}
          </SectionLayout>
        </Form>
      </FormRegister>
    </div>
  );
};
export default FormSection;
