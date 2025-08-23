import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { OptionEnum, PremiumTypeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from '../../activity.config';
import { denormalizeData } from '../../utils/normalizrUtils';

type IResponse = Record<string, any>;

export default function* getDataForSubmit(action, { select }: any) {
  const isSave = action?.payload?.isSave;
  const taskDetail: IResponse = yield select(({ processTask }: any) => processTask.getTask);
  const taskNotEditable: IResponse = yield select(
    ({ claimEditable }: any) => claimEditable.taskNotEditable
  );
  const processData: IResponse = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  );
  const entities: IResponse = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities
  );
  const transactionTypeCodeMap: IResponse = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.transactionTypeCodeMap
  );

  const { processInstanceId, taskId, taskDefKey, assessmentType } = lodash.pick(taskDetail, [
    'processInstanceId',
    'taskId',
    'taskDefKey',
    'assessmentType',
  ]);
  const denormalizedData = denormalizeData(processData, entities);

  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  // 这里后端要求布尔值，就给他转回去
  if (claimData.cftFlag !== void 0 && claimData.cftFlag !== null) {
    claimData.cftFlag = !!claimData.cftFlag;
  }

  if (!lodash.isEmpty(claimData.transactionTypes)) {
    claimData.transactionTypes =
      claimData.transactionTypes?.map((item) => {
        const newData = {};
        if (
          lodash.hasIn(item, 'paymentMethodList') &&
          !lodash.isEmpty(item.paymentMethodList) &&
          !isSave
        ) {
          newData.paymentMethodList = [
            {
              ...item?.paymentMethodList?.[0],
              txPmBankList: item?.paymentMethodList?.[0]?.txPmBankList
                ?.filter(
                  (bankItem) =>
                    bankItem?.selected ||
                    item?.paymentMethodList[0]?.payoutOption !== OptionEnum.BTR
                )
                ?.map((item: any) => ({
                  ...item,
                  sourceBank: tenant.isPH() ? 'SrcBk_check_24' : null,
                })),
            },
          ];
          if (newData.paymentMethodList?.[0]?.payoutOption !== OptionEnum.BTR) {
            try {
              delete newData.paymentMethodList[0].txPmBankList;
            } catch (error) {}
          }
          if (newData.paymentMethodList?.[0]?.payoutOption !== OptionEnum.PPY) {
            try {
              delete newData.paymentMethodList[0].txPmPromptPayList;
            } catch (error) {}
          }
          if (newData.paymentMethodList?.[0]?.payoutOption !== OptionEnum.CHQ) {
            try {
              delete newData.paymentMethodList[0].txPmChequeList;
            } catch (error) {}
          }
        }

        if (lodash.hasIn(item, 'partialWithdrawal') && !lodash.isEmpty(item?.partialWithdrawal)) {
          const otherData = tenant.isPH()
            ? {
                totalAccountValue: lodash.sum(
                  item?.partialWithdrawal?.partialWithdrawalFundList?.map((fundItem) =>
                    Number(Number(fundItem?.accountValue || 0).toFixed(2))
                  )
                ),
                totalAmount:
                  item?.partialWithdrawal?.withdrawalLevel === OptionEnum.FundLevel
                    ? lodash.sum(
                        item?.partialWithdrawal?.partialWithdrawalFundList?.map((fundItem) =>
                          Number(Number(fundItem?.withdrawalAmt || 0).toFixed(2))
                        )
                      )
                    : null,
              }
            : {};

          newData.partialWithdrawal = {
            ...item.partialWithdrawal,
            partialWithdrawalFundList: item?.partialWithdrawal?.partialWithdrawalFundList?.map(
              (withdrawItem, index) => {
                if (tenant.isPH()) {
                  return {
                    ...withdrawItem,
                    orderNo: index,
                    withdrawalPct:
                      item?.partialWithdrawal?.withdrawalLevel === OptionEnum.FundLevel
                        ? withdrawItem?.withdrawalPct
                        : null,
                    withdrawalUnit:
                      item?.partialWithdrawal?.withdrawalLevel === OptionEnum.FundLevel
                        ? withdrawItem?.withdrawalUnit
                        : null,
                    withdrawalAmt:
                      item?.partialWithdrawal?.withdrawalLevel === OptionEnum.FundLevel
                        ? withdrawItem?.withdrawalAmt
                        : null,
                    writeWithdrawalAmt:
                      item?.partialWithdrawal?.withdrawalLevel === OptionEnum.FundLevel
                        ? withdrawItem?.writeWithdrawalAmt
                        : null,
                  };
                }
                return {
                  ...withdrawItem,
                  orderNo: index,
                };
              }
            ),
            requestTotalPerc:
              item?.partialWithdrawal?.withdrawalLevel === OptionEnum.PolicyLevel
                ? item?.partialWithdrawal?.requestTotalPerc
                : null,
            requestTotalAmount:
              item?.partialWithdrawal?.withdrawalLevel === OptionEnum.PolicyLevel
                ? item?.partialWithdrawal?.requestTotalAmount
                : null,
            ...otherData,
          };

          if (tenant.isPH()) {
            if (item?.partialWithdrawal?.withdrawalLevel === OptionEnum.PolicyLevel) {
              newData.partialWithdrawal.estimatedWithdrawAmt = lodash.isNil(
                newData?.partialWithdrawal?.requestTotalPerc
              )
                ? newData?.partialWithdrawal?.requestTotalAmount
                : (Number(newData?.partialWithdrawal?.requestTotalPerc || 0) *
                    Number(newData?.partialWithdrawal?.totalAccountValue || 0)) /
                  100;

              newData.partialWithdrawal.totalAmount =
                newData?.partialWithdrawal?.estimatedWithdrawAmt;
            }
          }
          if (item?.partialWithdrawal?.withdrawalLevel === OptionEnum.FundLevel) {
            newData.partialWithdrawal.estimatedWithdrawAmt = lodash.sum(
              newData?.partialWithdrawal?.partialWithdrawalFundList
                ?.filter((fundItem) => fundItem.premiumType === PremiumTypeEnum.BOTH)
                ?.map((fundItem) => fundItem?.withdrawalAmt || 0)
            );
          }
        }
        if (lodash.hasIn(item, 'fundSwitching') && !lodash.isEmpty(item?.fundSwitching)) {
          newData.fundSwitching = {
            ...item.fundSwitching,
            fundSwitchingFundList: item?.fundSwitching?.fundSwitchingFundList?.map(
              (fundSwitchItem, index) => ({
                ...fundSwitchItem,
                orderNo: index,
              })
            ),
          };
        }

        if (lodash.hasIn(item, 'fundAllocation') && !lodash.isEmpty(item?.fundAllocation)) {
          newData.fundAllocation = {
            ...item.fundAllocation,
            fundAllocationFundList: item?.fundAllocation?.fundAllocationFundList?.map(
              (fundAllocationFundItem, index) => ({
                ...fundAllocationFundItem,
                orderNo: index,
              })
            ),
          };
        }

        if (lodash.hasIn(item, 'contactInfo')) {
          let newObj = {};
          if (!lodash.isEmpty(item?.contactInfo)) {
            lodash
              .keys(item?.contactInfo)
              .filter((key) => /applyto.+/gi.test(key))
              .forEach((key) => {
                delete item.contactInfo[key];
              });
            newObj = item.contactInfo?.applyTo?.reduce((r, c) => {
              r[c] = 'Y';
              return r;
            }, {});
            newData.contactInfo = {
              ...item.contactInfo,
              ...newObj,
            };
          }
        }

        if (lodash.hasIn(item, 'policyAddr')) {
          if (!lodash.isEmpty(item?.policyAddr)) {
            const otherData = {};
            lodash
              .keys(item?.policyAddr)
              .filter((key) => /applyto.+/gi.test(key))
              .forEach((key) => {
                delete item.policyAddr[key];
              });
            const newObj = item.policyAddr?.applyTo?.reduce((r, c) => {
              r[c] = 'Y';
              return r;
            }, {});

            // if (tenant.isPH()) {
            //   otherData.countryCode = item.policyAddr?.addressLine5;
            // }

            newData.policyAddr = {
              ...item.policyAddr,
              ...newObj,
              ...otherData,
            };
          }
        }

        if (lodash.hasIn(item, 'refund') && !lodash.isEmpty(item?.refund)) {
          newData.refund = {
            ...item.refund,
            totalRefundAmount: lodash.sum(
              item.refund?.refundAccountList?.map((childItem) =>
                Number(formUtils.queryValue(childItem.refundAmount) || 0)
              )
            ),
          };
        }
        if (
          item?.transactionTypeCode === 'SRV015' &&
          formUtils.queryValue(item.changeIcp?.icpOption) === OptionEnum.ACOM &&
          !isSave
        ) {
          newData.paymentMethodList = null;
        }

        if (item?.transactionTypeCode === 'SRV046') {
          newData.specimenSignatureChange = {};
        }
        if (item?.transactionTypeCode === 'SRV002') {
          const policyInfoList = claimData?.policyInfo?.applyToPolicyInfoList || [];
          const mainPolicyId = claimData?.mainPolicyId;
          const currentCode = policyInfoList.find(
            (item: any) => item.policyId === mainPolicyId
          )?.billingFrequency;
          const paymentModeMapping = {
            '00': 'S',
            '01': 'A',
            '02': 'H',
            '04': 'Q',
            '12': 'M',
            S: 'S',
            A: 'A',
            H: 'H',
            Q: 'Q',
            M: 'M',
          };
          if (mainPolicyId && currentCode) {
            newData.paymentMode = {
              ...item.paymentMode,
              currentPaymentMode: paymentModeMapping[currentCode],
            };
          }
        }

        if (item?.transactionTypeCode === 'SRV019') {
          if (item.lapseDate) {
            lodash.set(claimData, 'policyInfo.policyInfoList[0].lapseDate', item.lapseDate);

            delete item.lapseDate;
          }

          if (item.lapseDuration) {
            lodash.set(claimData, 'policyInfo.policyInfoList[0].lapseDuration', item.lapseDuration);

            delete item.lapseDuration;
          }
        }

        return {
          ...item,
          applyToPolicyBOList: item.applyToPolicyBOList?.filter((boList) => boList),
          ...newData,
        };
      }) || [];
  }

  if (lodash.isEmpty(claimData)) {
    return {};
  }

  return {
    ...claimData,
    taskId,
    taskNotEditable,
    activityKey: taskDefKey,
    processInstanceId,
    assessmentType,
  };
}
