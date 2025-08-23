import React from 'react';
import { Form } from 'antd';
import { ElementConfig, FixedFieldLayout, FormRegister } from 'basic/components/Form';
import PayableGroupFields, {
  localFieldConfigs as PayableGroupFieldConfigs,
} from './Fields/PayableGroup';
import PayableBasicFields, {
  localFieldConfigs as PayableBasicFieldConfigs,
} from './Fields/PayableBasic';
import PayableLifeFields, {
  localFieldConfigs as PayableLifeFieldConfigs,
} from './Fields/PayableLife';
import BasicFields, { localFieldConfigs as BasicFieldConfigs } from './Fields/Basic';
import AdjPayableBasicFields, {
  localFieldConfigs as AdjPayableBasicFieldConfigs,
} from './Fields/AdjPayableBasic';
import AddFields, { localFieldConfigs as AddFieldsConfigs } from './Fields/Add';
import PayableIncidentFields, { localFieldConfigs as PayableIncidentFieldConfigs} from './Fields/PayableIncident';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Incident',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.title.incident',
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

const localConfig = {
  configs: [
    localSectionConfig,
    ...PayableGroupFieldConfigs,
    ...PayableBasicFieldConfigs,
    ...PayableLifeFieldConfigs,
    ...BasicFieldConfigs,
    ...AddFieldsConfigs,
    ...AdjPayableBasicFieldConfigs,
    ...PayableIncidentFieldConfigs,
  ],
  remote: false, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
};

const SectionLayout = ({ config, layoutName, children, form }: any) => (
  <FixedFieldLayout config={config} layoutName={layoutName} form={form}>
    {children}
  </FixedFieldLayout>
);

const FormSection = ({ form, section, layoutName, children }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <div>
      <FormRegister form={form}>
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

const Section = ({ form, editable, children, layoutName, section, sectionId }: any) => (
  <FormSection section={section} layoutName={layoutName} form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section, sectionId })
    )}
  </FormSection>
);

export {
  PayableGroupFields,
  PayableBasicFields,
  PayableLifeFields,
  BasicFields,
  AdjPayableBasicFields,
  PayableIncidentFields,
  AddFields,
  SectionTitle,
  localConfig,
};

export default Section;
