import React, { useMemo } from 'react';
import lodash from 'lodash';
import useAttachSaleSubChannelData from 'navigator/hooks/useAttachSaleSubChannelData';

const AttachSaleSubChannelData = (props: any) => {
  const { children, list, className, pagination } = props;

  const newProps = lodash.omit(props, ['children', 'pagination', 'list', 'className']);

  const originData = useMemo(() => {
    return {
      list,
      pagination,
    };
  }, [list, pagination]);

  const attachSaleSubChannelData: any = useAttachSaleSubChannelData(originData);
  const resultData = {
    list: lodash
      .chain(attachSaleSubChannelData)
      .get('list')
      .map((item) => ({
        ...item,
        className: className,
      }))
      .value(),
    pagination,
  };

  return React.cloneElement(children, { ...newProps, data: resultData });
};

export default (props: any) => {
  return <AttachSaleSubChannelData {...props}>{props.children}</AttachSaleSubChannelData>;
};
