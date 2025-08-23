import React from 'react';
import lodash from 'lodash';
import { Button, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { ReactComponent as checkAllSvg } from 'navigator/assets/configuration/checkAll.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

function CheckAll(props: any) {
  const dispatch: Dispatch = useDispatch();
  const rows: any = useSelector((state: any) => state.configurationController?.listPage?.rows);
  const checkAll: any = useSelector((state: any) => state.configurationController.checkAll);
  const {
    TableSearch,
    functionData: { operationList },
  } = props;
  const handlerCheckAll = async () => {
    const allRows = lodash.filter(rows, (el) => !el.cc_latest_status);
    if (checkAll) {
      TableSearch.setSelectedRows?.([]);
    } else {
      TableSearch.setSelectedRows?.(allRows);
    }
    dispatch({
      type: 'configurationController/toggleCheckAll',
    });
  };
  return (
    <>
      {lodash.includes(operationList, 'update') ? (
        <Button
          className={styles.btnCheckAdd}
          onClick={() => {
            handlerCheckAll();
          }}
        >
          <Icon component={checkAllSvg} />
          {formatMessageApi({
            Label_BIZ_Claim: 'navigator.configuration.button.checkAll',
          })}
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
export default CheckAll;
