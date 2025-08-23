import React from 'react';
import lodash from 'lodash';
import TplContent from 'bpm/pages/Envoy/modules/TplContent/TplContent';
import { connect } from 'dva';
import { EGlobalAuthCode, ESelfAuthCode, EDataType } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason, notAuthOrActivate } from 'bpm/pages/Envoy/_utils/getDisabled';
import styles from './EnvoyExpander.less';

const EditReason = (props: any) => {
  const { authController, viewReasonInfo, viewChannel, dispatch, reasonData, curReasonDetail } =
    props;
  const { type } = lodash.pick(viewReasonInfo, ['type', 'isCurrentList']);
  const {
    groupId,
    id,
    envoyAuth,
    channelDataList = [],
    displayConfig,
  } = lodash.pick(curReasonDetail, [
    'groupId',
    'id',
    'envoyAuth',
    'channelDataList',
    'displayConfig',
  ]);
  const channelIdx = channelDataList?.findIndex((item: any) => item?.channel === viewChannel);
  const curChannelCtn = channelDataList?.find((item: any) => item?.channel === viewChannel);

  const contentConfig = lodash.get(
    displayConfig,
    `channelContent.children[${viewChannel}].channelTpl`
  );
  const mapDisabled = {
    reason: notAuthOrDraftReason({
      globalAuth: lodash.get(authController, EGlobalAuthCode.EDIT),
      selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
      status: lodash.get(curReasonDetail, 'status'),
    }),
    reminder: notAuthOrActivate({
      globalAuth: lodash.get(authController, EGlobalAuthCode.EDIT),
      selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
      remindersData: reasonData?.reasonReminders,
      enableReminder: reasonData?.enableReminder,
      reminderData: curReasonDetail,
    }),
  };
  const disabled = mapDisabled[type] || !contentConfig?.editable;
  const content = lodash.get(curChannelCtn?.content, 'content') || {};
  const isAllEditable = lodash.get(curChannelCtn?.content, `isAllEditable`, 1);
  const conIsEmpty = (content && channelIdx) !== -1 && contentConfig?.visible;

  const onChange = ({ requireValidate, value }: any) => {
    if (type === EDataType.REASON) {
      dispatch({
        type: 'envoyController/saveReasonChannelTpl',
        payload: {
          groupId,
          dataId: id,
          channelIdx,
          value,
        },
      });
    } else {
      dispatch({
        type: 'envoyController/saveReminderChannelTpl',
        payload: {
          groupId,
          dataId: id,
          channelIdx,
          value,
        },
      });
    }
    if (requireValidate) {
      dispatch({
        type: 'envoyController/validateFields',
        payload: {
          dataId: groupId,
        },
      });
    }
  };

  return (
    <>
      {conIsEmpty && (
        <TplContent
          name={`channelDataList{${channelIdx}}_content_content_value`}
          disabled={disabled}
          channelType={viewChannel}
          content={content}
          isAllEditable={isAllEditable}
          onChange={onChange}
        />
      )}
      {!conIsEmpty && <div className={styles.hintContent}>No Content to be expanded.</div>}
    </>
  );
};

export default connect(({ authController, envoyController }: any) => ({
  authController,
  viewChannel: envoyController?.viewChannel,
  viewReasonInfo: envoyController?.viewReasonInfo,
}))(EditReason);
