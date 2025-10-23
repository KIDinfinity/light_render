import React from 'react';
import { NAMESPACE } from '../../activity.config';

import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { ElementConfig, FixedFieldLayout, FormRegister } from 'basic/components/Form';
import TreamentFields, { localFieldConfigs as TreamentFieldConfigs } from './Fields/Treament';
import ServiceFields, { localFieldConfigs as ServiceConfigs } from './Fields/Service';
import PayableFields, { localFieldConfigs as PayableConfigs } from './Fields/Payable';
import InfoFields, { localFieldConfigs as InfoConfigs } from './Fields/Info';

const localSectionConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'PopUpPayable',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.title.medical-surgical-procedure',
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

const localConfig = {
  configs: [
    localSectionConfig,
    ...TreamentFieldConfigs,
    ...ServiceConfigs,
    ...PayableConfigs,
    ...InfoConfigs,
  ],
  remote: false, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
};

const SectionLayout = ({ config, layoutName, form, children }: any) => (
  <FixedFieldLayout config={config} layoutName={layoutName} form={form}>
    {children}
  </FixedFieldLayout>
);

const FormSection = ({ section, form, layoutName, children, register }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <div>
      <FormRegister form={form} register={register} namespace={NAMESPACE}>
        <Form layout="vertical">
          <SectionLayout layoutName={layoutName} form={form} config={config}>
            {children}
          </SectionLayout>
        </Form>
      </FormRegister>
    </div>
  )
};

const SectionTitle = ({ prefix, suffix }: any) => {
  return (
    <ElementConfig.SectionTitle
      section={localSectionConfig.section}
      config={localConfig}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

const Section = ({ form, editable, children, layoutName, section, register }: any) => (
  <FormSection section={section} form={form} layoutName={layoutName} register={register}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);

export { TreamentFields, ServiceFields, PayableFields, InfoFields, SectionTitle, localConfig };

export default Section;
