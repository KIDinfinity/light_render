import SubmissionDate, { localFieldConfig as SubmissionDateConfig } from './SubmissionDate';
import SubmissionChannel, {
  localFieldConfig as SubmissionChannelConfig,
} from './SubmissionChannel';

export const localFieldConfigs = [
  SubmissionDateConfig,
  SubmissionChannelConfig,
];

export default {
  SubmissionDate,
  SubmissionChannel,
};
