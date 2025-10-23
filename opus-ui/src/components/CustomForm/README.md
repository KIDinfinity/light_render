---
tag: components/CustomForm
title: CustomForm
order: 0
---

```
{
  form,
  params:{
    key 	##必填输入控件唯一标志。支持嵌套式的写法。	string		
    getValueFromEvent	可以把 onChange 的参数（如 event）转化为控件的值	function(..args)	reference	
    initialValue	子节点的初始值，类型、可选值均由子节点决定(注意：由于内部校验时使用 === 判断是否变化，建议使用变量缓存所需设置的值而非直接使用字面量))			
    normalize	转换默认的 value 给控件，一个选择全部的例子	function(value, prevValue, allValues): any	-	
    preserve	boolean	
    rules	 object[]		
    trigger	收集子节点的值的时机	string	'onChange'	
    validateFirst	当某一规则校验不通过时，是否停止剩下的规则的校验	boolean	false	
    validateTrigger	校验子节点值的时机	string|string[]	'onChange'	
    valuePropName	子节点的值的属性，如 Switch 的是 'checked'	string	'value'
    ...
  }
}
```

=> => 

```
 layout: {
    key,
    label,
    description,
  },
  // form.getFieldDecorator参数
  decorator: {
    key,
    getValueFromEvent,
    initialValue,
    normalize,
    preserve,
    rules,
    trigger,
    validateFirst,
    validateTrigger,
    valuePropName,
  },
  // formItem参数
  formItem: {
    style: itemStyle,
    className: itemClassName,
  },
  // ant 组件参数
  options: {
    ...props,
  },
```
