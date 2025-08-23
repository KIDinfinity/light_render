import React, { Component } from 'react';
import { Form, Select } from 'antd';
import { ReactComponent as Region } from '@/assets/public/region.svg';
import LoginContext from './loginContext';
import styles from './ant-select.less';

const FormItem = Form.Item;

class WrapFormItemSelect extends Component<any> {
  componentDidMount() {
    const { updateActive, name } = this.props;
    if (updateActive) {
      updateActive(name);
    }
  }

  getFormItemOptions = ({ onChange, defaultValue, customprops, rules }: any) => {
    const options: any = {
      rules: rules || customprops?.rules,
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
    const { customprops, name, formIndex } = this.props;

    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);

    return (
      <div className={styles['ant-select']}>
        <div className={styles.selectBox}>
          <Region className={styles.prefixIcon} />
          <FormItem>
            {getFieldDecorator(
              name,
              options
            )(
              <Select
                dropdownClassName={styles.dropdown}
                autoFocus={formIndex === customprops?.index}
                size="large"
                index={2}
                placeholder=""
              >
                <Select.Option value="hk">HK</Select.Option>
                <Select.Option value="th">TH</Select.Option>
              </Select>
            )}
          </FormItem>
        </div>
      </div>
    );
  }
}

export default (props: any) => {
  return (
    <LoginContext.Consumer>
      {(context: any) => (
        <WrapFormItemSelect
          {...props}
          type="region"
          updateActive={context.updateActive}
          form={context.form}
        />
      )}
    </LoginContext.Consumer>
  );
};
