export default (state: any) => {
  return {
    ...state,
    ...{ previewEditContent: {}, previewUrl: '' },
  };
};
