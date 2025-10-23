import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import Fields, { localFieldConfigs } from './Fields';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

const localSectionConfig = {
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'otherProcedure',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'Radiotherapy',
    },
    visible: 'Y',
  },
};

const localConfig = {
  configs: [localSectionConfig, ...localFieldConfigs],
  remote: false, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
};

const SectionLayout = ({ config, layoutName, children, form }: any) => (
  <FixedFieldLayout config={config} layoutName={layoutName} form={form}>
    {children}
  </FixedFieldLayout>
);

const FormSection = ({ form, section, layoutName, children, register }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <FormRegister form={form} register={register}>
      <Form layout="vertical">
        <SectionLayout layoutName={layoutName} form={form} config={config}>
          {children}
        </SectionLayout>
      </Form>
    </FormRegister>
  );
};

const Section = ({ form, editable, children, layoutName, section }: any) => (
  <FormSection section={section} layoutName={layoutName} form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);

export { Fields, localConfig };

export default Section;
