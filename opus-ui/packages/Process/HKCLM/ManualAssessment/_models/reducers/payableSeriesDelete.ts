import { produce } from 'immer';
import lodash from 'lodash';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

const doop = {
  [eBenefitCategory.Reimbursement]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: 'invoicePayableList' },
    { mapKey: 'invoicePayableListMap', listKey: 'serviceItemPayableList' },
    { mapKey: 'serviceItemPayableListMap', listKey: '' },
  ],
  [eBenefitCategory.Cashless]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: '' },
  ],
  [eBenefitCategory.Aipa]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: 'accidentBenefitPayableList' },
    { mapKey: 'accidentBenefitPayableListMap', listKey: '' },
  ],
  [eBenefitCategory.S]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: 'procedurePayableList' },
    { mapKey: 'procedurePayableListMap', listKey: '' },
  ],
  [eBenefitCategory.Crisis]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: 'otherProcedurePayableList' },
    { mapKey: 'otherProcedurePayableListMap', listKey: '' },
  ],
  default: [
    {
      mapKey: 'claimPayableListMap',
      listKey: '',
    },
  ],
};

const handleDelete = ({ Ids, draftState, benefitCategory, dex = 0, saveId }: any) => {
  const mapKey = doop?.[benefitCategory]?.[dex]?.mapKey || doop.default?.[dex]?.mapKey;
  const listKey = doop?.[benefitCategory]?.[dex]?.listKey;
  const children = lodash
    .chain(Ids)
    .compact()
    .map((id) => draftState.claimEntities?.[mapKey]?.[id]?.[listKey] || [])
    .flatten()
    .value();

  draftState.claimEntities[mapKey] = lodash.omit(
    draftState.claimEntities?.[mapKey],
    lodash.filter(Ids, (item) => item !== saveId)
  );

  if (saveId) {
    draftState.claimEntities[mapKey][saveId][listKey] = [];
  }

  if (lodash.size(children) > 0) {
    handleDelete({ Ids: children, draftState, benefitCategory, dex: dex + 1 });
  }
};

const payableSeriesDelete = (state: any, { payload }: any) => {
  const { benefitCategory, deleteId, saveId } = payload;

  const nextState = produce(state, (draftState: any) => {
    handleDelete({ Ids: deleteId, draftState, benefitCategory, saveId });

    draftState.claimProcessData.claimPayableList = lodash.map(
      draftState?.claimEntities?.claimPayableListMap,
      (item) => item?.id
    );
  });
  return { ...nextState };
};

export default payableSeriesDelete;
