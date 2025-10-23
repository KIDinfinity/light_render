import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';

import { Row, Col } from 'antd';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import Modal from 'opus/NewBusiness/ManualUnderwriting/_components/Modal';
import bpm from 'bpm/pages/OWBEntrance';

import { formUtils } from 'basic/components/Form';
import { saveSnashot } from 'basic/utils/SnapshotTool';
import { supplyUwProposal } from '@/services/owbNbProposalControllerService';
import { getFullAddress } from '@/services/getFullAddress';

import useGetTaskVersionCallback from 'bpm/pages/OWBEntrance/_hooks/useGetTaskVersionCallback';

import configs from '../../Client/_section';

import { EOptionType } from 'basic/enum';
import { Action } from '@/components/AuditLog/Enum';
import TaskDefKey from 'basic/enum/TaskDefKey';

import Client from './Client';
import ClientSelectList from './ClientSelectList';

import styles from './index.less';

export default ({ editMode }: any) => {
  const dispatch = useDispatch();

  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData?.processData?.clientInfoList
  );

  const editingClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.editingClientId
  );
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail
  );
  const addressInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData?.entities?.addressInfoMap
  );
  const getTaskVersion = useGetTaskVersionCallback({ taskId: taskDetail?.taskId });

  const handleSave = async () => {
    const errors: any = await dispatch({
      type: 'newBusinessManualUnderwriting/validateForms',
      payload: { formKeys: [...configs] },
    });
    if (!lodash.isEmpty(errors)) {
      await dispatch({
        type: `login/saveLoadingStatus`,
        payload: { loadingStatus: false },
      });

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
    await dispatch({
      type: `login/saveLoadingStatus`,
      payload: { loadingStatus: false },
    });

    dispatch({
      type: `${NAMESPACE}/setEditingClientId`,
    });
    dispatch({
      type: `${NAMESPACE}/deleteExpandedClientId`,
    });
  };

  return !!editingClientId ? (
    <Modal
      width="90%"
      show
      setShow={() => {
        dispatch({
          type: `${NAMESPACE}/setEditingClientId`,
        });
      }}
      onConfirm={async () => {
        handleSave();
      }}
    >
      <Row gutter={[16, 16]} type="flex" className={styles.editModalWrap}>
        <Col span={16} className={styles.itemWrap}>
          <Client clientId={editingClientId} />
        </Col>
        {lodash.size(clientInfoList || []) > 1 && (
          <Col span={6} className={styles.itemWrap}>
            <ClientSelectList clientInfoList={clientInfoList} editMode={editMode} />
          </Col>
        )}
      </Row>
    </Modal>
  ) : null;
};
