import formatValue from './formatValue';

interface TooltipContentParams {
  dataFormat: string; // or a more specific type if known
  [key: string]: any;
}

export default ({ dataFormat, ...res }: TooltipContentParams) =>
  (title: any, items: any) => {
    let html = `<div  style='position:absolute;background: rgba(255, 255, 255, 0.95);z-index:2;' class="g2-tooltip"><div class="g2-tooltip-title">${title}</div><ul class="g2-tooltip-list">`;
    items.forEach((item: any) => {
      html += `
            <li class="g2-tooltip-list-item">
            <span class="g2-tooltip-marker" style="background-color:${item.color};"></span>
            <span class="g2-tooltip-name">${item.name}</span>：
            <span class="g2-tooltip-value">${formatValue({ value: item.value, dataFormat, ...res })}</span>
            </li>`;
    });
    html += `</ul></div>`;
    return html;
  };
