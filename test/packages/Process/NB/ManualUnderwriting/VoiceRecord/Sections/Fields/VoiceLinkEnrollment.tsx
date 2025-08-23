import React from 'react';
import { Col } from 'antd';
import classnames from 'classnames';
import { Authority, FormItemInput, Required, Visible } from 'basic/components/Form';
import { fieldConfig } from '../../_config/voiceRecord/VoiceLinkEnrollment';

export { fieldConfig } from '../../_config/voiceRecord/VoiceLinkEnrollment';
import styles from '../../index.less';
import useDownloadVoiceRecording from 'process/NewBusiness/ManualUnderwriting/_hooks/useDownloadVoiceRecording';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const FormItem = ({ isShow, layout, form, field, config, agentId, applicationNo }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const requiredConditions = false;

  const clickHandler = useDownloadVoiceRecording({
    recordingType: 'enroll',
    applicationNo,
    enrollId: agentId,
    fieldName: formatMessageApi({
      [fieldProps.label.dictTypeCode]: fieldProps.label.dictCode,
    }),
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          className={classnames(styles.Link)}
          disabled={false}
          form={form}
          formName={config.name || field}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onClick={clickHandler}
        />
      </Col>
    )
  );
};

const VoiceLinkEnrollment = ({
  config,
  form,
  editable,
  layout,
  isShow,
  applicationNo,
  agentId,
}: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      applicationNo={applicationNo}
      agentId={agentId}
    />
  </Authority>
);

VoiceLinkEnrollment.displayName = 'voiceLinkEnrollment';

export default VoiceLinkEnrollment;
