import React, { useState } from 'react';
import { Select, Icon } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import EnvoyInput from './EnvoyInput';
import { formatMessageApi, hasFormatMessageHTMLFn } from '@/utils/dictFormatMessage';
import { notCurrentTaskOfGroup } from 'bpm/pages/Envoy/_utils/getDisabled';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';
import useAutoAddRelateMemoCallback from 'bpm/pages/Envoy/hooks/useAutoAddRelateMemoCallback';

import styles from './EnvoyInput.less';

interface IConnectProps {
  dispatch: any;
  authEnvoy: any;
  taskId: string;
  reasonConfigs: any[];
  overrideLoading: boolean;
}

interface IProps extends IConnectProps {
  reasonGroup: any;
}

const { Option } = Select;

export default connect(({ authController, envoyController }: any) => ({
  authEnvoy: authController,
  ...lodash.pick(envoyController, ['taskId', 'reasonConfigs']),
}))((props: IProps) => {
  const handleAddRelateEnvoy = useAutoAddRelateMemoCallback();
  const {
    dispatch,
    authEnvoy,
    taskId,
    reasonGroup,
    reasonConfigs,
    groupIdx,
    overrideLoading,
    activePermission,
  } = props;

  const [loading, setLoading] = useState(false);
  const { envoyAuth, groupCode, name } = lodash.pick(reasonGroup, [
    'envoyAuth',
    'groupCode',
    'name',
  ]);

  const disabled =
    notCurrentTaskOfGroup({
      globalAuth: lodash.get(authEnvoy, EGlobalAuthCode.EDIT),
      selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
      envoyTaskId: taskId,
      envoyData: reasonGroup,
    }) || !activePermission;
  const stopPropagationFn = (ev: any): void => {
    if (!disabled) {
      ev.stopPropagation();
    }
  };

  // 1.有些reason是其他节点带过来的，当前节点没有，所以需要把当前的reason和config合并并去重处理
  // 2.有时候只是本地添加的一个空数组，占位用，没有实际数据，这种无需加进config
  const newReasonConfigs: any[] = groupCode
    ? lodash.uniqBy(
        [
          ...(reasonConfigs || []),
          {
            code: groupCode,
            name,
          },
        ],
        'code'
      )
    : reasonConfigs || [];
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
    const result = await dispatch({
      type: 'envoyController/setReasonGroup',
      payload: {
        id: reasonGroup.id,
        groupCode: val,
        groupIdx,
      },
    });
    // await dispatch({
    //   type: 'envoyController/setStatus',
    //   payload: {
    //     groupIdx,
    //     status: 'Save',
    //   },
    // });
    // console.log('res', result);
    if (!!result.id) {
      lodash
        .chain(result)
        .get('reasonDetails', [])
        .forEach((reason: any) => {
          const params: any = lodash.pick(result, ['taskId', 'groupCode', 'caseCategory']);
          const memoCode = lodash
            .chain(reason)
            .get('pendingMemoList', [])
            .first()
            .get('memoCode')
            .value();
          (async () => {
            // await dispatch({
            //   type: 'envoyController/getListMemos',
            //   payload: {
            //     reasonCode: reason?.reasonCode,
            //     caseCategory: params?.caseCategory,
            //   },
            // });
            // await dispatch({
            //   type: 'envoyController/saveReasonMemoCode',
            //   payload: {
            //     groupId: reasonGroup.id,
            //     dataId: reason?.id,
            //     names: [`pendingMemoList{${reason?.reasonIdx}}_memoCode`],
            //     memoCode,
            //   },
            // });
            // await dispatch({
            //   type: 'envoyController/setStatus',
            //   payload: {
            //     groupIdx,
            //     status: 'Save',
            //   },
            // });

            handleAddRelateEnvoy({
              memoCode,
              taskId: params?.taskId,
              reasonGroupCode: params?.groupCode,
              caseCategory: params?.caseCategory,
              groupIdx,
            });
          })();
        })
        .value();
    }
    setLoading(false);
  };
  return (
    <div onClick={stopPropagationFn}>
      {loading || overrideLoading ? (
        <Icon type="loading" />
      ) : (
        <EnvoyInput title={formatMessageApi({ Label_Sider_Envoy: 'selectPendReason' })}>
          <Select
            name="pendCategoryCode"
            value={groupCode}
            placeholder={formatMessageApi({
              Label_COM_WarningMessage:
                'app.navigator.drawer.pending.please-select-a-pending-reason',
            })}
            id={'pendingReason'}
            style={{ width: '320px' }}
            className={styles.select}
            disabled={disabled}
            onChange={setReason}
            showSearch
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {lodash.map(newReasonConfigs, (item: any, idx: number) => (
              <Option
                value={item.code}
                key={item.code || idx}
                title={getReasonText(item)}
                disabled={lodash.isBoolean(item?.envoyEdit) ? !item?.envoyEdit : false}
              >
                {getReasonText(item)}
              </Option>
            ))}
          </Select>
        </EnvoyInput>
      )}
    </div>
  );
});
