/**
 *1	未提交数据配置任务	修改保存退出	数据状态为Modifying
                        未修改保存退出	数据状态为Modifying

  2	提交了数据配置任务	需要审核	数据状态为Under audit
                      不需要审核，未到生效日	数据状态为To be updated
                      不需要审核，已到生效日	数据状态为To be updated

  3	提交了审核配置任务	未到生效日	数据状态为To be updated
                      已到生效日	数据状态为Actived

  4	Reject了审核配置任务	Reject了审核配置任务	数据状态为Modifying
 */

enum Status {
  modifying = 'modifying',
  actived = 'actived',
  under_audit = 'underAudit',
  to_be_updated = 'to_be_updated',
  add = 'add',
  update = 'update',
  delete = 'delete',
  rejected = 'rejected',
  update_fail = 'update_fail',
  locked = 'locked',
  underAuditEditor = 'underAuditEditor',
  underAuditApprover = 'underAuditApprover',
}

export default Status;
