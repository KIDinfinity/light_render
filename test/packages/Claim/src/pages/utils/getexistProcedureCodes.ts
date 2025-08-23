import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
 
export function getexistProcedureCodes(procedureListMap: any ){
    return lodash.map(procedureListMap,(item) => formUtils.queryValue(item.procedureCode))
}
export default getexistProcedureCodes;