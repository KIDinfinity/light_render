import {
  get,
  isString,
  isPlainObject,
  pick,
  entries,
  orderBy,
  cloneDeep,
  has,
  isEmpty,
  isArray,
  keys,
  merge,
  isNumber,
  isBoolean,
  findKey,
  find,
  isFunction,
} from 'lodash';
import moment from 'moment';
import { InqueryTypes } from '@/dtos/InqueryTypes';
import MapInqueryDataFields from '@/dtos/MapInqueryDataFields';
import tenant from '@/components/Tenant/tenantObj';
import { px2rem } from '@/utils/responsiveUtils';

/**
 * 判断值是否为moment对象
 * @param val 疑似moment对象
 */
export const isMomentObject = (val: any) => {
  if (Array.isArray(val) && val.length > 0) {
    return val.every((item: any) => moment.isMoment(item));
  }
  return moment.isMoment(val);
};

/**
 * 获取字段排序的方式，asc：顺序，desc：倒序
 * @param params 收录查询字段的对象
 * @param sortName 当前排序的字段
 */
export const sortOrderType = (params: any, sortName: string) => {
  if (!isPlainObject(params) || !isString(sortName)) return 'asc';
  // const sortValue = params[sortName];

  // return isMomentObject(sortValue) || sortName === 'businessNo' || sortName === 'claimNo'
  //   ? 'desc'
  //   : 'asc';

  return sortName === 'businessNo' || sortName === 'claimNo' ? 'desc' : 'asc';
};

/**
 * hard code一些无需用户输入但有默认值的参数（由于没有明确的识别符，且是不可预知的，故hard code）
 */
export const constantFields: string[] = ['organization_code'];

/**
 * 过滤一些无需用户输入但有默认值的参数
 *
 * 1.找到所有可能出现无需用户输入，但程序会给默认值的参数对应的fieldName；
 * 2.从sequences中找到步骤1中对应的配置项（通过fieldName进行匹配），
 *    1>值存在则表示配置该查询条件用户可输入
 *    2>值不存在则表示用户不可输入，但程序会给默认值，需要排除
 *
 * @param sequences 从配置信息中获取的带有sequence排序优先级的数据
 * @param curParamKey 当前参数名
 * @param queryType 查询的类型，如case，task，user...
 */
export const guardConstantFields = (sequences: any[], curParamKey: string, queryType: string) => {
  const { BE2DataBase, FieldName2DataBase } = MapInqueryDataFields[queryType];
  const fieldNameKeys = constantFields.map((constantField) =>
    findKey(FieldName2DataBase, (item) => constantField === item)
  );

  return constantFields.includes(BE2DataBase[curParamKey])
    ? !!find(sequences, (sequence: any) => fieldNameKeys.includes(sequence.fieldName))
    : true;
};

/**
 * 获取用户已经输入的字段
 * @param params 收录查询字段的对象
 */
export const getInputedFields = (params: any, sequences: any[], queryType: string) => {
  const tempParams = cloneDeep(params);
  if (has(tempParams, 'tabIndex')) {
    delete tempParams.tabIndex;
  }
  if (has(tempParams, 'mode')) {
    delete tempParams.mode;
  }
  if (has(tempParams, 'regionCode')) {
    delete tempParams.regionCode;
  }

  return entries(tempParams).filter((item: any[]) => {
    return (
      isNumber(item[1]) ||
      isBoolean(item[1]) ||
      (guardConstantFields(sequences, item[0], queryType) && item[1] && !isEmpty(item[1]))
    );
  });
};

/**
 * 根据通用排序规则进行预处理
 * @param postData 查询接口的入参
 * @param sequences 从配置信息中获取的带有sequence排序优先级的数据
 */
