import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import Header from './Header';
import Detail from './Detail';

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'sqlController/getPatchList' });
  }, []);

  return (
    <div>
      <Header />
      <Detail />
    </div>
  );
};
