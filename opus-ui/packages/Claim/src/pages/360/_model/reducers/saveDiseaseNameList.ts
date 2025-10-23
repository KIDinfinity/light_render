export default function saveDiseaseName(state: any, action: any) {
  const { diseaseNameList } = action.payload;

  return {
    ...state,
    diseaseNameList,
  };
}
