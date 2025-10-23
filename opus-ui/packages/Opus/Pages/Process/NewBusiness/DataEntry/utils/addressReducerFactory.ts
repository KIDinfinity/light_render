import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import type { State } from '../_models/state';

// current address / house registration address / business address
// C类型只能自己填
// R可以自己填，也可以跟C保持一致（取决于houseRegAddr是O还是C）
// B类型可以自己填，也可以跟C/R保持一致（取决于bizAddr是O还是C还是R）

// dispatch address不能填，但可以跟 C/R/B保持一致。不过dispatch后面说不用做复制，只需要传一个普通的flag，所以这里没有配dispatch相关的。（实际复制时也只有三种： C -> R, C -> B, R -> B）
// 这里预留了空间，后续如果dispatch要做复制，多配一下suffixMap，referanceJudgeKeyMap和addressType就可以了
type addressType = 'C' | 'R' | 'B';

const suffixMap = {
  C: 'CurrentAddr',
  R: 'HomeAddr',
  B: 'BizAddr'
} as const;

const referanceJudgeKeyMap = {
  C: void 0,
  R: 'houseRegAddr',
  B: 'bizAddr',
} as const;

type prefix = 'insured' | 'payor';
type suffix = typeof suffixMap[keyof typeof suffixMap];
type FieldName = `${prefix}${suffix}`;




export default (isInsured: boolean, addressType: addressType) => {
  // 实际对象名有3 * 2 = 6种，比方说 insuredHomeAddr，是根据insured/payor + CurrentAddr/HomeAddr/BizAddr 拼起来的
  const prefix: prefix = isInsured? 'insured' : 'payor';
  const suffix = suffixMap[addressType];

  const fieldName: FieldName = `${prefix}${suffix}`;

  // R类型和B类型根据不同的字段决定复制来源，referanceJudgeKey代表决定的字段名
  const referanceJudgeKey = referanceJudgeKeyMap[addressType];

  return (state, action) => {
    const { changedFields } = action?.payload || {};
    return produce(state, draftState => {

      if(lodash.size(changedFields) === 1 && 
        referanceJudgeKey && 
        formUtils.queryValue(changedFields[referanceJudgeKey])) {
        // 如果是用户手动改了addressType，就清空数据，submit的时候会做额外逻辑，如果不是O，则做一次复制。
        // 随后会把key本身塞回去，所以这里不用保留judge key
        draftState.processData[fieldName] = {};
      }
      formUtils.saveChangedFields({ baseObject: draftState.processData, path: fieldName, changedFields });

    })
  }
}

// submit的时候挨个做一次判断和复制
const copyAddressFun = (processData: State['processData']) => {
  const nextProcessData = {
    ...processData,
  };

  const prefixes: prefix[] = ['insured', 'payor'];
  // 这里顺序是很重要的，在R复制C，且B复制R的情况下，要确保R的复制先进行。因此需要明确定义的数组，Object.keys(suffixMap)实际上可以但不够明确
  const addressTypeList = ['R', 'B'] as const;

  prefixes.map(prefix => {
    addressTypeList.map(addressType => {
      const fieldName: FieldName = `${prefix}${suffixMap[addressType]}`;
      const referanceJudgeKey = referanceJudgeKeyMap[addressType];
      const referanceJudgeValue = formUtils.queryValue(nextProcessData[fieldName][referanceJudgeKey]) as keyof typeof suffixMap | 'O' | undefined;

      // 如果judge key是others，则不需要复制
      if(referanceJudgeValue && referanceJudgeValue !== 'O') {
        const copySourceSuffix = suffixMap[referanceJudgeValue];
        const sourceFieldName: FieldName  = `${prefix}${copySourceSuffix}`;
        // 避免把judge key复制下来，仅复制地址信息
        const copyObject = lodash.omit(nextProcessData[sourceFieldName], lodash.compact(Object.values(referanceJudgeKeyMap)));
        // 将judge key补回去
        copyObject[referanceJudgeKey] = referanceJudgeValue;
        nextProcessData[fieldName] = copyObject;
      }
    })
  });
  return nextProcessData;
}

export { copyAddressFun };