import React from 'react';
import { FixedFieldLayout } from 'basic/components/Form';

const SectionLayout = ({ config, layoutName, form, children }: any) => (
  <FixedFieldLayout config={config} layoutName={layoutName} form={form}>
    {children}
  </FixedFieldLayout>
);

export default SectionLayout;
