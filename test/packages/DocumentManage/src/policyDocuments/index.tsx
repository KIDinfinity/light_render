import React, { useEffect } from 'react';
import { Icon } from 'antd';
import type { Dispatch } from 'dva';
import { useDispatch } from 'dva';
import type { RouteComponentProps } from 'dva/router';
import DataLayout from '@/components/DataLayout';
import Title from '../pages/_components/Title';
import DocumentViewer from '../pages/Viewer';
import DocumentList from './DocumentList';
import styles from './styles.less';
import { useParams } from 'umi';

const { DataItem } = DataLayout;

const PolicyDocuments: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const dispatch: Dispatch = useDispatch();
  const params = useParams();
  const onDownload = () => {
    dispatch({
      type: 'documentManagement/getImageUrl',
    });
  };

  // 页面初始化
  useEffect(() => {
    // 隐藏布局头部
    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowMenu: false,
      },
    });
  }, []);

  // 拿数据
  useEffect(() => {
    dispatch({
      type: 'policyDocuments/getDocViewConfigbByPolicyNo',
      payload: {
        policyNo: params?.id,
      },
    });
  }, [params?.id]);

  return (
    // todo loading status
    <div className={styles.policyDocuments}>
      <div className={styles.side}>
        <div className={styles.title}>
          <Title text="Policy Documents" textType="capitalize" barStyle={{ width: 4 }} />
        </div>
        <div className={styles.control}>
          <div className={styles.buttonBar}>
            <Icon type="cloud-download" className={styles.downloadIcon} onClick={onDownload} />
          </div>
          <div className={styles.documentList}>
            <DocumentList />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <DataLayout className={styles.caseInfo} rowProps={{ align: 'middle', justify: 'end' }}>
          <DataItem title="Policy No." span={3}>
            {params.id}
          </DataItem>
        </DataLayout>
        <div className={styles.documentViewer}>
          <DocumentViewer />
        </div>
      </div>
    </div>
  );
};

export default PolicyDocuments;
