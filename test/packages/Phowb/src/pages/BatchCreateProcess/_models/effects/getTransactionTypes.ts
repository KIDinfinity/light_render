import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { listTransactionTypes } from '@/services/posControllerService';
import { findDictionaryByTypeCode } from '@/services/miscDictionaryControllerService';

export default function* (action: any, { call, put }: any) {
  const response = yield call(listTransactionTypes);
  const responseTypeCode = yield call(
    findDictionaryByTypeCode,
    objectToFormData({
      typeCode:'pos_transaction_types'
    })
  )
  let { resultData = [] } = lodash.pick(response, ['resultData']);
  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isArray(response.resultData)
  ) {
    resultData=lodash.chain(resultData).map((res: any)=>{
      const dictList=responseTypeCode.resultData;
      const current=lodash.find(dictList,item=>item?.dictCode===res?.transactionTypeCode);
      if(current){
        return {
          ...res,
          dictCode:res?.transactionTypeCode,
          dictName:res?.transactionTypeName,
          orderNumber:current?.orderNumber
        }
      }
      return res
    }).orderBy(['orderNumber']).value()
  }
  yield put({
    type: 'setTransactionTypes',
    payload: {
      transactionTypes: resultData,
    },
  });
}
