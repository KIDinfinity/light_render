import type { EMemoStatus } from './enum';

const tupleStr = <T extends string[]>(...args: T) => args;

const dataTypeArr = tupleStr('reason', 'reminder');
type TData = (typeof dataTypeArr)[number];

const allowActions = tupleStr('Save', 'Waive', 'Resolve');
type TAllowActions = (typeof allowActions)[number];

const userInfoType = tupleStr('role', 'to');
type TUserInfoType = (typeof userInfoType)[number];

type MemoType = {
  id: string;
  memoCode?: string;
  memoDesc?: string;
  memoStatus?: EMemoStatus;
  medicalProviderCode?: string;
  pendingMemoSubInfoList?: {
    subTypeCode?: string;
    subRemark?: string;
  }[];
};
type ReasonGroupType = {
  id: string;
  groupCode: string;
  groupName: string;
  status?: string;
  handledReason?: string;
  startTime?: string;
  endTime?: string;
  envoyAuth: {
    envoyView: boolean;
    envoyEdit: boolean;
    envoySend: boolean;
  };
  reasonDetails: {
    pendingMemoList?: MemoType[];
    reasonCode?: string;
    groupId?: string;
    displayConfig?: {
      freeField?: boolean;
    };
  }[];
};

export { TData, TAllowActions, TUserInfoType, ReasonGroupType };
