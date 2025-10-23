import { formUtils } from 'basic/components/Form';
import moment from 'moment';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;

  let headerData = {
    ...state.headerData,
    ...changedFields,
  };

  const effectiveDate = formUtils.queryValue(headerData?.effectiveDate);
  const expiryDate = formUtils.queryValue(headerData?.expiryDate);

  if (
    effectiveDate &&
    expiryDate &&
    moment(effectiveDate).startOf('day').valueOf() < moment(expiryDate).startOf('day').valueOf()
  ) {
    headerData = {
      effectiveDate,
      expiryDate,
    };
  }

  return {
    ...state,
    headerData,
  };
};
