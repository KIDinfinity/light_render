import lodash from 'lodash';
import formUtils from 'basic/components/Form/formUtils';
import { add } from '@/utils/precisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const calculateDifference = ({ parentPayableId, childPayableListMap, confinementItem }: any) => {
  const confinementShareGroupArray = lodash.concat(
    confinementItem?.shareBenefitItemCodeList,
    confinementItem?.benefitItemCode
  );

  return lodash
    .chain(formUtils.cleanValidateData(childPayableListMap))
    .reduce((sum: number, item: any) => {
      if (
        parentPayableId === item?.invoicePayableId &&
        lodash.includes(confinementShareGroupArray, item?.benefitItemCode)
      ) {
        return add(sum, item?.payableAmount);
      }
      return sum;
    }, 0)
    .value();
};

export const VLD_000721 = ({
  listPerConfinementLimit,
  parentPayableId,
  childPayableListMap,
}: any) => (rule: any, value: any, callback: Function) => {
  const confinementItem = lodash.find(listPerConfinementLimit, (item) => {
    return item?.rolloverBenefitItemCode === value;
  });

  if (
    !lodash.isEmpty(confinementItem) &&
    calculateDifference({ parentPayableId, childPayableListMap, confinementItem }) <
      confinementItem?.remainAmount
  ) {
    callback(
      formatMessageApi(
        { Label_COM_WarningMessage: 'MSG_000677' },
        `${value} - ${formatMessageApi({ Dropdown_PRD_BenefitItem: value })}`,
        formatMessageApi({ Dropdown_CLM_BenefitLimit: confinementItem?.limitKey })
      )
    );
  } else {
    callback();
  }
};

export default { calculateDifference };
