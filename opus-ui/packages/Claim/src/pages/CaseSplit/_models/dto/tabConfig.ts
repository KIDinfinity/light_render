interface ITabConfigItem {
  disabled?: boolean;
  able?: boolean;
}
export default interface ITabConfig {
  splitTypeDef?: string;
  case?: ITabConfigItem;
  policy?: ITabConfigItem;
  incident?: ITabConfigItem;
  document?: ITabConfigItem;
  differentIncidentNo?: ITabConfigItem;
}
