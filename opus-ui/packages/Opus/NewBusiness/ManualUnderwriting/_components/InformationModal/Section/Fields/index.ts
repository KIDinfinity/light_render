import Comment, { localFieldConfig as CommentConfig } from './Comment';
import Error, { localFieldConfig as ErrorConfig } from './Error';
import Reason, { localFieldConfig as ReasonConfig } from './Reason';
import TeamOrUser, { localFieldConfig as TeamOrUserConfig } from './TeamOrUser';
import CancelReason, { localFieldConfig as CancelReasonConfig } from './CancelReason';

export const localFieldConfigs = [
  TeamOrUserConfig,
  ReasonConfig,
  CommentConfig,
  ErrorConfig,
  CancelReasonConfig,
];

export default {
  TeamOrUser,
  Reason,
  Comment,
  Error,
  CancelReason,
};
