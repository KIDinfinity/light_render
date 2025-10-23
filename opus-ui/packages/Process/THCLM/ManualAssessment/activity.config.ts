const NAMESPACE = 'THCLMOfClaimAssessmentController';

const dateValidateConfig = [
  {
    domainId: 'insured',
    fieldId: 'dateTimeOfDeath',
    description: '死亡时间',
    sort: 999,
    // TODO 从配置化取（目前是从配置化复制的)
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.datetime-of-death',
    },
  },
  {
    domainId: 'incident',
    fieldId: 'incidentDate',
    description: '事故时间',
    sort: 2,
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.date-of-incident',
    },
  },
  {
    domainId: 'treatment',
    fieldId: 'dateOfConsultation',
    description: '就诊时间',
    sort: '4-7',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-consultation',
    },
  },
  {
    domainId: 'treatment',
    fieldId: 'dateOfAdmission',
    description: '入院时间',
    sort: 4,
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-admission',
    },
  },
  {
    domainId: 'treatment',
    fieldId: 'dateOfDischarge',
    description: '出院时间',
    sort: 7,
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-discharge',
    },
  },
  {
    domainId: 'treatment',
    fieldId: 'icuFromDate',
    description: 'icu开始时间',
    sort: 5,
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.form-date',
    },
  },
  {
    domainId: 'treatment',
    fieldId: 'icuToDate',
    description: 'icu结束时间',
    sort: 6,
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.to-date',
    },
  },
  {
    domainId: 'procedure',
    fieldId: 'operationDate',
    description: '手术时间',
    sort: '5-6',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-operation',
    },
  },
  {
    domainId: 'invoice',
    fieldId: 'invoiceDate',
    description: '费用时间',
    sort: '4-7',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.invoice-date',
    },
  },
];

export { NAMESPACE, dateValidateConfig };
