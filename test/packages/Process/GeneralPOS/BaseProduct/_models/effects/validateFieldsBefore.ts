import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { handleWarnMessageModal, handleMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';

const handleWarning = async (messages: any): Promise<boolean> => {
  return new Promise((resolve) => {
    handleWarnMessageModal(messages, {
      okFn: () => resolve(true),
      cancelFn: () => resolve(false),
    });
  });
};

const showMessageModal = (messageKey: string): void => {
  handleMessageModal([
    {
      content: formatMessageApi({
        Label_COM_WarningMessage: messageKey,
      }),
    },
  ]);
};

const hasReprintIndicatorError = (
  srvCaseIndicatorList: any[],
  transactionTypesMap: any
): boolean => {
  return tenant.region({
    [Region.PH]:
      lodash.some(
        srvCaseIndicatorList,
        ({ indicatorCode, indicatorValue }: any) =>
          indicatorCode === 'reprintIndicator' && indicatorValue === 'F'
      ) &&
      lodash
        .chain(transactionTypesMap)
        .some(
          (item) =>
            item?.transactionTypeCode === 'SRV024' &&
            item?.duplicatePolicy.regenerateContract === 'Y'
        )
        .value(),
    notMatch: false,
  });
};

export default function* validateFieldsBefore(_, { select }: any): Generator<any, any, any> {
  const { posMustReAssess }: any = yield select(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.globalConfig
  ) || {};

  const transactionTypesMap = yield select(({ [NAMESPACE]: modelNamespace }: any) =>
    formUtils.formatFlattenValue(
      formUtils.cleanValidateData(modelNamespace.entities?.transactionTypesMap)
    )
  );

  const {
    cftFlag,
    decision,
    showReAssess: { show = 0, change = 0 } = {},
    srvCaseIndicatorList = [],
  }: any = yield select(({ [NAMESPACE]: modelNamespace }: any) =>
    formUtils.formatFlattenValue(formUtils.cleanValidateData(modelNamespace.processData))
  ) || {};

  // 如果 cftFlag 为 false 或 decision 为 D，直接返回
  if (!(cftFlag ?? true) || decision === DecisionEnum.D) {
    return {};
  }

  // 如果需要重新评估
  if (show && change) {
    const hasConfigError = lodash.some(
      lodash.values(transactionTypesMap) || [],
      ({ transactionTypeCode }) => lodash.includes(posMustReAssess, transactionTypeCode)
    );

    if (hasConfigError) {
      showMessageModal('MSG_001137');
      return false;
    }

    const isContinue = yield handleWarning([
      {
        content: formatMessageApi({
          Label_COM_WarningMessage: 'MSG_001137',
        }),
      },
    ]);

    if (!isContinue) {
      return false;
    }

    if (hasReprintIndicatorError(srvCaseIndicatorList, transactionTypesMap)) {
      showMessageModal('MSG_001135');
      return false;
    }
  }

  return true;
}
