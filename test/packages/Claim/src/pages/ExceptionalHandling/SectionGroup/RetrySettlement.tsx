import React from 'react';
import { connect } from 'dva';
import { Checkbox } from 'antd';
import lodash from 'lodash';
import TaskDefKey from 'enum/TaskDefKey';
import classnames from 'classnames';
import FormSection from 'basic/components/Form/FormSection';
import styles from './RetrySettlement.less';
import { toUpper } from 'lodash';

export default connect(({ exceptionalHandlingController, claimEditable, processTask }: any) => ({
  businessInfo: exceptionalHandlingController?.claimProcessData?.businessInfo,
  retry: exceptionalHandlingController?.claimProcessData?.retry || [],
  taskNotEditablePermission: claimEditable.taskNotEditablePermission,
  taskStatus: processTask?.getTask?.taskStatus,
  activityKey: processTask?.getTask?.activityKey,
  retryList: exceptionalHandlingController?.retryList,
}))(
  ({
    dispatch,
    businessInfo,
    retry,
    taskStatus,
    taskNotEditablePermission,
    activityKey,
    retryList,
  }: any) => {
    const isShowRetry = activityKey === TaskDefKey.BP_IE_ACT002;
    const onChange = (integrationCode: string) => {
      if (!taskStatus || !['todo']?.includes(taskStatus) || taskNotEditablePermission) {
        return;
      }
      dispatch({
        type: 'exceptionalHandlingController/saveRetry',
        payload: {
          integrationCode,
        },
      });
    };

    return (
      <>
        {isShowRetry && (
          <FormSection
            formId="IntegrationRequestData"
            title="IntegrationRequestData"
            layConf={24}
            formatType="Label_COM_Exception"
          >
            {lodash.map(retryList, (item: any) => (
              <div
                key={item?.integrationCode}
                className={classnames({
                  [styles.retryItem]: true,
                  [styles.active]: retry?.includes(item?.integrationCode),
                })}
                onClick={() => onChange(item?.integrationCode)}
              >
                <Checkbox checked={retry?.includes(item?.integrationCode)} />
                <div className={styles.content}>
                  {item?.status && (
                    <div
                      className={classnames({
                        [styles.status]: true,
                        [styles.Successed]: /success/i.test(item?.status),
                        [styles.Failed]: /fail/i.test(item?.status),
                        [styles.Skip]: /skip/i.test(item?.status),
                        [styles.ByPass]: /bypass/i.test(item?.status),
                      })}
                    >
                      {toUpper(item?.status)}
                    </div>
                  )}
                  {item?.integrationCode}
                </div>
              </div>
            ))}
          </FormSection>
        )}
      </>
    );
  }
);
