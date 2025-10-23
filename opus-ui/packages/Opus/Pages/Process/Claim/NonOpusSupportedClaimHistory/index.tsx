import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { parse } from 'qs';
import Header from './Header';
import Insured from '../NonOpusSupportedClaim/Modules/Insured';
import ServiceAgent from '../NonOpusSupportedClaim/Modules/ServiceAgent/ServiceAgent';
import PageContainer from 'basic/components/Elements/PageContainer';
import Claimant from '../NonOpusSupportedClaim/Modules/Claimant';
import ClaimResult from '../NonOpusSupportedClaim/Modules/ClaimResult';
import FollowUpTaskList from '../NonOpusSupportedClaim/Modules/FollowUpTasks';
import ConfirmModal from '../NonOpusSupportedClaim/_components/ConfirmModal';
import InformationModal from 'packages/Opus/NewBusiness/ManualUnderwriting/_components/InformationModal/index';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { getClaimCaseNo } from '@/services/bpmBusinessProcessService';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { NAMESPACE } from '../NonOpusSupportedClaim/activity.config';

import BasicInfo from './BasicInfo';
import styles from './index.less';
import { tenant } from '@/components/Tenant';
import Sider from 'opus/Pages/Process/Claim/NonOpusSupportedClaimHistory/Sider';

const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};

const Main = () => {
  const dispatch = useDispatch();
  const { informationPerfectionDate } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => ({
      informationPerfectionDate: modelnamespace?.businessData?.informationPerfectionDate,
    }),
    shallowEqual
  );
  const {
    caseNo: processInstanceId,
    caseCategory,
    businessNo,
  } = parse(window.location.href.split('?')[1]) || {};

  const [caseNo, setCaseNo] = useState(processInstanceId);

  const [caseDetails, setCaseDetails] = useState({});

  const getDropDown = async () => {
    dispatch({
      type: `${NAMESPACE}/getDropdownConfigure`,
    });

    // 获取各个子模块fields的配置信息
    dispatch({
      type: `${NAMESPACE}/getFieldConfigure`,
    });
  };

  const getProcessInstanceId = async () => {
    const caseResponse = await getClaimCaseNo(
      objectToFormData({
        claimNo: businessNo,
        caseCategory: caseCategory,
      })
    );

    if (
      lodash.isPlainObject(caseResponse) &&
      caseResponse.success &&
      lodash.isString(caseResponse.resultData) &&
      !lodash.isEmpty(caseResponse.resultData)
    ) {
      setCaseNo(caseResponse.resultData);
    }
  };

  useEffect(() => {
    getDropDown();
  }, []);

  useEffect(() => {
    if (!!caseNo) {
      const t = async () => {
        const caseDetailResponse = await findBizProcess({
          processInstanceId: caseNo,
        });
        if (
          lodash.isPlainObject(caseDetailResponse) &&
          caseDetailResponse?.success &&
          lodash.isPlainObject(caseDetailResponse?.resultData)
        ) {
          setCaseDetails(caseDetailResponse?.resultData);
        }
      };
      t();
    } else {
      getProcessInstanceId();
    }
  }, [caseNo]);

  return (
    <PageContainer pageConfig={{}}>
      <div className={styles.container}>
        <Header
          inquiryApplicationNo={caseDetails?.inquiryBusinessNo}
          activityKey={caseDetails?.activityKey || caseDetails?.currentActivityKey}
        >
          <BasicInfo {...{ ...caseDetails, informationPerfectionDate }} />
        </Header>
        {/* 临时使用的简易Sider */}
        {tenant.isJP() && <Sider />}
        <div className={`${styles.content} ${styles['black-scroll']}`}>
          <div className={styles.wrap}>
            <Row gutter={24}>
              <Col {...layout}>
                <Insured />
              </Col>
              <Col {...layout}>
                <Claimant />
              </Col>
            </Row>
            <Row>
              <Col>
                <ServiceAgent />
              </Col>
            </Row>
            <Row>
              <Col>
                <ClaimResult />
              </Col>
            </Row>
            <Row>
              <Col>
                <FollowUpTaskList />
              </Col>
            </Row>
            <InformationModal />
            <ConfirmModal />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Main;
