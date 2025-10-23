import React from 'react';
import { FormItemInput } from 'basic/components/Form';

const localFieldConfig = {
  caseCategory: 'JP_CLM_CTG006',
  activityCode: 'JP_CLM_003',
  section: 'ServiceAgent',
  field: 'branchCode',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'BranchAgent',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };

const BranchCode = (props: any) => {
  return <FormItemInput {...props} />;
};

BranchCode.displayName = localFieldConfig.field;

export default BranchCode;
