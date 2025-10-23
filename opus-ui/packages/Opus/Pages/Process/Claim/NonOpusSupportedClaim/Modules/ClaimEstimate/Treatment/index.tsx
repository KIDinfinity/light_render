import React from 'react';
import lodash from 'lodash';

import { useDispatch } from 'dva';

import { Icon, Row, Col } from 'antd';

import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import { ReactComponent as DeleteIcon } from 'opus/Assets/icon-delete.svg';

import Title from '../Title';
import Basic from './Basic';

import styles from './index.less';

const Main = ({ list, editable }: any) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.treatmentWrap}>
      <Title title={formatMessageApi({ Label_BIZ_Claim: 'claim.title.treatmentInformation' })} />
      <Row className={styles.rowWrap}>
        <Col span={1}>{formatMessageApi({ Label_CLM_Opus: 'No.' })}</Col>
        <Col span={4}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.date-of-admission',
          })}
        </Col>
        <Col span={4}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.date-of-discharge',
          })}
        </Col>
        {/* <Col span={6}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.medical-provider',
          })}
        </Col> */}
        <Col span={3}>{formatMessageApi({ Label_CLM_Opus: 'inpatientDays' })}</Col>
      </Row>
      {lodash.map(list, (item, index) => (
        <div key={index} className={styles.itemWrap}>
          <Basic item={item} index={index} editable={editable} />
          <Icon
            component={AddIcon}
            className={styles.addWrap}
            onClick={() => {
              dispatch({
                type: `${NAMESPACE}/claimEstimateTreatmentAdd`,
                payload: {
                  idx: index,
                },
              });
            }}
          />
          {list.length > 1 && (
            <Icon
              component={DeleteIcon}
              className={styles.deleteWrap}
              onClick={() => {
                dispatch({
                  type: `${NAMESPACE}/claimEstimateTreatmentDelete`,
                  payload: {
                    id: item.id,
                  },
                });
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Main;
