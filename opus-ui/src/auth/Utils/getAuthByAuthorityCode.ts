import lodash from 'lodash';
import { MatchTypeEnum } from '@/auth/Constant';
interface IParams {
  authorityCode?: string;
}
interface MatchParams {
  type?: matchTypeEnum;
}
export default (
  commonAuthorityList = [],
  params: IParams = {},
  matchParam: MatchParams = { type: MatchTypeEnum.NoNeedExist }
) => {
  const object: any = lodash
    .chain(commonAuthorityList)
    .find({ ...params })
    .value();
  if (object && object?.result) {
    return true;
  }
  if (matchParam?.type === MatchTypeEnum.NoNeedExist && !object) {
    return true;
  }

  return false;
};
