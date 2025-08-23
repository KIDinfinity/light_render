export default function saveExistDocList(state: any, action: any) {
  const { existDocList } = action.payload;

  return {
    ...state,
    existDocList,
  };
}
