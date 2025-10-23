import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import type { Dispatch } from 'redux';
import ProcessCard from './ProcessCard';
import { serialize as objectToFormData } from 'object-to-formdata';

interface IProps {
  name: string;
}
const ProcessList = ({}: IProps) => {
  const transactionTypes = useSelector(
    (state) => state.PHBatchCreateProcessController?.processData?.transactionTypes
  );

  const dispatch: Dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCode',
      payload: objectToFormData({
        typeCode: 'Label_BPM_CaseCategory',
      }),
    });
  }, []);
  return (
    <div>
      {lodash.map(
        transactionTypes,
        (item) =>
          item?.transactionProcessList && (
            <ProcessCard key={item.transactionTypeCode} process={item?.transactionProcessList} />
          )
      )}
    </div>
  );
};

export default ProcessList;
