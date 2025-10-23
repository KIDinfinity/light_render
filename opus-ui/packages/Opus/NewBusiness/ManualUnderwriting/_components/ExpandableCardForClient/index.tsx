import { Icon } from 'antd';
import { FormAntCard } from 'basic/components/Form';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import React, { useMemo } from 'react';
import MUErrorBoundary from '../MUErrorBoundary';
import styles from './index.less';
import useGetDisplayEditButton from '../../_hooks/useGetDisplayEditButton';
import useClientEditButtonDisplayCondition from '../../_hooks/useClientEditButtonDisplayCondition';

interface IEditModalProps {
  onAfterConfirm: () => Promise<boolean>;
  onBeforeBack?: () => Promise<void>;
  onBeforeOpen?: () => Promise<void>;
  loading?: boolean;
  children: React.ReactNode;
}

interface IExtendableCardProps {
  title: string;
  icon?: React.ReactNode;
  info?: React.ReactNode;
  contentClassName?: string;
  headerActions?: React.ReactNode;
  children?: React.ReactNode;
  disableExpand?: boolean;
  errorBoundaryName?: string;
  editModalProps?: IEditModalProps;
  extraInfo?: React.ReactNode;
  footer?: React.ReactNode;
  clientId?: string;
}
const ExpandableCard = ({
  title,
  icon,
  info,
  children,
  contentClassName,
  headerActions,
  editModalProps,
  errorBoundaryName = 'Card',
  extraInfo,
  footer,
  clientId,
}: IExtendableCardProps) => {
  const planInfoData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData,
    shallowEqual
  );
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );
  const policyStatus = useMemo(() => {
    return lodash.get(planInfoData, 'policyStatus') || '-';
  }, [planInfoData]);

  const showEditButton = useGetDisplayEditButton({
    sectionId: 'ClientInformation',
    editable,
    editModalProps,
    policyStatus,
  });
  const editButtonShowCondiction = useClientEditButtonDisplayCondition({
    clientId: clientId,
  });

  const toggle = () => {
    dispatch({
      type: `${NAMESPACE}/toggleClient`,
      payload: {
        clientId,
      },
    });
  };

  const TitleRender = (
    <div className={styles.header}>
      {icon && <Icon component={icon} className={styles.headerIcon} />}
      <span className={styles.title}>{title}</span>
      {info && <span className={styles.info}>{info}</span>}
      {extraInfo && extraInfo}
      {(headerActions || editModalProps) && (
        <div className={styles.extraActions}>
          {headerActions}
          {showEditButton && editButtonShowCondiction && (
            <div
              onClick={async () => {
                if (lodash.isFunction(editModalProps?.onBeforeOpen)) {
                  await editModalProps?.onBeforeOpen();
                }
              }}
              className={styles.edit}
            >
              <Icon
                style={{
                  marginLeft: '10px',
                }}
                type="edit"
              />
              Edit
            </div>
          )}
          {!expandedClientId ? (
            <span className={styles.expandButton} onClick={toggle}>
              <Icon type={'down'} />
            </span>
          ) : (
            <span className={styles.expandButton} onClick={toggle}>
              <Icon type={'up'} />
            </span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div data-id={`NBManualUnderwriting-${title}`} className={styles.card}>
      <MUErrorBoundary panelName={errorBoundaryName}>
        <FormAntCard title={TitleRender} className={classnames(styles.detail, {})}>
          <div className={classnames(styles.wrapper, contentClassName)}>{children}</div>
        </FormAntCard>
      </MUErrorBoundary>
      {React.isValidElement(footer) && footer}
    </div>
  );
};
export default ExpandableCard;
