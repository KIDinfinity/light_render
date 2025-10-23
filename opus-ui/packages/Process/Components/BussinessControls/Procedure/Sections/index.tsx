import React from 'react';
import BasicSection, { BasicSectionTitle } from 'process/Components/Section';
import { localSectionConfig, localConfig } from '../Config';
import SectionAdd from './Add';
import SectionICU from './ICU';
import SectionBasic from './Basic';
import SectionMainBenefit from './MainBenefit';

const SectionTitle = ({ prefix, suffix }: any) => {
  return (
    <BasicSectionTitle
      localSectionConfig={localSectionConfig}
      localConfig={localConfig}
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
  register,
  id,
  NAMESPACE,
  namespaceType,
}: any) => (
  <BasicSection
    form={form}
    editable={editable}
    children={children}
    localConfig={localConfig}
    layoutName={layoutName}
    section={section}
    register={register}
    id={id}
    NAMESPACE={NAMESPACE}
    namespaceType={namespaceType}
  />
);

export { SectionTitle, SectionAdd, SectionICU, SectionBasic, SectionMainBenefit, localConfig };

export default Section;
