import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Row, Col } from 'antd';
import lodash from 'lodash';
import classnames from 'classnames';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import BooleanEnum from 'basic/enum/BooleanEnum';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import SectionDisplay from 'summary/SectionDisplay';
import useJudgeSectionDisplay from 'summary/hooks/useJudgeSectionDisplay';
import useJudgeDisplayFundSection from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayFundSection';
import useLoadAddressList from 'process/NB/ManualUnderwriting/_hooks/useLoadAddressList';
import styles from './index.less';

export default ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const fundVisible = useJudgeDisplayFundSection();
  const loanVisible = lodash.get(businessData, 'policyList[0].loanProtection') === BooleanEnum.Yes;
  useLoadAddressList({
    businessData,
  });
  const isDisplayc360 = useJudgeSectionDisplay({
    section: 'c360',
  });
  const clientContainer = slots.get('client');
  const client = React.useMemo(() => {
    const childrenAddParam = (() => {
      const dom = lodash.get(clientContainer?.props?.children || [], '[0]');
      const judge = React.isValidElement(dom);
      if (judge) {
        return React.cloneElement(dom, {
          isDisplayc360,
        });
      }
      return [dom];
    })();
    return {
      ...clientContainer,
      props: {
        ...clientContainer.props,
        children: childrenAddParam,
      },
    };
  }, [clientContainer, isDisplayc360]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* <div>{slots.get('export')}</div> */}
        <div>{slots.get('header')}</div>
        <SectionDisplay section="policyNo">
          <div className={styles.PolicyNo}>{slots.get('policyNo')}</div>
        </SectionDisplay>
        <SectionDisplay section="client">
          <div className={styles.client}>{client}</div>
        </SectionDisplay>
        {/* <SectionDisplay section="c360">
          <div className={styles.C360}>{slots.get('c360')}</div>
        </SectionDisplay> */}
        <SectionDisplay section="planInfo">
          <div className={styles.PlanInfo}>{slots.get('planInfo')}</div>
        </SectionDisplay>
        <SectionDisplay section="decision">
          <div className={styles.decision}>{slots.get('decision')}</div>
        </SectionDisplay>
        <div className={styles.decision} style={{ order: 5 }}>
          <Row type="flex" gutter={16}>
            <SectionDisplay section="loan">
              <Col span={loanVisible ? 12 : 0}>{slots.get('loan')}</Col>
            </SectionDisplay>
            <SectionDisplay section="fund">
              <Col span={fundVisible ? 12 : 0}>{slots.get('fund')}</Col>
            </SectionDisplay>
            <SectionDisplay section="policyReplacement">
              <Col span={loanVisible || fundVisible ? 12 : 24}>
                {slots.get('policyReplacement')}
              </Col>
            </SectionDisplay>
          </Row>
        </div>
        <SectionDisplay section="distributionchannel">
          <div className={styles.distributionchannel}>{slots.get('distributionchannel')}</div>
        </SectionDisplay>
        <SectionDisplay section="information">
          <div className={classnames(styles.gap)} style={{ order: 9 }}>
            {slots.get('InformationSummary')}
          </div>
        </SectionDisplay>
        <SectionDisplay section="envoy">
          <div className={classnames(styles.gap)} style={{ order: 10 }}>
            {slots.get('EnvoySummary')}
          </div>
        </SectionDisplay>
      </div>
      <div className={styles.navigation}>{slots.get('navigation')}</div>
    </div>
  );
};
