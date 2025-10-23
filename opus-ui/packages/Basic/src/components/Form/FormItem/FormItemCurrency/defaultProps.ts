export default {
  disabled: false,
  required: false,
  rules: [],
  pattern: /^\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g,
  isShowCalculation: false,
  labelId: undefined,
  min: Number.MIN_VALUE,
  max: Number.MAX_VALUE,
  labelTypeCode: 'Label_BIZ_Claim',
  validateTrigger: 'onChange',
}
