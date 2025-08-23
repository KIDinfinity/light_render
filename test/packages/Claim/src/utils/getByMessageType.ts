import lodash from 'lodash';
import { getByMessageId } from '@/services/miscMessageLevelControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';


export default (messageId: string, type: string) => {

    getByMessageId(objectToFormData({ messageId }), {}).then((response) => {
        if (
            lodash.isPlainObject(response) &&
            response?.success &&
            !lodash.isEmpty(response.resultData)
        ) {
            return response.resultData;
        }
        return type;
    })

}
