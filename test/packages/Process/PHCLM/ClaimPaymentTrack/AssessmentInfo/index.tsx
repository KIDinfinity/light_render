import React, { useMemo, useEffect, useState } from 'react';
import styles from './index.less';
import lodash from 'lodash';
import { Row, Col } from 'antd';
import fieldList from './filedList';
import { useSelector } from 'dva';
import transFieldValue from './transFieldValue';
import { NAMESPACE } from '../activity.config';
import { FormAntCard } from 'basic/components/Form';
import { useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';

const AssessmentInfo = () => {
  const assessmentInfo: any =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.assessmentInfo,
      shallowEqual
    ) || {};

  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const list = useMemo(() => {
    return fieldList.map((item) => {
      return {
        ...item,
        value: transFieldValue(item, data),
      };
    });
  }, [data]);

  useEffect(() => {
    const claimDisease = assessmentInfo.claimDisease;
    async function getClaimDisease() {
      const res = await dispatch({
        type: `${NAMESPACE}/getDiagnosisMisDict`,
        payload: {
          dictCodes: [claimDisease],
        },
      });
      if (res.success && res.resultData?.length > 0) {
        setData({ ...assessmentInfo, claimDisease: res.resultData[0].dictName });
      } else {
        setData(assessmentInfo);
      }
    }
    getClaimDisease();
  }, [assessmentInfo]);

  return (
    <div className={styles.wrapper}>
      <FormAntCard title={`Claim No: ${assessmentInfo.claimNo}`}>
        <div className={styles.listWrap}>
          <Row className={styles.infoList} gutter={[8, 8]}>
            {lodash
              .chain(list)
              .map((item: any, index: number) => {
                return (
                  <Col
                    className={styles.info}
                    key={index}
                    span={item.span || 6}
                    data-id={`col-${item.field}`}
                  >
                    <span
                      className={styles.label}
                      title={item.label}
                      data-id={`label-${item.field}`}
                    >
                      {item.label}
                    </span>
                    <span
                      data-datakey={item.key}
                      className={styles.value}
                      title={item.value}
                      data-id={`value-${item.field}`}
                    >
                      {item.value}
                    </span>
                  </Col>
                );
              })
              .value()}
          </Row>
        </div>
      </FormAntCard>
    </div>
  );
};

export default AssessmentInfo;
