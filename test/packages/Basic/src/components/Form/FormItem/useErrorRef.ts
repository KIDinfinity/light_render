import { useEffect, useState, useMemo } from 'react';
import useThrottle from 'basic/hooks/useThrottle';
import{ v4 as  uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import useFormState from './Context/useFormState';

export default ({ form, formName, nodeRef, disabled }: any) => {
  const formError = form.getFieldError(formName);
  const ref = nodeRef && nodeRef.current;
  const errorRefId = useMemo(() => uuidv4(), []);
  const [register, setRegister] = useState(false);
  const { dispatch } = useFormState()

  useThrottle(() => {
    if (ref && !register && !isEmpty(formError) && !disabled) {

      setRegister(true)
      dispatch({
        type: 'saveErrorRef',
        payload: {
          ref,
          errorRefId,
        },
      });
    }
    if (isEmpty(formError) && ref && register) {
      setRegister(false)
      dispatch({
        type: 'removeErrorRef',
        payload: {
          errorRefId,
        },
      });
    }
  }, 0, [ref, disabled, formError])

  useEffect(() => {
    return () => {
      if (ref && register) {
        setRegister(false)
        dispatch({
          type: 'removeErrorRef',
          payload: {
            errorRefId,
          },
        });
      }
    }
  }, [])
};
