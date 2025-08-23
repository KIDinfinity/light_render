import React from 'react';
import {v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import Title from '../Title';
import getRender from './getRender';
import { TypeCode, Type } from '../../../../Enum';

export default ({
  options = [],
  key,
  allRuleAtoms,
  atomInputInfo,
  ruleAtomModule,
  booleanArray,
  type,
  dataSource,
}) => {
  const standaloneColumns = lodash
    .chain(options)
    .filter((el) => el.standalone)
    .map((item) => ({
      title: (
        <Title
          labelId={item.atomCode}
          type={TypeCode.AtomCode}
          defaultName={item?.formatName || item?.atomName}
        />
      ),
      width: 200,
      render: (text, record) => {
        return getRender({
          record,
          key,
          type,
          atomCode: item.atomCode,
          match: true,
          allRuleAtoms,
          atomInputInfo,
          ruleAtomModule,
          booleanArray,
        });
      },
    }))
    .value();

  const hasOhterColumns = lodash
    .chain(dataSource)
    .some((el) => {
      const standaloneAtom = lodash
        .chain(options)
        .filter((item) => item.standalone)
        .map((item) => item.atomCode)
        .value();

      return (
        standaloneAtom?.length &&
        lodash.some(el[key], (data) => !lodash.includes(standaloneAtom, data.atomCode))
      );
    })
    .value();
  if (standaloneColumns.length && hasOhterColumns) {
    standaloneColumns.push({
      width: 200,
      title: (
        <Title
          labelId={`venus_claim.ruleEngine.label.${
            type === Type.BasicRule ? 'otherConditions' : 'otherResults'
          }`}
        />
      ),
      render: (text, record) => {
        return getRender({
          record,
          key,
          match: false,
          options,
          allRuleAtoms,
          atomInputInfo,
          ruleAtomModule,
          booleanArray,
          type,
        });
      },
    });
  }

  return standaloneColumns?.length
    ? lodash.map(standaloneColumns, (item, index) => {
        const firstClassName = index === 0 ? 'firstColumns' : '';
        const lastClassName = index === standaloneColumns?.length - 1 ? 'lastColumns' : '';

        return {
          ...item,
          key: item.key || uuidv4(),
          className: `${firstClassName} ${lastClassName}`,
        };
      })
    : null;
};
