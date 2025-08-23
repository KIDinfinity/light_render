import React from 'react';
import { NAMESPACE } from '../../activity.config';

import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { ElementConfig, FixedFieldLayout, FormRegister } from 'basic/components/Form';
import BasicFields, { localFieldConfigs as BasicFieldConfigs } from './Fields/Basic';
import BenefitItemFields, { localFieldConfigs as BenefitItemConfigs } from './Fields/BenefitItem';

import ServiceFields, { localFieldConfigs as ServiceFieldConfigs } from './Fields/Service';
import ProcedureFields, { localFieldConfigs as ProcedureFieldConfigs } from './Fields/Procedure';
import ProcedureMultipleFields, {
  localFieldConfigs as ProcedureMultipleConfigs,
} from './Fields/ProcedureMultiple';

import OtherProcedureFields, {
  localFieldConfigs as OtherProcedureFieldConfigs,
} from './Fields/OtherProcedure';
import OtherProcedureMultipleFields, {
  localFieldConfigs as OtherProcedureMultipleFieldConfigs,
} from './Fields/OtherProcedureMultiple';

import TreamentFields, { localFieldConfigs as TreamentFieldConfigs } from './Fields/Treament';
import TreamentmMultipleFields, {
  localFieldConfigs as TreamentmMultipleConfigs,
} from './Fields/TreamentmMultiple';
import ServiceMultipleFields, {
  localFieldConfigs as ServiceMultipleConfigs,
} from './Fields/ServiceMultiple';

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
    ...BasicFieldConfigs,
    ...BenefitItemConfigs,
    ...ServiceFieldConfigs,
    ...TreamentFieldConfigs,
    ...TreamentmMultipleConfigs,
    ...ServiceMultipleConfigs,
    ...ProcedureFieldConfigs,
    ...ProcedureMultipleConfigs,
    ...OtherProcedureFieldConfigs,
    ...OtherProcedureMultipleFieldConfigs,
  ],
  remote: true,
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

const SectionColumns = ({ render, layoutName, defaultExpand = false, showArrow, onArrow }: any) => (
  <ElementConfig.SectionColumns
    section="PopUpPayable.Service"
    config={localConfig}
    render={render}
    layoutName={layoutName}
    showArrow={showArrow}
    defaultExpand={defaultExpand}
    onArrow={onArrow}
  />
);

export {
  BasicFields,
  BenefitItemFields,
  ServiceFields,
  TreamentFields,
  ProcedureFields,
  OtherProcedureFields,
  OtherProcedureMultipleFields,
  ProcedureMultipleFields,
  TreamentmMultipleFields,
  ServiceMultipleFields,
  SectionTitle,
  SectionColumns,
  localConfig,
};

export default Section;
