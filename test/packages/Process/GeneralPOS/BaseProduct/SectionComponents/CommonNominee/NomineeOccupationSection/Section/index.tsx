import React from 'react';
import Fields, { localFieldConfigs as FieldConfigs } from './Fields';
import useGetSectionAtomConfigByRemote from 'basic/components/Elements/hooks/useGetSectionAtomConfigByRemote';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import BusinessSection from '../../Section';
import lodash from 'lodash';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Nominee-Occupation',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'Nominee-Occupation',
    },
    visible: 'C',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
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
  configs: [localSectionConfig, ...FieldConfigs],
  remote: true, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
};

interface IProps {
  form?: any;
  layoutName?: string;
  readOnly?: boolean;
  icon?: any;
  transactionId?: string;
  clientSeq?: number;
  formId?: string;
}

const Section = (props: IProps) => {
  const { form, formId, readOnly, layoutName = 'x-layout', icon = 'profile', ...resProps } = props;
  const config = useGetSectionAtomConfigByRemote({
    section: 'Nominee-Occupation',
    localConfig,
  });

  const editable = useSectionEditable(EditSectionCodeEnum.CommonNominee, readOnly);

  return (
    <BusinessSection
      config={config}
      form={form}
      editable={editable}
      layoutName={layoutName}
      readOnly={readOnly}
      icon={icon}
      formId={formId}
    >
      {lodash.map(Fields, (field) => {
        return React.createElement(field, { key: field.displayName, ...resProps });
      })}
    </BusinessSection>
  );
};

export { Fields, localConfig, localSectionConfig };
export default Section;
