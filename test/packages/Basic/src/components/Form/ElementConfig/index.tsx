import React from 'react';
import FieldConfig from './FieldConfig';
import SectionConfig from './SectionConfig';
import SectionTitle from './SectionTitle';
import ActivityLayout from './ActivityLayout';
import SectionColumns from './SectionColumns';

const ElementConfig = ({ children }: any) => {
  return <>{children}</>;
};

ElementConfig.Field = FieldConfig;
ElementConfig.Section = SectionConfig;
ElementConfig.SectionTitle = SectionTitle;
ElementConfig.ActivityLayout = ActivityLayout;
ElementConfig.SectionColumns = SectionColumns;

export default ElementConfig;
