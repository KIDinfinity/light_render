import { useCallback } from 'react';
import { useDispatch } from 'dva';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

export default () => {
  const dispatch = useDispatch();
  const NAMESPACE = useGetNamespace();
  return useCallback(
    (value, record, field, label) => {
      dispatch({
        type: `${NAMESPACE}/setChequeInfo`,
        payload: {
          id: record?.id,
          changedFields: {
            [field]: value,
          },
        },
      });

      dispatch({
        type: 'auditLogController/saveChangedFields',
        payload: {
          changedFields: {
            [field]: {
              value,
              label: `${label} - ${record?.policyId}`,
              name: field
            },
          },
        },
      });
    },
    [dispatch]
  );
};
