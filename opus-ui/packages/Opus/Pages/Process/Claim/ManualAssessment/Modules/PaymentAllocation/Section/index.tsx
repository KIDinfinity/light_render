import React from 'react';
import { Form } from 'antd';
import { ElementConfig, FixedFieldLayout, FormRegister } from 'basic/components/Form';
import BankAccountFields, {
  localFieldConfigs as BankAccountFieldConfigs,
} from './Fields/BankAccount';
import ContactInformationFields, {
  localFieldConfigs as ContactInformationFieldConfigs,
} from './Fields/ContactInformation';
import PayeeInformationFields, {
  localFieldConfigs as PayeeInformationFieldConfigs,
} from './Fields/PayeeInformation';
import PayeePaymentInformationFields, {
  localFieldConfigs as PayeePaymentInformationConfigs,
} from './Fields/PayeePaymentInformation';
import PolicyBenefitFields, {
  localFieldConfigs as PolicyBenefitConfigs,
} from './Fields/PolicyBenefit';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'paymentAllocation',
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
    ...BankAccountFieldConfigs,
    ...ContactInformationFieldConfigs,
    ...PayeeInformationFieldConfigs,
    ...PayeePaymentInformationConfigs,
    ...PolicyBenefitConfigs,
  ],
  remote: false, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
};

const SectionLayout = ({ config, layoutName, children, form, actionComponent }: any) => {
  return (
    <FixedFieldLayout
      config={config}
      layoutName={layoutName}
      form={form}
      actionComponent={actionComponent}
    >
      {children}
    </FixedFieldLayout>
  );
};

const FormSection = ({ form, section, layoutName, children, actionComponent, formId }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });

  return (
    <div>
      <FormRegister form={form} formId={formId}>
        <Form layout="vertical">
          <SectionLayout
            layoutName={layoutName}
            form={form}
            config={config}
            actionComponent={actionComponent}
          >
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

const Section = ({
  form,
  editable,
  children,
  layoutName,
  section,
  actionComponent,
  formId,
}: any) => (
  <FormSection
    section={section}
    layoutName={layoutName}
    form={form}
    actionComponent={actionComponent}
    formId={formId}
  >
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);

export {
  BankAccountFields,
  ContactInformationFields,
  PayeeInformationFields,
  PayeePaymentInformationFields,
  PolicyBenefitFields,
  SectionTitle,
  localConfig,
};

export default Section;
