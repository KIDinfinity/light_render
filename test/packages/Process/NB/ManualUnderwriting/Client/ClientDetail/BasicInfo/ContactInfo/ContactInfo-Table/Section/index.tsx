import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import Contacttype, { fieldConfig as contactTypeConfig } from './Fields/Contacttype';

import Contactno, { fieldConfig as contactNoConfig } from './Fields/Contactno';

import Countrycode, { fieldConfig as countryCodeConfig } from './Fields/Countrycode';

import CountryName, { fieldConfig as countryNameConfig } from './Fields/CountryName';

import AreaCode, { fieldConfig as areaCodeConfig } from './Fields/AreaCode';

const localSectionConfig = {
  section: 'ContactInfo-Table',
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

    contactTypeConfig,

    contactNoConfig,

    countryCodeConfig,

    countryNameConfig,

    areaCodeConfig,
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

const Contactinfofield = ({ form, editable, children }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'ContactInfo-Table',
    localConfig,
  });
  return (
    <Section section="ContactInfo-Table" form={form} config={config}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { form, editable, section: 'ContactInfo-Table' })
      )}
    </Section>
  );
};

const Fields = {
  Contacttype,

  Contactno,

  Countrycode,

  AreaCode,

  CountryName,
};

export { Fields, localConfig };
export default Contactinfofield;
