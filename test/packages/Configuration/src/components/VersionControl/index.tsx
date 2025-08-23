import React, { useState, useEffect } from 'react';
import lodash, { isEmpty } from 'lodash';
import { safeParseUtil } from '@/utils/utils';
import Authorized from '@/utils/Authorized';
import { ConfigurationEnum } from '@/enum/GolbalAuthority';
import RadioGroup from './RadioGroup';
import TimeLine from './TimeLine';
import { getTimeVersion, getTimeList } from './Utils';
import { Status } from 'configuration/constant';
// @ts-ignore
import styles from './index.less';

function VersionControl({
  versionList,
  isShow,
  isEditable = true,
  isAudit = false, // 审核节点
  onVersionClick,
  authorityCodeList = [],
}: any) {
  const [versions, setVersions] = useState([]);
  const [currentVersion, setCurrentVersion] = useState('');
  const [timeList, setTimeList] = useState([]);

  useEffect(() => {
    const { defaultTimeList, defaultVersion } = getTimeVersion(versionList);
    setVersions(versionList);
    setCurrentVersion(defaultVersion);
    setTimeList(defaultTimeList);
  }, [versionList]);

  useEffect(() => {
    setTimeList(getTimeList(versions, currentVersion));
  }, [currentVersion]);

  const handleVersionClick = (el: any) => {
    if (!isEditable) return;
    const newVersionList: any = lodash.map(versions, (item: any) => ({
      ...item,
      list: lodash.map(item?.list, (ele: any) => {
        const status =
          ele?.status !== Status.Audit
            ? {
                status: ele?.id === el?.id ? Status.Active : '',
              }
            : {};
        return {
          ...ele,
          ...status,
        };
      }),
    }));
    setVersions(newVersionList);
    setTimeList(getTimeList(newVersionList, currentVersion));

    if (onVersionClick) {
      onVersionClick({
        record: {
          ...safeParseUtil(el?.newData, {}),
          image_id: el?.id,
        },
        versionList: newVersionList,
      });
    }
  };

  return (
    <Authorized
      authority={[ConfigurationEnum.configurationCenter_ViewIneffectiveData]}
      currentAuthority={authorityCodeList}
    >
      <>
        {isShow && !isEmpty(versions) && (
          <div className={styles.versionControl}>
            <RadioGroup
              versions={versions}
              currentVersion={currentVersion}
              setCurrentVersion={setCurrentVersion}
            />
            <TimeLine
              timeList={timeList}
              handleVersionClick={handleVersionClick}
              isAudit={isAudit}
              isEditable={isEditable}
            />
          </div>
        )}
      </>
    </Authorized>
  );
}

export default VersionControl;
