import React from 'react';
import lodash from 'lodash';

import { useSelector, useDispatch } from 'dva';

import { Modal, Table } from 'antd';

import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import styles from './index.less';

const Main = () => {
  const dispatch = useDispatch();

  const { show, list, surgicalId } =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEstimateSurgicalModal || {}
    ) || {};

  const columns = [
    {
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.procedure-name',
      }),
      dataIndex: 'approvalProcedureName',
      key: 'approvalProcedureName',
    },
    {
      title: formatMessageApi({ Label_BIZ_Claim: 'kjCode' }),
      dataIndex: 'kjCode',
      key: 'kjCode',
    },
    {
      title: formatMessageApi({ Label_CLM_Opus: 'itemName1' }),
      dataIndex: 'item1',
      key: 'item1',
      sorter: true,
    },
    {
      title: formatMessageApi({ Label_CLM_Opus: 'itemValue1' }),
      dataIndex: 'item1Value',
      key: 'item1Value',
      sorter: true,
    },
    {
      title: formatMessageApi({ Label_CLM_Opus: 'itemName2' }),
      dataIndex: 'item2',
      key: 'item2',
      sorter: true,
    },
    {
      title: formatMessageApi({ Label_CLM_Opus: 'itemValue2' }),
      dataIndex: 'item2Value',
      key: 'item2Value',
      sorter: true,
    },
    {
      title: formatMessageApi({ Label_CLM_Opus: 'itemName3' }),
      dataIndex: 'item3',
      key: 'item3',
      sorter: true,
    },
    {
      title: formatMessageApi({ Label_CLM_Opus: 'itemValue3' }),
      dataIndex: 'item3Value',
      key: 'item3Value',
      sorter: true,
    },
    {
      title: formatMessageApi({ Label_CLM_Opus: 'itemName4' }),
      dataIndex: 'item4',
      key: 'item4',
      sorter: true,
    },
    {
      title: formatMessageApi({ Label_CLM_Opus: 'itemValue4' }),
      dataIndex: 'item4Value',
      key: 'item4Value',
      sorter: true,
    },
    {
      title: formatMessageApi({ Label_CLM_Opus: 'itemName5' }),
      dataIndex: 'item5',
      key: 'item5',
      sorter: true,
    },
    {
      title: formatMessageApi({ Label_CLM_Opus: 'itemValue5' }),
      dataIndex: 'item5Value',
      key: 'item5Value',
      sorter: true,
    },
    {
      title: formatMessageApi({ Label_CLM_Opus: 'multiplier88' }),
      dataIndex: 'multiplier88',
      key: 'multiplier88',
      sorter: true,
    },
  ];

  return (
    <Modal
      title={formatMessageApi({ Label_CLM_Opus: 'searchSurgery' })}
      width="80%"
      footer={null}
      closable={false}
      visible={show}
      onOk={() => {}}
      className={styles.surgicalModalWrap}
    >
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={list}
        scroll={{ y: 400 }} // Adjust the height as needed
        pagination={false}
        onRow={(item: any) => {
          return {
            onClick: async () => {
              console.log('item----', item);
              await dispatch({
                type: `${NAMESPACE}/claimEstimateSurgicalUpdate`,
                payload: {
                  item,
                  id: surgicalId,
                },
              });
              await dispatch({
                type: `${NAMESPACE}/claimEstimateSurgicalModaUpdate`,
                payload: {
                  show: false,
                },
              });
              setTimeout(() => {
                dispatch({
                  type: `${NAMESPACE}/claimEstimateSurgicalModaUpdate`,
                  payload: {
                    list: [],
                  },
                });
              }, 800);
            },
          };
        }}
        onChange={async (pagination: any, _: any, sorter: any) => {
          let extraParams: any = {};

          if (!lodash.isEmpty(pagination)) {
            const { current: currentPage } = pagination || {};
            extraParams = {
              ...extraParams,
              currentPage,
            };
          }
          if (!lodash.isEmpty(sorter)) {
            const datas: any = await dispatch({
              type: `${NAMESPACE}/getApprovalProcedure`,
              payload: {
                searchContent: list?.[0]?.approvalProcedureName,
                extra: !!sorter.order
                  ? {
                      sortName: sorter.field || (sorter.column as any)?.fieldCode,
                      sortOrder: lodash.includes(sorter.order, 'ascend')
                        ? 'asc'
                        : lodash.includes(sorter.order, 'desc')
                          ? 'desc'
                          : '',
                    }
                  : {
                      sortName: '',
                      sortOrder: '',
                    },
              },
            });
            if (!lodash.isEmpty(datas)) {
              dispatch({
                type: `${NAMESPACE}/claimEstimateSurgicalModaUpdate`,
                payload: {
                  list: lodash.map(datas, (item: any) => ({
                    ...item,
                    kjCode: `${item.kjCode || ''}${item.branchNo || ''}${item.kjCode || ''}`,
                  })),
                },
              });
            }
          }
        }}
      />
    </Modal>
  );
};

export default Main;
