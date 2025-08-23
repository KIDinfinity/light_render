import React, { useState } from 'react';
import { Modal, Button, Icon, Collapse } from 'antd';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { ReactComponent as Circle } from './assets/circle.svg';
import { ReactComponent as Check } from './assets/check.svg';
import { ReactComponent as Error } from './assets/error.svg';

const { Panel } = Collapse;

import styles from './index.less';

const Processing = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const progressData =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.progressData) || [];

  const progressDone =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.progressDone) || false;

  const renderTitle = ({ status, title }: any) => {
    return (
      <div className={styles.titleWrap}>
        {status === 'doing' ? (
          <Icon type="loading" style={{ color: '#00BEA0' }} />
        ) : (
          <Icon component={status === 'inError' ? Error : status === 'done' ? Check : Circle} />
        )}
        <span className={styles.title}> {title}</span>
      </div>
    );
  };
  return (
    <Modal
      className={styles.modalWrap}
      footer={null}
      visible={!lodash.isEmpty(progressData)}
      centered
    >
      <div className={styles.ProcessingWrap}>
        <div className={styles.content}>
          {lodash.map(progressData, ({ title, status, error }) => (
            <div className={styles.item} key={title}>
              {error && !lodash.isEmpty(error) ? (
                <Collapse defaultActiveKey={['1']}>
                  <Panel header={renderTitle({ status, title })} key="1">
                    <div className={styles.error}>{error}</div>
                  </Panel>
                </Collapse>
              ) : (
                <>{renderTitle({ status, title })}</>
              )}
            </div>
          ))}
        </div>

        <div
          className={styles.buttons}
          onClick={() => {
            if (!!progressDone) {
              dispatch({
                type: `${NAMESPACE}/clearProgressData`,
              });
            } else {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 2000);
            }
          }}
        >
          <Button block type={!!progressDone ? 'primary' : 'default'} loading={loading}>
            {!!progressDone ? ' Got it' : 'Refresh'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Processing;
