import React from 'react';
import ServiceItem from 'process/Components/BussinessControls/ServiceItem';
import ButtonGroup from '../ServiceItem/ButtonGroup';
import Payable from '../ServiceItemPayable';

const ServiceV2 = (props: any) => {
  return <ServiceItem.LYMA {...props} Payable={Payable} ButtonGroup={ButtonGroup} />;
};

export default ServiceV2;
