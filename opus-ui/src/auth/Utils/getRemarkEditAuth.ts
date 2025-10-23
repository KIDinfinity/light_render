import lodash from 'lodash';
import moment from 'moment';
import { LS, LSKey, SS, SSKey } from '@/utils/cache';
import Category from '../Constant/Category';
interface IParams {
  authorityCode?: string;
  caseCategory?: string;
  activityCode?: string;
  limitType?: string;
  limitValue?: string;
  assignee?: string;
}
function saveAuthLog(params: any, result: any, userId: any, assignee: any): void {
  const oldObj = SS.getItem(SSKey.AUTONOTIC);
  const newObj = lodash.isArray(oldObj) ? oldObj : [];
  SS.setItem(
    SSKey.AUTONOTIC,
    [
      ...newObj,
      {
        params,
        result,
        time: moment().format('L LTS'),
        userId,
        assignee,
      },
    ].splice(-10)
  );
}
export default (commonAuthorityList = [], params: IParams = {}, ...otherParams: IParams[]) => {
  //获取match assignee相关配置
  const userInfo = LS.getItem(LSKey.CURRENTUSER);
  const newParams: any = lodash.omit(params, ['assignee']);
  const object: any = lodash
    .chain(commonAuthorityList)
    .find({ ...newParams })
    // @ts-ignore
    .value();
  saveAuthLog(params, object, userInfo?.userId, params?.assignee);
  const isMatchUserAndAssignee =
    lodash.toLower(userInfo?.userId) === lodash.toLower(params?.assignee);
  const isInfoEdit = [Category.infoEdit].includes(object?.authorityCode);
  const isEnvoyEdit = [Category.envoyEdit, Category.envoySend].includes(object?.authorityCode);
  const isTaskEdit = [Category.taskEdit].includes(object?.authorityCode);
  const isAssigneeValid = object && object?.assigneeValid;
  const isRemarkValid = object && object?.remarkValid;
  const isEnvoyValid = object && object?.envoyValid;

  let remarkEditAuth = false;
  if (lodash.isArray(commonAuthorityList)) {
    // 这里正常来说，无即是有，如果找不到targetAuth，应该给true的。但之前的代码就给了默认的false，相当于无即是无
    // 不过因为后端也有做无即是有，所以这里无即是无没有实际影响。
    // 这次改动为了影响最小化，保留了这个无即是无的逻辑
    remarkEditAuth = otherParams.some(param => {
      const targetAuth = lodash.find(commonAuthorityList, param);
      return targetAuth?.result || false;
    })
  }

  //isRemarkValid为true，需要判断match assignee
  //isRemarkValid为true，那么必须要match上才能edit，返回true
  if (
    (isInfoEdit && isRemarkValid) ||
    (isEnvoyEdit && isEnvoyValid) ||
    (isTaskEdit && isAssigneeValid)
  ) {
    return isMatchUserAndAssignee && remarkEditAuth;
  } else {
    return remarkEditAuth;
  }
  return false;
};
