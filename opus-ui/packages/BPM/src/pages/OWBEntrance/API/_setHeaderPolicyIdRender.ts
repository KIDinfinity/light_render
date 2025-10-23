import { useContext, useEffect } from 'react';
import lodash from 'lodash';
import context from '../Context/context';

export default (headerPolicyIdRender: any) => {
  const { dispatch, state } = useContext(context);
  const { headerPolicyIdRender: preHeaderRender } = state;
  console.log('setPolicyIdRender', headerPolicyIdRender);
  useEffect(() => {
    if (!lodash.isEqual(headerPolicyIdRender, preHeaderRender)) {
      dispatch({
        type: 'setHeaderPolicyIdRender',
        payload: {
          headerPolicyIdRender,
        },
      });
    }
  }, [headerPolicyIdRender]);
};
