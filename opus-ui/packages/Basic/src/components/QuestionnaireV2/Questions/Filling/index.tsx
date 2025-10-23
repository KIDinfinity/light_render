/* eslint-disable no-cond-assign */
import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import {
  FormItemNumber,
  FormItemDatePicker,
  FormItemInput,
  formUtils,
} from 'basic/components/Form';
import classNames from 'classnames';

import ErrorTip from '../../components/ErrorTip';

import styles from './index.less';

function Filling({
  questionList = [],
  form,
  disabled,
  questionTitleDisplay,
  questionTitle,
  error,
  level,
}) {
  const optionType = {
    NUMBER: (formName: string) => (
      <FormItemNumber required form={form} formName={formName} precision={0} disabled={disabled} />
    ),
    DATE: (formName: string) => (
      <FormItemDatePicker required form={form} formName={formName} disabled={disabled} />
    ),
    STRING: (formName: string) => (
      <FormItemInput required form={form} formName={formName} disabled={disabled} />
    ),
  };

  return (
    <div
      className={classNames(styles.filling, {
        [styles.level]: level > 0,
      })}
    >
      {questionTitleDisplay !== 0 && (
        <>
          <div className={styles.error}>{!lodash.isEmpty(error) ? <ErrorTip /> : null}</div>
          <div
            className={styles.questionDescription}
            dangerouslySetInnerHTML={{ __html: questionTitle }}
          />
        </>
      )}
      {questionList.map((item) => (
        <div key={item.code} className={styles.box}>
          <div className={styles.left}>
            <div className={styles.error}>
              {error?.optionError?.[item.code] ? <ErrorTip /> : null}
            </div>
            {item.text}
          </div>
          <div className={styles.right}>
            {optionType[item.type?.toUpperCase()]?.(item.code) || optionType.STRING(item.text)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, maping, NAMESPACE } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveFillingAnswer',
          payload: {
            maping,
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const fields = props.questionList.reduce(
        (result: Record<string, any>, current: { code: any; text: any; answer: any }) => {
          result[current.code || current.text] = current.answer;
          return result;
        },
        {}
      );
      return formUtils.mapObjectToFields(fields);
    },
  })(Filling)
);
