import { useEffect, useCallback } from 'react';

export default ({ form, clientId }: any) => {
  const handler = useCallback(() => {
    form.validateFields({ force: true });
  }, [clientId, form]);
  useEffect(() => {
    handler();
  }, [clientId]);
};
