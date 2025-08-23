const localFieldConfig = {
  section: 'paymentTrackDetail',
  field: 'payoutAmount',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.beneficiary.label.payment-amount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
