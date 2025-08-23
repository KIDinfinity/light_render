import React from 'react';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { TableBusinessSection, BusinessSection } from '../../Section';
import lodash from 'lodash';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import Fields, { localFieldConfigs as FieldConfigs } from './Fields';
import useGetSectionAtomConfigByRemote from 'basic/components/Elements/hooks/useGetSectionAtomConfigByRemote';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Nominee-Contact',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'AddressChangeInfo',
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
  remote: true,
};

interface IProps {
  form?: any;
  layoutName?: string;
  readOnly?: boolean;
  icon?: any;
  transactionId?: string;
  clientSeq?: number;
  tableCollect?: any;
  formId?: string;
  children?: any[];
}

const Section = (props: IProps) => {
  const { form, formId, readOnly, layoutName = 'x-layout', icon = 'contacts', ...resProps } = props;
  const config = useGetSectionAtomConfigByRemote({
    section: 'Nominee-Contact',
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
        return React.createElement(field, { ...resProps });
      })}
    </BusinessSection>
  );
};

const TableSection = (props: IProps) => {
  const {
    form,
    readOnly,
    layoutName = 'x-layout',
    icon = 'contacts',
    tableCollect,
    children,
    ...resProps
  } = props;
  const config = useGetSectionAtomConfigByRemote({
    section: 'Nominee-Contact',
    localConfig,
  });

  const editable = useSectionEditable(EditSectionCodeEnum.CommonNominee, readOnly);

  return (
    <TableBusinessSection
      config={config}
      form={form}
      editable={editable}
      layoutName={layoutName}
      readOnly={readOnly}
      icon={icon}
      tableCollect={tableCollect}
    >
      {React.Children.map(children, (child: any) => React.cloneElement(child, { ...resProps }))}
    </TableBusinessSection>
  );
};

const FieldSection = (props: IProps) => {
  const {
    children,
    form,
    readOnly,
    layoutName = 'x-layout',
    icon = 'contacts',
    transactionId,
    clientSeq,
  } = props;
  const config = useGetSectionAtomConfigByRemote({
    section: 'Nominee-Contact',
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
    >
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { transactionId, clientSeq })
      )}
    </BusinessSection>
  );
};

export { Fields, localConfig, localSectionConfig, TableSection, FieldSection };
export default Section;
