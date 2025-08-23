import { produce }  from 'immer';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { ExchangeType } from 'claim/pages/Enum';
import {
  filterExchangeRateListFn,
  filterAllExchangeRates,
} from 'claim/pages/utils/handleExchangeRate';
import saveExchangeRate from './saveExchangeRate';
import saveClaimPayablePolicyCurrency from './saveClaimPayablePolicyCurrency';
import updatePayableAmountCallback from './updatePayableAmountCallback';
const hanldExchangeRateForPolicy =(state: any, action: any) => {
    return produce(state, (draftState: any)=>{
        let filterExchangeRateList = null;
        let payoutCurrency = null;
        const {
          claimProcessData: { claimPayableList, claimDecision },
          claimEntities,
          exchangeRate,
        } = draftState;
        const systemCurrency = tenant.currency();
        payoutCurrency = claimDecision.payoutCurrency;
        const params = {
          exchangeTypeList: ExchangeType.External,
          fromCurrencyList: null,
          toCurrencyList: systemCurrency,
        };
        if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
          lodash.map(claimPayableList, (claimPayableItemId) => {
            const claimPayableItem = claimEntities.claimPayableListMap[claimPayableItemId];
            const policyCurrencyVal = claimPayableItem?.policyCurrency;
            params.fromCurrencyList = policyCurrencyVal;
          });
        }
        const response = filterAllExchangeRates(exchangeRate, params, true);
        if (!lodash.isEmpty(response)) {
          filterExchangeRateList = filterExchangeRateListFn(response);
        }
        const newState = saveExchangeRate(draftState, {
          type: 'saveExchangeRate',
          payload: { exchangeRateList: filterExchangeRateList },
        });
        const newState2 = saveClaimPayablePolicyCurrency(newState, {
          type: 'saveClaimPayablePolicyCurrency',
          payload: {
            policyCurrency: null,
            payoutCurrency,
            payableId: null,
          },
        });
        updatePayableAmountCallback(newState2);
    })
  
};

export default hanldExchangeRateForPolicy;
