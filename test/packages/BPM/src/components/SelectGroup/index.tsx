import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import { Form, Select, Button, Input, Icon, InputNumber } from 'antd';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import ErrorTooltip from '@/components/ErrorTooltip';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

@connect((selectOptionsDictionary, { form, fieldName, typeCode, dicts }) => ({
  value: form.getFieldValue(fieldName),
  error: form.getFieldError(fieldName),
  dicts:
    dicts ||
    lodash.get(selectOptionsDictionary, `selectOptionsDictionary.dictionary.${typeCode}`, []),
}))
class SelectGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    const { dispatch, typeCode, dicts } = this.props;
    if (!dicts) {
      dispatch({
        type: 'selectOptionsDictionary/get',
        payload: {
          typeCode,
        },
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      disabled: nextDisabled,
      required: nextRquired,
      dicts: nextDicts,
      loading: nextLoading,
      value: nextValue,
      error: nextError,
    } = nextProps;
    const { disabled, required, dicts, loading, value, error } = this.props;
    const { nextOpen } = nextState;
    const { open } = this.state;
    return (
      !lodash.isEqual(nextDisabled, disabled) ||
      !lodash.isEqual(nextRquired, required) ||
      !lodash.isEqual(nextDicts, dicts) ||
      !lodash.isEqual(nextLoading, loading) ||
      !lodash.isEqual(nextValue, value) ||
      !lodash.isEqual(nextError, error) ||
      !lodash.isEqual(open, nextOpen)
    );
  }

  handleOpen = () => {
    this.setState((state) => ({
      ...state,
      open: true,
    }));
  };

  handleCancel = () => {
    this.setState({
      open: false,
    });
  };

  renderListLiText = (item) => {
    const { dicts, dictName, dictValue } = this.props;
    let text = formatMessageApi({ documentType_i18n: item });
    if (dictValue) {
      const findObj = {};
      findObj[dictValue] = item;
      const dictsObj = (lodash.chain(dicts).pickBy(lodash.isObject) as any).find(findObj).value();
      text = lodash.get(dictsObj, `${dictName}`, item);
    }
    return text;
  };

  renderList = () => {
    const {
      form,
      fieldName,
      dicts,
      value,
      disabled,
      minNumber,
      enableNumber,
      enableComment,
    } = this.props;
    if (lodash.isArray(dicts) && lodash.isArray(value)) {
      return lodash.map(value, (item) => {
        return (
          <li key={item}>
            <div className={styles.containerText}>
              {this.renderListLiText(item)}
              <div className={styles.containerTextOpt}>
                {enableNumber &&
                  form.getFieldDecorator(
                    `${fieldName}_${item}_number`,
                    {}
                  )(
                    <InputNumber
                      min={minNumber}
                      disabled={disabled}
                      onChange={(number: number) => this.changeNumberFn(item, number)}
                    />
                  )}
                {!disabled && (
                  <Icon
                    type="close"
                    onClick={() => {
                      this.handleRemove(item);
                    }}
                  />
                )}
              </div>
            </div>
            {enableComment &&
              form.getFieldDecorator(
                `${fieldName}_${item}_comment`,
                {}
              )(
                <Input.TextArea
                  className={styles.containerComment}
                  disabled={disabled}
                  onChange={(ev: any) => this.changeCommentFn(item, ev)}
                />
              )}
          </li>
        );
      });
    }
    return null;
  };

  handleSelect = (selected) => {
    const { value, onChange, fieldName, enableNumber, enableComment } = this.props;
    let newList = [];
    if (lodash.isArray(value)) {
      newList = [...value, selected];
    } else {
      newList = [selected];
    }
    const result = lodash.uniq(newList);

    onChange({
      [fieldName]: {
        name: fieldName,
        value: result,
        enableNumber,
        enableComment,
        errors: undefined,
        touched: true,
        validating: false,
      },
    });

    this.setState({
      open: false,
    });
  };

  handleRemove = (selected) => {
    const { value, onChange, fieldName, enableNumber, enableComment } = this.props;
    if (lodash.isArray(value)) {
      const newList = value.filter((item) => item !== selected);
      onChange({
        [fieldName]: {
          name: fieldName,
          value: newList,
          enableNumber,
          enableComment,
          errors: undefined,
          touched: true,
          validating: false,
        },
      });
    }
  };

  changeNumberFn = (selected, number) => {
    const { fieldName, changeNumberFn } = this.props;
    changeNumberFn({
      name: fieldName,
      selected,
      number,
    });
  };

  changeCommentFn = (selected, ev) => {
    const { fieldName, changeCommentFn } = this.props;
    changeCommentFn({
      name: fieldName,
      selected,
      comment: ev?.target?.value,
    });
  };

  render() {
    const {
      form,
      dicts,
      loading,
      disabled,
      required,
      rules,
      fieldName,
      buttonLabelKey,
      labelKey,
      buttonLabel,
      hideEmptyBtn,
      dictValue,
      dictName,
      value,
    } = this.props;
    const { open } = this.state;
    const newDicts = dicts?.filter((item: string) => !lodash.includes(value, item?.dictCode));
    const isHide = disabled || (!newDicts.length && hideEmptyBtn);
    return (
      <>
        <Form.Item
          className={classnames({
            [styles.noMargin]: disabled,
          })}
          label={
            labelKey && (
              <ErrorTooltip
                form={form}
                formName={fieldName}
                title={formatMessageApi({
                  Label_BIZ_Claim: labelKey,
                })}
              />
            )
          }
        >
          {form.getFieldDecorator(fieldName, {
            rules: [
              {
                required,
                message: formatMessageApi({
                  Label_COM_WarningMessage: 'ERR_000001',
                }),
              },
              ...rules,
            ],
          })(<Input style={{ display: 'none' }} />)}
          <ul className={styles.applicationListContainer}>{this.renderList()}</ul>
          <div className={styles.actionContainer}>
            {!isHide ? (
              <Button className={styles.btn} icon="plus" onClick={this.handleOpen}>
                {buttonLabel ||
                  formatMessageApi({
                    Label_BIZ_Claim: buttonLabelKey,
                  })}
              </Button>
            ) : null}
          </div>
        </Form.Item>
        {open && (
          <Select
            showSearch
            open={open}
            mode="default"
            value=""
            onSelect={this.handleSelect}
            filterOption={(input, option) =>
              String(option.props.children).toLowerCase().indexOf(String(input).toLowerCase()) >= 0
            }
            style={{ width: '100%' }}
            loading={loading}
            disabled={disabled}
            dropdownMatchSelectWidth={false}
            onBlur={this.handleCancel}
          >
            {lodash.map(newDicts, (item) => (
              <Select.Option key={item[dictValue]} value={item[dictValue]}>
                {formatMessageApi({ Dropdown_CFG_DocumentType: item[dictName] })}
              </Select.Option>
            ))}
          </Select>
        )}
      </>
    );
  }
}

SelectGroup.defaultProps = {
  disabled: false,
  required: false,
  rules: [],
  buttonLabelKey: '',
  labelKey: '',
  typeCode: '',
  dicts: false,
  dictValue: 'dictCode',
  dictName: 'dictName',
  buttonLabel: '',
  hideEmptyBtn: false,
  minNumber: 0,
  enableNumber: false,
  enableComment: false,
};

SelectGroup.propTypes = {
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  rules: PropTypes.array,
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  buttonLabelKey: PropTypes.string,
  labelKey: PropTypes.string,
  typeCode: PropTypes.string,
  dicts: PropTypes.array || PropTypes.bool,
  dictValue: PropTypes.string,
  dictName: PropTypes.string,
  buttonLabel: PropTypes.string,
  hideEmptyBtn: PropTypes.bool,
  minNumber: PropTypes.number,
  enableNumber: PropTypes.bool,
  changeNumberFn: PropTypes.func,
  enableComment: PropTypes.bool,
  changeCommentFn: PropTypes.func,
};

export default SelectGroup;
