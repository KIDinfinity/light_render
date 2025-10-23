import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import Ckaflag, { fieldConfig as ckaFlagConfig } from './Fields/Ckaflag';
import UnitsName, { fieldConfig as unitsNameConfig } from './Fields/UnitsName';
import Educationcode, { fieldConfig as educationCodeConfig } from './Fields/Educationcode';
import Employeraddressline1, {
  fieldConfig as employerAddressLine1Config,
} from './Fields/Employeraddressline1';
import Employeraddressline2, {
  fieldConfig as employerAddressLine2Config,
} from './Fields/Employeraddressline2';
import Employeraddressline3, {
  fieldConfig as employerAddressLine3Config,
} from './Fields/Employeraddressline3';
import Employeraddressline4, {
  fieldConfig as employerAddressLine4Config,
} from './Fields/Employeraddressline4';
import Employercountry, { fieldConfig as employerCountryConfig } from './Fields/Employercountry';
import Employerzipcode, { fieldConfig as employerZipCodeConfig } from './Fields/Employerzipcode';
import Employmentstatus, { fieldConfig as employmentStatusConfig } from './Fields/Employmentstatus';
import Englishproficiency, {
  fieldConfig as englishProficiencyConfig,
} from './Fields/Englishproficiency';
import Positiondescription, {
  fieldConfig as positionDescriptionConfig,
} from './Fields/Positiondescription';
import Natureofbusiness, { fieldConfig as natureOfBusinessConfig } from './Fields/Natureofbusiness';
import Occupationclass, { fieldConfig as occupationClassConfig } from './Fields/Occupationclass';
import Occupationcode, { fieldConfig as occupationCodeConfig } from './Fields/Occupationcode';
import OccupationSubGroup, {
  fieldConfig as occupationSubGroupConfig,
} from './Fields/OccupationSubGroup';
import Occupationgroup, { fieldConfig as occupationGroupConfig } from './Fields/Occupationgroup';
import Position, { fieldConfig as positionConfig } from './Fields/Position';
import Nameofbusinessemployer, {
  fieldConfig as nameOfBusinessEmployerConfig,
} from './Fields/Nameofbusinessemployer';
import Occupation, { fieldConfig as occupationConfig } from './Fields/Occupation';
import OccupationSector, { fieldConfig as occupationSectorConfig } from './Fields/OccupationSector';
import Nonincomeearnertype, {
  fieldConfig as nonIncomeEarnerTypeConfig,
} from './Fields/Nonincomeearnertype';
import EntityAffiliation, {
  fieldConfig as EntityAffiliationConfig,
} from './Fields/EntityAffiliation';
import ExactAffiliation1, {
  fieldConfig as ExactAffiliation1Config,
} from './Fields/ExactAffiliation1';
import ExactAffiliation2, {
  fieldConfig as ExactAffiliation2Config,
} from './Fields/ExactAffiliation2';
import IndustryAffiliation1, {
  fieldConfig as IndustryAffiliation1Config,
} from './Fields/IndustryAffiliation1';
import IndustryAffiliation2, {
  fieldConfig as IndustryAffiliation2Config,
} from './Fields/IndustryAffiliation2';
import StaffId, { fieldConfig as StaffIdConfig } from './Fields/StaffId';

const localSectionConfig = {
  section: 'BackgroundInfo-Field',
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
    localSectionConfig,
    educationCodeConfig,
    englishProficiencyConfig,
    ckaFlagConfig,
    occupationGroupConfig,
    occupationClassConfig,
    occupationCodeConfig,
    occupationSubGroupConfig,
    employmentStatusConfig,
    positionConfig,
    positionDescriptionConfig,
    unitsNameConfig,
    employerCountryConfig,
    employerZipCodeConfig,
    employerAddressLine1Config,
    employerAddressLine2Config,
    employerAddressLine3Config,
    employerAddressLine4Config,
    natureOfBusinessConfig,
    nameOfBusinessEmployerConfig,
    occupationConfig,
    occupationSectorConfig,
    nonIncomeEarnerTypeConfig,
    EntityAffiliationConfig,
    ExactAffiliation1Config,
    ExactAffiliation2Config,
    IndustryAffiliation1Config,
    IndustryAffiliation2Config,
    StaffIdConfig,
  ],
  remote: true,
};

const Section = ({ section, form, children }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });

  const disableFieldsConditions = useGetFieldsFieldsDisableConditionConfig();
  const configByDisableCondition = config.map((item) => {
    const configItem = getApplicableByDisableCondidtions({
      fieldConfig: item,
      disableFieldsConditions,
      condition: 'proposal',
    });
    return configItem;
  });
  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <FixedFieldLayout config={configByDisableCondition}>{children}</FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const Backgroundinfofield = ({ form, editable, children }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'BackgroundInfo-Field',
    localConfig,
  });
  return (
    <Section section="BackgroundInfo-Field" form={form} config={config}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { form, editable, section: 'BackgroundInfo-Field' })
      )}
    </Section>
  );
};
const Fields = {
  Educationcode,
  Englishproficiency,
  Ckaflag,
  Occupationgroup,
  Occupationclass,
  Occupationcode,
  OccupationSubGroup,
  Employmentstatus,
  Position,
  Positiondescription,
  UnitsName,
  Employercountry,
  Employerzipcode,
  Employeraddressline1,
  Employeraddressline2,
  Employeraddressline3,
  Employeraddressline4,
  Natureofbusiness,
  Nameofbusinessemployer,
  Occupation,
  OccupationSector,
  Nonincomeearnertype,
  EntityAffiliation,
  ExactAffiliation1,
  ExactAffiliation2,
  IndustryAffiliation1,
  IndustryAffiliation2,
  StaffId,
};

export { Fields, localConfig };
export default Backgroundinfofield;
