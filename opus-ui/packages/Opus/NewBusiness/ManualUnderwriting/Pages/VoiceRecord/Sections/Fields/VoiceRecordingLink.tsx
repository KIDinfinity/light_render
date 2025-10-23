import { Col } from 'antd';
import { Authority, FormItemInput, Required, Visible } from 'basic/components/Form';
import classnames from 'classnames';
import React from 'react';
import styles from '../../index.less';
import { fieldConfig } from '../../_config/voiceRecord/VoiceRecordingLink';
export { fieldConfig } from '../../_config/voiceRecord/VoiceRecordingLink';

const FormItem = ({ isShow, layout, form, field, config, link }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = !!link
  const requiredConditions = false;
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          className={classnames(styles.VoiceRecordingLink)}
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
          onClick={() => {
            window.open(link, '_blank');
          }}
        />
      </Col>
    )
  );
};

const VoiceRecordingLink = ({ field, config, form, editable, layout, isShow, link }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      link={link}
    />
  </Authority>
);

VoiceRecordingLink.displayName = 'voiceRecordingLink';

export default VoiceRecordingLink;
