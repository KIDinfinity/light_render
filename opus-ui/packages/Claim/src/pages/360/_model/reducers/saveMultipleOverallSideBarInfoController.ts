export default function saveInsuredId(state: any, action: any) {
  const {
    payload: { multipleOverallSideBarInfoController },
  } = action;
  return {
    ...state,
    multipleOverallSideBarInfoController,
  };
}
