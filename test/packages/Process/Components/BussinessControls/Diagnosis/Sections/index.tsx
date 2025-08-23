import React from 'react';
import BasicSection, { BasicSectionTitle } from 'process/Components/Section';
import { localSectionConfig, localConfig } from '../Config';
import SectionMAAdd from './MAAdd';
import SectionDCAdd from './DCAdd';
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
  namespaceType,
  id
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

export { SectionTitle, SectionDCAdd, SectionMAAdd, SectionBasic, localConfig };

export default Section;
