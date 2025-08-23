import React from 'react';
import { Button } from 'antd';
import useLinkToUWMeByEnquiryId from 'process/NB/ManualUnderwriting/_hooks/useLinkToUWMeByEnquiryId';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default ({ clientId }: any) => {
  const handleLink = useLinkToUWMeByEnquiryId({ clientId });
  return (
    <>
      <Button onClick={handleLink} size="small">
        {formatMessageApi({
          Label_BPM_Button: 'LinkToUWMe',
        })}
      </Button>
    </>
  );
};
