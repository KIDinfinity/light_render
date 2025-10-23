import type React from 'react';

declare type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

declare type Gutter = number | Partial<Record<Breakpoint, number>>;

declare const RowAligns: ['top', 'middle', 'bottom', 'stretch'];

declare const RowJustify: ['start', 'end', 'center', 'space-around', 'space-between'];

export declare type ColSpanType = number | string;

export interface ColSize {
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
  xs?: ColSpanType | ColSize;
  sm?: ColSpanType | ColSize;
  md?: ColSpanType | ColSize;
  lg?: ColSpanType | ColSize;
  xl?: ColSpanType | ColSize;
  xxl?: ColSpanType | ColSize;
  prefixCls?: string;
}

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: Gutter | [Gutter, Gutter];
  type?: 'flex';
  align?: typeof RowAligns[number];
  justify?: typeof RowJustify[number];
  prefixCls?: string;
  colProps?: ColProps;
}
