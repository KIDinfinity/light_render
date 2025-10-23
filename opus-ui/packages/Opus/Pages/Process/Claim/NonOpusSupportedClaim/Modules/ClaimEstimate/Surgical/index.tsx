import React from 'react';
import lodash from 'lodash';

import { useSelector, useDispatch } from 'dva';

import { Icon, Row, Col } from 'antd';

import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import Modal from './Modal';

import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import { ReactComponent as DeleteIcon } from 'opus/Assets/icon-delete.svg';

import Title from '../Title';
import Basic from './Basic';

import styles from './index.less';

const Main = ({ list, editable }: any) => {
  const dispatch = useDispatch();

  const show =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimEstimateSurgicalModal?.show || false
    ) || {};

  return (
    <div className={styles.surgicalWrap}>
      <Title title={formatMessageApi({ Label_CLM_Opus: 'surgicalInformation' })} />
      {!list?.length && (
        <Icon
          component={AddIcon}
          className={styles.addBtn}
          onClick={() => {
            dispatch({
              type: `${NAMESPACE}/claimEstimateSurgicalAdd`,
              payload: {
                idx: 1,
              },
            });
          }}
        />
      )}
      <Row className={styles.rowWrap}>
        <Col span={1}>{formatMessageApi({ Label_CLM_Opus: 'No.' })}</Col>
        <Col span={4}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.date-of-operation',
          })}
        </Col>
        <Col span={8}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.procedure-name',
          })}
        </Col>
        <Col span={2}>
          {formatMessageApi({
            Label_CLM_Opus: 'multiplier88',
          })}
        </Col>
      </Row>
      {lodash.map(list, (item, index) => (
        <div key={index} className={styles.itemWrap}>
          <Basic item={item} index={index} editable={editable} />
          <Icon
            component={AddIcon}
            className={styles.addWrap}
            onClick={() => {
              dispatch({
                type: `${NAMESPACE}/claimEstimateSurgicalAdd`,
                payload: {
                  idx: index++,
                },
              });
            }}
          />
          <Icon
            component={DeleteIcon}
            className={styles.deleteWrap}
            onClick={() => {
              dispatch({
                type: `${NAMESPACE}/claimEstimateSurgicalDelete`,
                payload: {
                  id: item.id,
                },
              });
            }}
          />
        </div>
      ))}
      <Modal />
    </div>
  );
};

export default Main;
