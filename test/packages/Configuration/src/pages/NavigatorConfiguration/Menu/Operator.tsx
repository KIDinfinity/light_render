import React from 'react';
import { useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import styles from './Operator.less';

function Operator(props) {
  const dispatch: Dispatch = useDispatch();
  const functionData: any = useSelector((state: any) => state.configurationController.functionData);
  const searchLoading: boolean = useSelector(
    (state: any) => state.configurationController.searchLoading
  );
  const resetLoading: boolean = useSelector(
    (state: any) => state.configurationController.resetLoading
  );
  const searchDefaultTemp: any = useSelector(
    (state: any) => state.configurationController.searchDefaultTemp
  );
  const functionCode: any = useSelector(
    (state: any) => state.configurationController?.functionData?.functionCode
  );
  const { TableSearch } = props;

  const onSearch = async () => {
    await dispatch({
      type: 'configurationController/listPage',
      payload: {
        params: searchDefaultTemp?.[functionCode] || {},
      },
    });
    if (TableSearch) {
      TableSearch?.setSortOrders?.([]);
      TableSearch?.setSelectedRows?.([]);
    }
  };

  const onReset = () => {
    dispatch({
      type: 'configurationController/resetSearch',
      payload: {
        functionCode,
      },
    });
    if (TableSearch) {
      TableSearch?.setSortOrders?.([]);
      TableSearch?.setSelectedRows?.([]);
    }
  };

  return (
    <div className={styles.operator}>
      {!lodash.isEmpty(functionData) && (
        <>
          <Button
            type="primary"
            className={styles.buttonItem}
            block
            onClick={onSearch}
            loading={searchLoading}
          >
            {formatMessageApi({
              Label_BIZ_Claim: 'component.tableSearch.search',
            })}
          </Button>
          <Button className={styles.buttonItem} block onClick={onReset} loading={resetLoading}>
            {formatMessageApi({
              Label_BIZ_Claim: 'component.tableSearch.reset',
            })}
          </Button>
        </>
      )}
    </div>
  );
}

export default Operator;
