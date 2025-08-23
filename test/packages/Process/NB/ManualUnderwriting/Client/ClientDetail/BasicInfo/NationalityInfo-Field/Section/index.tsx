import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import Countryofresident, {
  fieldConfig as countryOfResidentConfig,
} from './Fields/Countryofresident';
import Nationality, { fieldConfig as nationalityConfig } from './Fields/Nationality';
import Usaflag, { fieldConfig as fatcaDropdownValueConfig } from './Fields/Usaflag';
import Ctfcountrycode, { fieldConfig as CtfcountrycodeConfig } from './Fields/Ctfcountrycode';

import Usresidenceaddress7, {
  fieldConfig as usResidenceAddress7Config,
} from './Fields/Usresidenceaddress7';

import Usresidenceaddress6, {
  fieldConfig as usResidenceAddress6Config,
} from './Fields/Usresidenceaddress6';

import Usresidenceaddress5, {
  fieldConfig as usResidenceAddress5Config,
} from './Fields/Usresidenceaddress5';

import Usresidenceaddress4, {
  fieldConfig as usResidenceAddress4Config,
} from './Fields/Usresidenceaddress4';

import Usresidenceaddress3, {
  fieldConfig as usResidenceAddress3Config,
} from './Fields/Usresidenceaddress3';

import Usresidenceaddress2, {
  fieldConfig as usResidenceAddress2Config,
} from './Fields/Usresidenceaddress2';

import Usresidenceaddress1, {
  fieldConfig as usResidenceAddress1Config,
} from './Fields/Usresidenceaddress1';

import Usresidencezipcode, {
  fieldConfig as usResidenceZipCodeConfig,
} from './Fields/Usresidencezipcode';

import Usresidenceaddress, {
  fieldConfig as usResidenceAddressConfig,
} from './Fields/Usresidenceaddress';

import Greencard, { fieldConfig as greencardConfig } from './Fields/Greencard';

import Fulladdress, { fieldConfig as fullAddressConfig } from './Fields/Fulladdress';

import Ustn, { fieldConfig as ustnConfig } from './Fields/Ustn';
import CtfPlace, { fieldConfig as ctfPlaceConfig } from './Fields/CtfPlace';
import Nationality2, { fieldConfig as nationality2Config } from './Fields/Nationality2';
import Nationality3, { fieldConfig as nationality3Config } from './Fields/Nationality3';
import Malaysianpr,{fieldConfig as malaysianprConfig} from './Fields/Malaysianpr'

const localSectionConfig = {
  section: 'NationalityInfo-Field',
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

    nationalityConfig,

    fatcaDropdownValueConfig,

    countryOfResidentConfig,

    CtfcountrycodeConfig,

    greencardConfig,

    fullAddressConfig,

    usResidenceAddress7Config,

    usResidenceAddress6Config,

    usResidenceAddress5Config,

    usResidenceAddress4Config,

    usResidenceAddress3Config,

    usResidenceAddress2Config,

    usResidenceAddress1Config,

    usResidenceZipCodeConfig,

    usResidenceAddressConfig,

    ustnConfig,

    ctfPlaceConfig,

    nationality2Config,

    nationality3Config,

    malaysianprConfig,
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

const Nationalityinfofield = ({ form, editable, children }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'NationalityInfo-Field',
    localConfig,
  });

  return (
    <Section section="NationalityInfo-Field" form={form} config={config}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { form, editable, section: 'NationalityInfo-Field' })
      )}
    </Section>
  );
};

const Fields = {
  Nationality,

  Usaflag,

  Countryofresident,

  Ctfcountrycode,

  Greencard,

  Fulladdress,

  Usresidenceaddress7,

  Usresidenceaddress6,

  Usresidenceaddress5,

  Usresidenceaddress4,

  Usresidenceaddress3,

  Usresidenceaddress2,

  Usresidenceaddress1,

  Usresidencezipcode,

  Usresidenceaddress,

  Ustn,
  CtfPlace,

  Nationality2,

  Nationality3,

  Malaysianpr,
};

export { Fields, localConfig };
export default Nationalityinfofield;
