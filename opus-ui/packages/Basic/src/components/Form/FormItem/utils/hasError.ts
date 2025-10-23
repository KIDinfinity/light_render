import { hasSomeTypeMessage } from '@/utils/medicalSearch';
import { MessageType } from 'claim/enum/medicalSearchMessageType';

export default (warningMessage: any, taskNotEditable?: any) => hasSomeTypeMessage({ warningMessage, messageType: MessageType.Error, taskNotEditable })
