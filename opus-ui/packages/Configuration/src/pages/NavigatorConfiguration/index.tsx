import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { isEmpty } from 'lodash';
import Authorized from '@/utils/Authorized';
import Authority from '@/enum/Authority';
import Exception403 from '@/pages/Exception/403';
import Menu from './Menu';
import Header from './Container/Header';
import TableList from './Container/TableList';
import Holiday from './Container/Holiday';
import styles from './index.less';
import { TaskModal, PreviewModal, ExcelModal } from './Modal';
import { FunctionCode } from './Enum';

function Configuration() {
  const [TableSearch, setTableSearch] = useState({});
  const dispatch: Dispatch = useDispatch();
  const previewRecord: any = useSelector(
    (state: any) => state.configurationController.previewRecord
  );
  const functionCode: any = useSelector(
    (state: any) => state.configurationController.functionData?.functionCode
  );

  const authorityCodeList = useSelector(
    ({ authController }: any) => authController.authorityCodeList
  );

  useEffect(() => {
    dispatch({
      type: 'configureUserController/getMentorDropdownList',
    });
  }, []);

  const handleTableSearch = (value: any) => {
    setTableSearch(value);
  };

  useEffect(() => {
    dispatch({
      type: 'configurationController/getMenu',
    });
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: ['Dropdown_CFG_UserStatus'],
    });
    return () => {
      dispatch({ type: 'configurationController/cleanData' });
    };
  }, []);

  return (
    <Authorized
      authority={[Authority.ConfigurationCenter]}
      currentAuthority={authorityCodeList}
      noMatch={<Exception403 />}
    >
      <div className={styles.container}>
        <Menu TableSearch={TableSearch} />
        <div className={styles.content}>
          <Header title={formatMessageApi({ Label_BIZ_Claim: 'navigator.title.configuration' })} />
          <div className={styles.main}>
            {FunctionCode.Fun_venus_integration_integration_service_downtime_config ===
            functionCode ? (
              <Holiday />
            ) : (
              <TableList setTableSearch={handleTableSearch} />
            )}
          </div>
        </div>
        <TaskModal TableSearch={TableSearch} />
        <ExcelModal />
        {!isEmpty(previewRecord) && <PreviewModal TableSearch={TableSearch} />}
      </div>
    </Authorized>
  );
}
export default Configuration;
