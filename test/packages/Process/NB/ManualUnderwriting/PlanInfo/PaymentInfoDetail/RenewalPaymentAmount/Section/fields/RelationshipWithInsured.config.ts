const localFieldConfig = {
  section: 'RenewalPaymentInfo-Table',
  field: 'relationshipWithLifeAssured',
  'field-props': {
    visible: 'N',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'RelationshipwithInsured',
    },
    'x-dict': { dictTypeCode: 'Dropdown_IND_Relationship' },
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
        span: 6,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 768px
      md: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 992px
      lg: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };
