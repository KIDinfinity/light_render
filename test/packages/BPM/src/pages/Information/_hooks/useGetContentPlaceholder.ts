import lodash from 'lodash';
import useGetCurrrentActivityCategory from 'bpm/pages/Information/_hooks/useGetCurrrentActivityCategory';

const useGetContentPlaceholder = ({ item }) => {
  const currentActivity = useGetCurrrentActivityCategory({ item });
  return lodash.get(currentActivity, 'placeholder');
};

export default useGetContentPlaceholder;
