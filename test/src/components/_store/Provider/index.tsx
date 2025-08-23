import type { ReactNode} from 'react';
import React, { useContext } from 'react';
import { useDispatch, useSelector, useStore } from 'umi';
import lodash from 'lodash';
import { Env } from '@/components/Tenant';
import DataContext from './DataContext';

interface IProvider {
  data?: any;
  children: ReactNode;
}

/**
 *给函数组件提供跨组件传参以及获取redux的API的能力
 */
export default ({ data = {}, children }: IProvider) => {
  const { uDispatch, uSelector, uStore, ...res } = useContext(DataContext);
  const drillData = lodash.merge(
    { uDispatch: useDispatch(), uSelector: useSelector, uStore: useStore() },
    {},
    data
  );
  const { Provider } = DataContext;

  if (process.env.NODE_ENV !== Env.Production) {
    DataContext.displayName = 'WithContextData';
  }

  return <Provider value={drillData}>{children}</Provider>;
};
