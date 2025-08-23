### 功能名称 - 货币精度
#### 用于给数字货币设置精确值和格式
---
### 一:文件说明
 | 文件名 |说明     | 说明     |
 | -------- | -------| -------|
 | getTreeObjectName.ts    |Function\getTreeObjectName.ts |  获取树形结构对象名称 | 
 | AccuracyConfigTool.ts    |Tools\AccuracyConfigTool.ts |  精度配置工具 | 
 | FormateTools.ts    |Tools\FormateTools.ts |  格式化工具 | 

 
 ---


### 二:使用方式
``` bash
# 基础使用(基础的数字组件->FormItemNumber;带前后缀的数字组件->FormItemCurrency) 
import { FormItemNumber, FormItemCurrency } from 'basic/components/Form';
import { getTreeObjectName } from '@/utils/accuracy';

<FormItemNumber
  form={form}
  disabled
  formName="mount"
  objectName={getTreeObjectName({ claimProcessData, claimEntities, id: serviceItemId })}
  labelId="app.navigator.task-detail-of-claim-assessment.label.payable-amount"
  name="fieldOne"
/>

<FormItemCurrency
  form={form}
  disabled
  formName="claimPayableAmount"
  labelId="app.navigator.task-detail-of-claim-assessment.label.claim-payment-amount"
  objectName="claim.claimDecision"
/>

注意:
1. 如果不是扁平化的数据只需传理赔数据datas字段就可以了(eg: objectName={getTreeObjectName({ datas, id: serviceItemId })})
2. 如果树形结构只有一层,不需要传id(eg:objectName="claim.claimDecision")
```

``` bash
# 普通字段的显示和存储(用于不是Form组件的精确度 ) 
import { getDefaultAmount } from '@/utils/accuracy';

/**
  * 处理普通文本的精确值
  * @param objectFileName - 名称
  * @param objectFieldValueType - 额外匹配
*/
getDefaultAmount(value, objectFileName);

```
   
---

### 三:接口传参说明
   
 | 名称 | 类型     |是否必传     |默认值     |说明     |
 | -------- | -------| -------| -------|-------|
 | objectName    | String | 是 | 无 |  匹配路径 | 
 | objectFieldName    | String | 是 | 无 |  匹配filedname | 
 | objectFieldValueType    | String | 否 | 无 |  普通text精确值的处理 | 
 | Function    | Function | 否 | 无 |  获取当前字段在理赔数据的路径 |
 | getTreeObjectName    | Function | 否 | 无 |  获取当前字段在理赔数据的路径 |
  
---

### 四:待实现
1. 每个流程使用的配置key需要有统一的enum配置





