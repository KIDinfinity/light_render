import { getVersion } from '../../components/VersionControl/Utils';

export default (state: any, action: any) => {
  const { versionList, transfer = true, id, isAudit } = action.payload;
  return {
    ...state,
    versionList: transfer ? getVersion({ versionList, id, isAudit }) : versionList,
  };
};
