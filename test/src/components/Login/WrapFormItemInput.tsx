import React, { Component } from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

class WrapFormItemInput extends Component {
  componentDidMount() {
    const { updateActive, name } = this.props;
    if (updateActive) {
      updateActive(name);
    }
  }

  getFormItemOptions = ({ onChange, defaultValue, customprops, rules }) => {
    const options = {
      rules: rules || customprops.rules,
    };
    if (onChange) {
      options.onChange = onChange;
    }
    if (defaultValue) {
      options.initialValue = defaultValue;
    }

    return options;
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props
    const {
      onChange,
      customprops,
      defaultValue,
      rules,
      name,
      buttonText,
      updateActive,
      type,
      formIndex,
      ...restProps
    } = this.props;

    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);

    const otherProps = restProps || {};

    return (
      <FormItem>
        {getFieldDecorator(
          name,
          options
        )(<Input autoFocus={formIndex === customprops.index} {...customprops} {...otherProps} />)}
      </FormItem>
    );
  }
}

export default WrapFormItemInput;
