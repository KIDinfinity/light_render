import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import ReasonForLoading, { fieldConfig as reasonForLoadingConfig } from './Fields/ReasonForLoading';
import LoadingEMPeriod, { fieldConfig as loadingEMPeriodConfig } from './Fields/LoadingEMPeriod';
import LoadingExtraMortality, {
  fieldConfig as loadingExtraMortalityConfig,
} from './Fields/LoadingExtraMortality';
import LoadingFlatMortality, {
  fieldConfig as LoadingFlatMortalityConfig,
} from './Fields/LoadingFlatMortality';
import LoadingFMPeriod, { fieldConfig as LoadingFMPeriodConfig } from './Fields/LoadingFMPeriod';
import LoadingPMLoading, { fieldConfig as loadingPMLoadingConfig } from './Fields/LoadingPMLoading';
import LoadingPMPeriod, { fieldConfig as loadingPMPeriodConfig } from './Fields/LoadingPMPeriod';
import Remark, { fieldConfig as remarkConfig } from './Fields/Remark';
import LoadingReason, { fieldConfig as LoadingReasonConfig } from './Fields/LoadingReason';
import WaiveTerm, { fieldConfig as WaiveTermConfig } from './Fields/WaiveTerm';
import ReasonType, { fieldConfig as ReasonTypeConfig } from './Fields/ReasonType';
import ReasonTypeDetail, { fieldConfig as ReasonTypeDetailConfig } from './Fields/ReasonTypeDetail';

const localSectionConfig = {
  section: 'Loading-Field',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'N',
    'x-layout': {
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1600px
      xxl: {
        span: 24,
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
    reasonForLoadingConfig,
    loadingEMPeriodConfig,
    loadingExtraMortalityConfig,
    LoadingFlatMortalityConfig,
    LoadingFMPeriodConfig,
    loadingPMLoadingConfig,
    loadingPMPeriodConfig,
    remarkConfig,
    LoadingReasonConfig,
    WaiveTermConfig,
    ReasonTypeConfig,
    ReasonTypeDetailConfig,
  ],
  remote: true,
};

const Section = ({ section, form, children }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <FixedFieldLayout config={config}>{children}</FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const Loadingfield = ({ form, editable, children, coverageId, id }: any) => (
  <Section section="Loading-Field" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, coverageId, id, section: 'Loading-Field' })
    )}
  </Section>
);
const Fields = {
  ReasonForLoading,
  LoadingEMPeriod,
  LoadingExtraMortality,
  LoadingFlatMortality,
  LoadingFMPeriod,
  LoadingPMLoading,
  LoadingPMPeriod,
  Remark,
  LoadingReason,
  WaiveTerm,
  ReasonType,
  ReasonTypeDetail,
};

export { Fields, localConfig };
export default Loadingfield;
