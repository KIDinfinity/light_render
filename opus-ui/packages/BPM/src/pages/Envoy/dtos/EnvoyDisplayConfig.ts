interface ConfigItemParams {
  sort: number;
  visible: boolean;
  editable?: boolean;
  required?: boolean;
  custom?: any;
  dropDownList?: [];
}

interface IChannelConfig {
  channelInfo: ConfigItemParams;
  channelTpl: ConfigItemParams;
}

interface IChannelContent extends ConfigItemParams {
  children: {
    sms: IChannelConfig;
    letter: IChannelConfig;
    email: IChannelConfig;
    remark: IChannelConfig;
  };
}

interface IPolicyConfig extends ConfigItemParams {
  children: {
    policyList: ConfigItemParams;
    reasonList: ConfigItemParams;
    date: ConfigItemParams;
    channelContent: IChannelContent;
  };
}

interface IReminderConfig extends ConfigItemParams {
  children: {
    sendDay: ConfigItemParams;
    simpleSend: ConfigItemParams;
    channelSend: ConfigItemParams;
    envoyTo: ConfigItemParams;
    messageText: ConfigItemParams;
    dispatchDate: ConfigItemParams;
  };
}

interface ISubInfoConfigItem extends ConfigItemParams {
  multiple: boolean;
}

export interface MemoChildren {
  medicalProvider: ConfigItemParams;
  memoRemark: ConfigItemParams;
  subInfos: ISubInfoConfigItem;
  showRemark: ConfigItemParams;
  surveyCompany: ConfigItemParams;
  memoDesc: ConfigItemParams;
  subTypeCode: ConfigItemParams;
  memoClientRole: ConfigItemParams;
}

export interface PendingMemoConfig extends ConfigItemParams {
  children: MemoChildren;
  disableNewMemo: boolean;
}

export interface ReasonDisplayConfig {
  pendingMemo?: PendingMemoConfig;
  dateProcess: ConfigItemParams;
  retry: ConfigItemParams;
  envoyTo: ConfigItemParams;
  messageText: ConfigItemParams;
  channelTabs: ConfigItemParams;
  channelContent: IChannelContent;
  documents: ConfigItemParams;
  subcase: ConfigItemParams;
  dispatchDate: ConfigItemParams;
  policy: IPolicyConfig;
  attachment: ConfigItemParams;
  delayLetter: ConfigItemParams;
  define: ConfigItemParams;
  switch: ConfigItemParams;
  reminder: IReminderConfig;
  // ?
  memoClientRole?: boolean;
  // ?
  medicalProvider?: boolean;
  memoClientId?: boolean;
}
