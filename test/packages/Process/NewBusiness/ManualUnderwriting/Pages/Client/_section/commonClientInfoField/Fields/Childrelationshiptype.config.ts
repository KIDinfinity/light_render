export const fieldConfig = {
  section: 'CommonClientInfo-Field',
  field: 'childRelationshipType',
  fieldType: 'Dropdown',
  'field-props': {
     editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
     label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'BioNonBioChildRelation',
 },
     expand: 'Y',
    required: 'N',
     visible: 'C',
    'x-layout': {
      // 480px
      xs: {
         span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 768px
      md: {
         span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 992px
      lg: {
         span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1200px
      xl: {
       span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1600px
      xxl: {
         span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_IND_BioChild',
    },
  },
};
