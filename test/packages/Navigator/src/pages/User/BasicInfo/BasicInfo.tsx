import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'dva';
import { Row, Col } from 'antd';
import { useSize } from 'ahooks';
import { serialize as objectToFormData } from 'object-to-formdata';
import Title from '../_components/Title';
import Personal from './Personal';
import Organization from './Organization';
import QulificationAndSkill from './QulificationAndSkill';
import LeaveManagement from '../LeaveManagement';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);

  const getDropdown = () => {
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCode',
      payload: objectToFormData({ typeCode: 'marital' }),
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCode',
      payload: objectToFormData({ typeCode: 'IdentityType' }),
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCode',
      payload: objectToFormData({ typeCode: 'Relationship' }),
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCode',
      payload: objectToFormData({ typeCode: 'Dropdown_CFG_CertificateType' }),
    });
  };

  useEffect(() => {
    dispatch({
      type: 'userManagement/getUserPersonInfo',
    });
    dispatch({
      type: 'userManagement/getBasicList',
    });
    getDropdown();
  }, []);

  return (
    <>
      <Title />
      <div className={styles.basicInfo}>
        <div className={styles.infoTop} ref={ref}>
          <Row gutter={16}>
            <Col className="gutter-row" span={(size?.width ?? 1000) > 770 ? 14 : 24}>
              <Personal />
              <Organization />
            </Col>
            <Col className="gutter-row" span={(size?.width ?? 1000) > 770 ? 10 : 24}>
              <LeaveManagement />
            </Col>
          </Row>
        </div>
        <QulificationAndSkill />
      </div>
    </>
  );
};
