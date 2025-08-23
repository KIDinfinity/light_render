/* eslint-disable no-param-reassign */
import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import lodash from 'lodash';
import { OperationTypeEnum, StateSectionEnum } from 'process/GeneralPOS/common/Enum';
import { commonNomineeUpdate } from '../commonReducers';
import { tenant } from '@/components/Tenant';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const {
      transactionId,
      changedFields,
      type,
      modalType,
      validating = false,
      changeTypeIndex,
      changeType,
      clientIndex,
      updateKey,
      section,
    } = payload;

    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;
    const reinstatementPath = `entities.transactionTypesMap[${transactionId}].beneficiaryList`;
    const reinstatementData = lodash.get(draftState, `${reinstatementPath}`, []);
    switch (type) {
      case OperationTypeEnum.ADD: {
        const cleanChangedFields = formUtils.cleanValidateData(changedFields || {});
        const clientSeq = `${new Date().getTime()}`;
        commonNomineeUpdate.ADD(draftState, changedFields, {
          transactionPath,
          otherData: { clientSeq, ...cleanChangedFields },
        });
        if (draftState?.isDecision) {
          lodash.set(
            draftState,
            `${transactionPath}.needDuplicateCheckList`,
            lodash.uniq([
              ...(lodash.get(draftState, `${transactionPath}.needDuplicateCheckList`) || []),
              clientSeq,
            ])
          );
        }

        lodash.set(draftState, reinstatementPath, [
          ...(lodash.get(draftState, reinstatementPath) || []),
          {
            clientSeq,
            ...cleanChangedFields,
          },
        ]);
        break;
      }
      case OperationTypeEnum.UPDATE: {
        lodash.set(draftState, `${reinstatementPath}[${clientIndex}]`, {
          ...reinstatementData?.[clientIndex],
          ...changedFields,
        });
        if (!validating) {
          if (lodash.has(changedFields, 'benefitPercentage')) {
            lodash.set(
              draftState,
              `extraField.${StateSectionEnum.NOMINEE}.total`,
              lodash
                .chain(draftState)
                .get(`${transactionPath}.beneficiaryList`, [])
                .filter((beneficiaryItem: any) =>
                  tenant.isTH()
                    ? beneficiaryItem.beneficiaryType === 'DB' ||
                      lodash.isEmpty(beneficiaryItem.beneficiaryType)
                    : true
                )
                .map((childItem: any) =>
                  Number(formUtils.queryValue(childItem.benefitPercentage) || 0)
                )
                .sum()
                .value()
            );
          }
        }
        break;
      }
      case OperationTypeEnum.LISTINFOUPDATE: {
        commonNomineeUpdate[modalType](draftState, changedFields, {
          transactionPath,
          validating,
          changeTypeIndex,
          clientIndex,
          otherData: changedFields,
          changeType,
          section,
        });
        if (!validating) {
          if (
            ['firstName', 'middleName', 'surname', 'relationship', 'otherRelationship'].includes(
              lodash.keys(changedFields)[0]
            )
          ) {
            const otherDatas = {};
            if (
              lodash.hasIn(changedFields, 'relationship') &&
              formUtils.queryValue(changedFields.relationship !== '019')
            ) {
              otherDatas.otherRelationship = null;
            }
            lodash.set(draftState, `${reinstatementPath}[${clientIndex}]`, {
              ...reinstatementData?.[clientIndex],
              ...changedFields,
              ...otherDatas,
            });
          }
        }
        break;
      }
      case OperationTypeEnum.DELETE: {
        reinstatementData?.splice(clientIndex, 1);
        commonNomineeUpdate.DELETE(draftState, changedFields, {
          transactionPath,
          validating,
          changeTypeIndex,
          clientIndex,
          otherData: changedFields,
          changeType,
        });
        if (!validating) {
          lodash.set(
            draftState,
            `extraField.${StateSectionEnum.NOMINEE}.total`,
            lodash
              .chain(draftState)
              .get(`${transactionPath}.beneficiaryList`, [])
              .filter((beneficiaryItem: any) =>
                tenant.isTH()
                  ? beneficiaryItem.beneficiaryType === 'DB' ||
                    lodash.isEmpty(beneficiaryItem.beneficiaryType)
                  : true
              )
              .map((childItem: any) =>
                Number(formUtils.queryValue(childItem.benefitPercentage) || 0)
              )
              .sum()
              .value()
          );
        }
        break;
      }
    }
  });
