# RuleEngineFlow

### 前端对接流程图与后端数据
#### 初始化-补后端数据
flowInit.ts =>
* 补StartNode
* 补EndNode
* 补DecisionAddNode(并更新原节点的nodeIdParent)

#### 转换(后端数据转前端数据)
ruleFlowDataTransfer.ts =>
* 转换节点
* 转换边

#### 新增RuleSet => 触发转换
flowAddRuleSet.ts =>
* 新增RuleSetNode
* 更新原来的连线

#### 编辑RuleSet => 触发转换
flowEditRuleSet.ts =>
* 更新字段ruleReferenceId

#### 新增Decision => 触发转换

#### 编辑Decision => 触发转换

#### 流程图操作回调 => 触发转换
flowAfterCommand.ts =>
* 删除
* 生成新边
* 生成JoinNode

#### 后端处理前端数据
