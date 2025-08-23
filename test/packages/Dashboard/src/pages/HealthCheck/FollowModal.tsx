import React, { useState, useMemo } from 'react';
// @ts-ignore
import { Modal, Icon, Button, Popover, Table, notification, Tabs } from 'antd';
import { toUpper, groupBy, keys, sortBy, camelCase } from 'lodash';
// @ts-ignore
import { dataTypeJude } from 'sql/pages/Query/Result/Table';
import { Print } from 'navigator/pages/ReportCenter/_utils/utils';
import { delay } from '../utils';
import moment from 'moment';
import styles from './FollowModal.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { LS, LSKey } from '@/utils/cache';
const { TabPane } = Tabs;

interface IDatas {
  region: string;
  category: string;
  details: any[];
}
const defaultState = {
  region: '',
  category: '',
  details: [],
};

// detail的数据里面id、region、type、category、monitor_category 一定存在
const FollowModal = React.forwardRef((props: any, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false); // 新增loading状态

  const [datas, setDatas] = useState<IDatas>(defaultState);
  const [currentKey, setCurrentKey] = useState(undefined);
  const [dataKeys, setDataKeys] = useState<any[]>([]);

  ref.open = (_datas: IDatas) => {
    const responseData = groupBy(_datas.details, 'monitor_category');
    const userCompanyCode = LS.getItem(LSKey.CURRENTUSER)?.companyCode?.[0];

    const companyCode = userCompanyCode;
    const { dictionary } = window as any;
    const typeCode = 'Label_COM_MonitorCenter';

    const orderKeys = sortBy(
      keys(responseData).map((item) => ({
        dictCode: item,
        order: Number(
          dictionary?.[`${typeCode}_${companyCode}`]?.[item]?.order ||
            dictionary?.[typeCode]?.[item]?.order ||
            0
        ),
      })),
      'order'
    ).map((item) => item.dictCode);

    setDatas({ ..._datas, details: responseData });
    setDataKeys(orderKeys);
    setCurrentKey(orderKeys?.[0]);
    setVisible(true);
  };

  const copy = (text: string) => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', text);
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    document.body.removeChild(input);
    notification.success({ message: 'Copy Success' });
  };

  const columns = useMemo(
    () =>
      Object.keys(datas?.details?.[currentKey]?.[0] || {})?.map((key: string) => ({
        title: key,
        name: key,
        sorter: (a: any, b: any) => `${a?.[key] || ''}`?.localeCompare(`${b?.[key] || ''}`),
        dataIndex: key,
        width: 160,
        render: (text: any = '-') => {
          let newText = text;
          if (['caseCategory'].includes(camelCase(key))) {
            newText = formatMessageApi({ Label_BPM_CaseCategory: text });
          }
          if (['currentActivity', 'activity'].includes(camelCase(key))) {
            newText = formatMessageApi({ activity: text });
          }
          if (/{/.test(text) || /.java:/.test(text) || newText?.length > 800 || /xml/.test(text)) {
            const title = (
              <Button
                style={{ textAlign: 'center' }}
                type="primary"
                onClick={() => {
                  copy(text);
                }}
              >
                copy
              </Button>
            );

            const context = dataTypeJude(text);
            newText = (
              <Popover
                className={styles.ellipsis}
                content={<div className={styles.content}>{context.component}</div>}
                title={title}
              >
                {text}
              </Popover>
            );
          }
          return newText || '-';
        },
      })),
    [datas, currentKey]
  );

  const onDownload = async () => {
    if (downloadLoading) return; // 防止多次点击
    setDownloadLoading(true);
    try {
      const printUtils = new Print();
      const name = `HealthCheck_${datas?.category}_${datas?.region}_${moment().format('YYYY_MM_DD_HH_mm_ss')}`;

      printUtils.printExcelFnSheet({
        data: dataKeys.map((item) => {
          const dataSource = datas?.details?.[item] || [];
          const dataKeys = keys(dataSource[0]);
          const caseKey = dataKeys.filter((k) => ['caseCategory'].includes(camelCase(k)));
          const activityKey = dataKeys.filter((k) =>
            ['currentActivity', 'activity'].includes(camelCase(k))
          );
          return {
            dataSource: dataSource.map((newItem) => {
              if (caseKey[0]) {
                newItem[caseKey[0]] = formatMessageApi({
                  Label_BPM_CaseCategory: newItem[caseKey[0]],
                });
              }
              if (activityKey[0]) {
                newItem[activityKey[0]] = formatMessageApi({ activity: newItem[activityKey[0]] });
              }
              return newItem;
            }),
            tableName: formatMessageApi({ Label_COM_MonitorCenter: item }),
          };
        }),
        fileName: name,
      });
      await delay(1000);
    } finally {
      setDownloadLoading(false);
    }
  };

  const title = (
    <div className={styles.modalHeader}>
      <div className={styles.modalTitle}>
        {toUpper(datas?.category)} - {toUpper(datas?.region)}
      </div>
      {downloadLoading ? (
        <Icon type="loading" className={styles.iconDownload} />
      ) : (
        <Icon
          type="download"
          className={styles.iconDownload}
          onClick={onDownload}
          style={{ strokeWidth: 2 }}
        />
      )}
    </div>
  );

  return (
    <Modal
      width={1200}
      title={title}
      visible={visible}
      centered={true}
      onCancel={() => {
        setVisible(false);
      }}
      afterClose={() => {
        setDatas(defaultState);
      }}
      getContainer={false}
      footer={null}
      className={styles.modalBox}
    >
      <Tabs
        activeKey={currentKey}
        onTabClick={(e) => {
          if (e !== currentKey) {
            setCurrentKey(e);
          }
        }}
      >
        {dataKeys.map((item) => (
          <TabPane
            tab={
              <div
                title={
                  formatMessageApi({ Label_COM_MonitorCenter_Remark: item }) === item
                    ? undefined
                    : formatMessageApi({ Label_COM_MonitorCenter_Remark: item })
                }
              >
                {formatMessageApi({ Label_COM_MonitorCenter: item })}
              </div>
            }
            key={item}
          >
            <Table
              scroll={{
                x: 'max-content',
                y: 540,
                scrollToFirstRowOnChange: true,
              }}
              rowKey="id"
              columns={columns}
              dataSource={datas?.details?.[item] || []}
              pagination={{
                showTotal: (total) => `${total} Total`,
              }}
            />
          </TabPane>
        ))}
      </Tabs>
    </Modal>
  );
});

export default FollowModal;
