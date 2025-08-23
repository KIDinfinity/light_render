import lodash, { chain, isString, replace } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import { safeParseUtil } from '@/utils/utils';

/**
 * 根据任务的状态判断任务是否可以编辑，返回true表示不可编辑，返回false表示可编辑
 */
export function checkTaskIsUnEditableByTaskStatus(taskStatus) {
  const editable = ['todo', 'pending'];
  return !lodash.includes(editable, taskStatus);
}

/**
 * 根据任务的submissionChannel判断任务是否可以编辑，返回true表示不可编辑，返回false表示可编辑
 */
export function checkTaskIsUnEditableBySubmissionChannel(submissionChannel) {
  const editable = ['M'];
  return !lodash.includes(editable, submissionChannel);
}

/**
 * 根据viewOrder排序 for da
 * @param result claimdate
 */
export const sortClaimPayableList = (result: any) => {
  const claimPayableListMap = lodash.get(result, 'claimEntities.claimPayableListMap');
  return lodash
    .chain(claimPayableListMap)
    .sortBy((item) => item.viewOrder)
    .map((item) => item.id)
    .value();
};

/**
 * 根据viewOrder排序 for ap
 * @param result claimdate
 */
export const sortApIncidentDecisionList = (result: any) => {
  const apIncidentDecisionListMap = lodash.get(result, 'claimEntities.incidentDecisionListMap');
  return lodash
    .chain(apIncidentDecisionListMap)
    .sortBy((item) => item.viewOrder)
    .map((item) => item.id)
    .value();
};

/**
 * 将code转化为code-国际化
 * @param codes code字符
 * @param noCode 是否显示code字符
 */
export const transRemarkCodeToMsg = (codes: string, noCode?: boolean) => {
  if (!isString(codes) || !codes) return codes;
  const codesArray: string[] = codes?.replace(/\s*\d+\.\s*/g, '')?.split(';');
  return chain(codesArray)
    .compact()
    .map((code: string) => {
      // const codeTrim = trim(code);
      const name = formatMessageApi({ decline: code });

      return noCode || name === code ? name : `${code} - ${name}`;
    })
    .uniq()
    .join(';')
    .value();
};

/**
 * 将code转化为序号. code-国际化
 * @param codes code字符
 * @param noCode 是否显示code字符
 */
export const transRemarkCodeToOrderMsg = (codes: string, noCode?: boolean) => {
  let msg: string = transRemarkCodeToMsg(codes, noCode);
  if (lodash.isEmpty(msg) || !isString(msg)) return '';
  msg = lodash
    .chain(msg)
    .split(';')
    .map((item: string, idx: number) => {
      return `${item}`;
    })
    .join(';\n')
    .value();
  return `${msg};`;
};

/**
 * 校验是否显示错误icon
 * @param submited
 * @param obj
 */
export function handleShowErrorIcon(submited, obj) {
  if (submited) {
    const errors = formUtils.getErrorArray(obj);

    if (lodash.isArray(errors) && errors.length) {
      return true;
    }
  }
  return false;
}

export const formatRemarkText = (remark: string) =>
  replace(remark, /(;|^)[A-Z]+\d+(?=\s*?-)\s*?-+\s*/g, '$1');

/**
 * 检查snapshot的数据是否是正确的claim数据
 * @param response
 */
export const checkSnapshotRight = (response) => {
  const { success, resultData } = response;
  let checkResult = false;
  if (success && resultData) {
    const { dataValue } = resultData;
    const claimData = safeParseUtil(dataValue);
    if (
      typeof claimData?.id !== 'undefined' ||
      typeof claimData?.claimNo !== 'undefined' ||
      typeof claimData?.gmtCreate !== 'undefined' ||
      typeof claimData?.transId !== 'undefined'
    ) {
      checkResult = true;
    }
  }
  return checkResult;
};
