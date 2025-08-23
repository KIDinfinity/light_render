export default ({
  changedFieldsKey,
  originOwbLoadingCode,
}: {
  changedFieldsKey: string;
  originOwbLoadingCode: string;
}) => {
  switch (changedFieldsKey) {
    case 'extraMortality':
    case 'emPeriod':
      return 'EM';
    case 'flatMortality':
    case 'fmPeriod':
      return 'FM';
    case 'pmLoading':
    case 'pmPeriod':
      return 'PM';
    default:
      return originOwbLoadingCode;
  }
};
