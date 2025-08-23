import React, { useEffect, useMemo, Suspense } from 'react';
import { useSelector, useDispatch } from 'dva';

const Pages = ({pageConfig}) => {
  const dispatch = useDispatch();
  const currentMenu = useSelector(({ sqlController }: any) => sqlController.currentMenu);
  const Component = useMemo(() => pageConfig[currentMenu]?.component, [currentMenu]);

  useEffect(() => {
    dispatch({
      type: 'sqlController/getDataSource',
    });
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: ['DropDown_COM_Region'],
    });
  }, []);

  return <Suspense fallback={<></>}>{currentMenu && <Component />}</Suspense>;
};

export default Pages;
