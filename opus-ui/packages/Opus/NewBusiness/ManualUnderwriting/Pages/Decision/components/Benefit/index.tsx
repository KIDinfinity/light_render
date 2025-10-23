import React, { useEffect } from 'react';
import useGetSAMultiplierOPUS from './_hooks/useGetSAMultiplierOPUS';
import useGetRopList from './_hooks/useGetRopList';
import CoverageList from './components/CoverageList';
import styles from './index.less';
// import Footer from './components/Footer';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { Collapse } from 'antd';
import CoverageTableHeader from './components/CoverageTableHeader/index';

const { Panel } = Collapse;

const Content = () => {
  const dispatch = useDispatch();
  useGetRopList();
  useGetSAMultiplierOPUS();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/loadPlanDictProductRegion`,
    });
  }, []);

  return (
    <>
      <div className={styles.coverageContainer}>
        <CoverageTableHeader />
        <div
          id="coverageListArea"
          style={{
            maxHeight: '900px',
            overflowY: 'scroll',
            width: 'fit-content',
            position: 'relative',
          }}
        >
          <CoverageList />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

const Benefit = () => {
  return (
    <div className={styles.container}>
      <Collapse expandIconPosition="right" defaultActiveKey={'Underwriting'}>
        <Panel header={formatMessageApi({ Dropdown_POL_PolicyStatus: 'UW' })} key="Underwriting">
          <Content />
        </Panel>
      </Collapse>
    </div>
  );
};

Benefit.displayName = 'benefit';

export default Benefit;
