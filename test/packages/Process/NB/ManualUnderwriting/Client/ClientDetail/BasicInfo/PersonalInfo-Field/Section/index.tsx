import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import Height, { fieldConfig as heightConfig } from './Fields/Height';
import Weight, { fieldConfig as weightConfig } from './Fields/Weight';
import Bmi, { fieldConfig as bmiConfig } from './Fields/Bmi';
import Customerage, { fieldConfig as customerAgeConfig } from './Fields/Customerage';
import Dateofbirth, { fieldConfig as dateOfBirthConfig } from './Fields/Dateofbirth';
import Gender, { fieldConfig as genderConfig } from './Fields/Gender';
import Identityno, { fieldConfig as identityNoConfig } from './Fields/Identityno';
import Identitytype, { fieldConfig as identityTypeConfig } from './Fields/Identitytype';
import CustomerMrgStatus, {
  fieldConfig as customerMrgStatusConfig,
} from './Fields/CustomerMrgStatus';
import Race, { fieldConfig as raceConfig } from './Fields/Race';
import Ethnic, { fieldConfig as ethnicConfig } from './Fields/Ethnic';
import Preferredname, { fieldConfig as preferredNameConfig } from './Fields/Preferredname';
import Smokinghabit, { fieldConfig as smokingHabitConfig } from './Fields/Smokinghabit';
import Title, { fieldConfig as titleConfig } from './Fields/Title';
import CompanyRegistrationNumber, {
  fieldConfig as companyRegistrationNumberConfig,
} from './Fields/Companyregistrationnumber';
import CompanyRegistrationNoOld, {
  fieldConfig as companyRegistrationNoOldConfig,
} from './Fields/Companyregistrationnoold';
import DateOfRegistration, {
  fieldConfig as dateOfRegistrationConfig,
} from './Fields/Dateofregistration';
import Customerenfirstname, {
  fieldConfig as customerEnFirstNameConfig,
} from './Fields/Customerenfirstname';

import Customerensurname, {
  fieldConfig as customerEnSurnameConfig,
} from './Fields/Customerensurname';

import Beneficiaryseqnum, {
  fieldConfig as beneficiarySeqNumConfig,
} from './Fields/Beneficiaryseqnum';

import Beneficiarytype, { fieldConfig as beneficiaryTypeConfig } from './Fields/Beneficiarytype';

import Share, { fieldConfig as shareConfig } from './Fields/Share';

import Customerenname, { fieldConfig as customerEnNameConfig } from './Fields/Customerenname';

import Name, { fieldConfig as NameConfig } from './Fields/Name';

import EntityPolicyOwnerName, {
  fieldConfig as EntityPolicyOwnerNameConfig,
} from './Fields/EntityPolicyOwnerName';

import Expirydate, { fieldConfig as expiryDateConfig } from './Fields/Expirydate';

import Secondaryidentitytype, {
  fieldConfig as secondaryIdentityTypeConfig,
} from './Fields/Secondaryidentitytype';

import Secondaryidentityno, {
  fieldConfig as secondaryIdentityNoConfig,
} from './Fields/Secondaryidentityno';

import Secondaryidentityexpirydate, {
  fieldConfig as secondaryIdentityExpiryDateConfig,
} from './Fields/Secondaryidentityexpirydate';

import Designation, { fieldConfig as designationConfig } from './Fields/Designation';

import Tinsssgsis, { fieldConfig as tinsssgsisConfig } from './Fields/Tinsssgsis';

import Tinsssgsisno, { fieldConfig as tinsssgsisNoConfig } from './Fields/Tinsssgsisno';

import Customerentitle, { fieldConfig as customerEnTitleConfig } from './Fields/Customerentitle';

import Customerenextensionname, {
  fieldConfig as customerEnExtensionNameConfig,
} from './Fields/Customerenextensionname';

import Customerenmiddlename, {
  fieldConfig as customerEnMiddleNameConfig,
} from './Fields/Customerenmiddlename';

import Ctfexpirydate, { fieldConfig as ctfExpiryDateConfig } from './Fields/Ctfexpirydate';

import Ctfcountrycode, { fieldConfig as ctfCountryCodeConfig } from './Fields/Ctfcountrycode';

import Ctfidentitytype, { fieldConfig as ctfIdentityTypeConfig } from './Fields/Ctfidentitytype';

import Ctfid, { fieldConfig as ctfIdConfig } from './Fields/Ctfid';
import Firstname, { fieldConfig as firstNameConfig } from './Fields/Firstname';

