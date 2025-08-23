/* eslint-disable no-param-reassign */

export default (state: any, { payload }: any) => {
  return {
    ...state,
    processData: payload,
  };
};
