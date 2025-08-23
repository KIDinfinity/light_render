import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import classNames from 'classnames';
import Swiper from 'react-id-swiper';
import styles from './clientInfoBrief.less';

export default () => {
  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  const activeRole: string = useSelector(({ insured360 }: any) => insured360.activeRole) || '';
  const activeClientId = useSelector(({ insured360 }: any) => insured360?.activeClientId);
  const sideBarOverallList =
    useSelector(({ insured360 }: any) => insured360?.sideBarOverallList) || [];

  const params = {
    slidesPerView: 3, //显示数量
    loop: true,
    observer: true,
    observeSlideChildren: true,
    speed: 2000,
  };

  useEffect(() => {
    setList(
      lodash
        .chain(sideBarOverallList)
        .reduce((arr: any, item: any) => {
          if (!!item.clientInfo) {
            const { firstName, middleName, surname } = item.clientInfo;
            const key = `${firstName}-${middleName}-${surname}`;
            if (!lodash.find(arr, { key })) {
              return [...arr, { key, ...item.clientInfo, keyClientId: item.keyClientId }];
            }
          }
          return arr;
        }, [])
        .value()
    );
  }, [sideBarOverallList, activeClientId]);

  const handleClick = ({ clientInfo, role }: any) => {
    if (clientInfo?.clientId !== activeClientId) {
      dispatch({
        type: 'insured360/saveActive360Info',
        payload: {
          activeClientId: clientInfo?.clientId,
        },
      });
    }
    dispatch({
      type: 'insured360/saveActiveRole',
      payload: {
        activeRole: clientInfo?.clientId === activeClientId && role !== activeRole ? role : '',
      },
    });
  };

  return (
    <div className={styles.userInfo}>
      <Swiper {...params}>
        {list.map((item: any) => {
          const { key, firstName, middleName, surname, keyClientId } = item;
          return (
            <div
              key={key}
              className={classNames(
                styles.item,
                keyClientId === activeClientId ? styles.active : styles.noActive
              )}
              onClick={(e: any) => {
                e.stopPropagation();
                handleClick({ clientInfo: item, role: '' });
              }}
            >
              <div className={styles.line} />
              {!!firstName && <div className={styles.title}>{firstName}</div>}
              {!!middleName && <div className={styles.title}>{middleName}</div>}
              {!!surname && <div className={styles.title}>{surname}</div>}
            </div>
          );
        })}
      </Swiper>
    </div>
  );
};
