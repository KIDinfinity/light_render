---
tag: packages/BPM/pages
order: 1
title: BPM模板页
group:
    title: BPM
nav:
    title: packages
---
# BPM模板页

```js
import bpm, { BPM, ClaimEntrance, POSEntrance } from 'bpm/pages/OWBEntrance';
```

## setCommonLife：每个button的action 被调用时的生命周期
action 通用的生命周期钩子 before 和 after 会在每个button的action的前后被调用
```javascript
  bpm.setCommonActionLife({
    before: ({
      dispatch,
      taskDetail,
      claimStates
    }) => {
    },
    after: ({
      dispatch,
      taskDetail,
      claimStates,
      responseCollect,
      isAuto,
      isSuccess,
      buttonCode,
      buttonList
    }) => {
    
    }
  })
```
## setHeaderTitle：头部标题设置的api
```javascript
bpm.setTitle(
  formatMessageApi({
    activity: taskDetail.taskDefKey,
  })
);
```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/119712/1586591923168-57bebab0-be3c-4c6e-b5d8-d5f30eea2f5d.png#align=left&display=inline&height=143&name=image.png&originHeight=143&originWidth=1433&size=147502&status=done&style=none&width=1433)
## setActionConfig：配置提交的数据
左侧表单action的配置
validate:
一般用于理赔的校验，必须return 一个包含错误的Array
action: 
返回buttonList 后端配置对应所需要的数据


```javascript
bpm.setActionConfig({
  buttonCode: {
    validate: ({ dispatch, taskDetail }) {
      const errors = await dispatch({
      type: 'namespaces/validate'
      })
      return errors
    },
    action: async ({ dispatch, taskDetail, claimStates }) {
      const dataForSubmit = await getDataForSubmit({
      type: 'namespaces/getDataForSubmit'
      })
      return {
        // 对应👇 buttonList 的buttonServiceOrder
   	    1: getDataForSubmit,
      };
    },
    after: ({ dispatch, taskDetail, isAuto }) => {}
  }
})
```


buttonList 对应的字段
```javascript
[{
	buttonCode: 'submit',
  afterHook: 'back',
  activityButtonServiceList: [{
    // 👆对应上面 return 的data
  	buttonServiceOrder: 1,
    buttonServiceUrl: 'api/claim/case/jp/clm/submitClaimAssessment',
    triggerSnapshot: 1,
    // 此处的veriables 会合并入提交的数据里
    buttonParams: "{"taskId":"","variables":{"nextActivity":"JP_CLM_ACT005"}}",
  }]

```


![image.png](https://cdn.nlark.com/yuque/0/2020/png/119712/1586591977773-bb9b7ff8-e76f-470c-b025-760c4adcb645.png#align=left&display=inline&height=823&name=image.png&originHeight=823&originWidth=158&size=43431&status=done&style=none&width=158)


## setCustomizationButtonConfig
```javascript
bpm.setCustomizationButtonConfig([{
  buttonCode: 'image',
  buttonId: 'image',
}])
```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/119712/1586592169319-7044f02a-3241-4b29-aa7c-feeedc585aeb.png#align=left&display=inline&height=689&name=image.png&originHeight=689&originWidth=149&size=34951&status=done&style=none&width=149)
## setHeader：修改母版页头部
使用方式1: 简单设置title 和 value
```javascript
bpm.setHeader({
	1: {
  	title: 'title1',
    value: 'value'
  }
})
```


![image.png](https://cdn.nlark.com/yuque/0/2020/png/119712/1586592284251-20294029-5af2-42ce-bd1a-f428a231de16.png#align=left&display=inline&height=137&name=image.png&originHeight=137&originWidth=1396&size=146935&status=done&style=none&width=1396)
使用方式2： 直接render 内容覆盖


```javascript
bpm.setHeader({
	1: {
    render: () => {
    	return <input />
    }
  }
})
```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/119712/1586591731470-278e105f-4e41-4a6d-962b-e135c493cb1f.png#align=left&display=inline&height=125&name=image.png&originHeight=125&originWidth=1465&size=131301&status=done&style=none&width=1465)
使用方式3:  覆盖title 以外的内容部分


```javascript
bpm.setHeader({
	1: {
  	renderValue: () => {
    	return 'info'
    }
  }
})
```


![image.png](https://cdn.nlark.com/yuque/0/2020/png/119712/1586591800660-d0d24c7d-f09c-4659-ba65-d68e8f6fec1f.png#align=left&display=inline&height=122&name=image.png&originHeight=122&originWidth=1285&size=124713&status=done&style=none&width=1285)
使用方式4: 覆盖整个右侧信息栏


```javascript
bpm.setHeader(<InfoList/>)
```


![image.png](https://cdn.nlark.com/yuque/0/2020/png/119712/1586591562953-a627590f-e390-4586-8763-a77c45871aa6.png#align=left&display=inline&height=176&name=image.png&originHeight=176&originWidth=1472&size=163739&status=done&style=none&width=1472)
## updateErrors 更新错误数量
这个api 是理赔和bpm关联一个比较重要的点，用于更新button上的错误数量
```javascript
const denormalizedData = formatClaimData()
const errors = userMemo(() => {
	const errorsTotal = getTotalErrors();
  // 返回一个包含错误信息的数组
  return errorsTotal;
}, [denormalizedData])
bpm.updateErrors({
	errors
});
```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/119712/1586592377217-a8c95fad-1a4e-4c84-953e-609cc99f8e33.png#align=left&display=inline&height=683&name=image.png&originHeight=683&originWidth=117&size=28325&status=done&style=none&width=117)
