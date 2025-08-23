import Eventcode, { fieldConfig as eventCodeConfig } from './Eventcode';

import Occurrencedate, { fieldConfig as occurrenceDateConfig } from './Occurrencedate';

import Validity, { fieldConfig as validityConfig } from './Validity';

export const localFieldConfigs = [eventCodeConfig, occurrenceDateConfig, validityConfig];
const Fields = {
  Eventcode,

  Occurrencedate,

  Validity,
};

export default Fields;
