---
tag: components/Tenant
title: Tenant
order: 0
---

# Tenant

## 本地租户配置
```
{
  id: '',
  env: Env.xxx,
  country: Country.xxx,
  language: Language.xxx,
  dateFormat: DateFormate.xxx,
  currency: Currency.xxx,
  loginMode: {
    ssoConfig: {
      isOpenSso: false,
      reloadUrl: '',
    },
    default: {},
  },
}
```

## 使用租户组件功能
```
<Tenant>{children}</Tenant>
```
### 如何请求接口获取到配置信息

## 使用当前租户信息
### UI层获取
```
<Tenant.Spy>
  {(tenant) => <></>}
</Tenant.Spy>
```
### 数据层获取
```
import { tenant, Region } from '@/components/Tenant';

tenant.env()
tenant.loginMode()
tenant.region() 
tenant.region({
  [Region.TH]: any,
  notMatch: any,
})
tenant.dateFormat()
tenant.currencyConfig()

tannat.is()
tenant.isENG()
tenant.isHK()
tenant.isJP()
tenant.isPH()
tenant.isTH()
```
## 改变当前租户
```
tenant.xxx()
```
## 租户(国家)变更

