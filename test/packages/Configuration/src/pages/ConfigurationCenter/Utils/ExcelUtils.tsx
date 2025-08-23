import type { ReactNode } from 'react';
import React from 'react';
import lodash from 'lodash';
import { saveAs } from 'file-saver';
import type { Worksheet, Workbook, Row } from 'exceljs';
import ExcelJS from 'exceljs';
import moment from 'moment';
import { Tag } from 'antd';
import {v5 as uuidv5 } from 'uuid';
import { Format, DownLoadFilter } from './Constant';
import type { DataFieldProps } from './Typings';

class ExcelUtils {
  perWidth: number = 7.5;

  ctx: any;

  operateName: string = '#operation';

  get defaultOperaType() {
    return ['update', 'add', 'delete'];
  }

  get errType() {
    return {
      lose: {
        // '表单没有的字段'
        type: 'lose',
        description: 'required but losed',
      },
      errField: {
        // '必填但丢失',
        type: 'errField',
        description: 'dose not exit in this table',
      },
      errData: {
        type: 'errData',
        description: 'error data',
      },
    };
  }

  get regExpType() {
    return (exp: RegExp, componentType: string = '') => new RegExp(exp).test(componentType);
  }

  // 错误的object对象格式
  get errorObjectFormat() {
    return ['richText', 'hyperlink', 'formula', 'sharedFormula', 'error'];
  }

  getErrorObjectFormat(value: any) {
    let target = this.errorObjectFormat.find((el: string) => lodash.has(value, el));
    if (moment.isDate(value)) {
      target = 'date';
    }
    return target ? `, not ${target}` : '';
  }

  arrayToString(value: any) {
    return lodash.map(value, ({ text }: any) => text).join('');
  }

  // 导入数据格式检验
  get errorFormat() {
    return [
      {
        // 日期格式但不是日期
        requirement: (value: any, componentType: string) =>
          value &&
          this.regExpType(/date/, componentType) &&
          !moment.isDate(value) &&
          lodash.isNaN(Date.parse(value)),
        message: 'error date format',
      },
      {
        // 不是时间类型但是是时间格式
        requirement: (value: any, componentType: string) =>
          value && !this.regExpType(/date/, componentType) && moment.isDate(value),
        message: 'would not be a Date',
      },
      {
        // 是 number 但不是 number
        requirement: (value: any, componentType: string) =>
          value && this.regExpType(/number/, componentType) && !Number(value),
        message: 'error number format',
      },
      {
        // 不是布尔值，但是是布尔值格式
        requirement: (value: any, componentType: string) =>
          !this.regExpType(/boolean/, componentType) && lodash.isBoolean(value),
        message: `would not be a boolean`,
      },
      {
        // 是布尔类型，但不是布尔值
        requirement: (value: any, componentType: string) =>
          this.regExpType(/boolean/, componentType) &&
          value &&
          !lodash.isBoolean(value) &&
          !lodash.includes([0, 1, '0', '1'], value),
        message: 'error boolean format',
      },
      {
        // 是对象格式
        requirement: (value: any) => value && lodash.isObject(value),
        message: (value: any) => `error Object format ${this.getErrorObjectFormat(value)}`,
      },
      {
        // 必填但是空
        requirement: (value: any, componentType: string, required: boolean) =>
          required && (lodash.isNil(value) || value === ''),
        message: () => `required`,
        requiredEmpty: true,
      },
    ];
  }

  // 导出
  handleExport = (
    dataList: any[],
    structure: DataFieldProps[],
    recordOperationType: string[],
    functionName: string
  ) => {
    const workbook = new ExcelJS.Workbook();
    const workSheet = workbook.addWorksheet('dataList');
    const DataRows = this.transferRowData(dataList, structure, recordOperationType[0]);

    workSheet.columns = this.getExcelHeaderByData(DataRows[0], structure, true);
    workSheet.addRows(DataRows);
    this.setHeadAutoSize(workSheet);

    this.setOperaBtnOfList(workSheet, recordOperationType);
    this.setWhereCriteriaOfCell(workSheet, structure);
    this.setHeaderWithCaption(workSheet, structure);

    const structureSheet = workbook.addWorksheet('structure');
    const structureData = this.getSheetDataField(structure);
    structureSheet.columns = this.getExcelHeaderByData(structureData[0], structure);
    structureSheet.addRows(structureData);
    this.setHeadAutoSize(structureSheet);

    this.saveFile(workbook, `${functionName}.xlsx`);
  };

