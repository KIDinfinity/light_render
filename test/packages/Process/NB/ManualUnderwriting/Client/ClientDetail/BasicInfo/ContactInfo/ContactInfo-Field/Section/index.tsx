import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import Fulladdress, { fieldConfig as FulladdressConfig } from './Fields/Fulladdress';

import Email, { fieldConfig as emailConfig } from './Fields/Email';

import Telegram, { fieldConfig as telegramConfig } from './Fields/Telegram';

import Whatsapp, { fieldConfig as whatsAppConfig } from './Fields/Whatsapp';

import Phoneno, { fieldConfig as phoneNoConfig } from './Fields/Phoneno';

import Phonenoreadonly, { fieldConfig as phonenoreadonlyConfig } from './Fields/Phonenoreadonly';

import Worknumber, { fieldConfig as workNumberConfig } from './Fields/Worknumber';

import Homenumber, { fieldConfig as homeNumberConfig } from './Fields/Homenumber';

import Contacttype, { fieldConfig as contactTypeConfig } from './Fields/Contacttype';

import Contactno, { fieldConfig as contactNoConfig } from './Fields/Contactno';

import Countrycode, { fieldConfig as countryCodeConfig } from './Fields/Countrycode';

import Currentaddress7, { fieldConfig as currentAddress7Config } from './Fields/Currentaddress7';

import Currentaddress6, { fieldConfig as currentAddress6Config } from './Fields/Currentaddress6';

import Currentaddress5, { fieldConfig as currentAddress5Config } from './Fields/Currentaddress5';

import Currentaddress4, { fieldConfig as currentAddress4Config } from './Fields/Currentaddress4';

import Currentaddress3, { fieldConfig as currentAddress3Config } from './Fields/Currentaddress3';

import Currentaddress2, { fieldConfig as currentAddress2Config } from './Fields/Currentaddress2';

import Currentaddress1, { fieldConfig as currentAddress1Config } from './Fields/Currentaddress1';

import Currentzipcode, { fieldConfig as currentZipCodeConfig } from './Fields/Currentzipcode';

import Businessaddress7, { fieldConfig as businessAddress7Config } from './Fields/Businessaddress7';

import Businessaddress6, { fieldConfig as businessAddress6Config } from './Fields/Businessaddress6';

import Businessaddress5, { fieldConfig as businessAddress5Config } from './Fields/Businessaddress5';

import Businessaddress4, { fieldConfig as businessAddress4Config } from './Fields/Businessaddress4';

import Businessaddress3, { fieldConfig as businessAddress3Config } from './Fields/Businessaddress3';

import Businessaddress2, { fieldConfig as businessAddress2Config } from './Fields/Businessaddress2';

import Businessaddress1, { fieldConfig as businessAddress1Config } from './Fields/Businessaddress1';

import Address7, { fieldConfig as address7Config } from './Fields/Address7';

import Address6, { fieldConfig as address6Config } from './Fields/Address6';

import Address5, { fieldConfig as address5Config } from './Fields/Address5';

import Address4, { fieldConfig as address4Config } from './Fields/Address4';

import Address3, { fieldConfig as address3Config } from './Fields/Address3';

import Address2, { fieldConfig as address2Config } from './Fields/Address2';

import Address1, { fieldConfig as address1Config } from './Fields/Address1';

import AddressType, { fieldConfig as addressTypeConfig } from './Fields/AddressType';

import Zipcode, { fieldConfig as zipCodeConfig } from './Fields/Zipcode';
import Businesszipcode, { fieldConfig as businessZipCodeConfig } from './Fields/Businesszipcode';
import Language, { fieldConfig as languageConfig } from './Fields/Language';

import EntityPOBusinessAddress, {
  fieldConfig as entityPOBusinessAddressConfig,
} from './Fields/EntityPOBusinessAddress';

import Currentaddress, { fieldConfig as currentAddressConfig } from './Fields/Currentaddress';

import Businessaddress, { fieldConfig as businessAddressConfig } from './Fields/Businessaddress';

import EntityPolicyOwnerBusinessAddress, {
  fieldConfig as EntityPolicyOwnerBusinessAddressConfig,
} from './Fields/EntityPolicyOwnerBusinessAddress';

import Addcontacttype, { fieldConfig as addContactTypeConfig } from './Fields/Addcontacttype';

import Addcontactno, { fieldConfig as addContactNoConfig } from './Fields/Addcontactno';

import Residentialaddress7, {
  fieldConfig as residentialAddress7Config,
} from './Fields/Residentialaddress7';

import Residentialaddress6, {
  fieldConfig as residentialAddress6Config,
} from './Fields/Residentialaddress6';

