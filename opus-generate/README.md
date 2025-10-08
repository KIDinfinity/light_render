# opus-generate

- 提供 api 生成 PDF 文件

## 描述

接口 post 请求
/pdf/generatePDF

请求数据结构

```js
{
  content: String; // html字符串
}
```

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
npm i
npm run dev
open http://localhost:7001/
```

### Deploy

```bash
npm start
npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.

[egg]: https://eggjs.org

### 用 docker 发布需要将字体文件复制到 docker 中

```shell
COPY ./font/* /usr/share/fonts/
```

### TODO

- puppeteer 性能不是很好，可考虑 Chromium pool 优化方法
- 如果遇到性能问题优化后还解决不了，可考虑 html-pdf 库实现转 pdf
