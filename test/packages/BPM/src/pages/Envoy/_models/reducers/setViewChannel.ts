const setViewChannel = (state: any, action: any) => {
  const { viewChannel } = action.payload;
  return {
    ...state,
    viewChannel,
  };
};

export default setViewChannel;
