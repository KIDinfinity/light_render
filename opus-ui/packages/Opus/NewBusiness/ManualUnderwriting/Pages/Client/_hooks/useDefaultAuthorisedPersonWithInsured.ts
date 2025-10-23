import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useEffect } from 'react';
import useGetAuthorisedPersonList from './useGetAuthorisedPersonList';
import { useDispatch } from 'dva';

export default () => {
  const dispatch = useDispatch();
  const authorisedPersonList = useGetAuthorisedPersonList({ mode: 'edit' });

  useEffect(() => {
    if (authorisedPersonList.length === 0) {
      dispatch({
        type: `${NAMESPACE}/addAuthorisedPerson`,
        payload: {
          withInsured: true,
        },
      });
    }
  }, []);
};
