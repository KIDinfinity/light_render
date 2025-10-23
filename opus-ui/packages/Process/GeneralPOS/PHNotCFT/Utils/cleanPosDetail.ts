import lodash from 'lodash'

const cleanObjKey = ['usTaxInformation', 'uwInformation', 'updateTrack', 'partialWithdrawal']

export default (data: any) => {
  if(typeof data !== 'object')
    return data;
  const result = {...data}
  cleanObjKey.filter(key => {
    const objToClean = data[key]
    if(!objToClean || typeof objToClean !== 'object')
      return false;
    const nonEmptyFields = Object.values(objToClean).filter(val => !lodash.isNil(val));
    if(!nonEmptyFields.length) {
      result[key] = null
    }
  })
  return result;
}
