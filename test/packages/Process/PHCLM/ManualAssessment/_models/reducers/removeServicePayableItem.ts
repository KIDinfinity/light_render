import { produce }  from 'immer';
import lodash from 'lodash';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

const doop = {
  [eBenefitCategory.Reimbursement]: [
    {
      mapKey: 'serviceItemPayableListMap',
      listKey: 'serviceItemPayableList',
      parentKey: 'invoicePayableListMap',
      parentIdKey: 'invoicePayableId',
    },
    {
      mapKey: 'invoicePayableListMap',
      listKey: 'invoicePayableList',
      parentKey: 'treatmentPayableListMap',
      parentIdKey: 'treatmentPayableId',
    },
    {
      mapKey: 'treatmentPayableListMap',
      listKey: 'treatmentPayableList',
      parentKey: 'claimPayableListMap',
      parentIdKey: 'payableId',
    },
    {
      mapKey: 'claimPayableListMap',
      listKey: '',
      parentKey: '',
      parentIdKey: '',
    },
  ],
};

const handleDelete = ({ draftState, id, benefitCategory, dex = 0 }: any) => {
  const mapKey = doop?.[benefitCategory]?.[dex]?.mapKey;
  const listKey = doop?.[benefitCategory]?.[dex]?.listKey;
  const parentKey = doop?.[benefitCategory]?.[dex]?.parentKey;
  const parentIdKey = doop?.[benefitCategory]?.[dex]?.parentIdKey;
  const parentId = draftState.claimEntities?.[mapKey]?.[id]?.[parentIdKey];
  delete draftState.claimEntities?.[mapKey][id];
  if (parentId) {
    const relationship = lodash.filter(
      draftState.claimEntities?.[parentKey]?.[parentId]?.[listKey],
      (item) => item !== id
    );
    draftState.claimEntities[parentKey][parentId][listKey] = relationship;
    if (lodash.size(relationship) === 0) {
      handleDelete({ draftState, id: parentId, benefitCategory, dex: dex + 1 });
    }
  }
};

const removeServicePayableItem = (state: any, action: any) => {
  const { id, boosterId } = action.payload;

  const nextState = produce(state, (draftState) => {
    handleDelete({ draftState, id, benefitCategory: eBenefitCategory.Reimbursement });
    handleDelete({ draftState, id: boosterId, benefitCategory: eBenefitCategory.Reimbursement });
    draftState.claimProcessData.claimPayableList = lodash.map(
      draftState.claimEntities.claimPayableListMap,
      (item) => item?.id
    );
  });

  return { ...nextState };
};

export default removeServicePayableItem;
