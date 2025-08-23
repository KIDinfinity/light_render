import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import Authorizedrepresentative, {
  fieldConfig as authorizedRepresentativeConfig,
} from './Fields/Authorizedrepresentative';

import Representativeidtype, {
  fieldConfig as representativeIdTypeConfig,
} from './Fields/Representativeidtype';

import Representativeidno, {
  fieldConfig as representativeIdNoConfig,
} from './Fields/Representativeidno';

import Representativeidexpirydate, {
  fieldConfig as representativeIdExpiryDateConfig,
} from './Fields/Representativeidexpirydate';

import Representativeposition, {
  fieldConfig as representativePositionConfig,
} from './Fields/Representativeposition';

import Artitle, { fieldConfig as aRTitleConfig } from './Fields/Artitle';

import Arfirstname, { fieldConfig as aRFirstNameConfig } from './Fields/Arfirstname';

import Armiddlename, { fieldConfig as aRMiddleNameConfig } from './Fields/Armiddlename';

import Arsurname, { fieldConfig as aRSurnameConfig } from './Fields/Arsurname';

import Arextensionname, { fieldConfig as aRExtensionNameConfig } from './Fields/Arextensionname';

const localSectionConfig = {
  section: 'Authorized signatory-Field',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'Y',
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

    authorizedRepresentativeConfig,

    representativeIdTypeConfig,

    representativeIdNoConfig,

    representativeIdExpiryDateConfig,

    representativePositionConfig,

    aRTitleConfig,

    aRFirstNameConfig,

    aRMiddleNameConfig,

    aRSurnameConfig,

    aRExtensionNameConfig,
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

const Authorizedsignatoryfield = ({ form, editable, children }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'Authorized signatory-Field',
    localConfig,
  });
  return (
    <Section section="Authorized signatory-Field" form={form} config={config}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { form, editable, section: 'Authorized signatory-Field' })
      )}
    </Section>
  );
};

const Fields = {
  Authorizedrepresentative,

  Representativeidtype,

  Representativeidno,

  Representativeidexpirydate,

  Representativeposition,

  Artitle,

  Arfirstname,

  Armiddlename,

  Arsurname,

  Arextensionname,
};

export { Fields, localConfig };
export default Authorizedsignatoryfield;
