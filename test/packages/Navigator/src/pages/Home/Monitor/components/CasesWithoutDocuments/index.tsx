import React, { useEffect, useState } from 'react';
import { Commonbox } from '../index';
import styles from './index.less';
import { Form, Button, Table, Icon, Row, Col } from 'antd';
import { FormItemSelect, FormItemNumber } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Columns from './Columns';
import { centerRequest } from '@/services/monitorCenterControllerService';
import lodash from 'lodash';
import { MonitorItemCode } from '../../enum';
import { filterEmptyValue, monitorParams } from '../../utils';
import { safeParseUtil } from '@/utils/utils';
import { handleMessageModal } from '@/utils/commonMessage';
import { ReactComponent as exportSvg } from 'navigator/assets/export.svg';
import classnames from 'classnames';
import { getDrowDownList } from '@/utils/dictFormatMessage';

function CasesWithoutDocuments({ form, isExpand, setExpand, exportExcel }) {
  const [list, setList] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({});
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5, total: 0 });
  const [exportLoading, setExportLoading] = useState(false);
  const [dictBusiness, setBusiness] = useState({});

  let actualPageSize = pagination.pageSize;
  if (actualPageSize === 0) actualPageSize = 5;

  const searchHandle = async ({
    params,
    currentPage = pagination.page,
    pageSize = actualPageSize,
  }) => {
    let newParams = form.getFieldsValue();
    newParams = { ...newParams, intervalTime: lodash.toString(newParams?.intervalTime) };

    if (params) {
      newParams = params;
    }

    if (!params) {
      setPagination((item) => ({ ...item, page: 1 }));
      setSearchForm(newParams);
    }

    if (pagination.total && pageSize * (currentPage - 1) > pagination.total) {
      currentPage = Math.ceil(pagination.total / pageSize);
    }

    setSearchLoading(true);
    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_query_case_without_document, {
        params: newParams,
        currentPage,
        pageSize,
      })
    );

    const responseData = safeParseUtil(response.responseData?.responseData);
    if (!lodash.isEmpty(response.responseData.exceptionMsg)) {
      const exceptionMsg = lodash.map(safeParseUtil(response.responseData.exceptionMsg), (msg) => ({
        code: '000',
        content: msg,
      }));
      handleMessageModal(response.messageList || response.promptMessages || exceptionMsg);
      setList([]);
    } else if (responseData && responseData.success) {
      const parseData = responseData?.resultData;
      setList(parseData?.rows);
      setPagination((item) => ({ ...item, total: parseData?.total, page: currentPage }));
    }
    setSearchLoading(false);
  };

  const pageChangeHandle = (changePage, changePageSize) => {
    if (changePageSize !== actualPageSize)
      setPagination((item) => ({ ...item, page: changePage, pageSize: changePageSize }));
    else setPagination((item) => ({ ...item, page: changePage }));

    searchHandle({ currentPage: changePage, pageSize: changePageSize, params: searchForm });
  };

  const getDicts = async () => {
    const businessDict = getDrowDownList(['Dropdown_COM_BusinessRequestType']);
    setBusiness(businessDict?.Dropdown_COM_BusinessRequestType);
  };

  useEffect(() => {
    form.setFieldsValue({
      intervalTime: '5',
    });
    getDicts();
  }, []);

  const onExport = () => {
    const newParams = form.getFieldsValue();
    exportExcel(
      monitorParams(MonitorItemCode.tools_query_case_without_document, {
        params: {
          ...filterEmptyValue(newParams),
        },
        currentPage: 1,
        pageSize: 1000,
        exportType: 'txt',
      }),
      setExportLoading
    );
  };
  return (
    <div className={styles.ExtractRequestResponse}>
      <Commonbox
        title={formatMessageApi({ Label_COM_MonitorCenter: 'CasesWithoutDocument' })}
        click={() => setExpand(!isExpand)}
      >
        <div className={styles.activeIssusBox}>
          <div className={styles.searchBox}>
            <div className={styles.fieldBox}>
              <Row gutter={[10, 0]}>
                <Col span={isExpand ? 3 : 5}>
                  <FormItemSelect
                    form={form}
                    formName="business"
                    labelId="Business"
                    labelTypeCode="Label_COM_MonitorCenter"
                    dicts={dictBusiness}
                    required={!lodash.isEmpty(form.getFieldsValue().errorMsg)}
                    className="integrationCode"
                  />
                </Col>
                <Col span={isExpand ? 3 : 5}>
                  <FormItemNumber
                    form={form}
                    formName="intervalTime"
                    labelId="IntervalTime"
                    labelTypeCode="Label_COM_MonitorCenter"
                    precision={0}
                  />
                </Col>
                <div style={{ marginTop: '22px', display: 'inline-block' }}>
                  <span>hours from submission date</span>
                </div>
              </Row>
            </div>
            <div className={styles.buttonBox}>
              <Button
                type="primary"
                block
                className={styles.button}
                onClick={searchHandle}
                loading={searchLoading}
              >
                {formatMessageApi({ Label_COM_MonitorCenter: 'Search' })}
              </Button>
              <div style={{ display: 'flex' }}>
                <Button loading={exportLoading} onClick={onExport}>
                  {!exportLoading && <Icon component={exportSvg} />}
                  <span>{formatMessageApi({ Label_COM_MonitorCenter: 'Export' })}</span>
                </Button>
              </div>
            </div>
          </div>
          <div className={classnames(styles.list, !isExpand && styles.retractedList)}>
            <Table
              rowKey={(row) => row.id}
              columns={Columns()}
              dataSource={list || []}
              loading={searchLoading}
              scroll={{ x: true }}
              style={{ whiteSpace: 'nowrap' }}
              pagination={{
                pageSize: pagination.pageSize,
                total: pagination?.total,
                current: pagination.page,
                showSizeChanger: true,
                onChange: pageChangeHandle,
                onShowSizeChange: pageChangeHandle,
                size: 'small',
              }}
            />
          </div>
        </div>
      </Commonbox>
    </div>
  );
}

export default Form.create()(CasesWithoutDocuments);