  // 导出模版
  handleExportTemplate = (
    structure: DataFieldProps[],
    recordOperationType: string[],
    functionName: string
  ) => {
    const workbook = new ExcelJS.Workbook();
    const workSheet = workbook.addWorksheet('dataList');
    const DataRows = this.setTemplateDefaultListByStructure(structure, recordOperationType[0]);
    workSheet.columns = this.getExcelHeaderByData(DataRows[0], structure, true);

    workSheet.addRows(DataRows);
    this.setHeadAutoSize(workSheet);
    this.setOperaBtnOfList(workSheet, recordOperationType);
    this.setWhereCriteriaOfCell(workSheet, structure);
    this.setHeaderWithCaption(workSheet, structure);

    const structureSheet = workbook.addWorksheet('structure');
    const structureData = this.getSheetDataField(structure);
    structureSheet.columns = this.getExcelHeaderByData(structureData[0], structure);
    structureSheet.addRows(structureData);
    this.setHeadAutoSize(structureSheet);

    this.saveFile(workbook, `${functionName}.xlsx`);
  };

  // 导入，读取文件
  getFileData = (file: any, dataFieldList: DataFieldProps[]): Promise<Record<string, any>> => {
    const reader = new FileReader();
    const workbook = new ExcelJS.Workbook();

    return new Promise((resolve) => {
      const fileInfoVO = {
        fileName: file.name,
        fileSize: `${Math.floor((file.size / 1000) * 100) / 100} k b`,
        modificationTime: moment(file.lastModified).format('YYYY/MM/DD_hh/mm/ss'),
      };
      try {
        reader.onload = async () => {
          const arrayBuffer: any = reader.result;
          workbook.xlsx.load(arrayBuffer).then((wb: Workbook) => {
            // todo 多个sheet做tab切换
            // wb.worksheets.forEach(sheet => {})
            const excelData = this.getImportExcelData(wb.worksheets[0], dataFieldList);
            resolve({
              fileInfoVO,
              ...excelData,
            });
          });
        };
        reader.readAsArrayBuffer(file);
      } catch (err) {
        // throw 'error';
      }
    });
  };

  // 根据structure获取头部
  getErrorExcelHeaderByStructure = (structure: DataFieldProps[] = []): Record<string, any>[] => {
    const header = lodash.map(structure, (el: any) => ({
      header: el.fieldName,
      key: el.fieldName,
    }));
    return [
      {
        header: this.operateName,
        key: this.operateName,
      },
    ].concat(header);
  };

  // 根据数据获取头部
  getExcelHeaderByData = (
    data: Record<string, any>,
    dataFieldList: DataFieldProps[] = [],
    isColumns: boolean = false
  ): Record<string, any>[] =>
    lodash.map(lodash.keys(data), (el) => {
      const { componentType = '' } =
        lodash.find(dataFieldList, (item) => item.fieldName === el) || {};
      const temp = {
        header: el,
        key: el,
      };
      if (isColumns && new RegExp(/date/).test(componentType)) {
        lodash.set(temp, 'style', { numFmt: Format[componentType] });
      }
      return temp;
    });