import Surname, { fieldConfig as surnameConfig } from './Fields/Surname';

import Middlename, { fieldConfig as middleNameConfig } from './Fields/Middlename';

import Extensionname, { fieldConfig as extensionNameConfig } from './Fields/Extensionname';

import Trusteename, { fieldConfig as trusteeNameConfig } from './Fields/Trusteename';

import MotherMaidenName, { fieldConfig as motherMaidenNameConfig } from './Fields/Mothermaidenname';

import NPWP, { fieldConfig as NPWPConfig } from './Fields/NPWP';

import Religion, { fieldConfig as religionConfig } from './Fields/Religion';

import CtfStartDate, { fieldConfig as ctfStartDateConfig } from './Fields/CtfStartDate';

import IsOCRIdCard, { fieldConfig as isOCRIdCardConfig } from './Fields/IsOCRIdCard';

import AdditionalIdentificationNumber, {
  fieldConfig as additionalIdentificationNumberConfig,
} from './Fields/AdditionalIdentificationNumber';

import AdditionalIdentificationType, {
  fieldConfig as additionalIdentificationTypeConfig,
} from './Fields/AdditionalIdentificationType';

const localSectionConfig = {
  section: 'PersonalInfo-Field',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'N',
    required: 'C',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1600px
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
    additionalIdentificationNumberConfig,

    additionalIdentificationTypeConfig,

    ctfStartDateConfig,

    localSectionConfig,

    genderConfig,

    customerAgeConfig,

    dateOfBirthConfig,

    titleConfig,

    preferredNameConfig,

    motherMaidenNameConfig,

    identityTypeConfig,

    identityNoConfig,

    heightConfig,

    weightConfig,

    bmiConfig,

    smokingHabitConfig,

    customerMrgStatusConfig,

    customerEnFirstNameConfig,

    customerEnSurnameConfig,

    beneficiarySeqNumConfig,

    beneficiaryTypeConfig,

    shareConfig,

    customerEnNameConfig,
    NameConfig,

    NameConfig,

    EntityPolicyOwnerNameConfig,

    expiryDateConfig,

    secondaryIdentityTypeConfig,

    secondaryIdentityNoConfig,

    secondaryIdentityExpiryDateConfig,

    designationConfig,

    tinsssgsisConfig,

    tinsssgsisNoConfig,

    customerEnTitleConfig,

    customerEnExtensionNameConfig,

    customerEnMiddleNameConfig,
    ctfExpiryDateConfig,

    ctfCountryCodeConfig,

    ctfIdentityTypeConfig,

    ctfIdConfig,

    firstNameConfig,

    surnameConfig,

    middleNameConfig,

    extensionNameConfig,

    trusteeNameConfig,

    NPWPConfig,

    religionConfig,

    companyRegistrationNumberConfig,

    companyRegistrationNoOldConfig,

    dateOfRegistrationConfig,

    isOCRIdCardConfig,

    raceConfig,

    ethnicConfig,
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

const Personalinfofield = ({ form, editable, children }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'PersonalInfo-Field',
    localConfig,
  });
  return (
    <Section section="PersonalInfo-Field" form={form} config={config}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { form, editable, section: 'PersonalInfo-Field' })
      )}
    </Section>
  );
};

const Fields = {
  AdditionalIdentificationNumber,

  AdditionalIdentificationType,

  CtfStartDate,

  Gender,

  Customerage,

  Dateofbirth,

  Title,

  Preferredname,

  MotherMaidenName,

  Identitytype,

  Identityno,

  Height,

  Weight,

  Bmi,

  Smokinghabit,

  CustomerMrgStatus,

  Customerensurname,

  Customerenfirstname,

  Beneficiaryseqnum,

  Beneficiarytype,

  Share,

  Customerenname,

  Name,

  EntityPolicyOwnerName,

  Expirydate,

  Secondaryidentitytype,

  Secondaryidentityno,

  Secondaryidentityexpirydate,

  Designation,

  Tinsssgsis,

  Tinsssgsisno,

  Customerentitle,

  Customerenextensionname,

  Customerenmiddlename,
  Ctfexpirydate,

  Ctfcountrycode,

  Ctfidentitytype,

  Ctfid,

  Firstname,

  Surname,

  Middlename,

  Extensionname,

  Trusteename,

  NPWP,

  Religion,

  CompanyRegistrationNumber,

  CompanyRegistrationNoOld,

  DateOfRegistration,

  IsOCRIdCard,

  Race,

  Ethnic,
};

export { Fields, localConfig };
export default Personalinfofield;
