import { useEffect, useContext } from 'react';
import context from '../Context/context';

export default (policyId: string = '') => {
  const { dispatch } = useContext(context);
  console.log('setPolicyId', policyId);
  useEffect(() => {
    dispatch({
      type: 'setPolicyId',
      payload: policyId,
    });
  }, [policyId]);
};
