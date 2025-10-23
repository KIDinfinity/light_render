import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import Fields, { localFieldConfigs as FieldConfigs } from './Fields';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

const localConfig = {
  configs: [...FieldConfigs],
  remote: true, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
};

const Section = ({ section, form, children, actionComponent }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <FixedFieldLayout config={config} actionComponent={actionComponent}>
          {children}
        </FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const Insured = ({ form, editable, children, sectionId, actionComponent }: any) => {
  return (
    <Section section={sectionId} form={form} actionComponent={actionComponent}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { form, editable, section: sectionId })
      )}
    </Section>
  );
};

export { Fields, localConfig };

export default Insured;
