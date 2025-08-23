import { useContext, useCallback } from 'react';
import type DataPriority from 'enum/DataPriority';
import Context from '../Context';

export default () => {
  const { setDataPriority } = useContext(Context);

  return useCallback(
    (dataPriority: DataPriority) => {
      setDataPriority(dataPriority);
    },
    [setDataPriority]
  );
};
