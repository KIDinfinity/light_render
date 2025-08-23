import React from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { Icon } from 'antd';
import { ReactComponent as IconAI } from 'navigator/assets/ai-circle.svg';
import CommonEmpty from '@/components/Empty';
import { SmartCircleEnum } from '@/enum/GolbalAuthority';
import Authorized from '@/utils/Authorized';
import { SmartCircleKey } from 'navigator/enum/MachineKey';
import SmartCircleHelloUser from './SmartCircleHello/User';
import SmartCircleQuery from './SmartCircleQuery';
import SmartCircleRuleSetup from './SmartCircleRuleSetup';
import Notification from './Notification';
import SmartCircleMenu from './SmartCircleMenu';
import SmartCircleButton from './SmartCircleButton';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();

  const queryListOfCase = useSelector((state: any) => state.workspaceAI.queryListOfCase);
  const queryListOfTask = useSelector((state: any) => state.workspaceAI.queryListOfTask);
  const queryListOfUser = useSelector((state: any) => state.workspaceAI.queryListOfUser);
  const { userName } = useSelector((state: any) => state.user.currentUser);
  const machineKey = useSelector((state: any) => state.workspaceAI.machineKey);
  const authorityCodeList = useSelector(
    ({ authController }: any) => authController.authorityCodeList
  );

  const goBack = () => {
    dispatch({
      type: 'workspaceAI/saveSearchValue',
      payload: { searchValue: '' },
    });
    dispatch({
      type: 'workspaceAI/saveMachineKey',
      payload: { machineKey: '' },
    });
  };

  const smartCircleQueryRender = () => {
    if (
      queryListOfCase?.rows?.length ||
      queryListOfTask?.rows?.length ||
      queryListOfUser?.rows?.length
    ) {
      return <SmartCircleQuery />;
    }

    return <CommonEmpty style={{ height: '85%' }} />;
  };

  return (
    <>
      <div className={styles.circleWrap}>
        <SmartCircleMenu />
        {!lodash.isEmpty(machineKey) && (
          <Icon
            type="left"
            className={styles.goBack}
            onClick={() => {
              goBack();
            }}
          />
        )}
        <Icon component={IconAI} className={styles.circle} />

        {lodash.isEmpty(machineKey) && (
          <>
            <SmartCircleHelloUser userName={userName} />
            <SmartCircleButton />
          </>
        )}

        {machineKey === SmartCircleKey.ButtonCreateCase && (
          <div className={styles.case}>
            <Authorized
              authority={[SmartCircleEnum.RS_CreateCase_enter]}
              currentAuthority={authorityCodeList}
              noMatch={
                <div className={styles.caseTips}>
                  Sorry, you dont have the authority to create a case.
                </div>
              }
            >
              <SmartCircleRuleSetup />
            </Authorized>
          </div>
        )}
      </div>
      {
        /* 消息中心 */
        machineKey === SmartCircleKey.ListNote && <Notification />
      }
      {
        /* 简单查询 */
        machineKey === SmartCircleKey.ListSearch && (
          <div
            className={`${styles.queryList} ${styles['black-scroll']} ${styles['black-scroll-small']}`}
          >
            {smartCircleQueryRender()}
          </div>
        )
      }
    </>
  );
};
