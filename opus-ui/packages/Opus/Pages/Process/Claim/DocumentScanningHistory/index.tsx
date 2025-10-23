import React, { useEffect, useState } from 'react';
import lodash from 'lodash';

import { useDispatch } from 'dva';

import { parse } from 'qs';
import { findBizProcess } from '@/services/bpmBusinessProcessService';

import Header from './Header';

import Tabs from '../DocumentScanning/Tabs';
import UploadDocuments from './../DocumentScanning/UploadDocuments';
import OCRResultModal from './../DocumentScanning/OCRResultModal';

import { NAMESPACE } from '../DocumentScanning/activity.config';

import BasicInfo from './BasicInfo';
import styles from './index.less';

const Main = () => {
  const dispatch = useDispatch();

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
  useEffect(() => {
    getDropDown();
  }, []);
  useEffect(() => {
    const { caseNo: processInstanceId } = parse(window.location.href.split('?')[1]) || {};

    if (!!processInstanceId) {
      const t = async () => {
        const caseDetailResponse = await findBizProcess({
          processInstanceId,
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
    }
  }, [window.location.href]);

  return (
    <div className={styles.container}>
      <Header inquiryApplicationNo={caseDetails?.inquiryBusinessNo} activityKey="BP_DC_ACT001">
        <BasicInfo {...caseDetails} />
      </Header>
      <div className={`${styles.content} ${styles['black-scroll']}`}>
        <Tabs />
        <UploadDocuments />
      </div>
      <OCRResultModal />
    </div>
  );
};

export default Main;
