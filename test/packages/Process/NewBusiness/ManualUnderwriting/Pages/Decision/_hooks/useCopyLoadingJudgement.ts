import lodash from 'lodash';
import useGetLoadingInfo from './useGetLoadingInfo';

export default (coverageId: string, loadingId: string) => {
  const loadingInfo = useGetLoadingInfo(coverageId, loadingId);

  //have copyId -> target rider -> copy loading
  //no copyId -> main rider -> main loading
  return !lodash.isEmpty(loadingInfo.copyId);
};
