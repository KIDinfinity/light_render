import React from 'react';
import BasicSection, { BasicSectionTitle } from 'process/Components/Section';
import { localSectionConfig, localConfig } from '../Config';
import SectionAdd from './Add';
import SectionBasic from './Basic';
import SectionCheck from './Check';
import SectionHeader from './Header';

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
  namespaceType,
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
    namespaceType={namespaceType}
    id={id}
  />
);

export { SectionTitle, SectionAdd, SectionBasic, SectionCheck, SectionHeader, localConfig };

export default Section;
