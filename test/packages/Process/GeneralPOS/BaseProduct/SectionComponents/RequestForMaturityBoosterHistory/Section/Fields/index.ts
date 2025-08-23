import Eventcode, { fieldConfig as eventCodeConfig } from './Eventcode';

import Occurrencedate, { fieldConfig as occurrenceDateConfig } from './Occurrencedate';

export const localFieldConfigs = [eventCodeConfig, occurrenceDateConfig];
const Fields = {
  Eventcode,

  Occurrencedate,
};

export default Fields;
