import type { ReactNode } from 'react';
import React from 'react';
import Context from './Context';
import useLoadPageAtomConfig from './hooks/useLoadPageAtomConfig';
import createReducer from './reducers/create';

const { Provider } = Context;

interface IPageConfig {
  caseCategory: string;
  activityCode?: string;
  activityKey?: string;
}
interface IProps {
  children: ReactNode;
  pageConfig: IPageConfig;
}

export default ({ children, pageConfig }: IProps) => {
  const [state, dispatch] = createReducer();

  const { caseCategory, activityCode } = pageConfig;
  useLoadPageAtomConfig({
    caseCategory,
    activityCode,
    dispatch,
  });

  return (
    <Provider
      value={{
        state,
        roleDisplayConfigCode: `${caseCategory}_${activityCode}`,
        caseCategory,
        activityCode,
      }}
    >
      {children}
    </Provider>
  );
};
