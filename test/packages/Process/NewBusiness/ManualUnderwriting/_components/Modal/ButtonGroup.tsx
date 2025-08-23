import React from 'react';
import lodash from 'lodash';
import { Button, Icon } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { useDispatch } from 'dva';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { ReactComponent as backIcon } from 'bpm/assets/new_back.svg';
import styles from './index.less';

interface IProps {
  onCancel: Function;
  onConfirm: Function;
  setShow: Function;
  handleConfirmLoading: Function;
  actionConfig?: any;
}

const handleAction = ({ result, actionConfig }: any) => {
  const actions = lodash.keys(actionConfig);
  lodash.forEach(actions, (action) => {
    switch (action) {
      case 'CallBack':
        if (lodash.isFunction(actionConfig[action])) {
          actionConfig[action](result);
        }
        break;
      case 'successCallBack':
        if (result) {
          if (lodash.isFunction(actionConfig[action])) {
            actionConfig[action](result);
          }
        }
        break;
      case 'failureCallBack':
        if (!result) {
          if (lodash.isFunction(actionConfig[action])) {
            actionConfig[action](result);
          }
        }
        break;
      default:
        break;
    }
  });
};

const iconCustom = {
  return: {
    icon: backIcon,
    className: styles.backIcon,
  },
};

function ButtonGroup({
  onCancel = () => {},
  onConfirm = () => {},
  actionConfig = {},
  handleConfirmLoading,
  setShow,
}: IProps) {
  const dispatch = useDispatch();
  const errorCount =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.errorLog?.errorCount,
      shallowEqual
    ) || 0;

  const List = [
    {
      id: 'confirm',
      label: 'venus_claim.button.confirm',
      iconType: 'check-circle',
      handler: async () => {
        dispatch({
          type: `login/saveLoadingStatus`,
          payload: { loadingStatus: true },
        });
        setTimeout(async () => {
          if (lodash.isFunction(onConfirm)) {
            const afterConfirm = await onConfirm();
            if (!!afterConfirm) {
              setShow(false);
            }
            dispatch({
              type: `login/saveLoadingStatus`,
              payload: { loadingStatus: false },
            });
            if (!lodash.isEmpty(actionConfig)) {
              handleAction({ result: afterConfirm, actionConfig });
            }
          }
        });
      },
      order: 1,
      disabled: errorCount > 0,
      error: {
        label: 'app.navigator.task-detail-of-data-capture.button.error',
        iconType: 'stop',
        count: errorCount,
      },
    },
    {
      id: 'return',
      label: 'Return',
      iconType: 'return',
      handler: onCancel,
      order: 2,
    },
  ];

  return (
    <div className={styles.buttonGroup}>
      {lodash.map(List, (item: any) => {
        const custom = iconCustom[item.iconType];

        return (
          <Button onClick={item.handler} key={item.id} disabled={item.disabled}>
            <span>
              {item.error?.count > 0 ? item.error?.count : ''}
              {formatMessageApi({
                [item.typeCode || 'Label_BPM_Button']:
                  item.error?.count > 0 ? item.error?.label : item.label,
              })}
            </span>
            {!lodash.isEmpty(custom) ? (
              <Icon component={custom.icon} className={custom.className} />
            ) : (
              <Icon type={item.error?.count > 0 ? item.error?.iconType : item.iconType} />
            )}
          </Button>
        );
      })}
    </div>
  );
}

export default ButtonGroup;
