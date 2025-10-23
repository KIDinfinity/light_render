export default (state: any, { payload }: any) => {
  const { KLIPClaimNoList } = payload;
  return {
    ...state,
    KLIPClaimNoList,
  };
};
