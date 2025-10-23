import lodash from 'lodash';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { tableRenderFn } from 'navigator/pages/ReportCenter/_utils/utils';

class Excel {
  canvasCtx: any;

  // 获取字符串长度
  getStrWidth(str: string, fontSize: number = 12): number {
    if (!this.canvasCtx) {
      const canvas = document.createElement('canvas');
      this.canvasCtx = canvas.getContext('2d');
    }
    if (!this.canvasCtx) return 0;
    this.canvasCtx.font = `${fontSize}pt Arial`;
    const cellWidth = this.canvasCtx.measureText(str).width;
    return cellWidth / 8.5 + 2;
  }
}

class Print extends Excel {
  printExcelFn({ worksheetName, headerInfo, bodyInfo, fileName }): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(worksheetName);
    worksheet.columns = lodash.map(headerInfo, (item: any) => ({
      header: item.columnTitle,
      key: item.entityField,
      render: item.render,
    }));
    worksheet.addRows(bodyInfo);
    const cellWidthObj = {};
    worksheet.eachRow({ includeEmpty: true }, (row: any) => {
      row.alignment = { vertical: 'middle', horizontal: 'left' };
      row.eachCell({ includeEmpty: true }, (cell: any) => {
        // eslint-disable-next-line no-underscore-dangle
        const key = lodash.get(cell, '_column.key');
        const cellRow = lodash.get(cell, 'row');
        // 第一行是表头，不需要转换显示形式
        if (cellRow > 1) {
          const render = lodash.get(
            lodash.filter(headerInfo, (item: any) => item.entityField === key),
            '[0].render'
          );
          cell.value = tableRenderFn(render, cell.value);
        }
        const strW = this.getStrWidth(cell.value);
        if (cellWidthObj[key]) {
          cellWidthObj[key].push(strW);
        } else {
          cellWidthObj[key] = [strW];
        }
      });
    });
    worksheet.columns.forEach((item: any, idx: number) => {
      worksheet.getColumn(idx + 1).width = Math.max(...cellWidthObj[item.key]);
    });
    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer]);
      saveAs(blob, `${fileName}.xlsx`);
    });
  }
  printExcelFnSheet({ data, fileName }): void {
    const workbook = new ExcelJS.Workbook();
    data.forEach((item) => {
      try {
        const headerInfo = Object.keys(item?.dataSource?.[0] || {})?.map((key: string) => ({
          columnTitle: key,
          entityField: key,
          render: 'string',
        }));
        const worksheet = workbook.addWorksheet(item.tableName);
        worksheet.columns = lodash.map(headerInfo, (headerItem: any) => ({
          header: headerItem.columnTitle,
          key: headerItem.entityField,
          render: headerItem.render,
        }));
        worksheet.addRows(item?.dataSource);
        const cellWidthObj = {};
        worksheet.eachRow({ includeEmpty: true }, (row: any) => {
          row.alignment = { vertical: 'middle', horizontal: 'left' };
          row.eachCell({ includeEmpty: true }, (cell: any) => {
            // eslint-disable-next-line no-underscore-dangle
            const key = lodash.get(cell, '_column.key');
            const cellRow = lodash.get(cell, 'row');
            // 第一行是表头，不需要转换显示形式
            if (cellRow > 1) {
              const render = lodash.get(
                lodash.filter(headerInfo, (headerItem: any) => headerItem.entityField === key),
                '[0].render'
              );
              cell.value = tableRenderFn(render, cell.value);
            }
            const strW = this.getStrWidth(cell.value);
            if (cellWidthObj[key]) {
              cellWidthObj[key].push(strW);
            } else {
              cellWidthObj[key] = [strW];
            }
          });
        });
        worksheet.columns.forEach((item: any, idx: number) => {
          worksheet.getColumn(idx + 1).width = Math.max(...cellWidthObj[item.key]);
        });
      } catch (error) {}
    });

    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer]);
      saveAs(blob, `${fileName}.xlsx`);
    });
  }
}

export { Print };