export const sortRuleCommon = (postData: any, sequences: any[], queryType: string) => {
  if (!Array.isArray(sequences) || sequences.length < 1) return postData;
  const tempPostData = cloneDeep(postData);
  const { params } = tempPostData;
  const inputs = getInputedFields(params, sequences, queryType);

  const inputKeys = inputs.map((item: any[]) => item[0]);
  const { length } = inputs;
  const sequencesSorted = orderBy(sequences, 'sequence', 'asc');

  const { BE2DataBase, FieldName2DataBase, DataBase2BE } = MapInqueryDataFields[queryType];

  const defaultSortName = FieldName2DataBase[get(sequencesSorted[0], 'fieldName')];

  if (length === 1) {
    tempPostData.sortName = BE2DataBase[inputKeys[0]];
  } else if (length > 1) {
    const inputSequences = sequencesSorted.filter((item: any) =>
      inputKeys.includes(DataBase2BE[FieldName2DataBase[item.fieldName]])
    );
    tempPostData.sortName = FieldName2DataBase[get(inputSequences[0], 'fieldName')];
  } else {
    tempPostData.sortName = defaultSortName;
  }

  tempPostData.sortOrder = sortOrderType(params, DataBase2BE[tempPostData.sortName]);

  return { ...tempPostData, defaultSortName };
};

/**
 * 合并属性
 * 特殊处理查询参数中两个属性表示一个查询条件的情况，其中两个属性的命名约定为 xxxFrom以及xxxTo形式
 * @param params 收录查询字段的对象
 */
export const foldParams = (params: any) => {
  if (!isPlainObject(params)) return params;
  const tempParams = cloneDeep(params);
  const foldedKeys: string[] = [];
  const filterKeys: string[] = [];
  const result = keys(tempParams).reduce((folded: any, cur: string) => {
    const matched = cur.match(/([a-zA-Z_]+\w*)(?=From)/g) || cur.match(/([a-zA-Z_]+\w*)(?=To)/g);
    const output = { ...folded };
    if (cur && matched) {
      const matchKey = matched[0];
      foldedKeys.push(matchKey);
      const fromKey = `${matchKey}From`;
      const toKey = `${matchKey}To`;
      filterKeys.push(fromKey, toKey);

      const foldedVal = {};

      if (tempParams[fromKey] || tempParams[toKey]) {
        foldedVal[fromKey] = tempParams[fromKey];
        foldedVal[toKey] = tempParams[toKey];
      }

      output[matchKey] = foldedVal;
    } else if (!filterKeys.includes(cur)) {
      output[cur] = tempParams[cur];
    }

    return output;
  }, {});
  return {
    params: result,
    foldedKeys,
  };
};

/**
 * 展开属性
 * 特殊处理查询参数中两个属性表示一个查询条件的情况，其中两个属性的命名约定为 xxxFrom以及xxxTo形式
 * @param params 收录查询字段的对象
 * @param foldedKeys 徐展开的字段键名
 */
export const unFoldParams = (params: any, foldedKeys: string[]) => {
  if (!isPlainObject(params) || !isArray(foldedKeys)) return params;
  const tempParams = cloneDeep(params);
  return keys(tempParams).reduce((unfolded: any, cur: string) => {
    let output = { ...unfolded };
    if (foldedKeys.includes(cur)) {
      output = merge(tempParams, tempParams[cur]);
    } else {
      output[cur] = tempParams[cur];
    }
    return output;
  }, {});
};

/**
 * 确定排序字段以及排序方式
 * @param postData 查询接口的入参
 * @param configuration 查询数据的配置信息
 * @param queryType 查询的类型，如case，task，user...
 */
