const tupleStr = <T extends string[]>(...args: T) => args;

const dataTypeArr = tupleStr('reason', 'reminder');
type TData = typeof dataTypeArr[number];

const allowActions = tupleStr('Save', 'Waive', 'Resolve');
type TAllowActions = typeof allowActions[number];

const userInfoType = tupleStr('role', 'to');
type TUserInfoType = typeof userInfoType[number];

export { TData, TAllowActions, TUserInfoType };
