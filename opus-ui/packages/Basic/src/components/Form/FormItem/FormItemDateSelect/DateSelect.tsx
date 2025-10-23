import React from 'react';
import { Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import lodash from 'lodash';
import styles from './index.less';

class DateSelect extends React.Component<any> {
  state = {
    openDate: false,
    inputWidth: 120,
  };

  // eslint-disable-next-line react/sort-comp
  handleInputChange = (value: any) => {
    const { format = 'L' } = this.props;
    if (moment(value).isValid()) {
      this.triggerChange(moment(value).format(format));
    }

    this.triggerChange(value);
  };

  handleDateChange = (value: any) => {
    this.triggerChange(moment.isMoment(value) ? value.format() : value);

    this.setState({
      openDate: false,
    });
  };

  handleSelectChange = (value: any) => {
    this.triggerChange(value);
  };

  triggerChange = (changedValue: any) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };
  inputRef: any;
  datePicker: any;
  select: any;

  get value() {
    const { children, format = 'L', value } = this.props;
    if (moment(value).isValid()) {
      return moment(value).format(format);
    }
    return (lodash.chain(children) as any)
      .find((el: any) => el.props.value === value)
      .get('props.title')
      .value();
  }

  onBlur = () => {
    setTimeout(() => {
      this.setState({
        openDate: false,
      });
    }, 200);
  };

  onDateFocus = () => {
    this.setState({
      openDate: false,
    });
  };

  inputClick = () => {
    this.setState({
      openDate: true,
    });
    // if (this.datePicker) {
    //   this.datePicker.focus();
    // }
  };

  getInputRef = (inst: any) => {
    const { inputWidth } = this.state;
    this.inputRef = inst;
    const newWidth = inst?.input?.clientWidth;
    if (inputWidth !== newWidth) {
      this.setState({
        inputWidth: newWidth,
      });
    }
  };

  render() {
    const { size, value, format = 'L', children = [] } = this.props;
    const { openDate, inputWidth } = this.state;

    return (
      <span className={styles.dateSelect}>
        <Input
          value={this.value}
          onClick={this.inputClick}
          onChange={this.handleInputChange}
          style={{ flex: 1 }}
          ref={this.getInputRef}
        />
        <DatePicker
          ref={(inst) => {
            this.datePicker = inst;
          }}
          open={openDate}
          className={styles.datepicker}
          // type="text"
          size={size}
          allowClear={false}
          format={format}
          value={moment(value).isValid() ? moment(value) : null}
          onChange={this.handleDateChange}
          onBlur={this.onBlur}
          style={{
            width: 24,
          }}
          //@ts-ignore
          getCalendarContainer={(triggerNode) => triggerNode.parentNode}
        />
        <Select
          value={value}
          size={size}
          ref={(inst) => {
            this.select = inst;
          }}
          //@ts-ignore
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          dropdownMatchSelectWidth={false}
          className={styles.select}
          dropdownStyle={{
            width: inputWidth,
            left: 0,
          }}
          style={{
            width: 24,
          }}
          onChange={this.handleSelectChange}
        >
          {children}
        </Select>
      </span>
    );
  }
}

export default DateSelect;
