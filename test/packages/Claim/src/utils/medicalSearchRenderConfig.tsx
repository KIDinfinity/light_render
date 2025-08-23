import React from 'react';
import Ellipsis from '@/components/Ellipsis';

export default {
  treatmentName: (text) => (
    <Ellipsis tooltipClassName="widerTooltip" length={100} tooltip lines={2}>
      {text}
    </Ellipsis>
  ),
  diseaseDescription: (text) => (
    <Ellipsis tooltipClassName="widerTooltip" length={100} tooltip lines={2}>
      {text}
    </Ellipsis>
  ),
  treatmentDescription: (text) => (
    <Ellipsis length={100} tooltipClassName="widerTooltip" tooltip lines={2}>
      {text}
    </Ellipsis>
  ),
};
