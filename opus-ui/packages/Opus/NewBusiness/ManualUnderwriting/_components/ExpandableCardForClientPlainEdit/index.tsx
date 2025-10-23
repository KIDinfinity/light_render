import { Icon, Button } from 'antd';
import { FormAntCard, formUtils } from 'basic/components/Form';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import React, { useState, useMemo } from 'react';
import MUErrorBoundary from '../MUErrorBoundary';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import configs from '../../Pages/Client/_section';
import bpm from 'bpm/pages/OWBEntrance';
import lodash from 'lodash';
import useGetDisplayEditButton from '../../_hooks/useGetDisplayEditButton';
import { EOptionType } from 'basic/enum';
import { supplyUwProposal } from '@/services/owbNbProposalControllerService';
import { saveSnashot } from 'basic/utils/SnapshotTool';
import useGetTaskVersionCallback from 'bpm/pages/OWBEntrance/_hooks/useGetTaskVersionCallback';
import TaskDefKey from 'basic/enum/TaskDefKey';
import { Action } from '@/components/AuditLog/Enum';
import { getFullAddress } from '@/services/getFullAddress';

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
}: IExtendableCardProps) => {
  const planInfoData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData,
    shallowEqual
  );
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail,
    shallowEqual
  );
  const addressInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData.entities.addressInfoMap,
    shallowEqual
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const policyStatus = useMemo(() => {
    return lodash.get(planInfoData, 'policyStatus') || '-';
  }, [planInfoData]);

  const showEditButton = useGetDisplayEditButton({
    sectionId: 'ClientInformation',
    editable,
    editModalProps,
    policyStatus,
  });

  const [loadingStatus, setLoadingStatus] = useState(false);
  const dispatch = useDispatch();
  const getTaskVersion = useGetTaskVersionCallback({ taskId: taskDetail?.taskId });

  const handleSave = async () => {
    setLoadingStatus(true);
    const errors: any = await dispatch({
      type: 'newBusinessManualUnderwriting/validateForms',
      payload: { formKeys: [...configs] },
    });
    if (!lodash.isEmpty(errors)) {
      setLoadingStatus(false);
      return false;
    }
    await dispatch({
      type: `${NAMESPACE}/updateClient`,
    });

    if (taskDetail?.activityKey === TaskDefKey.BP_NB_ACT008) {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSave`,
      });

      const dataForSupply = {
        ...lodash.pick(taskDetail, [
          'caseNo',
          'caseCategory',
          'businessNo',
          'inquiryBusinessNo',
          'taskId',
        ]),
        operationType: 'case.post.qc.update.policy',
        businessData: dataForSubmit,
      };

      const res = await supplyUwProposal(dataForSupply);

      if (res?.success && !lodash.isEmpty(res?.resultData)) {
        await getTaskVersion();

        const result = await saveSnashot({
          taskDetail: taskDetail,
          dataForSubmit: res.resultData,
          optionType: EOptionType.Save,
        });

        if (result?.success && !!result?.versionNo) {
          await dispatch({
            type: 'task/saveVersion',
            payload: { currentVersion: result?.versionNo },
          });
        }

        await dispatch({
          type: 'auditLogController/logButton',
          payload: {
            action: Action.Save,
            isAuto: false,
            claimProcessData: res.resultData,
          },
        });

        await dispatch({
          type: `${NAMESPACE}/getBEToFE`,
          payload: {
            businessData: res?.resultData,
          },
        });

        setTimeout(() => {
          dispatch({
            type: `${NAMESPACE}/getAuditLogExists`,
            payload: {
              processInstanceId: taskDetail?.processInstanceId,
              inquiryBusinessNo: taskDetail?.inquiryBusinessNo,
              taskId: taskDetail?.taskId,
              platformCode: 'opus',
            },
          });
        }, 1000);
      }
    } else {
      // customer identification单独处理address拼接问题
      if (taskDetail?.activityKey === TaskDefKey.BP_NB_ACT002) {
        const params: any[] = [];
        const addressInfoList: any[] = [];

        Object.keys(addressInfoMap).forEach((key) => {
          const { addrType, address1, address2, address3, address4, address5, address6, address7 } =
            addressInfoMap[key];

          addressInfoList.push({ id: key, addrType: formUtils.queryValue(addrType) });
          params.push({
            addrType: formUtils.queryValue(addrType),
            address1: formUtils.queryValue(address1),
            address2: formUtils.queryValue(address2),
            address3: formUtils.queryValue(address3),
            address4: formUtils.queryValue(address4),
            address5: formUtils.queryValue(address5),
            address6: formUtils.queryValue(address6),
            address7: formUtils.queryValue(address7),
          });
        });

        const addressRes = await getFullAddress({
          addressList: params,
        });

        if (addressRes?.success) {
          const { addressList = [] } = addressRes.resultData || {};

          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveFullAddress',
            payload: {
              fullAddressList: addressInfoList.map((item, index) => ({
                addressId: item.id,
                addrType: item.addrType,
                fullAddress: addressList[index]?.fullAddress,
              })),
            },
          });
        }
      }

      await bpm.buttonAction('save');
    }

    setLoadingStatus(false);
    dispatch({
      type: `${NAMESPACE}/setEditingClientId`,
    });
    dispatch({
      type: `${NAMESPACE}/deleteExpandedClientId`,
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
          {showEditButton && (
            <div>
              <Button
                className={styles.cancelButton}
                onClick={() => {
                  dispatch({
                    type: `${NAMESPACE}/setEditingClientId`,
                  });
                }}
                type="primary"
                ghost
              >
                <span>
                  {formatMessageApi({
                    Label_COM_Opus: 'cancel',
                  })}
                </span>
              </Button>
              <Button
                className={styles.saveButton}
                onClick={handleSave}
                type="primary"
                loading={loadingStatus}
              >
                <span>
                  {formatMessageApi({
                    Label_BPM_Button: 'Save',
                  })}
                </span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div data-id={`NBManualUnderwriting-${title}`} className={classnames(styles.childrenWrap)}>
      <MUErrorBoundary panelName={errorBoundaryName}>
        <FormAntCard title={TitleRender} className={classnames(styles.detail, {})}>
          <div className={contentClassName}>{children}</div>
        </FormAntCard>
      </MUErrorBoundary>
    </div>
  );
};
export default ExpandableCard;
