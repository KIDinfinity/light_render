import React, { useState, useEffect } from 'react'
import { Spin, Tabs } from 'antd';
import { useDispatch, useSelector } from 'dva';
import styles from './index.less';
import classnames from 'classnames';
import PaymentInformation from './PaymentInformation';
import PaymentAllocation from './PaymentAllocation';
import PayeeInformation from './PayeeInformation';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import lodash from 'lodash';

const { TabPane } = Tabs;

export default ({loading}) => {
  const TabKeys = ['Payment Information', 'Payment Allocation', 'Payee Information'];
  const [activeIndex, setActiveIndex] = useState(0);
  const tabErrors = useSelector(({ paymentAllocation }) => {
    return paymentAllocation?.tabErrors;
  });
  const errors = useSelector(({ paymentAllocation }) => {
    return paymentAllocation?.errors;
  });

  const dispatch = useDispatch();

  const debounce = () => {
    console.log("🚀 ~ file: index.tsx:33 ~ debounce ~ debounce:")

    window.requestIdleCallback(()=>{
      // console.log("🚀 ~ file: index.tsx:34 ~ window.requestIdleCallback ~ requestIdleCallback:")
      dispatch({
        type: 'paymentAllocation/validateCertainTab',
      });
    })
  }

  useEffect(() => {
    dispatch({
      type: 'paymentAllocation/getProductNames'
    })
  }, [])

  const handleValidate = (e: React.FocusEvent<HTMLDivElement>|React.MouseEvent<HTMLDivElement>, eventType: string) => {
    if(
      eventType === 'blur'
      && e.target.className?.includes('ant-input')
      && errors.length
    ){
      debounce()
    }

    if(
      eventType !== 'blur'
      && e.target.className?.includes('ant-select-dropdown')
      && errors.length
    ){
      debounce()
    }
  }

  return (
    <div
    // onBlur={(e)=>handleValidate(e, 'blur')}
    // onClick={(e)=>handleValidate(e, '')}
    >
      <Spin className={styles.Loading} spinning={loading}>
        <Tabs
          renderTabBar={() => (
            <div className={styles.tabBar}>
              {TabKeys.map((key, index) => (
                <div
                  className={classnames({
                    [styles.tab]: true,
                    [styles.selectedTab]: index === activeIndex,
                  })}
                  key={key}
                  style={{ padding: 10 - index }}
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                >
                  <div
                    className={classnames({
                      [styles.twistedTab]: true,
                      [styles.selectedTab]: index === activeIndex,
                    })}
                    onClick={(evt) => {
                      evt.stopPropagation();
                      setActiveIndex(index);
                    }}
                    style={{ zIndex: 9 - index }}
                  />
                  <div className={styles.textContainer}>{key}</div>
                  {!!tabErrors[index]?.length
                    && <ErrorTooltipManual
                        style={{zIndex: 10}}
                        manualErrorMessage={tabErrors[index].map((i) => <div>{lodash.isPlainObject(i)? i.message : i}</div>)}
                      />
                  }
                </div>
              ))}
            </div>
          )}
          activeKey={TabKeys[activeIndex]}
        >
          <TabPane key={TabKeys[0]} forceRender={true}>
            <PaymentInformation />
          </TabPane>
          <TabPane key={TabKeys[1]} forceRender={true}>
            <PaymentAllocation />
          </TabPane>
          <TabPane key={TabKeys[2]} forceRender={true}>
            <PayeeInformation />
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
};
