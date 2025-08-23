import React, { useEffect, useState } from 'react';
import ChartComponent from '../../ChartComponent';
import styles from './BussinessChartLine.less';
import { Modal, Form, Button, Col, Row } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormItemInput, FormItemSelect, FormItemDateRangePicker } from 'basic/components/Form';
import { centerProductionMonitor } from '@/services/monitorCenterControllerService';
import lodash from 'lodash';
import moment from 'moment';

function InquiredChartModal({ form, visible, setVisible }) {
  const [chartData, setChartData] = useState<{ value: number; name: any }[]>([]);
  const [groupRegionDropDown, setGroupRegionDropDown] = useState({});
  const [integrationCodeDropdown, setIntegrationCodeDropdown] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchHandle = async () => {
    const errors = await new Promise((resolve) => {
      form.validateFields({ force: true }, (errors: any) => {
        if (errors && lodash.isObject(errors)) {
          resolve(errors);
        } else {
          resolve([]);
        }
      });
    });
    if (!lodash.isEmpty(errors)) {
      return;
    }
    const params = form.getFieldsValue();
    setSearchLoading(true);
    const result = await centerProductionMonitor({
      region: params.region,
      monitorCategory: 'monitor_integration_executionTime_detail',
      params: {
        integrationCode: params.integrationCode,
        requestTimeFrom: moment(params?.requestTime[0]).format('YYYY-MM-DD HH:mm:ss'),
        requestTimeTo: moment(params?.requestTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      },
    });
    if (result.success) {
      setChartData(
        lodash
          .chain(result.responseData.dataList)
          .filter((i) => i.response_time)
          .map((i) => ({
            value: parseFloat(i.interval_time),
            name: i.response_time,
          }))
          .value() || []
      );
    }
    setSearchLoading(false);
  };

  useEffect(() => {
    async function t() {
      const result = await centerProductionMonitor({
        monitorCategory: 'monitor_integrationCode_dropdown',
      });

      if (result.success) {
        const groupByRegion = lodash.groupBy(
          result.responseData.dataList.map((item) => ({
            ...item,
            dictCode: item.integration_code,
            dictName: item.integration_code,
          })),
          'region'
        );
        const regions = lodash
          .keys(groupByRegion)
          .map((item) => ({ dictCode: item, dictName: item }));
        setGroupRegionDropDown({ regions, groupByRegion });
      }
    }
    t();
  }, []);

  useEffect(() => {
    if (visible && form) {
      form.setFieldsValue({ requestTime: [moment().subtract(30, 'minutes'), moment()] });
    }
  }, [visible, form]);

  return (
    <Modal
      width={1200}
      title={'Integration execution Time'}
      visible={visible}
      centered={true}
      onCancel={() => {
        setVisible(false);
      }}
      afterClose={() => {
        setChartData([]);
        form.resetFields();
      }}
      getContainer={document.body}
      footer={null}
      className={styles.modalBox}
    >
      <div className={styles.InquiredChartModal}>
        <div className={styles.searchBox}>
          <div className={styles.inputField}>
            <Row gutter={[10, 0]} type="flex">
              <Col span={3}>
                <FormItemSelect
                  form={form}
                  required
                  formName="region"
                  labelId="Region"
                  labelTypeCode="Label_COM_MonitorCenter"
                  dicts={groupRegionDropDown?.regions}
                  onChange={(e) => {
                    setIntegrationCodeDropdown(groupRegionDropDown?.groupByRegion?.[e]);
                    form.setFieldsValue({ integrationCode: null });
                  }}
                />
              </Col>
              <Col span={9}>
                <FormItemSelect
                  required
                  form={form}
                  formName="integrationCode"
                  labelId="IntegrationCode"
                  labelTypeCode="Label_COM_MonitorCenter"
                  dicts={integrationCodeDropdown}
                />
              </Col>
              <Col span={12}>
                <FormItemDateRangePicker
                  required
                  form={form}
                  format="YYYY-MM-DD HH:mm:ss"
                  formName="requestTime"
                  labelId="RequestTime"
                  labelTypeCode="Label_COM_MonitorCenter"
                  showTime={{ format: 'HH:mm:ss' }}
                  rules={[
                    {
                      validator: (_, value, callback) => {
                        if (!value || value.length !== 2) {
                          callback(); // 不验证空值
                          return;
                        }

                        const [start, end] = value;
                        const diff = end.diff(start, 'days');

                        if (diff > 31) {
                          callback('日期范围不能超过一个月');
                        } else {
                          callback();
                        }
                      },
                    },
                  ]}
                />
              </Col>
            </Row>
          </div>

          <Button
            type="primary"
            block
            className={styles.button}
            onClick={searchHandle}
            loading={searchLoading}
          >
            {formatMessageApi({ Label_COM_MonitorCenter: 'Search' })}
          </Button>
        </div>
        <div className={styles.h240}>
          {!lodash.isEmpty(chartData) ? (
            <>
              <div className={styles.chart}>
                <ChartComponent
                  chartType="line_chart"
                  chartData={{ data: chartData }}
                  configWidth={1130}
                  configHeight={200}
                />
              </div>
              <div className={styles.chartXLabel}>
                <span>{moment(chartData?.[0]?.value).format('YYYY-MM-DD HH:mm:ss')}</span>
                <span>
                  {moment(chartData?.[chartData.length - 1]?.value).format('YYYY-MM-DD HH:mm:ss')}
                </span>
              </div>
            </>
          ) : (
            <h1 className={styles.noData}>Wait for Search...</h1>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default Form.create()(InquiredChartModal);
