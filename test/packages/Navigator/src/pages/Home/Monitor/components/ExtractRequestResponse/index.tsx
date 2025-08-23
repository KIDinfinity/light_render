import React, { useEffect, useRef, useState } from 'react';
import { Commonbox } from '../index';
import styles from './index.less';
import { Form, Button, Table, Icon, Row, Col } from 'antd';
import { FormItemCheckboxGroup, FormItemInput, FormItemSelect } from 'basic/components/Form';
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
import { getAllIntegrationCode } from '@/services/integrationInfoControllerService';

function ExtractRequestResponse({ form, isExpand, setExpand, exportExcel }) {
  const [list, setList] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({});
  const [selectedRow, setSelectedRow]: any[] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5, total: 0 });
  const [exportLoading, setExportLoading] = useState(false);
  const [dictObj, setDictObj] = useState({});

  let actualPageSize = pagination.pageSize;
  if (actualPageSize === 0) actualPageSize = 5;

  const searchHandle = async ({
    params,
    currentPage = pagination.page,
    pageSize = actualPageSize,
  }) => {
    let newParams = form.getFieldsValue();

    if (!lodash.isEqual(newParams, searchForm)) {
      setPagination((item) => ({ ...item, page: 1 }));
      currentPage = 1;
    }

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
      ...monitorParams(MonitorItemCode.tools_extract_integration_request_result, {
        params: filterEmptyValue(newParams),
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
      setSelectedRow([]);
    } else if (responseData && responseData.success) {
      const parseData = responseData?.resultData;
      setList(parseData?.rows);
      setPagination((item) => ({ ...item, total: parseData?.total, page: currentPage }));
      setSelectedRow([]);
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
    const integrationResponse = await getAllIntegrationCode();
    if (integrationResponse && integrationResponse.success) {
      setDictObj((item) => ({
        ...item,
        integrationCode: lodash
          .chain(integrationResponse.resultData)
          .map((item) => ({
            dictCode: item.integrationCode,
            dictName: item.integrationCode,
          }))
          .uniqBy('dictCode')
          .value(),
      }));
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      exportOption: ['Request', 'Response'],
      category: 'integration_forward',
    });

    getDicts();
  }, []);

  const preExportOption = useRef();
  const exportOption = form?.getFieldsValue(['exportOption']).exportOption;
  const curExportOption = exportOption ? exportOption.join('') : '';
  useEffect(() => {
    if (!curExportOption) {
      form.setFieldsValue({
        exportOption: preExportOption.current ? [preExportOption.current] : ['Request', 'Response'],
      });
    } else {
      preExportOption.current = curExportOption;
    }
  }, [curExportOption, form]);

  const onExport = () => {
    const newParams = form.getFieldsValue();
    exportExcel(
      monitorParams(MonitorItemCode.tools_extract_integration_request_result, {
        params: {
          ...filterEmptyValue(newParams),
          integrationSessionIdList: lodash.unionBy(
            selectedRow.reduce((res: any[], cur: any) => {
              const seleted = list.find((i) => i.id === cur);
              if (seleted) {
                res.push(seleted.integrationSessionId);
              }
              return res;
            }, [])
          ),
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
        title={formatMessageApi({ Label_COM_MonitorCenter: 'ExtractRequestResponse' })}
        click={() => setExpand(!isExpand)}
      >
        <div className={styles.activeIssusBox}>
          <div className={styles.searchBox}>
            <div className={styles.fieldBox}>
              <Row gutter={[10, 0]}>
                <Col span={isExpand ? 6 : 10}>
                  <FormItemInput
                    form={form}
                    formName="caseNo"
                    labelId="CaseNo"
                    labelTypeCode="Label_COM_MonitorCenter"
                  />
                </Col>
                <Col span={isExpand ? 6 : 10}>
                  <FormItemInput
                    form={form}
                    formName="policyNo"
                    labelId="PolicyNo"
                    labelTypeCode="Label_COM_MonitorCenter"
                  />
                </Col>
                <Col span={isExpand ? 6 : 10}>
                  <FormItemInput
                    form={form}
                    formName="businessNo"
                    labelId="BusinessNo"
                    labelTypeCode="Label_COM_MonitorCenter"
                  />
                </Col>
                <Col span={isExpand ? 6 : 10}>
                  <FormItemSelect
                    form={form}
                    formName="integrationCode"
                    labelId="IntegrationCode"
                    labelTypeCode="Label_COM_MonitorCenter"
                    dicts={dictObj?.integrationCode || []}
                    required={!lodash.isEmpty(form.getFieldsValue().errorMsg)}
                    className="integrationCode"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={isExpand ? 6 : 10}>
                  <FormItemSelect
                    form={form}
                    formName="category"
                    labelId="Category"
                    labelTypeCode="Label_COM_MonitorCenter"
                    dicts={[
                      { dictCode: 'integration_forward', dictName: 'integration_forward' },
                      { dictCode: 'integration_receive', dictName: 'integration_receive' },
                    ]}
                  />
                </Col>
                <Col span={isExpand ? 6 : 10} className={styles.exportOption}>
                  <FormItemCheckboxGroup
                    dicts={[
                      {
                        dictCode: 'Request',
                        dictName: 'Request',
                      },
                      {
                        dictCode: 'Response',
                        dictName: 'Response',
                      },
                    ]}
                    rules={[{ required: true }]}
                    form={form}
                    formName="exportOption"
                    dictTypeCode="Label_COM_MonitorCenter"
                  />
                </Col>
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
                <Button
                  loading={exportLoading}
                  onClick={onExport}
                  disabled={selectedRow.length <= 0}
                >
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
                hideOnSinglePage: true,
                size: 'small',
              }}
              rowSelection={{
                selectedRowKeys: selectedRow,
                onSelect: (record, selected) => {
                  if (selected) {
                    setSelectedRow([...selectedRow, record.id]);
                  } else {
                    setSelectedRow(selectedRow.filter((item) => item !== record.id));
                  }
                },
                onSelectAll: (selected, selectedRows) => {
                  if (selected) {
                    setSelectedRow(selectedRows.map((item) => item.id));
                  } else {
                    setSelectedRow([]);
                  }
                },
              }}
            />
          </div>
        </div>
      </Commonbox>
    </div>
  );
}

export default Form.create()(ExtractRequestResponse);
