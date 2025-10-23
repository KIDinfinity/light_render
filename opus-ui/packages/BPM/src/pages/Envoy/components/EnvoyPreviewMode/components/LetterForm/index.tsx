import React, { useEffect } from 'react';
import { connect, useDispatch } from 'dva';
import { Form } from 'antd';
import { FormRegister, formUtils } from 'basic/components/Form';
import styles from './LetterForm.less';
import { LetterType } from '../../enum';
import Section, { Fields } from './Section';

function EmailRender(form, config) {
  return (
    <Section config={config} form={form} editable>
      <Fields.DestId form={form} />
      <Fields.CcId form={form} />
      <Fields.Title form={form} />
    </Section>
  );
}

function SmsRender(form, config) {
  return (
    <>
      <Section config={config} form={form} editable>
        <Fields.MobileNumber form={form} />
      </Section>
    </>
  );
}

function LetterForm({ form, letters, previewSelectLetter, previewModePageAtomConfig }) {
  const dispatch = useDispatch();
  const config = previewModePageAtomConfig || [];
  const renderLetterType = {
    [LetterType.email]: EmailRender(form, config),
    [LetterType.sms]: SmsRender(form, config),
  };

  useEffect(() => {
    dispatch({
      type: 'envoyController/savePreivewForm',
      payload: {
        previewForm: { letter: form },
      },
    });
  }, [form]);

  return (
    <FormRegister form={form}>
      <Form className={styles.formBox} autoComplete="off">
        {renderLetterType[letters?.[previewSelectLetter]?.letterType]}
      </Form>
    </FormRegister>
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
      dispatch({
        type: 'envoyController/saveEntry',
        target: 'saveLetterForm',
        payload: {
          changedFields,
        },
      });
    },
    mapPropsToFields(props) {
      const { letters, previewSelectLetter }: any = props;
      return formUtils.mapObjectToFields(letters?.[previewSelectLetter]?.after?.params || {});
    },
  })(LetterForm)
);
