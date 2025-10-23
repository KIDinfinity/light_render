import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
// 1. 完整性校验
// 有一行或以上的Seq字段为空： Seq cannot be null.
// 同一Seq下，有一行或以上Rule Name字段为空： Rule Name cannot be null. Please input same rule name under the same Seq.
// 同一Seq下，有一行或以上Judgement Method字段为空： Judgement Method cannot be null.Please input same rule name under the same Seq.
// 同一Seq下，所有行的When Atom Code, When Operator, When Value都为空： At least one When Condition is required under the same Seq.
// 同一Seq下，所有行的Then Atom Code, Then Operator, Then Value都为空： At least one Then Condition is required under the same Seq.
// 每条配置(每一行），当whenAtomCode，whenOperator，whenValue有任一不为空，且剩下的field存在空： Under the same row, whenAtomCode/whenOperator/whenValue is missing. Please input completely.
// 每条配置(每一行），当thenAtomCode，thenOperator，thenValue有任一不为空。且剩下的field存在空： Under the same row, thenAtomCode/thenOperator/thenValue is missing. Please input completely.

// 2. 其他校验：
// 同一Seq下，Rule Name存在不同： Rule Name cannot be different under one Seq.
// 同一Seq下，有一行或以上Judgement Method字段为空： Judgement Method cannot be different under one Seq.

export default function validateError(list) {
  const error: any[] = [];
  const errorExist = {
    seq: false,
    ruleNameEmpty: false,
    judgementMethodEmpty: false,
    ruleNameDiff: [],
    judgementMethodDiff: [],
  };
  const listSum = {};
  list.forEach((item) => {
    if (!listSum[item?.seq]) {
      listSum[item?.seq] = {
        seq: 0,
        whenMiss: 0,
        thenMiss: 0,
        ruleName: [],
        ruleNameEmpty: [],
        judgementMethod: [],
        judgementMethodEmpty: [],
      };
    }
    if (lodash.isEmpty(item?.seq) && !errorExist.seq) {
      errorExist.seq = true;
      error.push({ content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000699' }) });
    }

    if (lodash.isEmpty(item?.ruleName) && !errorExist.ruleNameEmpty) {
      errorExist.ruleName = true;
      error.push({ content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000700' }) });
    }

    if (lodash.isEmpty(item?.judgementMethod) && !errorExist.judgementMethodEmpty) {
      errorExist.judgementMethodEmpty = true;
      error.push({ content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000701' }) });
    }

    if (
      !(
        (lodash.isEmpty(item?.whenAtomCode) &&
          lodash.isEmpty(item?.whenOperator) &&
          lodash.isEmpty(item?.whenValue)) ||
        (!lodash.isEmpty(item?.whenAtomCode) &&
          !lodash.isEmpty(item?.whenOperator) &&
          !lodash.isEmpty(item?.whenValue))
      ) &&
      !errorExist.whenMiss
    ) {
      errorExist.whenMiss = true;
      error.push({ content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000704' }) });
    }

    if (
      !(
        (lodash.isEmpty(item?.thenAtomCode) &&
          lodash.isEmpty(item?.thenOperator) &&
          lodash.isEmpty(item?.thenValue)) ||
        (!lodash.isEmpty(item?.thenAtomCode) &&
          !lodash.isEmpty(item?.thenOperator) &&
          !lodash.isEmpty(item?.thenValue))
      ) &&
      !errorExist.thenMiss
    ) {
      errorExist.thenMiss = true;
      error.push({ content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000705' }) });
    }

    if (
      lodash.isEmpty(item?.whenAtomCode) &&
      lodash.isEmpty(item?.whenOperator) &&
      lodash.isEmpty(item?.whenValue)
    ) {
      listSum[item?.seq].whenMiss += 1;
    }

    if (
      lodash.isEmpty(item?.thenAtomCode) &&
      lodash.isEmpty(item?.thenOperator) &&
      lodash.isEmpty(item?.thenValue)
    ) {
      listSum[item?.seq].thenMiss += 1;
    }
    listSum[item?.seq].seqSum += 1;
    listSum[item?.seq].seq = item?.seq;
    listSum[item?.seq].ruleName.push(item?.ruleName);
    listSum[item?.seq].judgementMethod.push(item?.judgementMethod);
  });

  Object.values(listSum).forEach((item) => {
    if (item.seqSum === item.whenMiss) {
      error.push({ content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000702' }) });
    }

    if (item.seqSum === item.thenMiss) {
      error.push({ content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000703' }) });
    }

    if (
      !lodash.isEmpty(item.ruleName) &&
      item.ruleName.some((ruleItem) => ruleItem !== item.ruleName[0])
    ) {
      errorExist.ruleNameDiff.push(item.seq);
    }

    if (
      !lodash.isEmpty(item.judgementMethod) &&
      item.judgementMethod.some(
        (judgementMethodItem) => judgementMethodItem !== item.judgementMethod[0]
      )
    ) {
      errorExist.judgementMethodDiff.push(item.seq);
    }
  });

  if (!lodash.isEmpty(errorExist.ruleNameDiff)) {
    error.push({
      content: formatMessageApi(
        { Label_COM_WarningMessage: 'MSG_000706' },
        lodash.uniq(errorExist.ruleNameDiff).join(',')
      ),
    });
  }

  if (!lodash.isEmpty(errorExist.judgementMethodDiff)) {
    error.push({
      content: formatMessageApi(
        { Label_COM_WarningMessage: 'MSG_000707' },
        lodash.uniq(errorExist.judgementMethodDiff).join(',')
      ),
    });
  }

  return error;
}
