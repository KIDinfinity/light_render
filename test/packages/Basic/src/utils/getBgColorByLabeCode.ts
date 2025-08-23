import IndicatorLabelCode from '../enum/IndicatorLabelCode';

const labelBgClass = {
  [IndicatorLabelCode.SaleSubChannel]: 'saleSubChannel',
  [IndicatorLabelCode.GIOSIO]: 'gsIndicator',
  [IndicatorLabelCode.PayorPOrelation]: 'payorPOrelation',
  [IndicatorLabelCode.SubsidiaryPolicy]: 'PrimaryPolicy',
  [IndicatorLabelCode.PrimaryPolicy]: 'PrimaryPolicy',
  [IndicatorLabelCode.IntermediaryStatus]: 'IntermediaryStatus',
  [IndicatorLabelCode.VIPService]: 'VIPService',
};

export default (labelCode: string) => {
  return labelBgClass[labelCode] || 'defaultTagBg';
};
