### 国际化用法

---
#### 获取dictName
   
```
import { formatMessageApi } from '@/utils/dictFormatMessage';

{formatMessageApi({ Label_BIZ_Claim: 'app.navigator.drawer.pending.title' })}
```

---

#### 获取下拉列表
```
import { getDrowDownList } from '@/utils/dictFormatMessage';

// 获取单个下拉(传入单个type_code)
const typeCode1 = getDrowDownList('typeCode1');

// 获取多个下拉(传入多个type_code)
const {typeCode1,typeCode2} = getDrowDownList(['typeCode1','typeCode2']);

// 获取field配置的下拉(field配置)
const dists = getDrowDownList({ config, fieldProps });;
```
---

#### 查找下拉方式
1. 接口查询:misc/dictionary/findDictionaryByTypeCode
2. 代码查询:type: 'dictionaryController/findDictionaryByTypeCodes',

