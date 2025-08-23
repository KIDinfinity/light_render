import { previewData } from '../state/initStateData';

export default (state: any) => {
  return {
    ...state,
    ...previewData,
  };
};
