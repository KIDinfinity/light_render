import lodash from 'lodash';

export default (state, { payload }) => {
  lodash.set(state, 'claimProcessData.claimAppealOriginalCase.adjustClaimPayableList', payload)
};
