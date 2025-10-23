---
tag: components/DescriptionList
order: 0
title: 基本
---

## zh-CN

基本描述列表。

## en-US

Basic DescriptionList.

````jsx
import React from 'react';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';

const { Description } = DescriptionList;

export default () => (
  <DescriptionList size="large" title="title">
    <Description term="Firefox">
      A free, open source, cross-platform,
      graphical web browser developed by the
      Mozilla Corporation and hundreds of
      volunteers.
    </Description>
    <Description term="Firefox">
      A free, open source, cross-platform,
      graphical web browser developed by the
      Mozilla Corporation and hundreds of
      volunteers.
    </Description>
    <Description term="Firefox">
      A free, open source, cross-platform,
      graphical web browser developed by the
      Mozilla Corporation and hundreds of
      volunteers.
    </Description>
  </DescriptionList>
)
````
