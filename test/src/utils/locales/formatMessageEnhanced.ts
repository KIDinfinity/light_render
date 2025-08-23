import { isNil } from 'lodash';
import { tenant, Language } from '@/components/Tenant';
import CaseCategoryMapping from './CaseCategoryMapping';
import type { ReactElement } from 'react';

/**
 * @param {要修改的数据源} obj
 * @param {按顺序要替换的文本} arg
 * @return {返回国际化后的字符串}
 */
/*
  这是对现有国际化的拓展，完全支持现有国际化的参数，但如果存在匹配的变量和参数，返回的结果会是一个数组，返回的结果可以直接渲染，但不能当字符串处理
  在基础的字符串替换的基础上，支持了DOM/React 组件的替换，方式是一样的，在传字符串的位置替换为DOM即可
  另外支持函数处理以满足特殊要求
  用例：
  英文国际化： You are adding leave {0}for {1}{0} from {2} - {3} for {4} day{5}s{5}. Pease confirm to continue.
  日文国际化： {0}{1}さんの{0}休暇（{2} - {3}）を追加しました。確認してください。
  formatMessageEnhanced(
    { Label_COM_WarningMessage: 'MSG_001038' },
    str => currentUserId !== selectedMember.userId? str : '',
    <strong>{selectedMember.userName}</strong>,
    <strong>{moment(leaveStartDate).format(DATE_FORMAT_LONG)}</strong>,
    <strong>{moment(leaveEndDate).format(DATE_FORMAT_LONG)}</strong>,
    <strong>{dailyQuantity}</strong>,
    str => dailyQuantity > 1 ? str : ''
  )
  第一个是函数，函数匹配到同位的两个变量之间的值，这里是匹配到两个{0}之间的 for {1} / {1}さんの，函数的返回值会被替代到原本变量的位置，这里函数会根据逻辑扔掉/保留它匹配到的值
  后续是DOM，分别匹配1，2，3，4变量。
  5也是函数，同理，它目的是决定是否展示复数

  注意：变量和函数本身会分割字符串，分割后函数无法执行匹配
  例1: {1}ab{0}bt{1}，这里在变量0分割之后，如果变量1传入的是一个函数，那么它匹配不到任何数据，应当调换顺序，先匹配函数（1，0互换，参数对应互换）
  例2: {0}abt{1}ahc{0}bt{1}，在函数0分割替换之后，如果变量1也传入函数，那也是无法匹配到任何数据的
  后续可以添加字符串重新合并功能，在变量/函数没有引入dom的时候，把字符串重新合并，使得后续函数匹配不会受到分割影响

  无论是函数还是变量，如果替换为DOM，后续匹配都会忽略DOM（无法对DOM执行匹配），但如果替换为字符串，后续匹配会正常执行
  国际化： {0}originPolicy: client{0} / {0}targetPolicy: client{0}
  formatMessageEnhanced(
    { Label_COM_WarningMessage: 'MSG_001038' },
    str => client.vip? str + ' {1}' : str + ' {2}',
    <VIPMark />,
    <NonVIPMark />
  )
  这样也是可以的，不过匹配只会正向进行，塞入已匹配过的变量值不会有作用

  另外回调函数实际上只会被传入字符串
*/

function formatMessageEnhanced(
  obj: any,
  ...args: (
    | number
    | string
    | ReactElement
    | ((a: string | ReactElement | number) => string | ReactElement | number)
  )[]
): string | (string | ReactElement | number)[] {
  const typeCode = String(Object.keys(obj)[0]);

  const { dictionary, taskDetail } = window as any;
  const caseCategory = { caseCategory: taskDetail?.caseCategory || obj.caseCategory || '' };
  const companyCode = CaseCategoryMapping(caseCategory);

  const dictCode = obj[typeCode];
  const language = obj.language || tenant.getLocaleLang();

  const res: string =
    dictionary?.[`${typeCode}_${companyCode}`]?.[dictCode]?.[language] ||
    dictionary?.[`${typeCode}_${companyCode}`]?.[dictCode]?.[Language.EN_US] ||
    dictionary?.[typeCode]?.[dictCode]?.[language] ||
    dictionary?.[typeCode]?.[dictCode]?.[Language.EN_US];

  if (isNil(res)) return dictCode;

  const insertVal: (a: string, b: number) => (number | string | ReactElement)[] | string = (
    str,
    index
  ) => {
    const arr: (ReactElement | string | number)[] = str.split(`{${index}}`);
    if (arr.length >= 2) {
      const replaceVal = args[index];
      if (typeof replaceVal === 'function') {
        for (let replaceIndex = 1; replaceIndex < arr.length - 1; replaceIndex += 2) {
          arr[replaceIndex] = replaceVal(arr[replaceIndex]);
        }
      } else {
        for (let spliceIndex = arr.length - 1; spliceIndex > 0; spliceIndex--) {
          arr.splice(spliceIndex, 0, replaceVal);
        }
      }
    }

    if (index >= args.length - 1) return arr;

    return arr.flatMap((item: string | ReactElement | number) => {
      if (typeof item !== 'string') return item;
      return insertVal(item, index + 1);
    });
  };

  return args.length ? insertVal(res, 0) : res;
}

export default formatMessageEnhanced;
