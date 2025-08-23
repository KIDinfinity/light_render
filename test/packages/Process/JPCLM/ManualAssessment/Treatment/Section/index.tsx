import React from 'react';
import { Form } from 'antd';
import { ElementConfig, FixedFieldLayout, FormRegister } from 'basic/components/Form';
import BasicExpandFields, {
  localFieldConfigs as BasicExpandFieldConfigs,
} from './Fields/BasicExpand';
import BasicHeaderFields, {
  localFieldConfigs as BasicHeaderFieldConfigs,
} from './Fields/BasicHeader';
import PayableFields, { localFieldConfigs as PayableFieldConfigs } from './Fields/Payable';
import OutpatientPayableFields, {
  localFieldConfigs as OutpatientPayableConfigs,
} from './Fields/OutpatientPayable';
import OutpatientFields, { localFieldConfigs as OutpatientFieldConfigs } from './Fields/Outpatient';
import AdjPayableFields, { localFieldConfigs as AdjPayableConfigs } from './Fields/AdjPayable';
import TotalPayableFields, {
  localFieldConfigs as TotalPayableConfigs,
} from './Fields/TotalPayable';
import RelationPayableFields, {
  localFieldConfigs as RelationPayableConfigs,
} from './Fields/RelationPayable';
import PayableAddFields, { localFieldConfigs as PayableAddFieldConfigs } from './Fields/PayableAdd';
import AddFields, { localFieldConfigs as AddFieldConfigs } from './Fields/Add';
import AdjIpHeaderPayableFields, {
  localFieldConfigs as AdjIpHeaderPayableFieldConfigs,
} from './Fields/AdjIpHeaderPayable';
import AdjIpShrinkFields, {
  localFieldConfigs as AdjIpShrinkFieldConfigs,
} from './Fields/AdjIpShrinkPayable';
import AdjIpExpandFields, {
  localFieldConfigs as AdjIpExpandFieldConfigs,
} from './Fields/AdjIIpExpandPayable';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.title.treatment',
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
    ...BasicExpandFieldConfigs,
    ...BasicHeaderFieldConfigs,
    ...PayableFieldConfigs,
    ...PayableAddFieldConfigs,
    ...AddFieldConfigs,
    ...OutpatientPayableConfigs,
    ...OutpatientFieldConfigs,
    ...AdjPayableConfigs,
    ...TotalPayableConfigs,
    ...RelationPayableConfigs,
    ...AdjIpHeaderPayableFieldConfigs,
    ...AdjIpShrinkFieldConfigs,
    ...AdjIpExpandFieldConfigs,
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
  BasicExpandFields,
  BasicHeaderFields,
  PayableFields,
  OutpatientPayableFields,
  PayableAddFields,
  AddFields,
  SectionTitle,
  localConfig,
  OutpatientFields,
  AdjPayableFields,
  TotalPayableFields,
  RelationPayableFields,
  AdjIpHeaderPayableFields,
  AdjIpShrinkFields,
  AdjIpExpandFields,
};

export default Section;
