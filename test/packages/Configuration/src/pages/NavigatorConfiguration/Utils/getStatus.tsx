import React from 'react';
import { Icon } from 'antd';
import { ReactComponent as modifyingSvg } from 'navigator/assets/configuration/modifying.svg';
import { ReactComponent as underAuditSvg } from 'navigator/assets/configuration/under_audit.svg';
import { ReactComponent as toBeUpdatedSvg } from 'navigator/assets/configuration/to_be_updated.svg';
import { Status } from '../Enum';

const StatusMap = {
  [Status.modifying]: <Icon component={modifyingSvg} />,
  // [Status.update]: <Icon component={modifyingSvg} />,
  [Status.to_be_updated]: <Icon component={toBeUpdatedSvg} />,
  [Status.locked]: <Icon type="lock" />,
  [Status.underAuditEditor]: <Icon component={underAuditSvg} />,
  [Status.underAuditApprover]: <Icon component={underAuditSvg} />,
};

export default ({ cc_latest_status }: any) => {
  return StatusMap[cc_latest_status] || '';
};
