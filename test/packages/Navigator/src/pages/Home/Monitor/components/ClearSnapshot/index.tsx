import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Table, notification, Icon } from 'antd';
import { Commonbox } from '../index';
import { FormItemInput } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import Columns from './Columns';
import { historyTransaction, centerRequest } from '@/services/monitorCenterControllerService';
import { MonitorItemCode } from '../../enum';
import { handleMessageModal } from '@/utils/commonMessage';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';
import { monitorParams } from '../../utils';
import { safeParseUtil } from '@/utils/utils';
import { LS, LSKey } from '@/utils/cache';
import classnames from 'classnames';
import { ReactComponent as confirmSvg } from 'navigator/assets/confirm.svg';
import isSupportCenter from '@/utils/isSupportCenter';

function ClearSnapshot({ form, isExpand, setExpand, extraHeaderClassName, flag = false, caseNo }) {
  const currentUser = LS.getItem(LSKey.CURRENTUSER);
  const userId = lodash.get(currentUser, 'userId', '');
  const [historyList, setHistoryList] = useState([]);
  const [historyListLoading, setHistoryListLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 0, total: 0 });

  let actualPageSize = pagination.pageSize;
  if (actualPageSize === 0) actualPageSize = isExpand ? 5 : 3;

  const getHistoryList = async (paramPage = pagination.page, paramPageSize = actualPageSize) => {
    if (pagination.total && paramPageSize * (paramPage - 1) > pagination.total) {
      paramPage = Math.ceil(pagination.total / paramPageSize);
    }

    setHistoryListLoading(true);
    const response = await historyTransaction(
      {
        pageNum: paramPage,
        pageSize: paramPageSize,
        params: {
          region: tenant.region(),
          monitorItemCode: MonitorItemCode.tools_clear_snapshot,
        },
      },
      {
        headers: { 'x-region': tenant.region(), 'x-tenant': tenant.region(), 'x-user-id': userId },
      }
    );
    if (response && response.success && response.responseData) {
      setHistoryList(
        lodash.map(response.responseData?.list, (item) => safeParseUtil(item?.resultData))
      );
      setPagination((item) => ({ ...item, total: response.responseData?.total, page: paramPage }));
    }
    setHistoryListLoading(false);
  };

  const clearSnapshotHandle = async () => {
    const caseNo = form.getFieldsValue()?.caseNo;
    if (lodash.isEmpty(caseNo)) {
      notification.error({ message: 'not empty!' });
      return;
    }
    setClearLoading(true);
    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_clear_snapshot, {
        caseNo,
        dataType: 'mainPage',
        skipSnapshot: false,
      })
    );
    if (response && response.success) {
      setPagination((item) => ({ ...item, page: 1 }));
      await getHistoryList(1, actualPageSize);
      notification.success({ message: 'Success!' });
    } else {
      handleMessageModal(response.messageList || response.promptMessages);
    }
    setClearLoading(false);
  };

  const pageChangeHandle = (changePage, changePageSize) => {
    if (actualPageSize === changePageSize) setPagination((item) => ({ ...item, page: changePage }));
    else setPagination((item) => ({ ...item, page: changePage, pageSize: changePageSize }));
    getHistoryList(changePage, changePageSize);
  };
  const previousCaseNo = useRef(null);

  useEffect(() => {
    if (caseNo && caseNo !== previousCaseNo.current) {
      form.setFieldsValue({ caseNo }); // 将 caseNo 设置到表单中
      previousCaseNo.current = caseNo;
    }
    getHistoryList();
  }, [isExpand, caseNo, form]);

  return (
    <Commonbox
      title={formatMessageApi({ Label_COM_MonitorCenter: 'ClearSnapshot' })}
      extraHeaderClassName={extraHeaderClassName}
      click={() => setExpand(!isExpand)}
      displayExpand={isExpand}
    >
      <div
        className={flag ? classnames(styles.searchBox, styles.searchBoxExtra) : styles.searchBox}
      >
        <FormItemInput
          form={form}
          formName="caseNo"
          labelId="CaseNo"
          labelTypeCode="Label_COM_MonitorCenter"
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button loading={clearLoading} onClick={clearSnapshotHandle} type="primary">
            {!clearLoading && !isSupportCenter() && <Icon component={confirmSvg} />}
            {formatMessageApi({ Label_COM_MonitorCenter: 'Confirm' })}
          </Button>
        </div>
      </div>
      <div className={classnames(styles.historyList, !isExpand && styles.retractedList)}>
        <Table
          columns={Columns()}
          loading={historyListLoading}
          scroll={{ x: true }}
          style={{ whiteSpace: 'nowrap' }}
          dataSource={historyList || []}
          pagination={{
            size: 'small',
            pageSize: actualPageSize,
            total: pagination?.total,
            current: pagination.page,
            showSizeChanger: true,
            onChange: pageChangeHandle,
            onShowSizeChange: pageChangeHandle,
            hideOnSinglePage: true,
          }}
        />
      </div>
    </Commonbox>
  );
}
export default Form.create()(ClearSnapshot);
