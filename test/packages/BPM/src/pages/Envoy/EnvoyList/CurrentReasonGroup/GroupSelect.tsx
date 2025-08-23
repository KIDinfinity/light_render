import React, { memo, useState } from 'react';
import { Select, Icon } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import classNames from 'classnames';
import { formatMessageApi, hasFormatMessageHTMLFn } from '@/utils/dictFormatMessage';
import { notCurrentTaskOfGroup } from 'bpm/pages/Envoy/_utils/getDisabled';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';
import styles from './groupSelect.less';

interface IConnectProps {
  dispatch: any;
  authEnvoy: any;
  taskId: string;
  reasonConfigs: any[];
  requestTypeList: string[];
}

interface IProps extends IConnectProps {
  reasonGroup: any;
  groupIdx: number;
}

const { Option } = Select;

export default connect(({ authController, envoyController }: any) => ({
  authEnvoy: authController,
  ...lodash.pick(envoyController, ['taskId', 'reasonConfigs']),
}))(
  memo((props: IProps) => {
    const {
      dispatch,
      authEnvoy,
      taskId,
      reasonGroup,
      groupIdx,
      requestTypeList,
      reasonConfigs,
    } = props;

    const [loading, setLoading] = useState(false);
    const { envoyAuth, groupCode, name } = lodash.pick(reasonGroup, [
      'envoyAuth',
      'groupCode',
      'name',
    ]);

    const disabled = notCurrentTaskOfGroup({
      globalAuth: lodash.get(authEnvoy, EGlobalAuthCode.EDIT),
      selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
      envoyTaskId: taskId,
      envoyData: reasonGroup,
    });
    const stopPropagationFn = (ev: any): void => {
      if (!disabled) {
        ev.stopPropagation();
      }
    };

    const reasonConfigsFilterRequestTypes = lodash.isArray(requestTypeList)
      ? lodash.filter(reasonConfigs, (item) => {
          return lodash.includes(requestTypeList, item?.reasonConfigs?.[0]?.type);
        })
      : reasonConfigs;

    // 1.有些reason是其他节点带过来的，当前节点没有，所以需要把当前的reason和config合并并去重处理
    // 2.有时候只是本地添加的一个空数组，占位用，没有实际数据，这种无需加进config
    const newReasonConfigs: any[] = groupCode
      ? lodash.uniqBy(
          [
            ...(reasonConfigsFilterRequestTypes || []),
            {
              code: groupCode,
              name,
            },
          ],
          'code'
        )
      : reasonConfigsFilterRequestTypes || [];
    const getReasonText = (item: any): string => {
      return hasFormatMessageHTMLFn({
        Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${item.code}`,
      })
        ? formatMessageApi({
            Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${item.code}`,
          })
        : item.name;
    };
    const setReason = async (val: string): void => {
      setLoading(true);
      await dispatch({
        type: 'envoyController/setReasonGroup',
        payload: {
          groupIdx,
          groupCode: val,
        },
      });
      setLoading(false);
    };
    return (
      <div
        className={classNames({
          [styles.groupName]: true,
          [styles.pendR]: !groupCode,
        })}
        onClick={stopPropagationFn}
      >
        {loading ? (
          <Icon type="loading" />
        ) : (
          <Select
            name="pendCategoryCode"
            value={groupCode}
            placeholder={formatMessageApi({
              Label_COM_WarningMessage:
                'app.navigator.drawer.pending.please-select-a-pending-reason',
            })}
            disabled={disabled}
            onChange={setReason}
            showSearch
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {lodash.map(newReasonConfigs, (item: any, idx: number) => (
              <Option value={item.code} key={item.code || idx} title={getReasonText(item)}>
                {getReasonText(item)}
              </Option>
            ))}
          </Select>
        )}
      </div>
    );
  })
);
