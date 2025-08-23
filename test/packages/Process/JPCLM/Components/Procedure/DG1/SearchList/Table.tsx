import React from 'react';
import { Checkbox, Table} from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import { connect,useDispatch,useSelector} from 'dva';
import styles from './index.less';
import lodash from 'lodash';

function List({
  loading,
  total,
  therapeuticMonth,
  otherProcedureId,
  therapeuticDate,
}: any) {
  const dispatch = useDispatch();
  const {allList,drugsListStore,page} =useSelector(({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.DrugsDetail)
  const handleChecked = (item: any)=>{//增加/删除store中的某条数据
    dispatch({
      type:'JPCLMOfDataCapture/updateDrugsListStore',
      payload: {
        changedFields:item.drugId
      }
    })
  }
  const columns = [
    {
      title: '',
      key: 'checkRows',
      width: 45,
      render: (el: any, item: any) => {
        return (
          <Checkbox
            disabled={false}
            checked={lodash.includes(drugsListStore, item.drugId)}
            onClick={() => handleChecked(item)}
          />
        );
      },
    },
    {
      title: formatMessageApi({
        Label_COM_ConfigurationCenter: 'configurationCenter.effectiveDate',
      }),
      key: 'effectiveDate',
      width: 90,
      dataIndex: 'effectiveDate',
      render: (text: any) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: formatMessageApi({
        Label_COM_ConfigurationCenter: 'configurationCenter.expireDate',
      }),
      key: 'expireDate',
      width: 90,
      dataIndex: 'expireDate',
      render: (text: any) => <span>{text ? moment(text).format('YYYY-MM-DD') : ''}</span>,
    },
    {
      title: formatMessageApi({
        Label_COM_ConfigurationCenter: 'configurationCenter.drugName',
      }),
      key: 'drugName',
      dataIndex: 'drugName',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: formatMessageApi({
        Label_COM_ConfigurationCenter: 'configurationCenter.genericName',
      }),
      key: 'genericName',
      dataIndex: 'genericName',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: formatMessageApi({
        Label_COM_ConfigurationCenter: 'configurationCenter.brandName',
      }),
      key: 'brandName',
      dataIndex: 'brandName',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: formatMessageApi({
        Label_COM_ConfigurationCenter: 'configurationCenter.ATCCode',
      }),
      key: 'actCode',
      dataIndex: 'actCode',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: formatMessageApi({
        Label_COM_ConfigurationCenter: 'configurationCenter.ATCMidCategoryName',
      }),
      key: 'actMidCategoryName',
      dataIndex: 'actMidCategoryName',
      render: (text: any) => <span>{text}</span>,
    },
  ];
  return (
    <div className={styles.Table}>
      <div className={styles.list}>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={allList}
          pagination={{
            pageSize:10,
            total,
            current:page,
            onChange:(p)=>{
              dispatch({
                type:'JPCLMOfDataCapture/getDrugsDetailList',
                payload:{
                  currentPage:p,
                }
              })
            }
          }}
        />
      </div>
    </div>
  );
}

export default connect(({ loading }: any) => ({
  loading: loading.effects['JPCLMOfDataCapture/showDrugsDetailList']
}))(List);
