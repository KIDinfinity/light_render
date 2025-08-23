const setIncidentItemExpandStatus = (state: any, action: any) => {
  const { id, status } = action.payload;
  const incidentItemExpandStatus = { ...state.incidentItemExpandStatus };

  incidentItemExpandStatus[`id_${id}`] = status;

  return {
    ...state,
    incidentItemExpandStatus,
  };
};

export default setIncidentItemExpandStatus;
