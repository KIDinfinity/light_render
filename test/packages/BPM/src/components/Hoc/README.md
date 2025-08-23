---
tag: packages/BPM/components
order: 1
title: BPM 高阶组件
group:
    title: BPM
nav:
    title: packages
---
## BPM 高阶组件

> 将母版页设置360，information，和pending的逻辑解耦出来，根据理赔页的场景按需使用

> BPM 的高阶组件由于使用场景是理赔页，所以默认props 有 `dispatch` 和 `taskDetail`

## 示例

```
import React from 'react';
import { connect } 'dva';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';

@connect()
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
const Claim = class Claim extends React.Component {
  render() {
    return (
      <div> claim </div>
    )
  }
}
export default Claim;
```
