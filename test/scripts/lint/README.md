# git hook

## pre commit stage

1. prettier format .ts & .tsx 文件
2. stylelint validate & format .less 文件
3. eslint 校验 .ts .tsx 文件

## difference

1. 不再需要 `lint-staged` 包
2. 为了 `eslint` 校验不内存溢出提高了上限
3. `prettier` 的解析配置只针对 `.ts` &  `.tsx` 文件，所以不再对其他文件进行format, 因为本来也没有效果

## TODO

* 增加生产构建校验脚本, 第一步先不 block 但输出校验结果
* 增加  blame 脚本，根据 git history 找出没通过校验行数是谁写的并做两件事，建立待fix的code的列表， 一个是给对应开发者发邮件

\n
