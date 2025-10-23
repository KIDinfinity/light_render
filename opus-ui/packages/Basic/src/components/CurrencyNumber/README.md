---
tag: packages/Basic/components
order: 1
title: 货币控件
group:
    title: Basic
nav:
    title: packages
---

#  货币控件

### 组件名称 - 货币配置
#### 用于给数字添加前缀和后缀货币显示

---
### 全局配置currencyConfig说明
``` bash
# 获取currencyConfig全局配置:
import { SessionStorageTool,StorageKeysEnum } from '@/utils/Caches';
const config = SessionStorageTool.getObj(StorageKeysEnum.CONFIGS) || {}; 
const currencyConfig = config.currencyConfig || [];

# 全局配置例子:
[
    {
    id: '3',
    creator: 'vikki',
    gmtCreate: '2020-08-06T09:49:02.000+0000',
    modifier: 'vikki',
    gmtModified: '2020-08-06T09:49:04.000+0000',
    deleted: 0,
    transId: '1',
    regionCode: 'JPN',
    currencyCode: 'JPY',
    currencyName:'JPY',
    isDefault: 1,
    },
    {
    id: '3',
    creator: 'vikki',
    gmtCreate: '2020-08-06T09:49:02.000+0000',
    modifier: 'vikki',
    gmtModified: '2020-08-06T09:49:04.000+0000',
    deleted: 0,
    transId: '1',
    regionCode: 'JPN',
    currencyCode: 'THB',
    currencyName:'THB',
    isDefault: 0,
    }
]

```

---
### 接口传参说明
   
 | 名称         | 类型    | 是否必传 | 默认值                                        | 说明                                                                                               |
 | ------------ | ------- | -------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------- |
 | currencyCode | String  | 否       | 全局配置currencyConfig中的默认配置(isDefault) | 默认core(请根据全局配置currencyConfig选择指定的请根据全局配置currencyConfig选择指定的currencyName) |
 | hiddenPrefix | Boolean | 否       | false                                         | 是否隐藏前缀货币符号                                                                               |
 | hiddenSuffix | Boolean | 否       | false                                         | 是否隐藏后缀货币名称                                                                               |
 | amount       | String  | 是       | 空                                            | 显示的值                                                                                           |
   
---

### 使用说明
``` bash

# 普通显示:
import CurrencyNumber from 'basic/components/CurrencyNumber';

<CurrencyNumber 
  amount='100'
  currencyCode="THB"
  hiddenPrefix
  hiddenSuffix
>
</CurrencyNumber>

```

### 待实现



