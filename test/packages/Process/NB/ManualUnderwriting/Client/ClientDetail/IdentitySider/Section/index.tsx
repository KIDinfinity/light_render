import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import Ccrclientid, { fieldConfig as ccrClientIdConfig } from './Fields/Ccrclientid';

import Laclientid, { fieldConfig as laClientIdConfig } from './Fields/Laclientid';

import Firstname, { fieldConfig as firstNameConfig } from './Fields/Firstname';

import Surname, { fieldConfig as surnameConfig } from './Fields/Surname';

import Newclientflag, { fieldConfig as newClientFlagConfig } from './Fields/Newclientflag';

import Customerrole, { fieldConfig as customerRoleConfig } from './Fields/Customerrole';

import Relationofinsured, {
  fieldConfig as relationOfInsuredConfig,
} from './Fields/Relationofinsured';

import Relationofproposer, {
  fieldConfig as relationOfProposerConfig,
} from './Fields/Relationofproposer';

import Relationofbeneficiary, {
  fieldConfig as relationOfBeneficiaryConfig,
} from './Fields/Relationofbeneficiary';

import Customertype, { fieldConfig as customerTypeConfig } from './Fields/Customertype';

import Middlename, { fieldConfig as middleNameConfig } from './Fields/Middlename';

import Extensionname, { fieldConfig as extensionNameConfig } from './Fields/Extensionname';

import Title, { fieldConfig as titleConfig } from './Fields/Title';

import Companyname, { fieldConfig as companyNameConfig } from './Fields/Companyname';

import Customerenfirstname, {
  fieldConfig as customerEnFirstNameConfig,
} from './Fields/Customerenfirstname';

import Customerensurname, {
  fieldConfig as customerEnSurnameConfig,
} from './Fields/Customerensurname';

import Entityname, { fieldConfig as EntitynameConfig } from './Fields/Entityname';

import Customerenextensionname, {
  fieldConfig as customerEnExtensionNameConfig,
} from './Fields/Customerenextensionname';

import Customerenmiddlename, {
  fieldConfig as customerEnMiddleNameConfig,
} from './Fields/Customerenmiddlename';

const localSectionConfig = {
  section: 'CommonClientInfo-Field',
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

    ccrClientIdConfig,

    laClientIdConfig,

    firstNameConfig,

    surnameConfig,

    newClientFlagConfig,

    customerRoleConfig,

    relationOfInsuredConfig,

    relationOfProposerConfig,

    relationOfBeneficiaryConfig,

    customerTypeConfig,

    middleNameConfig,

    extensionNameConfig,

    titleConfig,

    EntitynameConfig,

    companyNameConfig,

    customerEnExtensionNameConfig,

    customerEnFirstNameConfig,

    customerEnMiddleNameConfig,

    customerEnSurnameConfig,
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

const Commonclientinfofield = ({ form, editable, children }: any) => (
  <Section section="CommonClientInfo-Field" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'CommonClientInfo-Field' })
    )}
  </Section>
);
const Fields = {
  Ccrclientid,

  Laclientid,

  Firstname,

  Surname,

  Newclientflag,

  Customerrole,

  Relationofinsured,

  Relationofproposer,

  Relationofbeneficiary,

  Customertype,

  Middlename,

  Extensionname,

  Title,

  Companyname,
  Customerensurname,

  Entityname,

  Customerenfirstname,

  Customerenextensionname,

  Customerenmiddlename,
};

export { Fields, localConfig };
export default Commonclientinfofield;
