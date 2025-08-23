import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Badge } from 'antd';
import lodash from 'lodash';
import classNames from 'classnames';
import { HotkeyHomeIds } from '@/components/Hotkey/common/enum/hotkeyIds';
import HotHighLight from '@/components/Hotkey/home/view/HotHighLight';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Ellipsis from '@/components/Ellipsis';
import activeKeyFlagMap from './activeKeyFlagMap';
import hotfixHomeCanvasFit from './hotfixHomeCanvasFit';
import Read from '@/components/SolutionRead';
import { EType } from '@/components/SolutionRead/Enums';
import styles from './TabItem.less';

export default ({ typeCode, dictCode, flag, icon, notification, type, taskId }: any) => {
  const dispatch = useDispatch();
  const isSwitchOn = useSelector((state: any) => state.workspaceSwitchOn.isSwitchOn);
  const isShow = useSelector((state: any) => state.workspaceSwitchOn.isShow);

  const { Sidebar } = HotkeyHomeIds;
  const isActive = activeKeyFlagMap[lodash.findKey(isShow)!] === flag;

  useEffect(() => {
    dispatch({
      type: 'workspaceSwitchOn/saveTabAuthorized',
      payload: { flag },
    });
  }, []);

  const changeSwitch = () => {
    dispatch({
      type: 'workspaceSwitchOn/changeSwitch',
      payload: {
        name: flag,
      },
    });
    hotfixHomeCanvasFit();
  };

  const toUpperFirst = (message: any) => {
    const strMessage = lodash
      .chain(message)
      .split(' ')
      .map((str) => {
        return lodash.upperFirst(str.toLowerCase());
      })
      .join(' ')
      .value();
    return strMessage;
  };

  return (
    <HotHighLight
      parent={{
        key: flag,
        className: classNames({
          [styles.item]: true,
          [styles.active]: isActive,
          forIntegrationGuideOnlyOne: type === 'integration',
        }),
        onClick: () => changeSwitch(),
      }}
      condition={Sidebar}
      exCondition={isActive}
    >
      <div
        className={classNames({
          [styles.title]: true,
          [styles.show]: isActive && isSwitchOn,
        })}
      >
        <Ellipsis lines={1} tooltip forceTooltip wrapperClass={styles.text}>
          {toUpperFirst(formatMessageApi({ [typeCode]: dictCode }))}
        </Ellipsis>
      </div>
      {(type === 'remark' || type === 'pending' || type === 'integration') && (
        <Read type={EType.CIRCLE} module={type} inboundRight taskId={taskId} />
      )}

      <div className={styles.icon}>
        <Badge dot={notification}>{icon}</Badge>
      </div>
    </HotHighLight>
  );
};
