import React, { useEffect, useState } from 'react';
import Monitor from '../../../Navigator/src/pages/Home/Monitor';
import { useSelector, useDispatch } from 'dva';
import { TypeEnum } from '@/enum/GolbalAuthority';
import styles from './index.less';
import classNames from 'classnames';
import lodash from 'lodash';
import plane from 'packages/Navigator/src/assets/plane.png';
import { LS, LSKey } from '@/utils/cache';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => {
  const dispatch = useDispatch();
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);
  const [show, setShow] = useState(false);
  const regionList = useSelector((state: any) => state.supportCenterController.switchRegionList);
  const currentUser = LS.getItem(LSKey.CURRENTUSER);
  const userId = lodash.get(currentUser, 'userId', '');
  const AuthMonitorEntry = lodash
    .chain(commonAuthorityList)
    .filter((item) => item.result && item.type === TypeEnum.Comm)
    .map((item) => item.authorityCode)
    .find((item) => item === 'RS_Entry_MonitorEntry')
    .value();

  const regionDictNameList = lodash.map(
    regionList,
    (item: { region: string; selectFlag: boolean; host: string }) => {
      return {
        region: item?.region,
        regionDictName: formatMessageApi({ DropDown_COM_Region: item?.region?.toUpperCase() }),
        selectFlag: item?.selectFlag,
        host: item?.host,
      };
    }
  );

  const regionName = lodash.find(
    regionDictNameList,
    (item) => item?.selectFlag === true
  )?.regionDictName;

  const changeRegion = (item: { region: string; host: string; selectFlag: boolean }) => {
    if (regionDictNameList?.length < 2 || item?.selectFlag) return;

    dispatch({
      type: 'supportCenterController/getNewRegionHost',
      payload: {
        region: item.region,
        userId,
        host: item.host,
      },
    });
    setShow(false);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  useEffect(() => {
    dispatch({
      type: 'supportCenterController/getRegionList',
      payload: {
        userId,
      },
    });
  }, [userId]);

  return (
    <>
      {AuthMonitorEntry && (
        <div className={styles.supportMonitor}>
          <div className={styles.left}>
            <div className={styles.region}>
              <img className={styles.plane} src={plane} onClick={() => setShow(true)} />
            </div>
            <div className={styles.regionName}>
              <h1>{regionName}</h1>
            </div>
          </div>
          <Monitor />
          {show && (
            <div className={styles.regionSwitch} onMouseLeave={handleMouseLeave}>
              {lodash.map(regionDictNameList, (item) => {
                return (
                  <span
                    className={classNames(item?.selectFlag && styles.regionSelect)}
                    onClick={() => changeRegion(item)}
                  >
                    {item?.regionDictName}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};
