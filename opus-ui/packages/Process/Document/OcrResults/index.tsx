import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { Layout, Row, Col } from 'antd';
import { NAMESPACE } from './activity.config';

import CaseInfo from './CaseInfo';
import SiderBar from './SiderBar';
import Contents from './Contents';
import styles from './index.less';

const { Header, Footer, Sider, Content } = Layout;

export default ({ match }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const {
      params: { processInstanceId },
    } = match;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: ['Dropdown_COM_ClaimType'],
    });

    dispatch({
      type: `${NAMESPACE}/getCaseDetails`,
      payload: {
        processInstanceId,
      },
    });

    dispatch({
      type: `${NAMESPACE}/getOcrResultDetail`,
      payload: {
        caseNo: processInstanceId,
      },
    });
  }, [match]);

  return (
    <Layout className={styles.wrap}>
      <div className={styles.header}>
        <Row>
          <Col span={8} className={styles.topTitle}>
            OCR Result
          </Col>
          <Col span={16}>
            <CaseInfo />
          </Col>
        </Row>
      </div>
      <Layout>
        <Sider>
          <SiderBar />
        </Sider>
        <Content>
          <Contents />
        </Content>
      </Layout>
    </Layout>
  );
};
