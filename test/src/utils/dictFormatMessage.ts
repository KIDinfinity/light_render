import { PureComponent } from 'react';
import lodash, { trim, compact, isString } from 'lodash';
import { produce } from 'immer';
import safeParse from 'safe-json-parse/tuple';
import { tenant } from '@/components/Tenant';
import { LS } from '@/utils/cache';
import formatMessageApi from './locales/formatMessageApi';
import getDrowDownList from './locales/getDrowDownList';
import formatMessageEnhanced from './locales/formatMessageEnhanced';

const getActivityCode = (code: string) => {
  const activityCode = LS.getItem(code, false);
  let result: any = [];
  if (lodash.isString(activityCode) && activityCode.length > 0) {
    result = lodash.compact(safeParse(activityCode));
  }
  return lodash.flatten(result);
};

const activityStatusFormatMessage = (dictCode: string, defaultCode: string) =>
  dictFormatMessage(getActivityCode('venus-ui_activityStatus'), dictCode, defaultCode);

function dictFormatMessage(dictList: any, dictCode: string, defaultCode: string) {
  const newDictCode = lodash.filter(dictList, (dict) => dict.dictCode === dictCode);
  return newDictCode[0]?.dictName || defaultCode;
}

/**
 * 国际化文本转换，支持dom替换
 * @param {要修改的数据源} templateId
 * @param {按顺序要替换的值} values
 * @return {返回国际化后的HTML}
 */
class FormatMessageHTML extends PureComponent {
  render() {
    const { templateId, values }: any = this.props;

    const template = formatMessageApi(templateId);

    if (!template) return null;
    /** ** 参考示例Start *** */
    // template = '{{a1}}{{a3}} =-= {{a2}}{{a3}} =-= {{a3}}';
    // <FormatMessageHTML
    //   templateId={{
    //     label: 'app.navigator.task-detail-of-data-capture.label.case-no',
    //   }}
    //   values={{
    //     a1: 'A1',
    //     a2: <span>A2</span>,
    //     a3: <input type="text" defaultValue="A3" />,
    //   }}
    // />
    /** ** 参考示例End *** */
    // 将模板转换成数组对象

    const templateArr = template?.split(/\{\{|\}\}/g).filter((item: any) => item !== '') || [];
    // 获取需要替换的模板中的参数，组成数组
    const argNameReg = /(\{{2})\w+(\}{2})/g;
    const willReplaceArgArr = [...new Set(template?.match(argNameReg))].map(
      (item: any) => item.match(/\w+/g)[0]
    );
    // 遍历需要替换的的参数，如果模板里有相同的，则将模板中的参数替换成传进来的value值
    willReplaceArgArr.forEach((willReplaceArg) => {
      templateArr.forEach((templateArg: any, idx: number) => {
        if (templateArg === willReplaceArg) {
          // 如果是带标签的，需要设置key
          if (lodash.isObject(values[templateArg])) {
            const newValue = produce(values[templateArg], (draft: any) => {
              // eslint-disable-next-line no-param-reassign
              draft.key = idx;
            });
            templateArr[idx] = newValue;
          } else {
            templateArr[idx] = values[templateArg];
          }
        }
      });
    });
    return templateArr;
  }
}

// 判断是否有国际化模板，有return true，没有return false
function hasFormatMessageHTMLFn(templateId: any) {
  // 获取需要替换的模板类型、Key值、字典
  const templateType = Object.keys(templateId)?.[0];
  const tempalteKey = templateId?.[templateType];

  const { dictionary } = window as any;

  const language = tenant.getLocaleLang();
  // 获取即将用来替换的模板
  const template = dictionary?.[templateType]?.[tempalteKey]?.[language];
  return !!template;
}

/**
 * 将code转化为name
 * @param codes code字符
 * @param joiner 连接符
 */
function transCodesToNames(codes: any, typeCode: string, joiner: string) {
  if (!isString(codes) || !codes) return codes;
  const codesArray = codes.split(joiner);
  return compact(codesArray)
    .map((code) => formatMessageApi({ [typeCode]: trim(code) }))
    .join(joiner);
}

export {
  activityStatusFormatMessage,
  formatMessageApi,
  formatMessageEnhanced,
  getDrowDownList,
  FormatMessageHTML,
  hasFormatMessageHTMLFn,
  transCodesToNames,
};

export default dictFormatMessage;
