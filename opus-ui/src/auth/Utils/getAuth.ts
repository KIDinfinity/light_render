import lodash from 'lodash';
import moment from 'moment';
import { LS, LSKey, SS, SSKey } from '@/utils/cache';
import Category from '../Constant/Category';

/**
 * @params
 * @param authorityCode
 * @param caseCategory
 * @param activityCode
 * @param limitType
 * @param limitValue
 * @param assignee
 */

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

export default function async(commonAuthorityList = [], params: IParams = {}) {
  const userInfo = LS.getItem(LSKey.CURRENTUSER);
  const newParams: any = lodash.omit(params, ['assignee']);
  const object: any = lodash
    .chain(commonAuthorityList)
    .find({ ...newParams })
    // @ts-ignore
    .value();

  // save log
  saveAuthLog(params, object, userInfo?.userId, params?.assignee);

  const isMatchUserAndAssignee =
    lodash.toLower(userInfo?.userId) === lodash.toLower(params?.assignee);
  const isInfoEdit = [Category.infoEdit].includes(object?.authorityCode);
  const isEnvoyEdit = [Category.envoyEdit, Category.envoySend].includes(object?.authorityCode);
  const isTaskEdit = [Category.taskEdit].includes(object?.authorityCode);
  const isAssigneeValid = object && object?.assigneeValid;
  const isRemarkValid = object && object?.remarkValid;
  const isEnvoyValid = object && object?.envoyValid;

  // result是false没权限
  if (object?.result === false) {
    return false;
  }

  // 根据valid判断user等于assignee
  if (
    (isInfoEdit && isRemarkValid) ||
    (isEnvoyEdit && isEnvoyValid) ||
    (isTaskEdit && isAssigneeValid)
  ) {
    return isMatchUserAndAssignee;
  }

  // 其余有权限
  return true;
}
