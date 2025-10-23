// 用于主题组件样式测试

import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, DatePicker, TimePicker, Checkbox, Table } from 'antd';
import moment from 'moment';
import ChangeTheme from './ChangeTheme';

export default () => {
  const [bg, setBg] = useState('#444');

  return (
    <div style={{ backgroundColor: bg, padding: 100 }}>
      <div style={{ height: '48px' }}>
        <ChangeTheme
          change={() => {
            setBg(bg === '#444' ? '#bfbfbf' : '#444');
          }}
        />
      </div>

      <Form layout="vertical">
        <Form.Item label="Input">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Input" required>
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Input" required>
          <Input placeholder="input placeholder" disabled />
        </Form.Item>
        <Form.Item label="Input" required>
          <Input
            placeholder="input placeholder"
            disabled
            value="0123456789abcdefghijklmnopqrstuvwxyz"
          />
        </Form.Item>

        <Form.Item label="Input.TextArea">
          <Input.TextArea rows={4} placeholder="textarea placeholder" />
        </Form.Item>
        <Form.Item label="Input.TextArea" required>
          <Input.TextArea rows={4} placeholder="textarea placeholder" disabled />
        </Form.Item>
        <Form.Item label="Input.TextArea" required>
          <Input.TextArea
            rows={4}
            placeholder="textarea placeholder"
            disabled
            value="0123456789abcdefghijklmnopqrstuvwxyz"
          />
        </Form.Item>

        <Form.Item label="InputNumber">
          <InputNumber placeholder="input number placeholder" />
        </Form.Item>
        <Form.Item label="InputNumber" required>
          <InputNumber placeholder="input number placeholder" />
        </Form.Item>
        <Form.Item label="InputNumber" required>
          <InputNumber placeholder="input number placeholder" disabled />
        </Form.Item>
        <Form.Item label="InputNumber" required>
          <InputNumber placeholder="input number placeholder" disabled value={1} />
        </Form.Item>

        <Form.Item label="Select">
          <Select>
            <Select.Option value="a">A</Select.Option>
            <Select.Option value="b">B</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Select">
          <Select showSearch>
            <Select.Option value="a">A</Select.Option>
            <Select.Option value="b">B</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Select">
          <Select showSearch allowClear>
            <Select.Option value="a">A</Select.Option>
            <Select.Option value="b">B</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Select">
          <Select></Select>
        </Form.Item>
        <Form.Item label="Select" required>
          <Select allowClear>
            <Select.Option value="a">A</Select.Option>
            <Select.Option value="b">B</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Select" required>
          <Select allowClear disabled>
            <Select.Option value="a">A</Select.Option>
            <Select.Option value="b">B</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Select" required>
          <Select allowClear disabled defaultValue="a">
            <Select.Option value="a">A</Select.Option>
            <Select.Option value="b">B</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Select" required>
          <Select allowClear mode="multiple" defaultValue={['a', 'b']}>
            <Select.Option value="a">
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </Select.Option>
            <Select.Option value="b">
              BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
            </Select.Option>
            <Select.Option value="c">
              CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Select" required>
          <Select allowClear disabled mode="multiple" defaultValue={['a', 'b']}>
            <Select.Option value="a">A</Select.Option>
            <Select.Option value="b">B</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker disabled defaultValue={moment()} />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker defaultValue={moment()} showTime />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker.RangePicker disabled />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker.RangePicker disabled defaultValue={[moment(), moment()]} showTime />
        </Form.Item>
        <Form.Item label="TimePicker">
          <TimePicker />
        </Form.Item>
        <Form.Item label="CheckBox">
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>
        <Form.Item label="CheckBox">
          <Checkbox disabled>Checkbox</Checkbox>
        </Form.Item>
        <Form.Item label="CheckBox">
          <Checkbox disabled checked>
            Checkbox
          </Checkbox>
        </Form.Item>
      </Form>

      <Table
        dataSource={new Array(40).fill(1).map((item, index) => {
          return {
            key: index,
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
          };
        })}
        columns={[
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            sorter: true,
          },
          {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
            sorter: true,
          },
        ]}
        pagination={{ pageSize: 3 }}
      />
    </div>
  );
};
