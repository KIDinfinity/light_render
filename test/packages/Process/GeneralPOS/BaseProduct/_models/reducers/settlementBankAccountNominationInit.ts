/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { OptionEnum } from 'process/GeneralPOS/common/Enum';
import moment from 'moment';

const onlyKeyFn = (data) => {
  return `${data?.bankCode}${data?.bankAccountNo}${data?.bankAccountName}${moment(
    data?.currentFrom
  ).format('YYYY-MM-DD')}${moment(data?.currentTo).format('YYYY-MM-DD')}${data?.bankNewAdd}`;
};

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, isDcOMNE } = payload;

    // 这个只有btr的场景，所有代码都围绕btr的场景进行初始化
    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;
    const mainPolicyId = draftState.processData?.mainPolicyId;
    const payoutPaymentMethod = OptionEnum.BTR;
    if (!lodash.isArray(lodash.get(draftState, `${transactionPath}.paymentMethodList`))) {
      lodash.set(draftState, `${transactionPath}.paymentMethodList`, []);
    }
    if (payoutPaymentMethod) {
      lodash.set(draftState, `${transactionPath}.defaultPayoutPaymentMethod`, payoutPaymentMethod);
    }

    const originClientBankAccountList = lodash
      .chain(draftState.processData?.policyInfo?.clientBankAccountList)
      ?.filter(
        (item) =>
          !lodash.isEmpty(item.bankAccountNo) &&
          !lodash.isEmpty(item.clientId) &&
          !lodash.isEmpty(state?.processData?.policyInfo?.mainOwnerClientId) &&
          item?.clientId === state?.processData?.policyInfo?.mainOwnerClientId &&
          item?.bankNewAdd !== 'Y' &&
          item?.typeOfAccount === 'DC'
      )
      ?.reduce((res, i) => {
        if (i.preferPaymentFlow == 'O' && i.policyId == mainPolicyId) {
          i.isDefaultPayoutBank = true;
          res.unshift(i);
        } else {
          res.push(i);
        }
        return res;
      }, [])
      ?.map((bankItem, itemIndex) => ({
        ...bankItem,
        bankNewAdd: 'N',
        selected: itemIndex === 0 ? true : false,
        onlyKey: onlyKeyFn(bankItem),
      }))
      ?.uniqBy('onlyKey')
      .value();

    const paymentMethodList = lodash.get(draftState, `${transactionPath}.paymentMethodList`, []);
    if (
      !lodash.isEmpty(paymentMethodList) &&
      lodash.isEmpty(paymentMethodList?.[0]?.payoutOption)
    ) {
      lodash.set(
        draftState,
        `${transactionPath}.paymentMethodList[0].payoutOption`,
        payoutPaymentMethod
      );
    }

    // 初始化没值
    if (lodash.isEmpty(paymentMethodList)) {
      const initData: any = {
        payoutOption: payoutPaymentMethod,
      };

      initData.txPmBankList = !lodash.isEmpty(originClientBankAccountList)
        ? originClientBankAccountList.map((item, index) => ({
            ...item,
            bankNewAdd: 'N',
            selected: index === 0 ? true : false,
          }))
        : [];

      lodash.set(draftState, `${transactionPath}.paymentMethodList`, [initData]);
    } else {
      const txPmBankList = paymentMethodList?.[0]?.txPmBankList || [];
      const originClientBankCodes = originClientBankAccountList.map((item) => onlyKeyFn(item));

      // 如果存在选中的值是originClientBankAccountList存在的并且只有一条paymentMethodList，
      // 说明submit的时候选中那条数据是在origin种的，只需要给选中的添加select属性
      const newAccountList = originClientBankAccountList.map((item, index) => {
        const paymentItem = txPmBankList.find((paymentItem) => {
          const cleanData = formUtils.cleanValidateData(paymentItem);
          return (
            (txPmBankList?.length > 1 ? cleanData?.selected : true) &&
            onlyKeyFn(cleanData) === onlyKeyFn(item)
          );
        });
        return {
          ...(paymentItem ? paymentItem : item),
          preferPaymentFlow: item.preferPaymentFlow,
          isDefaultPayoutBank: item.isDefaultPayoutBank,
          bankNewAdd: 'N',
          selected: paymentItem || (lodash.isEmpty(txPmBankList) && index === 0) ? true : false,
        };
      });

      // 在submit的时候，paymentMethodList的值并不存在于origin,
      // 是新添加的值，就需要和origin的值拼接在一起展示
      // save的时候ba要求 仍然保留用户添加的bank,所以我们可以拿到存snapshot时候，用户选中的那个
      const filterTxPmBankList = txPmBankList.filter((paymentItem) => {
        const cleanData = formUtils.cleanValidateData(paymentItem);
        return !originClientBankCodes.includes(onlyKeyFn(cleanData));
      });

      let newPaymentMethodList = filterTxPmBankList;
      //save 的情况下，paymentMethodList 是可能大于1的
      if (txPmBankList.length <= 1) {
        // submit 的情况下，paymentMethodList 的长度固定为1
        //如果过滤后的list长度为0，说明选中的是origin的list
        //如果过滤后的长度为1，说明选中的是添加的list
        newPaymentMethodList = filterTxPmBankList.map((paymentItem) => ({
          ...paymentItem,
          bankNewAdd: 'Y',
          selected: true,
        }));
      }

      lodash.set(draftState, `${transactionPath}.paymentMethodList[0].txPmBankList`, [
        ...newAccountList,
        ...newPaymentMethodList,
      ]);
    }
  });
