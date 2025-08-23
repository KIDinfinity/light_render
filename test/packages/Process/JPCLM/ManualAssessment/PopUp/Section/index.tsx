import React from 'react';
import { Form } from 'antd';
import { ElementConfig, FixedFieldLayout, FormRegister } from 'basic/components/Form';
import TreatmentFields, { localFieldConfigs as TreatmentFieldConfigs } from './Fields/Treatment';
import ProcedureFields, { localFieldConfigs as ProcedureFieldConfigs } from './Fields/Procedure';
import KlipCaseInfoFields, {
  localFieldConfigs as KlipCaseInfoFieldConfigs,
} from './Fields/KlipCaseInfo';
import Klip7617, { localFieldConfigs as Klip7617Configs } from './Fields/Klip7617';
import Klip7616, { localFieldConfigs as Klip7616Configs } from './Fields/Klip7616';
import Klip7580, { localFieldConfigs as Klip7580Configs } from './Fields/Klip7580';
import Policy, { localFieldConfigs as PolicyConfigs } from './Fields/Policy';
import Lifej, { localFieldConfigs as LifejConfigs } from './Fields/Lifej';
import RefundInfo, { localFieldConfigs as RefundInfoConfigs } from './Fields/RefundInfo';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'PopUp',
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
    ...TreatmentFieldConfigs,
    ...ProcedureFieldConfigs,
    ...KlipCaseInfoFieldConfigs,
    ...Klip7617Configs,
    ...Klip7580Configs,
    ...Klip7616Configs,
    ...PolicyConfigs,
    ...LifejConfigs,
    ...RefundInfoConfigs,
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
  );
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

const Section = ({ form, editable, children, layoutName, section }: any) => (
  <FormSection section={section} layoutName={layoutName} form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);

export {
  TreatmentFields,
  ProcedureFields,
  KlipCaseInfoFields,
  Klip7617,
  Klip7616,
  Klip7580,
  Policy,
  SectionTitle,
  localConfig,
  Lifej,
  RefundInfo,
};

export default Section;
