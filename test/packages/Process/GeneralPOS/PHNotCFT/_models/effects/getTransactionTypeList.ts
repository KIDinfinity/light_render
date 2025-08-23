import lodash from 'lodash';
import {
  getTransactionTypeByCaseCategory,
  listTransactionTypes,
} from '@/services/posControllerService';
import { findDictionaryByTypeCode } from '@/services/miscDictionaryControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import CaseCategory from 'enum/CaseCategory';
export default function* ({ payload }: any, { call, put }: any) {
  const { caseCategory, posHistory } = payload;

  const response = yield call(
    posHistory || caseCategory === CaseCategory.PH_POS_CTG006
      ? listTransactionTypes
      : getTransactionTypeByCaseCategory,
    { caseCategory }
  );
  const responseTypeCode = yield call(
    findDictionaryByTypeCode,
    objectToFormData({
      typeCode:'pos_transaction_types'
    })
  )
  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    let { resultData = [] } = lodash.pick(response, ['resultData']);
    resultData=lodash.chain(resultData).map((res: any)=>{
      const dictList=responseTypeCode.resultData;
      const current=lodash.find(dictList,item=>item?.dictCode===res?.transactionTypeCode);
      if(current){
        return {
          ...res,
          orderNumber:current?.orderNumber
        }
      }
      return res
    }).orderBy(['orderNumber']).value()
    yield put({
      type: 'saveTransactionTypeList',
      payload: {
        list: resultData,
      },
    });
  }
}
