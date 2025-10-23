import React from 'react';
import moment from 'moment';
import { InputNumber } from 'antd';
import styles from './sendDay.less';

interface IProps {
  sendDay: number;
  min: number;
  max: number;
  disabled: boolean;
  sendDate: string;
  handleChange: Function;
}

const SendDay = (props: IProps) => {
  const { sendDay, min, max, disabled, handleChange, sendDate } = props;
  return (
    <div className={styles.sendDay}>
      <div>
        <InputNumber
          name="sendDay"
          value={sendDay}
          min={min}
          max={max === -1 ? 'infinity' : max}
          disabled={disabled}
          onChange={handleChange}
        />
        Days
      </div>
      <div>{sendDate ? `（${moment(sendDate).format('L')}）` : ''}</div>
    </div>
  );
};

export default SendDay;
