import lodash from 'lodash';
import { produce }  from 'immer';

const saveAllExchangeRate = (state: any, {payload = []}: any) => {
  return produce(state, draft => {
    const exchangeRate = draft.exchangeRate || [];

    if(payload.length) {
      const nextExchangeRate = lodash.orderBy(
        exchangeRate.concat(payload)
        ,'effectiveDate',
        'desc')
      draft.exchangeRate = nextExchangeRate;
    }
    return draft;
  })
}
export default saveAllExchangeRate;
