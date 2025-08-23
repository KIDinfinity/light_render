import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../activity.config';

interface IProps {
  id: string;
  expendStatus?: boolean;
}

export default ({ id, expendStatus }: IProps) => {
  const expendedClient = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expendedClient,
    shallowEqual
  );
  const expand = useMemo(() => {
    if (expendStatus) {
      return true;
    }
    return expendedClient === id;
  }, [expendedClient, id, expendStatus]);
  return expand;
};
