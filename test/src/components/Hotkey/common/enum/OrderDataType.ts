/*
 * @Descripttion:
 * @Author: jack_huang
 * @Date: 2019-12-02 15:19:28
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-02 15:30:11
 */
enum OrderDataType {
  /**
   * 树形结构
   */
  Tree = 'tree',

  /**
   * 树形结构 - 第一层 - Module业务
   */
  Module = 'module',
  /**
   * 树形结构 - 第二层 - Section业务
   */
  Section = 'section',
  /**
   * 树形结构 - 第三层 - Field业务 - 一层级的数组结构
   *    --- 可以直接再第一次
   *    --- 按键绑定是固定的了
   */
  Field = 'field',
  /**
   * 回车
   */
  Enter = 'enter',
}

export default OrderDataType;
