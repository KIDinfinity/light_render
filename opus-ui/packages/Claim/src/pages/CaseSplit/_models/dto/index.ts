export { default as ISeriesNoObject } from './seriesNoOrigin';
export { default as ITabConfig } from './tabConfig';

export const ConfigModuleName = {
  SplitByIncident: 'incident',
  SplitBypolicy: 'policy',
  SplitWithCase: 'case',
};

export const ConfigSubModuleName = {
  Incident: 'incident',
  Treatment: 'treatment',
  BenefitType: 'benefit',
  Policy: 'policy',
  SplitWithOriginalCase: 'original',
  SplitWithCurrentCase: 'current',
};
