import { formatMessageApi } from '@/utils/dictFormatMessage';

import { Icon } from 'opus/Components/Antd';

import Buttons from 'opus/Components/Buttons';
import NAMESPACE from 'opus/Pages/QualityControl/_models/nameSpace';
import { ReactComponent as dashboard } from 'packages/Opus/Assets/icon-dashboard.svg';
import { ModalTabs } from 'opus/Enums';

import React from 'react';
import { useDispatch, useSelector } from 'dva';
import styles from './index.less';

const Main = ({
  handleFilter,
  showExport,
  categoryCode,
  handleReassign,
  reassignBtnDisabled,
}: any) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.loading.effects[`${NAMESPACE}/getExport`]);
  const showReassign = useSelector(({ opusHome }: any) => opusHome?.modalTab !== ModalTabs.myTask);

  return (
    <div className={styles.topContent}>
      <div className={styles.titleWrap}>
        <Icon component={dashboard} className={styles.icon} />
        <span className={styles.title}>
          {formatMessageApi({ Label_COM_Opus: 'Quality Control Cases' })}
        </span>
      </div>

      <div className={styles.buttonWrap}>
        <Buttons.Filter
          handleClick={() => {
            handleFilter();
          }}
        />
        {!!showExport && (
          <Buttons.Export
            loading={loading}
            handleClick={() => {
              dispatch({
                type: `${NAMESPACE}/getExport`,
                payload: {
                  categoryCode,
                },
              });
            }}
          />
        )}

        {showReassign && (
          <Buttons.Reassign
            disabled={reassignBtnDisabled}
            handleClick={() => {
              handleReassign();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
