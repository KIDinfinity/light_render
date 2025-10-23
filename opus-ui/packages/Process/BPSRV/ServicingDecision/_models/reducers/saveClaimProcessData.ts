/* eslint-disable no-param-reassign */
import { normalizeData } from '../../utils/normalizrUtils';

export default (state: any, { payload }: any) => {
  return {
    ...state,
    ...normalizeData({ ...payload }),
  };
};
