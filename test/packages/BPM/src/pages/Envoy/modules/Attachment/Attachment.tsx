import React from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { Input } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason } from 'bpm/pages/Envoy/_utils/getDisabled';
import ItemCard from 'bpm/pages/Envoy/components/ItemCard/ItemCard';

const Attachment = ({ editable, data }: any) => {
  const { envoyAuth, status, attachment } = data;

  const { globalEditAuth } = useSelector((state: any) => ({
    globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
  }));

  const disabled =
    !editable ||
    notAuthOrDraftReason({
      globalAuth: globalEditAuth,
      selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
      status,
    });

  const dispatch = useDispatch();
  const saveReasonAttachment = (idx: number, value: string) => {
    dispatch({
      type: 'envoyController/saveReasonAttachment',
      payload: {
        groupId: data?.groupId,
        dataId: data?.id,
        attachmentIdx: idx,
        value,
      },
    });
  };
  const addReasonAttachment = () => {
    dispatch({
      type: 'envoyController/addReasonAttachment',
      payload: {
        groupId: data?.groupId,
        dataId: data?.id,
      },
    });
  };
  const delReasonAttachment = (idx: string) => {
    dispatch({
      type: 'envoyController/delReasonAttachment',
      payload: {
        groupId: data?.groupId,
        dataId: data?.id,
        attachmentIdx: idx,
      },
    });
  };
  return (
    <ItemCard
      title={formatMessageApi({
        Label_BIZ_Claim: 'venus_claim.label.attachment',
      })}
      handleDel={lodash.get(attachment, 'length') > 1 ? delReasonAttachment : null}
      handleAdd={addReasonAttachment}
      disabled={disabled}
    >
      {lodash.map(attachment, (item: any, idx: number) => (
        <Input
          name={`attachment{${idx}}`}
          required={false}
          disabled={disabled}
          value={item}
          key={idx}
          onChange={(ev: any) => saveReasonAttachment(idx, ev.target.value)}
          onBlur={(ev: any) => saveReasonAttachment(idx, lodash.trim(ev.target.value))}
        />
      ))}
    </ItemCard>
  );
};

export default Attachment;
