import React from 'react';
import BasicSection, { BasicSectionColumns, BasicSectionTitle } from 'process/Components/Section';
import { localSectionConfig, localConfig } from '../Config';
import SectionAdd from './Add';
import SectionBasic from './Basic';

const SectionColumns = ({
  render,
  layoutName,
  defaultExpand = false,
  showArrow,
  onArrow,
  expand,
}: any) => {
  return (
    <BasicSectionColumns
      localConfig={localConfig}
      localSectionConfig={localSectionConfig}
      render={render}
      layoutName={layoutName}
      defaultExpand={defaultExpand}
      showArrow={showArrow}
      onArrow={onArrow}
      expand={expand}
    />
  );
};

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
  invoiceId,
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
    id={invoiceId}
  />
);

export { SectionColumns, SectionTitle, SectionAdd, SectionBasic, localConfig };

export default Section;
