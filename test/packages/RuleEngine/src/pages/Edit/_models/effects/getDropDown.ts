import lodash from 'lodash';
import { findRuleSetDropDown } from '@/services/ruleEngineRuleSetDropDownControllerService';
import getDropDownFormat from '../../Utils/getDropDownFormat';
import { TypeCode } from '../../Enum';

export default function* (_: any, { call, put }: any) {
  const atomsResponse = yield call(findRuleSetDropDown);

  if (
    lodash.isPlainObject(atomsResponse) &&
    atomsResponse.success &&
    !lodash.isEmpty(atomsResponse.resultData)
  ) {
    const { ruleAtoms } = atomsResponse.resultData;

    yield put({
      type: 'saveState',
      payload: {
        dropDown: {
          ...atomsResponse.resultData,
          ruleAtoms: lodash.map(ruleAtoms, (item: any) => ({
            ...item,
            formatName: getDropDownFormat({
              labelId: item.atomCode,
              defaultName: item.atomName || item.atomCode,
              type: TypeCode.AtomCode,
            }),
          })),
        },
      },
    });
  }
}
