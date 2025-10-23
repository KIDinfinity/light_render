## ElementConfig

### SectionColumns

> * layoutName 同步动态layout
> * render (object) 覆盖field配置

```
  <SectionColumns 
    section={localSectionConfig.section}
    config={localConfig}
    render={render}
    layoutName={layoutName}
  />
```
```
  render = {{
    [field]: {
      label: { ... },
      required: { ... },
      render: () => { ... } // 覆盖渲染， 否则默认按label输出国际化
    }
  }}
```