import Residentialaddress5, {
  fieldConfig as residentialAddress5Config,
} from './Fields/Residentialaddress5';

import Residentialaddress4, {
  fieldConfig as residentialAddress4Config,
} from './Fields/Residentialaddress4';

import Residentialaddress3, {
  fieldConfig as residentialAddress3Config,
} from './Fields/Residentialaddress3';

import Residentialaddress2, {
  fieldConfig as residentialAddress2Config,
} from './Fields/Residentialaddress2';

import Residentialaddress1, {
  fieldConfig as residentialAddress1Config,
} from './Fields/Residentialaddress1';

import Residentialaddress, {
  fieldConfig as residentialAddressConfig,
} from './Fields/Residentialaddress';

import Residentialzipcode, {
  fieldConfig as residentialZipCodeConfig,
} from './Fields/Residentialzipcode';

import Businessfulladdress, {
  fieldConfig as businessFullAddressConfig,
} from './Fields/Businessfulladdress';

import Entitycurrentofficeaddress, {
  fieldConfig as entityCurrentOfficeAddressConfig,
} from './Fields/Entitycurrentofficeaddress';

import CommunicationLane, {
  fieldConfig as communicationLaneConfig,
} from './Fields/CommunicationLane';

import CorrespondenceViaEmail, {
  fieldConfig as correspondenceViaEmailConfig,
} from './Fields/CorrespondenceViaEmail';

const localSectionConfig = {
  section: 'ContactInfo-Field',
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

    FulladdressConfig,

    emailConfig,

    telegramConfig,

    whatsAppConfig,

    phoneNoConfig,

    phonenoreadonlyConfig,

    workNumberConfig,

    homeNumberConfig,

    contactTypeConfig,

    contactNoConfig,

    countryCodeConfig,

    businessFullAddressConfig,

    entityCurrentOfficeAddressConfig,

    currentAddress7Config,

    currentAddress6Config,

    currentAddress5Config,

    currentAddress4Config,

    currentAddress3Config,

    currentAddress2Config,

    currentAddress1Config,

    currentZipCodeConfig,

    businessAddress7Config,

    businessAddress6Config,

    businessAddress5Config,

    businessAddress4Config,

    businessAddress3Config,

    businessAddress2Config,

    businessAddress1Config,

    address7Config,

    address6Config,

    address5Config,

    address4Config,

    address3Config,

    address2Config,

    address1Config,

    addressTypeConfig,

    zipCodeConfig,

    businessZipCodeConfig,

    currentAddressConfig,

    businessAddressConfig,

    entityPOBusinessAddressConfig,

    EntityPolicyOwnerBusinessAddressConfig,

    addContactTypeConfig,

    addContactNoConfig,

    residentialAddress7Config,

    residentialAddress6Config,

    residentialAddress5Config,

    residentialAddress4Config,

    residentialAddress3Config,

    residentialAddress2Config,

    residentialAddress1Config,

    residentialAddressConfig,

    residentialZipCodeConfig,

    communicationLaneConfig,

    correspondenceViaEmailConfig,

    languageConfig,
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
    section: 'ContactInfo-Field',
    localConfig,
  });
  return (
    <Section section="ContactInfo-Field" form={form} config={config}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { form, editable, section: 'ContactInfo-Field' })
      )}
    </Section>
  );
};

const Fields = {
  Fulladdress,

  Email,

  Telegram,

  Whatsapp,

  Phoneno,

  Phonenoreadonly,

  Worknumber,

  Homenumber,

  Contacttype,

  Contactno,

  Countrycode,

  Businessfulladdress,

  Entitycurrentofficeaddress,

  Currentaddress7,

  Currentaddress6,

  Currentaddress5,

  Currentaddress4,

  Currentaddress3,

  Currentaddress2,

  Currentaddress1,

  Currentzipcode,

  Businessaddress7,

  Businessaddress6,

  Businessaddress5,

  Businessaddress4,

  Businessaddress3,

  Businessaddress2,

  Businessaddress1,

  Address7,

  Address6,

  Address5,

  Address4,

  Address3,

  Address2,

  Address1,

  AddressType,

  Zipcode,

  Businesszipcode,

  Currentaddress,

  Businessaddress,

  EntityPOBusinessAddress,

  EntityPolicyOwnerBusinessAddress,

  Addcontacttype,

  Addcontactno,

  Residentialaddress7,

  Residentialaddress6,

  Residentialaddress5,

  Residentialaddress4,

  Residentialaddress3,

  Residentialaddress2,

  Residentialaddress1,

  Residentialaddress,

  Residentialzipcode,

  CommunicationLane,
  CorrespondenceViaEmail,
  Language,
};

export { Fields, localConfig };
export default Contactinfofield;
