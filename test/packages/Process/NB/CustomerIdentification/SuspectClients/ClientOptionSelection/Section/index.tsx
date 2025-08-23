import React from 'react';
import { Form } from 'antd';
import { FixedFieldLayout, FormRegister } from 'basic/components/Form';
import Fields, { localFieldConfigs as FieldConfigs } from './Fields';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../../../activity.config';

const localSectionConfig = {
  section: 'ClientOption-Fields',
};

const localConfig = {
  configs: [localSectionConfig, ...FieldConfigs],
  remote: true,
  section: localSectionConfig.section,
};

const SectionLayout = ({ config, layoutName, form, children }: any) => (
  <FixedFieldLayout config={config} layoutName={layoutName} form={form}>
    {children}
  </FixedFieldLayout>
);

const FormSection = ({ form, section, layoutName, register, children, formId }: any) => {
  const config = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.clientOptionConfigList,
    shallowEqual
  );

  return (
    <div>
      <FormRegister form={form} register={register} formId={formId}>
        <Form layout="inline">
          <SectionLayout layoutName={layoutName} form={form} config={config}>
            {children}
          </SectionLayout>
        </Form>
      </FormRegister>
    </div>
  );
};

const Section = ({ form, editable, children, layoutName, section, clientId }: any) => (
  <FormSection
    section={section}
    layoutName={layoutName}
    form={form}
    formId={`${localSectionConfig.section}-${clientId}`}
  >
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);

export { Fields, localConfig };

export default Section;
