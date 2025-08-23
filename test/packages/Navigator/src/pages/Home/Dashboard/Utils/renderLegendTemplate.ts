const renderContainerTpl = ({ totalPages, containerId, px2rem }) => {
  const showPagination = totalPages > 1;
  return `
    <div class="g2-legend" style="position:absolute;top:20px;right:60px;width:100px;">
      <h4 class="g2-legend-title"></h4>
      <div class="g2-legend-list-wrapper" style="overflow: hidden;position: relative;flex: 1; height: ${px2rem(36)}; margin-top:${showPagination ? '0' : px2rem(-8)}">
        <ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;height:100%; display: flex;align-items: stretch; gap: ${px2rem(showPagination ? 18 : 24)}; "></ul>
      </div>
      ${
        showPagination
          ? `<div style="position: absolute;top:50%; left:-2%; z-index:9999;width: 104%;transform: translate(0, -50%);display: flex;justify-content: space-between;">
                <button class="${containerId}-prev" style="cursor: pointer; border:none; background:none;" ><i aria-label="icon: left" tabindex="-1" class="anticon anticon-left react-app-pages-home-watching-view-card-index-swiperPrevButton"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg></i></button>
                <button class="${containerId}-next" style="cursor: pointer; border:none; background:none;" ><i aria-label="icon: right" tabindex="-1" class="anticon anticon-right react-app-pages-home-watching-view-card-index-swiperNextButton"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg></i></button>
            </div>`
          : ''
      }
    </div>
  `;
};

const renderLegendItemTpl =
  ({ pagedLegends, px2rem, totalPages }) =>
  (value, item, _, index) => {
    const showPagination = totalPages > 1;
    if (!pagedLegends.includes(value)) {
      return `<li class="empty-hidden"></li>`;
    }
    const wrapStyle = showPagination
      ? `word-break:break-word;white-space:normal;`
      : `white-space:nowrap !important;`;

    return (
      `<li class="g2-legend-list-item item-${index}" data-color="{originColor}" data-value="${value}" style="cursor: pointer;font-size: ${px2rem(12)};margin-top:0 !important;justify-content: center;align-items: center;${showPagination && 'width:23%'}">` +
      `<i class="g2-legend-marker" style="width:${px2rem(10)};height:${px2rem(10)};display:inline-block;background-color: ${item};flex-shrink: 0;"></i>` +
      `<span class="g2-legend-text" style="color: #124655;vertical-align: middle;${wrapStyle}">${value}</span></li>`
    );
  };

export default { renderContainerTpl, renderLegendItemTpl };
