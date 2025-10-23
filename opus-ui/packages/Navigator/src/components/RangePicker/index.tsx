import { DatePicker } from 'antd';
import React from 'react';
import classNames from 'classnames';
import { getDateFormat } from 'basic/components/Form';
import styles from './index.less';

class DateRange extends React.Component<any, any> {
  static defalutProps: {
    format: 'L';
    value: [];
    onChange: () => void;
    formProps: {};
    toProps: {};
  };

  constructor(props: any) {
    super(props);
    this.state = {
      startValue: this.props.value?.[0] ?? null,
      endValue: this.props.value?.[1] ?? null,
      endOpen: false,
    };
  }

  get format() {
    return getDateFormat(this.props.format);
  }

  disabledStartDate = (startValue: any) => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = (endValue: any) => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() < startValue.valueOf();
  };

  onChange = (field: any, value: any) => {
    const { format } = this;
    this.setState(
      {
        [field]: value,
      },
      () => {
        const { startValue, endValue } = this.state;
        this.props.onChange(
          [startValue, endValue],
          [startValue ? startValue.format(format) : '', endValue ? endValue.format(format) : '']
        );
      }
    );
  };

  onStartChange = (value: any) => {
    this.onChange('startValue', value);
  };

  onEndChange = (value: any) => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = (open: any) => {
    if (!open && !this.state.endValue) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = (open: any) => {
    this.setState({ endOpen: open });
  };

  render() {
    const { format } = this;
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div
        className={classNames(styles.rangePicker, {
          flex: this.props.flex,
        })}
      >
        <DatePicker
          {...this.props}
          {...this.props.formProps}
          disabledDate={this.disabledStartDate}
          format={format}
          value={startValue}
          placeholder="From"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
          defaultPickerValue={startValue ?? endValue}
        />
        <DatePicker
          {...this.props}
          {...this.props.toProps}
          disabledDate={this.disabledEndDate}
          format={format}
          value={endValue}
          placeholder="To"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
          defaultPickerValue={endValue ?? startValue}
        />
      </div>
    );
  }
}

export default DateRange;
