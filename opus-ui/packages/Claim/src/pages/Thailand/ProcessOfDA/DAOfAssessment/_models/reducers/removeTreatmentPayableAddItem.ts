const removeTreatmentPayableAddItem = (state: any) => {
  return {
    ...state,
    treatmentPayableAddItem: null,
  };
};

export default removeTreatmentPayableAddItem;
