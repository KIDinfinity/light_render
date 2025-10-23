enum editFlag {
  // 自动创建成功，不可编辑
  normal = '00',
  // 自动创建失败，可编辑
  bussinessError = '02',
  // 手动创建，可编辑
  editable = '01',
}

export default editFlag;
