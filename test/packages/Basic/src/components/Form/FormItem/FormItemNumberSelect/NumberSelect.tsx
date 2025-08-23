import React from 'react';
import { Select, InputNumber } from 'antd';
import lodash from 'lodash';
import styles from './index.less';
import { is, Map } from 'immutable';
type NumberSelectProps = {
  size: 'small' | 'default' | 'large' | undefined;
  value: number;
  onChange: (e: any) => void;
  title: string;
  children: any;
};

type StateProps = {
  deptValue: any;
};
class NumberSelect extends React.Component<NumberSelectProps, StateProps> {
  constructor(props: NumberSelectProps) {
    super(props);
    this.state = {
      // inputWidth: 120,
      deptValue: Map({ tempValue: undefined, inputWidth: 120 }),
    };
  }

  shouldComponentUpdate(
    nextProps: Readonly<NumberSelectProps>,
    nextState: Readonly<StateProps>
  ): boolean {
    if (Object.keys(this.state).length !== Object.keys(nextState).length) return true;
    if (!is(this.state.deptValue, nextState.deptValue)) return true;
    if (this.props.value !== nextProps.value) return true;
    if (this.props.size !== nextProps.size) return true;
    return false;
  }

  componentDidMount(): void {
    if (this.props.value === this.state.deptValue.get('tempValue')) return;
    const deptValue = this.state.deptValue.update('tempValue', this.props.value);
    this.setState({ deptValue });
  }

  componentWillUnmount(): void {
    let deptValue = this.state.deptValue.update('inputWidth', 0);
    deptValue = this.state.deptValue.update('tempValue', 0);
    this.setState({ deptValue });
  }

  // eslint-disable-next-line react/sort-comp
  handleInputChange = (value: any) => {
    this.triggerChange(value);
  };

  handleSelectChange = (value: any) => {
    this.triggerChange(value);
  };

  triggerChange = (changedValue: any) => {
    const deptValue = this.state.deptValue.update('tempValue', changedValue);
    this.setState({ deptValue });
  };

  handleOnBlur = (value: any) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  inputRef: any;

  select: any;

  get value() {
    const { children, value } = this.props;

    return (
      (lodash.chain(children) as any)
        .find((el: any) => el.props.value === value)
        .get('props.title')
        .value() || value
    );
  }

  getInputRef = (inst: any) => {
    const { deptValue } = this.state;
    this.inputRef = inst;
    const newWidth = inst?.input?.clientWidth;
    if (deptValue.get('inputWidth') !== newWidth) {
      const newValue = this.state.deptValue.update('inputWidth', newWidth);
      this.setState({ deptValue: newValue });
    }
  };

  render() {
    const { size, children = [], required } = this.props;
    const { deptValue } = this.state;

    return (
      <span
        className={styles.dateSelect}
        style={{
          display: 'flex',
        }}
      >
        <InputNumber
          value={deptValue.get('tempValue')}
          // onClick={this.inputClick}
          onChange={this.handleInputChange}
          onBlur={this.handleOnBlur}
          style={{ flex: 1 }}
          ref={this.getInputRef}
          required={required}
        />
        <Select
          value={deptValue.get('tempValue')}
          size={size}
          ref={(inst) => {
            this.select = inst;
          }}
          // @ts-ignore
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          dropdownMatchSelectWidth={false}
          className={styles.select}
          dropdownStyle={{
            width: deptValue.get('inputWidth'),
            left: 0,
          }}
          style={{
            width: 24,
          }}
          onChange={this.handleSelectChange}
          required={required}
        >
          {children}
        </Select>
      </span>
    );
  }
}

export default NumberSelect;
