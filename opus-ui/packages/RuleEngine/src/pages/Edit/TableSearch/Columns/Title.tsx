import React from 'react';
import { Input, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default ({ labelId, value, handleChange }: any) => {
  return (
    <div>
      <p>
        {formatMessageApi({
          Label_BIZ_Claim: labelId,
        })}
      </p>
      <div>
        <Input suffix={<Icon type="search" />} value={value} onChange={handleChange} />
      </div>
    </div>
  );
};
