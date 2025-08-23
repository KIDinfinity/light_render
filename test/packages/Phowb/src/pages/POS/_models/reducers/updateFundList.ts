import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getDefaultAmount } from '@/utils/accuracy';
import { calculationAmounts } from '../functions/calculatAmount';

const updateFundList = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const objectName = 'Pos.Fund';
  const objectFileName = `${objectName}.withdrawAmount`;

  const nextState = produce(state, (draftState: any) => {
    if (Object.keys(changedFields).length > 2) return;
    const allKey =
      (lodash.isArray(Object.keys(changedFields)) && Object.keys(changedFields)[0]) || '0';
    const allValue =
      lodash.isArray(Object.values(changedFields)) && Object.values(changedFields)[0];
      const {totalAmount,totalPercentage} = draftState.claimProcessData.posDataDetail.partialWithdrawal
    if (allKey === 'totalAmount') {
      draftState.claimProcessData.posDataDetail.partialWithdrawal.totalAmount = allValue;
      draftState.claimProcessData.posDataDetail.partialWithdrawal.totalPercentage = null;
      return;
    }
    if (allKey === 'totalPercentage') {
      draftState.claimProcessData.posDataDetail.partialWithdrawal.totalPercentage = allValue;
      draftState.claimProcessData.posDataDetail.partialWithdrawal.totalAmount =null;
      return;
    }
    const index = Number(allKey.substring(allKey.indexOf('_') + 1, allKey.length));
    const key = allKey.substring(0, allKey.indexOf('_'));

    if (formUtils.queryValue(allValue) === null) return;
    let totalWithdrawAmount: any = 0;
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.partialWithdrawal.fundList = lodash.map(
      draftState.claimProcessData.posDataDetail.partialWithdrawal.fundList,
      (item: any, ixd: number) => {
        const calculationAmount =
          ixd === index ? calculationAmounts(key, allValue, item) : item.calculationAmount;
        totalWithdrawAmount = Number(totalWithdrawAmount) + Number(calculationAmount);

        return ixd === index
          ? {
              ...item,
              [`${key}`]: allValue,
              calculationAmount: getDefaultAmount(Number(calculationAmount), objectFileName),
            }
          : item;
      }
    );

    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.partialWithdrawal.totalWithdrawAmount = getDefaultAmount(
      totalWithdrawAmount,
      objectFileName
    );
  });
  return { ...nextState };
};

export default updateFundList;
