import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { changedFields, isAssurance } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const chequeCase = draftState.businessData.chequeCase;
    const map = new Map<string, string>([
      ['PMA', '549030'],
      ['CMS', '549040'],
      ['CSF', '549040'],
      ['CSR', '542700'],
    ]);
    const extra: any = {};
    if (lodash.size(changedFields) === 1) {
      const [name, { value }] = Object.entries(changedFields)[0];
      const oldValue = formUtils.queryValue(draftState?.businessData.chequeCase?.chequeCategory);
      const defaultCostCentre = isAssurance? 'PCP' : '020112';
      if (name === 'budgetCode') {
        extra.costCentre = !!value ? defaultCostCentre : '';
      }
      if (name === 'chequeCategory') {
        extra.payeeName =
          value === 'PMA' || oldValue === 'PMA'
            ? null
            : draftState.businessData.chequeCase?.payeeName;
        if(!isAssurance)
          extra.budgetCode = map.get(value);
        extra.costCentre = !!value ? defaultCostCentre : '';
      }
    }

    draftState.businessData.chequeCase = {
      ...chequeCase,
      ...changedFields,
      ...extra,
    };
  });
  return { ...nextState };
};
