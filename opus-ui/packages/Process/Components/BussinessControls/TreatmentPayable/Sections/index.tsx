import React from 'react';
import BasicSection, { BasicSectionTitle } from 'process/Components/Section';
import { localSectionConfig, localConfig } from '../Config';
import SectionBasic from './Basic';

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
  NAMESPACE,
  id,
}: any) => (
  <BasicSection
    form={form}
    editable={editable}
    children={children}
    localConfig={localConfig}
    layoutName={layoutName}
    section={section}
    register={register}
    NAMESPACE={NAMESPACE}
    id={id}
  />
);

export { SectionTitle, SectionBasic, localConfig };

export default Section;
