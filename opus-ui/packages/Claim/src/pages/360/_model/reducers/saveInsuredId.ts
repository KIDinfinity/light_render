export default function saveInsuredId(state: any, action: any) {
  const {
    payload: { insuredId, caseCategory, customerType },
  } = action;
  return {
    ...state,
    insuredId,
    caseCategory,
    customerType,
  };
}
