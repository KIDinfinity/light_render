const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'SerialClaim.Search',
  field: 'hospitalizationSequentialNo',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'HospitalizationSequenceNO',
    },
    editable: 'Y',

    visible: 'Y',
    required: 'N',
    maxLength: 9,
    'x-layout': {
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };
