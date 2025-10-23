import React, { Component } from 'react';
import { Input } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import {
  durationList,
  getIsMin,
  getDurationList,
  getDurationNumber,
} from 'basic/utils/getDuration';

class DurationItem extends Component<any> {
  state = {
    durationList: {
      ...durationList,
    },
  };

  static getDerivedStateFromProps(nextProps: any) {
    const { value, format } = nextProps;
    return {
      durationList: getDurationList({ duration: value, format }),
    };
  }

  onChange = (event: any) => {
    const { onChange } = this.props;
    const { durationList } = this.state;
    const value = event?.target?.value;
    const type = event.target?.dataset?.type;
    const newValue = value ? Number(value.replace(/[^0-9]/gi, '')) : null;
    const newdurationList = {
      ...durationList,
      [type]: {
        ...durationList[type],
        value: newValue,
      },
    };
    this.setState({
      durationList: newdurationList,
    });

    const result = getDurationNumber(newdurationList);

    onChange(result);
  };

  render() {
    const { durationList } = this.state;
    const { placeholder, ...restProps } = this.props;
    const isMin = getIsMin(durationList);

    return (
      <Input.Group>
        {lodash
          .keys(durationList)
          ?.filter((type: string) => durationList[type]?.show)
          ?.map((type: any, idx: number) => (
            <Input
              {...restProps}
              key={String(idx)}
              placeholder={idx === 0 ? placeholder : ''}
              value={durationList?.[type]?.value}
              data-type={type}
              onChange={this.onChange}
              suffix={formatMessageApi({
                Label_BIZ_Claim: isMin ? `time.format.min.${type}` : `time.format.${type}`,
              })}
            />
          ))}
      </Input.Group>
    );
  }
}

export default DurationItem;
