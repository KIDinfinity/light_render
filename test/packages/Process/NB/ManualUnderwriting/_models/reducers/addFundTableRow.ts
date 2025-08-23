import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';

const addFundTableRow = (state: any) => {
  const { businessData } = state;
  const totalFundInfoList =
    lodash.get(businessData, 'policyList[0].fundInfo.totalFundInfoList') || [];
  const newRow = {
    fundCurrency: '',
    id: uuidv4(),
  };

  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState,
      `businessData.policyList[0].fundInfo.totalFundInfoList`,
      [...totalFundInfoList, newRow]
    );
  });
  return nextState;
};

export default addFundTableRow;
