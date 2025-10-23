import React from 'react';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

interface IPropsItem {
  disabled: boolean;
  key: string;
  labelId: string;
  handleClick: Function;
}
interface IProps {
  disabled: boolean;
  item: IPropsItem;
}

export default ({ disabled = false, item }: IProps) => {
  return (
    <Button
      key={item.key}
      shape="round"
      icon="plus"
      disabled={disabled}
      onClick={() => {
        item.handleClick();
      }}
    >
      {formatMessageApi({
        Label_BIZ_Claim: item.labelId,
      })}
    </Button>
  );
};
