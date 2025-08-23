// export { default as ISeriesNoObject } from './seriesNoOrigin';
// export { default as ITabConfig } from './tabConfig';

export interface ISeriesNoObject {
  incidentList: any[];
}

interface ITabConfigItem {
  disabled?: boolean;
  able?: boolean;
}
export interface ITabConfig {
  splitTypeDef?: string;
  case?: ITabConfigItem;
  policy?: ITabConfigItem;
  incident?: ITabConfigItem;
  document?: ITabConfigItem;
  differentIncidentNo?: ITabConfigItem;
}


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
