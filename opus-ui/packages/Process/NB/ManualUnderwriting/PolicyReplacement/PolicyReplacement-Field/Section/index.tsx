import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import Replaceinforce, { fieldConfig as replaceInforceConfig } from './Fields/Replaceinforce';

import Paidbypolicyloan, { fieldConfig as paidByPolicyLoanConfig } from './Fields/Paidbypolicyloan';
import Extensiontoexistingproduct, {
  fieldConfig as extensionToExistingProductConfig,
} from './Fields/Extensiontoexistingproduct';
import Satisfiedexplanation, {
  fieldConfig as satisfiedExplanationConfig,
} from './Fields/Satisfiedexplanation';
import Partyinfluence, { fieldConfig as partyInfluenceConfig } from './Fields/Partyinfluence';
import Comment, { fieldConfig as commentConfig } from './Fields/Comment';
import ReplaceWithApplyFor, {
  fieldConfig as replaceWithApplyForConfig,
} from './Fields/ReplaceWithApplyFor';
import ReinstatablePolicy, {
  fieldConfig as reinstatablePolicyConfig,
} from './Fields/ReinstatablePolicy';
import InforcePolicy, { fieldConfig as inforcePolicyConfig } from './Fields/InforcePolicy';

const localSectionConfig = {
  section: 'PolicyReplacement-Field',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'N',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 12,
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
    replaceInforceConfig,
    paidByPolicyLoanConfig,
    extensionToExistingProductConfig,
    satisfiedExplanationConfig,
    partyInfluenceConfig,
    commentConfig,
    replaceWithApplyForConfig,
    reinstatablePolicyConfig,
    inforcePolicyConfig,
  ],
  remote: true,
};

const Section = ({ section, form, children }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <FixedFieldLayout config={config}>{children}</FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const Policyreplacementfield = ({ form, editable, children }: any) => (
  <Section section="PolicyReplacement-Field" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'PolicyReplacement-Field' })
    )}
  </Section>
);
const Fields = {
  Replaceinforce,
  Extensiontoexistingproduct,
  Paidbypolicyloan,
  Satisfiedexplanation,
  Partyinfluence,
  Comment,
  ReplaceWithApplyFor,
  ReinstatablePolicy,
  InforcePolicy,
};

export { Fields, localConfig };
export default Policyreplacementfield;
