import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, ElementConfig, FixedFieldLayout } from 'basic/components/Form';
import BenefitTypeFields, { localFieldConfigs as BenefitTypeConfig } from './Fields/BenefitType';
import BenefitItemFields, { localFieldConfigs as BenefitItemConfig } from './Fields/BenefitItem';
import GroupHeaderFields, { localFieldConfigs as GroupHeaderConfig } from './Fields/GroupHeader';
import BenefitTypeBoosterFields, {
  localFieldConfigs as BenefitTypeBoosterConfig,
} from './Fields/BenefitTypeBooster';
import BenefitItemBoosterFields, {
  localFieldConfigs as BenefitItemBoosterConfig,
} from './Fields/BenefitItemBooster';

const localSectionConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'SummaryPayable',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.title.insured-information',
    },
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 14,
        offset: 0,
        pull: 0,
        order: 122,
      },
      // 576px
      sm: {
        span: 14,
        offset: 0,
        pull: 0,
        order: 122,
      },
      // 768px
      md: {
        span: 14,
        offset: 0,
        pull: 0,
        order: 122,
      },
      // 992px
      lg: {
        span: 14,
        offset: 0,
        pull: 0,
        order: 122,
      },
      // 1200px
      xl: {
        span: 14,
        offset: 0,
        pull: 0,
        order: 122,
      },
      // 1600px
      xxl: {
        span: 14,
        offset: 0,
        pull: 0,
        order: 122,
      },
    },
  },
};

const localConfig = {
  configs: [
    localSectionConfig,
    ...BenefitTypeConfig,
    ...BenefitItemConfig,
    ...BenefitTypeBoosterConfig,
    ...BenefitItemBoosterConfig,
    ...GroupHeaderConfig,
  ],
  remote: true,
};

const FormSection = ({ section, form, children, register, layoutName, test }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
    test
  });
  return (
    <div>
      <FormRegister form={form} register={register}>
        <Form layout="vertical">
          <FixedFieldLayout layoutName={layoutName} form={form} config={config}>
            {children}
          </FixedFieldLayout>
        </Form>
      </FormRegister>
    </div>
  )
};

const Section = ({ form, editable, children, section, register = true, layoutName, test }: any) => (
  <FormSection section={section} form={form} register={register} layoutName={layoutName} test={test}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);

const SectionColumns = ({
  render,
  layoutName,
  defaultExpand = false,
  showArrow,
  onArrow,
  expand,
}: any) => (
  <ElementConfig.SectionColumns
    section={localSectionConfig.section}
    config={localConfig}
    render={render}
    layoutName={layoutName}
    showArrow={showArrow}
    defaultExpand={defaultExpand}
    onArrow={onArrow}
    expand={expand}
  />
);

export {
  BenefitTypeFields,
  BenefitItemFields,
  BenefitTypeBoosterFields,
  BenefitItemBoosterFields,
  GroupHeaderFields,
  SectionColumns,
  localConfig,
};

export default Section;
