import IndicatorLabelCode from '../enum/IndicatorLabelCode';

const labelBgClass = {
  [IndicatorLabelCode.SaleSubChannel]: 'saleSubChannel',
  [IndicatorLabelCode.GIOSIO]: 'gsIndicator',
  [IndicatorLabelCode.PayorPOrelation]: 'payorPOrelation',
};

export default (labelCode: string) => {
  return labelBgClass[labelCode] || 'defaultTagBg';
};
