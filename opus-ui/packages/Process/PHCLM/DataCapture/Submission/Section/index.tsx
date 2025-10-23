import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FixedFieldLayout, FormRegister } from 'basic/components/Form';
import Fields, { localFieldConfigs as FieldConfigs } from './Fields';

// const localSectionConfig = {
//   atomGroupCode: 'BP_PAPER_CTG002.BP_PAPER_CTG002',
//   caseCategory: 'BP_PAPER_CTG002',
//   activityCode: 'BP_PAPER_CTG002',
//   section: 'SubmissionInfo',
//   'section-props': {
//     visible: 'Y',
//     'x-layout': {
//       // 480px
//       xs: {
//         span: 24,
//         offset: 0,
//         pull: 0,
//         order: 1,
//       },
//       // 576px
//       sm: {
//         span: 24,
//         offset: 0,
//         pull: 0,
//         order: 1,
//       },
//       // 768px
//       md: {
//         span: 24,
//         offset: 0,
//         pull: 0,
//         order: 1,
//       },
//       // 992px
//       lg: {
//         span: 24,
//         offset: 0,
//         pull: 0,
//         order: 1,
//       },
//       // 1200px
//       xl: {
//         span: 24,
//         offset: 0,
//         pull: 0,
//         order: 1,
//       },
//       // 1600px
//       xxl: {
//         span: 24,
//         offset: 0,
//         pull: 0,
//         order: 1,
//       },
//     },
//   },
// };

const localConfig = {
  configs: [...FieldConfigs],
  remote: false,
};

const SectionLayout = ({ config, layoutName, form, children }: any) => (
  <FixedFieldLayout config={config} layoutName={layoutName} form={form}>
    {children}
  </FixedFieldLayout>
);

const FormSection = ({ form, section, layoutName, register, children }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <div>
      <FormRegister form={form} register={register}>
        <Form layout="vertical">
          <SectionLayout layoutName={layoutName} form={form} config={config}>
            {children}
          </SectionLayout>
        </Form>
      </FormRegister>
    </div>
  );
};

const Section = ({
  form,
  editable,
  children,
  layoutName,
  section,
  register,
  isHideBgColor,
}: any) => (
  <FormSection
    section={section}
    layoutName={layoutName}
    form={form}
    register={register}
    isHideBgColor={isHideBgColor}
  >
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);

export { Fields, localConfig };

export default Section;
