import React from 'react';
import { ElementConfig } from 'basic/components/Form';
import FormSection from './FormSection';

const BasicSectionColumns = ({
  render,
  layoutName,
  defaultExpand = false,
  showArrow,
  onArrow,
  expand,
  localConfig,
  localSectionConfig,
}: any) => (
  <ElementConfig.SectionColumns
    section={localSectionConfig.section}
    config={localConfig}
    render={render}
    layoutName={layoutName}
    showArrow={showArrow}
    defaultExpand={defaultExpand}
    onArrow={onArrow}
    expand={expand}
  />
);

const BasicSectionTitle = ({ localSectionConfig, localConfig, prefix, suffix }: any) => {
  return (
    <ElementConfig.SectionTitle
      section={localSectionConfig.section}
      config={localConfig}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

const BasicSection = ({
  form,
  editable,
  children,
  localConfig,
  layoutName,
  section,
  register,
  NAMESPACE,
  id,
  ...rest
}: any) => (
  <FormSection
    section={section}
    layoutName={layoutName}
    form={form}
    register={register}
    localConfig={localConfig}
  >
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section, NAMESPACE, id, ...rest })
    )}
  </FormSection>
);

export { BasicSectionColumns, BasicSectionTitle };

export default BasicSection;
