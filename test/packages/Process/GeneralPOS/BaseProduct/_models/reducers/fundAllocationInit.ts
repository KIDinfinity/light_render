/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { StateSectionEnum } from 'process/GeneralPOS/common/Enum';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;
    const fundAllocationPath = `entities.transactionTypesMap[${transactionId}].fundAllocation`;

    if (!lodash.isArray(lodash.get(draftState, `${fundAllocationPath}.fundAllocationFundList`))) {
      lodash.set(draftState, `${fundAllocationPath}.fundAllocationFundList`, []);
    }

    lodash.set(
      draftState,
      `${fundAllocationPath}.fundAllocationFundList`,
      lodash.get(draftState, `${fundAllocationPath}.fundAllocationFundList`).map((item) => ({
        ...item,
        isAdd: true,
      }))
    );

    lodash.set(
      draftState,
      `extraField.${StateSectionEnum.FUNDALLOCATIONFUNDLIST}.total`,
      lodash.sum(
        lodash
          .get(draftState, `${fundAllocationPath}.fundAllocationFundList`)
          .map((childItem) => Number(formUtils.queryValue(childItem.allocation) || 0))
      )
    );
  });
