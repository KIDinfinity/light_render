const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PopUpEditPayable.Treament',
  field: 'dateOfConsultation',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-consultation',
    },

    'x-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};;

export { localFieldConfig };