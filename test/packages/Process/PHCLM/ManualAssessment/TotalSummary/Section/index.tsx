import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, ElementConfig, FixedFieldLayout } from 'basic/components/Form';
import AdjustBenefitTypeFields, {
  localFieldConfigs as AdjustBenefitTypeConfig,
} from './Fields/AdjustBenefitType';
import BenefitTypeFields, { localFieldConfigs as BenefitTypeConfig } from './Fields/BenefitType';
import BenefitItemFields, { localFieldConfigs as BenefitItemConfig } from './Fields/BenefitItem';
import BenefitTypeBoosterFields, {
  localFieldConfigs as BenefitTypeBoosterConfig,
} from './Fields/BenefitTypeBooster';
import BenefitItemBoosterFields, {
  localFieldConfigs as BenefitItemBoosterConfig,
} from './Fields/BenefitItemBooster';
import LifePayable, { localFieldConfigs as LifePayableConfig } from './Fields/LifePayable';

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
    ...AdjustBenefitTypeConfig,
    ...BenefitTypeConfig,
    ...BenefitItemConfig,
    ...BenefitTypeBoosterConfig,
    ...BenefitItemBoosterConfig,
    ...LifePayableConfig,
  ],
  remote: true,
};

const FormSection = ({ section, form, children, register, layoutName }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
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
  );
};

const Section = ({ form, editable, children, section, register = true, layoutName }: any) => (
  <FormSection section={section} form={form} register={register} layoutName={layoutName}>
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
  AdjustBenefitTypeFields,
  BenefitTypeFields,
  BenefitItemFields,
  BenefitTypeBoosterFields,
  BenefitItemBoosterFields,
  LifePayable,
  SectionColumns,
  localConfig,
};

export default Section;
