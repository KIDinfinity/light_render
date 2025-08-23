/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { Input } from 'antd';
import Editor from 'basic/components/Editor';
import useGetEditorType from 'bpm/pages/Information/_hooks/useGetEditorType';
import useChangeTextLimitByRegion from 'bpm/pages/Information/_hooks/useChangeTextLimitByRegion';
import classicConfig from 'basic/components/Editor/config/classic';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import InformationEditorType from 'basic/enum/InformationEditorType';

export default ({ className, placeholder, item, template, onChange, form, ...others }: any) => {
  const editorType = useGetEditorType({ item });
  const handleChange = (e: any) => {
    if (editorType === InformationEditorType.TextArea) {
      const newValue = e?.target?.value?.replace(/\n/g, '\r\n');
      const currentErrors = form.getFieldError('content');
      form.setFieldsValue({ content: newValue });
      form.setFields({
        content: {
          value: newValue,
          errors: currentErrors,
        },
      });
      onChange(newValue);
      return;
    }

    onChange(e);
  };

  const { maxRows, maxSize } = useChangeTextLimitByRegion(item);
  return useMemo(() => {
    switch (editorType) {
      case InformationEditorType.TextArea:
        return (
          <Input.TextArea
            value={form.getFieldValue('content')}
            placeholder={formatMessageApi({
              Label_BIZ_Claim: placeholder,
            })}
            autoSize={{ minRows: 4, maxRows }}
            onChange={handleChange}
            maxLength={maxSize}
            id={'content'}
          />
        );
      case InformationEditorType.RichEditor:
      default:
        return (
          <Editor
            placeholder={formatMessageApi({
              Label_BIZ_Claim: placeholder,
            })}
            toolbarItem={classicConfig}
            className={className}
            value={template}
            maxLength={maxSize}
            onChange={handleChange}
            {...others}
          />
        );
    }
  }, [editorType, placeholder, maxRows, template, form.getFieldValue('content')]);
};