  // 下载文件
  saveFile = (workbook: any, filename: string) => {
    if (!workbook || !workbook.xlsx) return;
    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer]);
      saveAs(blob, filename);
    });
  };

  getKeyNamesByStructure = (structure: DataFieldProps[] = []) => {
    return lodash
      .chain(structure)
      .filter((item: any) => !lodash.includes(DownLoadFilter, item.fieldName))
      .map((item: any) => item.fieldName)
      .value();
  };

  // 处理数据增加operation 操作
  // 根据structure过滤dataList key
  // 设置默认操作栏
  transferRowData = (
    dataMap: Record<string, any> = {},
    structure: DataFieldProps[],
    defaultType: string
  ): Record<string, any>[] => {
    const keyNames = this.getKeyNamesByStructure(structure);
    keyNames.unshift(this.operateName);
    const dataList = lodash.values(dataMap) || [];
    if (!dataList || !dataList.length) {
      const defaultObject: any = structure.reduce((res, cur: any) => {
        lodash.set(res, cur.fieldName, '');
        return res;
      }, {});

      dataList.push(defaultObject);
    }

    return lodash.map(dataList, (el) =>
      keyNames.reduce((pre, cur) => {
        if (cur === this.operateName) {
          lodash.set(pre, cur, defaultType);
        } else {
          lodash.set(pre, cur, el[cur]);
        }
        return pre;
      }, {})
    );
  };

  // 处理operation 单元格为下拉
  setOperaBtnOfList = (workSheet: Worksheet, operations: string[]): void => {
    const operationRow = workSheet.getColumn(this.operateName);
    operationRow.eachCell({ includeEmpty: true }, (cell, rowIdx) => {
      if (rowIdx < 2) return;
      // eslint-disable-next-line no-param-reassign
      cell = lodash.assign(cell, {
        font: {
          color: { argb: 'FFe97b1d' },
        },
        dataValidation: {
          type: 'list',
          allowBlank: false, // 非空
          operator: 'between',
          showErrorMessage: true,
          showInputMessage: true,
          formulae: [`"${operations.join(',')}"`],
        },
      });
    });
  };

  // 处理主键列颜色
  setWhereCriteriaOfCell = (workSheet: Worksheet, structure: DataFieldProps[]): void => {
    lodash
      .chain(structure)
      .filter((item: any) => item.whereCriteria)
      .map((el: any) => {
        const keyRow = workSheet.getColumn(el.fieldName);
        keyRow.eachCell((cell: Record<string, any>) => {
          // eslint-disable-next-line no-param-reassign
          cell = lodash.assign(cell, {
            font: {
              color: { argb: '0c99c9a6' },
            },
            note: {
              texts: [
                {
                  font: {
                    color: {
                      argb: 'FFff0000',
                    },
                  },
                  text: 'This colum of field is primary key, normally it should not be changed',
                },
              ],
            },
          });
          return cell;
        });
        return el;
      })
      .value();
  };

  // 设置头部header的介绍
  setHeaderWithCaption = (workSheet: Worksheet, structure: DataFieldProps[]): void => {
    const headerRow = workSheet.getRow(1);
    headerRow.eachCell((cell: Record<string, any>) => {
      const { fieldCaption = '', componentType = 'text', required = false } =
        lodash.find(structure, (el) => el.fieldName === cell.value) || {};
      if (fieldCaption) {
        // eslint-disable-next-line no-param-reassign
        cell = lodash.assign(cell, {
          font: {
            color: { argb: 'e87722' },
          },
          note: {
            texts: [
              {
                font: {
                  color: {
                    argb: 'FFff0000',
                  },
                },
                text: `${fieldCaption} -- type(${componentType}) ${
                  this.regExpType(/date/, componentType)
                    ? ` -- format (${Format[componentType]})`
                    : ''
                } ${required ? `-- required` : ''}`,
              },
            ],
          },
        });
      }
    });
  };

  // 获取datafield的excel头部
  getHeaderByDataField = (list: Record<string, any>[]): string[] =>
    lodash.map(list, (el: any) => el.fieldName);

  // 获取导入的数据
  getImportExcelData = (sheet: Worksheet, dataField: DataFieldProps[] = []) => {
    const rowData: Record<string, any>[] = [];
    let header: string[] = [];
    sheet.eachRow((row: any, rowNumber: number) => {
      const values = row.values.slice(1);
      if (rowNumber === 1) {
        header = values;
      } else {
        rowData.push(lodash.zipObject(header, values));
      }
    });
    const newRowData = this.hanldeRowData(rowData, dataField);
    const errorMessage = this.getErrorMessage(header, dataField, newRowData);
    const columns = lodash.map(header, (item: any) => {
      const newItem = item.split('/')?.[0];
      return {
        title: newItem,
        dataIndex: newItem,
        key: newItem,
        render: (text: any) => this.renderTagsByExcelType(newItem, text, dataField),
      };
    });
    return {
      errorMessage, // 错误信息
      columns, // 表格头
      rowData: newRowData, // 表数据
    };
  };

  // 处理数据转换,过滤空数据
  hanldeRowData = (rowData: Record<string, any>[] = [], dataFieldList: DataFieldProps[]) => {
    const dateMap = dataFieldList
      .filter((el: any) => new RegExp(/date/).test(el.componentType))
      .reduce((res: any, cur: any) => {
        lodash.set(res, cur.fieldName, Format[cur.componentType]);
        return res;
      }, {});
    /**
     * 时间格式进行转换
     * 空值去掉，不是布尔值，空， 不为数字0
     */
    return lodash
      .map(lodash.cloneDeep(rowData), (item) => {
        lodash.mapValues(item, (value: any, key: any) => {
          const { componentType = '', required } =
            lodash.find(dataFieldList, (el) => el.fieldName === key) || {};
          if (dateMap[key] && value) {
            lodash.set(item, key, moment.utc(value).format(dateMap[key]));
          } else if (
            !value &&
            value !== 0 &&
            lodash.isEmpty(value) &&
            !new RegExp(/boolean/).test(componentType) &&
            !lodash.isBoolean(value) &&
            !required
          ) {
            lodash.unset(item, key);
          } else if (value && lodash.isObject(value) && lodash.has(value, 'richText')) {
            lodash.set(item, key, this.arrayToString(lodash.get(value, 'richText')));
          }
        });
        return item;
      })
      .filter((el) => lodash.keys(el).length > 1);
  };

  // 错误检验- 丢失但必须
  getErrorLost = (keys: any, dataFieldList: DataFieldProps[]): any => {
    const newKeys = keys.filter((el: any) => el !== this.operateName);
    const errorMessage = dataFieldList.reduce((arr: any, cur: any) => {
      const isLost = !lodash.includes(newKeys, cur.fieldName) && cur.required;
      if (isLost) {
        arr.push(cur.fieldName);
      }
      return arr;
    }, []);

    return (
      errorMessage.length && {
        list: errorMessage,
        ...this.errType.lose,
      }
    );
  };

  // 错误检验- 字段匹配
  getErrorMatch = (newKeys: any[], dataFieldList: DataFieldProps[]) => {
    const errField = newKeys.filter(
      (item: any) => !lodash.find(dataFieldList, (el: any) => el.fieldName === item)
    );

    const errorMessage = errField.reduce((arr: any, cur: any) => {
      arr.push(cur);
      return arr;
    }, []);

    return (
      errorMessage.length && {
        list: errorMessage,
        ...this.errType.errField,
      }
    );
  };

  // 错误检验- 数据校验
  getErrorData = (rowData: any[], dataFieldList: DataFieldProps[]) => {
    const errorMessage: any[] = [];
    lodash.map(rowData, (item: any, idx: number) => {
      const rows = idx + 2;
      const errors: any[] = [];
      lodash.mapValues(item, (value: any, key: any) => {
        const { componentType = '', required = false } =
          lodash.find(dataFieldList, (el) => el.fieldName === key) || {};
        lodash.map(this.errorFormat, (item) => {
          const { requirement, message, requiredEmpty } = item;
          if (requirement(value, componentType, required)) {
            errors.push({
              field: key,
              message: lodash.isFunction(message) ? message(value) : message,
              requiredEmpty,
            });
          }
          return item;
        });
      });
      if (errors.length) {
        errorMessage.push({
          list: errors,
          rows,
          ...this.errType.errData,
        });
      }
      return item;
    });
    return (
      errorMessage.length && {
        list: errorMessage,
        ...this.errType.errData,
      }
    );
  };

  // 错误校验
  getErrorMessage = (keys: any, dataFieldList: DataFieldProps[], rowData: any[]): any[] => {
    const newKeys = keys.filter((el: any) => el !== this.operateName);

    const lostError = this.getErrorLost(newKeys, dataFieldList);
    const fieldError = this.getErrorMatch(newKeys, dataFieldList);
    const dataError = this.getErrorData(rowData, dataFieldList);

    return lodash.compact([lostError, fieldError, dataError]);
  };

  // 渲染Excel Data
  renderTagsByExcelType = (item: string, text: any, dataFieldList: DataFieldProps[]): ReactNode => {
    const isOperation = item === this.operateName;
    let content = text;
    if (isOperation) {
      if (content === 'add') {
        return <Tag color="#87d068">{content}</Tag>;
      }
      if (content === 'update') {
        return <Tag color="#2db7f5">{content}</Tag>;
      }
      return <Tag color="#f50">{content}</Tag>;
    }

    const { componentType = '' } = lodash.find(dataFieldList, (el) => el.fieldName === item) || {};

    if (new RegExp(/boolean/).test(componentType) && lodash.isBoolean(content)) {
      content = content ? 'true' : 'false';
    }

    return content;
  };

  // 第二栏field介绍
  /**
   *  x               id        name
   * field_name
   * field_caption
   */
  getSheetDataField = (dataField: DataFieldProps[]): Record<string, any>[] => {
    const Header = this.getHeaderByDataField(dataField);
    Header.unshift('x');
    const Field = lodash.map(lodash.keys(dataField[0]), (value) =>
      Header.reduce((pre: any, cur, key: number) => {
        if (cur === 'x') {
          lodash.set(pre, 'x', value);
        } else {
          lodash.set(pre, cur, dataField[key - 1][value]);
        }
        return pre;
      }, {})
    );
    return Field;
  };

  // 设置模版默认数据
  setTemplateDefaultListByStructure = (
    structure: DataFieldProps[],
    defaultType: string,
    num: number = 2
  ): Record<string, any>[] => {
    const keyNames = this.getKeyNamesByStructure(structure);
    keyNames.unshift(this.operateName);
    const defaultObject = keyNames.reduce((pre, cur) => {
      const value = cur === this.operateName ? defaultType : null;
      lodash.set(pre, cur, value);
      return pre;
    }, {});
    const list = new Array(num).fill(null);
    return lodash.map(list, () => defaultObject);
  };

  // 获取每个单元格长度，计算excel最大宽度，设置表头
  setHeadAutoSize = (sheet: Worksheet): any => {
    const MaxColumns: number[] = [];
    sheet.eachRow((row): void => {
      row.eachCell((cell, cellIdx: number): void => {
        if (typeof cell.value === 'string') {
          const cellWidth = this.getStringWidth(cell.font && cell.font.size, cell.value);
          MaxColumns[cellIdx] = Math.max(MaxColumns[cellIdx] || 0, cellWidth);
        }
      });
    });
    lodash.map(sheet.columns, (col, key: number): any => {
      const Idx = key + 1;
      if (MaxColumns[Idx]) {
        lodash.set(col, 'width', MaxColumns[Idx] / this.perWidth + 1);
      }
      return col;
    });
  };

  // 导入数据根据类型转换
  transferExcelDataForImport = (data: Record<string, any>[]) => {
    const newData = lodash.cloneDeep(data);
    return newData.reduce((res, cur, index) => {
      const type = lodash.get(cur, this.operateName);
      const typeList = lodash.get(res, type);
      lodash.unset(cur, this.operateName);
      if (!typeList) {
        lodash.set(res, type, {});
      }
      lodash.set(res, `${type}.${index + 2}`, cur);
      return res;
    }, {});
  };

  // 获取字符串长度
  getStringWidth = (fontSize: number = 11, str: string): number => {
    if (!this.ctx) {
      const Canvas = document.createElement('canvas');
      this.ctx = Canvas.getContext('2d');
    }
    if (!this.ctx) return 0;
    this.ctx.font = `${fontSize}pt Arial`;
    const cellWidth = this.ctx.measureText(str).width;
    return cellWidth;
  };

  // 错误信息提取
  getErrorForResponseImport = (content: string, rowData: Record<string, any>[] = []) => {
    const errList = content.split('(;)');
    lodash.map(errList, (item) => {
      rowData.push({
        row: item.substring(item.lastIndexOf(' ') + 1),
        fieldError: item.match(new RegExp(/(?<=fieldError )(.*?)(?=\(,\))/g)),
        rowError: item.match(new RegExp(/(?<=rowError )(.*?)(?=\(,\))/g)),
      });
      return item;
    });
    const columns = lodash.map(lodash.keys(rowData[0]), (item: any) => ({
      title: item,
      dataIndex: item,
      key: item,
      render: (text: any) => {
        let contentWord = text;
        if (item === 'fieldError' && lodash.isArray(text)) {
          contentWord = lodash.map(text, (el: any, idx: number) => {
            if (lodash.isString(el)) {
              const fieldKey = el.substring(0, el.indexOf(' '));
              const word = el.substring(el.indexOf(' ') + 1);
              return (
                <span key={uuidv5(JSON.stringify(el), uuidv5.URL)} style={{ marginRight: '5px' }}>
                  <Tag color="#f1584d">{fieldKey}</Tag>
                  {word}
                  {idx === text.length - 1 ? '' : ','}
                </span>
              );
            }
            return el;
          });
        }
        return contentWord;
      },
    }));
    return {
      columns,
      rowData,
    };
  };

  // 导出错误信息Excel
  exportErorrExccel = (
    rowData: Record<string, any>[],
    errMsg: Record<string, any>[],
    functionName: string,
    dataFieldList: DataFieldProps[]
  ) => {
    const workbook = new ExcelJS.Workbook();
    const workSheet = workbook.addWorksheet('dataList');
    workSheet.columns = this.getErrorExcelHeaderByStructure(dataFieldList);

    workSheet.addRows(rowData);
    this.setHeadAutoSize(workSheet);
    this.setErrorMessageOfCell(workSheet, errMsg);

    this.setOperaBtnOfList(workSheet, this.defaultOperaType);
    this.setWhereCriteriaOfCell(workSheet, dataFieldList);

    const structureSheet = workbook.addWorksheet('structure');
    const structureData = this.getSheetDataField(dataFieldList);
    structureSheet.columns = this.getExcelHeaderByData(dataFieldList[0], dataFieldList, true);
    structureSheet.addRows(structureData);

    this.saveFile(workbook, `${functionName}-ERROR.xlsx`);
  };

  // 处理Excel错误标志
  setErrorMessageOfCell = (workSheet: Worksheet, errMsg: Record<string, any>[]): void => {
    lodash.map(errMsg, (item: any) => {
      const row = workSheet.getRow(item.row);

      if (item.fieldError && lodash.isArray(item.fieldError)) {
        lodash.map(item.fieldError, (errString: string) => {
          const fieldKey = errString.substring(0, errString.indexOf(' '));
          this.setCellError(workSheet, row, `${fieldKey}`, errString);
          return errString;
        });
      }

      if (item.rowError && lodash.isArray(item.rowError)) {
        const rowErrorMessage = item.rowError.join(',');
        this.setCellError(workSheet, row, 1, rowErrorMessage);
      }
      return item;
    });
  };

  // 设置单元格错误信息
  setCellError = (
    workSheet: Worksheet,
    row: Row,
    fieldKey: string | number,
    content: string = ''
  ) => {
    const cellColumn: any = workSheet.getColumn(fieldKey);
    const cellKey: number = cellColumn.number;
    let cell = row.getCell(cellKey);
    if (cell) {
      cell = lodash.assign(cell, {
        font: {
          color: { argb: 'FFff0000' },
        },
        note: {
          texts: [
            {
              font: {
                color: {
                  argb: 'FFff0000',
                },
              },
              text: content,
            },
          ],
        },
      });
    }
  };
}

export const {
  getExcelHeaderByData,
  saveFile,
  transferRowData,
  setHeadAutoSize,
  setOperaBtnOfList,
  setWhereCriteriaOfCell,
  getImportExcelData,
  getFileData,
  handleExportTemplate,
  handleExport,
  getErrorForResponseImport,
  exportErorrExccel,
  transferExcelDataForImport,
  setTemplateDefaultListByStructure,
  getSheetDataField,
  getErrorMessage,
  hanldeRowData,
} = new ExcelUtils();
