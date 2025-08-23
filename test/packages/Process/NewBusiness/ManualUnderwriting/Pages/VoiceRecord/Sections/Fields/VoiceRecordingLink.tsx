import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import { Authority, FormItemInput, Required, Visible } from 'basic/components/Form';
import classnames from 'classnames';
import useDownloadVoiceRecording from 'process/NewBusiness/ManualUnderwriting/_hooks/useDownloadVoiceRecording';
import React from 'react';
import styles from '../../index.less';
import { fieldConfig } from '../../_config/voiceRecord/VoiceRecordingLink';
export { fieldConfig } from '../../_config/voiceRecord/VoiceRecordingLink';

const FormItem = ({ isShow, layout, form, field, config, link, applicationNo }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const requiredConditions = false;

  const clickHandler = useDownloadVoiceRecording({
    recordingType: 'record',
    applicationNo,
    voiceRecordingLink: link,
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
          // labelId={config.label?.dictCode || fieldProps.label.dictCode}
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

const VoiceRecordingLink = ({
  config,
  form,
  editable,
  layout,
  isShow,
  link,
  applicationNo,
}: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      link={link}
      applicationNo={applicationNo}
    />
  </Authority>
);

VoiceRecordingLink.displayName = 'voiceRecordingLink';

export default VoiceRecordingLink;
