import React, { useEffect } from 'react';
import { connect, useDispatch } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';
import Section, { Fields } from './Section';
import lodash from 'lodash';
function LetterForm({ form, previewModePageAtomConfig }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'envoyController/savePreivewForm',
      payload: {
        previewForm: { content: form },
      },
    });
  }, [form]);

  return (
    <div className={styles.RenderSmsContent}>
      <Section config={previewModePageAtomConfig} form={form} editable>
        <Fields.SmsContent />
      </Section>
    </div>
  );
}

export default connect(({ envoyController }: any) => ({
  letters: envoyController?.previewModeData?.letters,
  previewSelectLetter: envoyController?.previewSelectLetter,
  previewModePageAtomConfig: envoyController?.previewModePageAtomConfig,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch }: any = props;
      if (!lodash.isEmpty(changedFields)) {
        dispatch({
          type: 'envoyController/saveEntry',
          target: 'saveLetterForm',
          payload: {
            changedFields: {
              content: changedFields?.smsContent,
            },
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { letters, previewSelectLetter }: any = props;
      return formUtils.mapObjectToFields({
        smsContent: letters?.[previewSelectLetter]?.after?.params?.content || '',
      });
    },
  })(LetterForm)
);
