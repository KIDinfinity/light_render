import React, { useEffect } from 'react';
import lodash from 'lodash';

import { useDispatch } from 'dva';

import { Icon } from 'antd';

import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import { ReactComponent as DeleteIcon } from 'opus/Assets/icon-delete.svg';

import Basic from './Basic';
import TreatmentType from './TreatmentType';

import styles from './index.less';

const Main = ({
  NAMESPACE,
  otherProcedureItem: { id: otherProcedureId, procedureType, therapeuticMonthList },
}: any) => {
  const dispatch = useDispatch();

  // 兼容旧数据没有id
  useEffect(() => {
    let noId = false;
    const newList = lodash.map(therapeuticMonthList, (item: any) => {
      if (!item.id) {
        noId = true;
      }
      return {
        ...item,
        id: uuidv4(),
      };
    });
    if (!!noId) {
      dispatch({
        type: `${NAMESPACE}/therapeuticMonthListInit`,
        payload: {
          otherProcedureId,
          list: newList,
        },
      });
    }
  }, [therapeuticMonthList]);

  return (
    <div className={styles.antiCancerAndHormoneWrap}>
      <TreatmentType procedureType={procedureType} NAMESPACE={NAMESPACE} />
      {lodash.map(therapeuticMonthList, (item, index) => (
        <div key={index} className={styles.itemWrap}>
          <div className={styles.itemBasic}>
            <Basic
              item={{
                ...item,
                otherProcedureId,
                therapeuticMonthList,
                index,
                procedureType,
                NAMESPACE,
              }}
            />
          </div>
          <div className={styles.itemOptions}>
            <Icon
              component={AddIcon}
              className={styles.addWrap}
              onClick={() => {
                dispatch({
                  type: `${NAMESPACE}/therapeuticMonthListAdd`,
                  payload: {
                    otherProcedureId,
                  },
                });
              }}
            />
            {lodash.size(therapeuticMonthList) > 1 && (
              <Icon
                component={DeleteIcon}
                className={styles.deleteWrap}
                onClick={() => {
                  dispatch({
                    type: `${NAMESPACE}/therapeuticMonthListDelete`,
                    payload: {
                      otherProcedureId,
                      id: item.id,
                    },
                  });
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
