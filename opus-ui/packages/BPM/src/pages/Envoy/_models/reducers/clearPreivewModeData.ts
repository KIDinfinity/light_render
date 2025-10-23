import { previewData } from '../state/initStateData';

export default (state: any, action: any) => {
  return {
    ...state,
    ...previewData,
  };
};
