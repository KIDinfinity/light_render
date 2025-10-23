enum EditFlag {
  '01' = '01', // 智能环创建， 可以选policyNo, transactionType
  '02' = '02', // batch create fail， 从bpm取数据
  '00' = '00', // default , 从pos取数据，按businessNo
  '03' = '03', // pending create
}

export default EditFlag;
