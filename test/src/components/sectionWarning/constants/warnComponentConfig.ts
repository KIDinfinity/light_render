import { formatMessageApi } from '@/utils/dictFormatMessage';
import TypeEnum from './TypeEnum';

const warnComponentConfig = {
  [TypeEnum.Delete]: {
    icon: 'exclamation',
    message: formatMessageApi({ MSG_COM_General: 'MSG_000421' }),
  },
};

export default warnComponentConfig;
