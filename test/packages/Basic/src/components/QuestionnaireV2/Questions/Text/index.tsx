/* eslint-disable no-cond-assign */
import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import {
  FormItemNumber,
  FormItemDatePicker,
  FormItemTextArea,
  formUtils,
} from 'basic/components/Form';

import classNames from 'classnames';

import ErrorTip from '../../components/ErrorTip';

import styles from './index.less';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

function Text({ form, description, disabled, questionOptionList, error, level }) {
  const optionType = {
    NUMBER: (formName) => (
      <FormItemNumber form={form} formName={formName} precision={0} disabled={disabled} />
    ),
    DATE: (formName) => <FormItemDatePicker form={form} formName={formName} disabled={disabled} />,
    STRING: (formName) => (
      <FormItemTextArea form={form} formName={formName} disabled={disabled} autoSize />
    ),
  };

  return (
    <div
      className={classNames(styles.text, {
        [styles.level]: level > 0,
      })}
    >
      <div className={styles.error}>{error ? <ErrorTip /> : null}</div>
      {description && (
        <p
          className={styles.questionDescription}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      <div
        className={classNames(styles.option, {
          [styles.noDescription]: !description,
        })}
      >
        {questionOptionList.map((item) => (
          <div key={item?.option?.optionCode || description}>
            {(optionType[item?.option?.optionValueType?.toUpperCase()] || optionType.STRING)(
              item?.option?.optionCode || description
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const NAMESPACE = useGetNamespace();
      const { dispatch, maping } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveTextAnswer',
          payload: {
            changedFields,
            maping,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { answerVOList, description } = props;
      const answers =
        answerVOList.reduce((result, current) => {
          result[current?.optionCode || description] = current?.optionText;
          return result;
        }, {}) || {};

      return formUtils.mapObjectToFields(answers);
    },
  })(Text)
);
