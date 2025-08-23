import type { ReactNode } from 'react';
import React from 'react';
import Context from './Context';
import { useLocation, useParams, useSearchParams } from 'umi';
import useLoadPageAtomConfig from './hooks/useLoadPageAtomConfig';
import createReducer from './reducers/create';
import getCommonCaseCategoryAndActivityCode from './getCommonCaseCategoryAndActivityCode';

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
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const params = useParams();

  const { caseCategory, activityCode } = getCommonCaseCategoryAndActivityCode({
    caseCategory: pageConfig?.caseCategory,
    activityCode: pageConfig?.activityCode || pageConfig?.activityKey || '',
    location: {
      pathname: location.pathname,
      query: {
        caseCategory: searchParams.get('caseCategory'),
      },
    },
    params,
  });
  useLoadPageAtomConfig({
    caseCategory,
    activityCode,
    dispatch,
    pageConfig,
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
