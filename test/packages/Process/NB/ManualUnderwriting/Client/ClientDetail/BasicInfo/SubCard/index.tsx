import React, { useEffect } from 'react';
import useGetAuthorisedSignatoryClientInfo from 'process/NB/ManualUnderwriting/_hooks/useGetAuthorisedSignatoryClientInfo';
import ClientDetail from '../../ClientDetail';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import style from './index.less';

export default ({ mode }: any) => {
  const dispatch = useDispatch();
  //this will add a new clientInfo item in clientInfoList dependently
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/addAuthorisedSignatoryClientDetail`,
    });
  }, []);
 
  const authorisedSignatoryClientInfo = useGetAuthorisedSignatoryClientInfo();

  return (
    <>
      {authorisedSignatoryClientInfo && (
        <div className={style.subReadOnly}>
          <ClientDetail
            mode={mode}
            item={authorisedSignatoryClientInfo}
            index={0}
            hideCol={false}
            isSubCard={true}
          />
        </div>
      )}
    </>
  );
};