export const sortRuleDeterminate = (postData: any = {}, configuration: any, queryType: string) => {
  if (!isString(queryType) || configuration.sortFromTable) return postData;

  const tempCloned = cloneDeep(postData);
  const { params } = tempCloned;
  // 合并特殊查询条件
  const { params: paramsFolded, foldedKeys } = foldParams(params);
  tempCloned.params = paramsFolded;

  const sequences = get(configuration, `configuration.${queryType}.inquiryField`);
  const tempPostData = sortRuleCommon(tempCloned, sequences, queryType);
  const inputs = getInputedFields(params, sequences, queryType).length;
  const { BE2DataBase } = MapInqueryDataFields[queryType];

  switch (queryType) {
    case InqueryTypes.Case:
      {
        const { caseCategory, activityKey, processInstanceId, insuredName, submissionDate } = pick(
          params,
          ['caseCategory', 'activityKey', 'processInstanceId', 'insuredName', 'submissionDate']
        );
        if (inputs === 1 && submissionDate) {
          tempPostData.sortName = BE2DataBase.submissionDate;
          tempPostData.sortOrder = 'asc';
        } else if (inputs === 1 && insuredName) {
          tempPostData.sortName = BE2DataBase.insuredName;
          tempPostData.sortOrder = 'asc';
        } else if (
          (inputs === 1 && processInstanceId) ||
          (inputs === 2 && processInstanceId && caseCategory)
        ) {
          tempPostData.sortName = BE2DataBase.processInstanceId;
          tempPostData.sortOrder = 'asc';
        } else if (
          inputs < 1 ||
          (inputs === 1 && caseCategory) ||
          (inputs === 2 && caseCategory && activityKey)
        ) {
          tempPostData.sortName = BE2DataBase.claimNo;
          tempPostData.sortOrder = 'desc';
        }
      }
      break;
    case InqueryTypes.Task:
      {
        const { caseCategory, activityKey, processInstanceId, insuredName, dueDate } = pick(
          params,
          ['caseCategory', 'activityKey', 'processInstanceId', 'insuredName', 'dueDate']
        );
        if (inputs === 1 && dueDate) {
          tempPostData.sortName = BE2DataBase.dueDate;
          tempPostData.sortOrder = 'asc';
        } else if (inputs === 1 && insuredName) {
          tempPostData.sortName = BE2DataBase.insuredName;
          tempPostData.sortOrder = 'asc';
        } else if (
          (inputs === 1 && processInstanceId) ||
          (inputs === 2 && processInstanceId && caseCategory)
        ) {
          tempPostData.sortName = BE2DataBase.processInstanceId;
          tempPostData.sortOrder = 'asc';
        } else if (
          inputs < 1 ||
          (inputs === 1 && caseCategory) ||
          (inputs === 2 && caseCategory && activityKey)
        ) {
          tempPostData.sortName = BE2DataBase.claimNo;
          tempPostData.sortOrder = 'desc';
        }
      }
      break;
    case InqueryTypes.User:
      {
        const { userId, userName, title, organizationName } = pick(params, [
          'userId',
          'userName',
          'title',
          'organizationName',
        ]);
        if ((inputs === 1 && userName) || (inputs === 2 && userName && title)) {
          tempPostData.sortName = BE2DataBase.userName;
          tempPostData.sortOrder = 'asc';
        } else if (
          inputs < 1 ||
          (inputs === 1 && userId) ||
          (inputs === 1 && title) ||
          (inputs === 2 && title && organizationName)
        ) {
          tempPostData.sortName = BE2DataBase.userId;
          tempPostData.sortOrder = 'asc';
        }
      }
      break;
    default:
      break;
  }

  // 展开特殊查询条件
  tempPostData.params = unFoldParams(tempPostData.params, foldedKeys);

  return tempPostData;
};

/**
 *
 * @param fields table column 的数据
 * @param isSwitchOn 右侧边栏是否为打开状态
 * @param adjust x,y的增量调节数据
 * @param column 显示横向滚动的阈值
 */
export const getScrollParams = (
  fields: any[] = [],
  isSwitchOn: boolean,
  adjust: any = { x: 0, y: 0 },
  column: number = 8
) => {
  const scroll = { y: `calc(100vh - ${px2rem(300)} + ${px2rem(adjust.y)})`, x: '0' };
  if (get(fields, 'length') > column) {
    scroll.x = isSwitchOn
      ? `calc(100vw - ${px2rem(620)} + ${px2rem(adjust.x)})`
      : `calc(100vw - ${px2rem(200)} + ${px2rem(adjust.x)})`;
  }

  return scroll;
};

/**
 * 限制输入日文半角符
 * @param event 输入半角符时表单控件返回的事件对象
 */
export const halfWidthCharacterInput = (event: any) => {
  const value = get(event, 'target.value');
  if (!tenant.isJP()) return value;
  // eslint-disable-next-line no-control-regex
  return value.replace(/[^\x00-\xff|\uff61-\uff9f]/gi, '');
};

/**
 * 失焦时替换非日文半角符
 * @param event 失焦时表单控件返回的事件对象
 * @param form 表单对象
 * @param field 输入半角符的控件名
 */
export const nonHalfCharacterReplace = (event: any, form: any, field: string) => {
  const value = get(event, 'target.value');

  if (!tenant.isJP() || !value || !form || !isString(field)) return;
  if (isFunction(form.setFieldsValue))
    form.setFieldsValue({
      // eslint-disable-next-line no-control-regex
      [field]: value.replace(/[\x00-\xff]/gi, ''),
    });
};
