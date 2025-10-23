import { IsAdjustment } from 'claim/enum/IsAdjustment';

const isAdjustment = (adjustment: 'Y' | 'N' | null | undefined) => {
  return adjustment === IsAdjustment.Yes;
};

export default isAdjustment;
