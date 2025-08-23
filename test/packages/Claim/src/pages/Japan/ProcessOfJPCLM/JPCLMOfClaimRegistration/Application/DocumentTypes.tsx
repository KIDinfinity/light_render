import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Form, Input, Icon } from 'antd';
import PropTypes from 'prop-types';
import ErrorTooltip from '@/components/ErrorTooltip';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './DocumentTypes.less';

@connect((_, { form, formName }) => ({
  value: form.getFieldValue(formName),
  error: form.getFieldError(formName),
}))
class FormItemInput extends Component {
  static contextTypes = {
    isHideRequireIcon: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps) {
    const {
      disabled: nextDisabled,
      required: nextRquired,
      dicts: nextDicts,
      value: nextValue,
      error: nextError,
      rules: nextRules,
    } = nextProps;
    const { value, disabled, dicts, error, required, rules } = this.props;

    return (
      !lodash.isEqual(nextDisabled, disabled) ||
      !lodash.isEqual(nextRquired, required) ||
      !lodash.isEqual(nextDicts, dicts) ||
      !lodash.isEqual(nextValue, value) ||
      !lodash.isEqual(nextError, error) ||
      !lodash.isEqual(nextRules, rules)
    );
  }

  renderList = () => {
    const { dicts, value, disabled, handleDeleteDocument } = this.props;
    if (lodash.isArray(dicts) && lodash.isArray(value)) {
      return lodash.map(value, (selectedItemCode) => {
        const selectedItem = dicts.find((object) => object.dictCode === selectedItemCode);

        return (
          <li key={selectedItemCode}>
            {(selectedItem && selectedItem.dictName) || selectedItemCode}
            {!disabled && (
              <Icon
                type="close"
                style={{ cursor: 'pointer' }}
                onClick={() => handleDeleteDocument(selectedItemCode)}
              />
            )}
          </li>
        );
      });
    }
    return null;
  };

  render() {
    const { form, required, formName, labelId, rules } = this.props;
    const { isHideRequireIcon } = this.context;
    return (
      <Form.Item
        label={labelId && <ErrorTooltip labelId={labelId} form={form} formName={formName} />}
      >
        {form.getFieldDecorator(formName, {
          rules: [
            {
              required: required && !isHideRequireIcon,
              message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
            },
            ...rules,
          ],
        })(<Input style={{ display: 'none' }} />)}
        <ul className={styles.applicationListContainer}>{this.renderList()}</ul>
      </Form.Item>
    );
  }
}

FormItemInput.defaultProps = {
  disabled: false,
  required: false,
  rules: [],
  labelId: undefined,
};

FormItemInput.propTypes = {
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  rules: PropTypes.array,
  form: PropTypes.object.isRequired,
  formName: PropTypes.string.isRequired,
  labelId: PropTypes.string,
};

export default FormItemInput;
