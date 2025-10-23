import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import classnames from 'classnames';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import styles from './index.less';

interface IProps {
  activeClientId: string;
  activeCustomerType?: string;
  children: any;
  noneUnderline?: boolean;
}

function MainComponent(props: any) {
  const { activeClientId, activeCustomerType, children, noneUnderline, taskDetail } = props;
  const customerTypeArr = lodash.split(taskDetail?.customerType, ',');
  const viewCustomerType: string = useMemo(
    () =>
      lodash
        .chain(activeCustomerType)
        .split(',')
        .filter((item: string) => lodash.includes(customerTypeArr, item))
        .join(',')
        .value(),
    [activeCustomerType, taskDetail?.customerType]
  );

  const isShow = useSelector((state: any) => state.workspaceSwitchOn.isShow);
  const dispatch = useDispatch();

  const handleClickFn = useCallback(() => {
    if (!isShow?.isShow360 || !activeClientId || !viewCustomerType?.length) return;
    dispatch({
      type: 'insured360/saveActive360Info',
      payload: {
        activeClientId,
      },
    });
    dispatch({
      type: 'insured360/saveActiveRole',
      payload: {
        activeRole: activeCustomerType,
      },
    });
  }, [activeClientId, viewCustomerType, isShow?.isShow360]);

  return (
    <div
      className={classnames({
        [styles.shortcutOf360]: viewCustomerType?.length,
        [styles.noneUnderline]: noneUnderline || customerTypeArr?.length <= 1,
      })}
      onClick={handleClickFn}
    >
      {children}
    </div>
  );
}

function ShortcutOf360(props: IProps) {
  return (
    <CaseTaskDetail.Consumer>
      <MainComponent {...props}>{props.children}</MainComponent>
    </CaseTaskDetail.Consumer>
  );
}

export default ShortcutOf360;
