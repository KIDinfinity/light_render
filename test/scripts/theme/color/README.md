# 颜色收集脚本

## 写法转换

### rgba 透明度转 百分比

* rgb(number, number, number) -> #xxxxxx
* rgba(number, number, number, 0.x) -> rgba(number, number, number, x0%);

## 颜色区域划分

基于antd 的划分区域

## 颜色收集

将系统中不是变量的颜色收集起来，按系统规范自动做文件命名

### 颜色命名的约定

rule: 距离最近的css标准颜色-和距离最近的css标准颜色的距离

----
参考： [color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value)
## 变量替换

将系统中 hardcode 的颜色值替换成，收集回来的变量

## 近似色值统一

### 怎么计算颜色的是否相近？

欧几里得距离公式

### 距离多少的时候人眼能感知到

> 7.8 是一个最小可辨识的色差均值

> 当颜色的感知距离大于等于 30 的时候，是个易识别的距离均值。

----

参考： [数据可视化设计体系中的搭建（下）](https://zhuanlan.zhihu.com/p/70121039)
\n
