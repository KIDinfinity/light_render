## 通用的solution来监控和显示系统的信息读或未读
---
 ### 组件
 #### 功能
| 模块 | 子模块 |功能 |
| - | - |- |- |
| 首页 | table/card |未读条数 |
| 侧边栏 | Notification |未读条数 |
| 侧边栏 | Information  |未读条数/未读样式  |
| 侧边栏 | Pending|未读条数/未读样式       |
| 侧边栏 |   360 |   未读条数 |
| Document Management |  | 未读样式  |

 #### 入参(props)
| name | type |value |
| - | - |- |- |
| show | boolean |true/false |
| type | string |0:圆圈/1:列表 |


---

### 数据流
#### nameSpace:solutionRead
#### Status 
| 属性 | 类型 |含义 |
| - | - |- |
| informationList | Array | 列表 |
| envoyList | Array | 列表 |
| documentList | Array | 列表 |

#### 请求接口 
| 名称 | 入参数 |含义 |
| - | - |- |- |
| getList | Array | 列表 |
| envoyList | Array | 列表 |
| documentList | Array | 列表 |


presit
doc:claim/task/detail/6985088(JP2231@jp.fwd.com)
sit:POLCSN
envoy/information:claim/task/detail/6972230


information:claim/task/detail/4418554 