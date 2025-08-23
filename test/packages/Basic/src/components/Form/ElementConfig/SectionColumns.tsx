import React from 'react';
import lodash from 'lodash';
import { Row, Col } from 'antd';
import classnames from 'classnames';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { safeParseUtil } from '@/utils/utils';
import Label from '@/components/ErrorTooltip/Label';
import ShowHideButton from '../FormLayout/ShowHideButton';
import { Visible, Required } from '../constants';
import styles from './SectionColumns.less';

const Columns = ({
  config,
  layoutName,
  section,
  render = {},
  expand = false,
  showArrow,
  onArrow,
  hasMarginRight,
}: any) => {
  const getLayout = ({ fieldConfig, layoutName }: any) => {
    const defaultLayout = fieldConfig?.[layoutName || 'x-layout'] || {};
    if (!lodash.isEmpty(layoutName)) {
      return lodash.find(fieldConfig?.layouts, { layoutName })?.layout || defaultLayout;
    }
    return defaultLayout;
  };

  const fields: any = lodash.reduce(
    config,
    (fieldMap: any, item: any) => {
      const fieldProps = lodash.isPlainObject(item?.['field-props'])
        ? item?.['field-props']
        : safeParseUtil(item?.['field-props'], {});
      const field = item?.field;
      const mergeConfig = lodash.isPlainObject(render?.[field]) ? render?.[field] : {};

      const newProps = {
        ...fieldProps,
        ...mergeConfig,
      };

      if (
        section &&
        item.section?.toLowerCase() === section?.toLowerCase() &&
        field &&
        newProps?.visible === Visible.Yes
      ) {
        const layout = getLayout({ fieldConfig: newProps, layoutName });

        return {
          ...fieldMap,
          [field]: {
            field,
            layout,
            render: newProps?.render,
            label: newProps?.label,
            required: newProps?.required === Required.Yes,
            extra: newProps?.extra,
          },
        };
      }
      return fieldMap;
    },
    {}
  );

  const toggleExpand = () => {
    if (onArrow) {
      onArrow();
    }
  };

  return (
    <div className={styles.columns}>
      <Row
        type="flex"
        gutter={16}
        className={classnames({
          [styles.sectionColumns]: true,
          [styles.marginRight]: hasMarginRight,
        })}
      >
        {lodash
          .values(fields)
          .map(({ layout, field, label, required, render: renderProps, extra }: any) => (
            <Col {...layout} key={field} className={styles.col}>
              {renderProps && lodash.isFunction(renderProps) ? (
                renderProps()
              ) : (
                <div
                  className={classnames(
                    {
                      [styles.columnsItem]: true,
                    },
                    styles.label
                  )}
                >
                  <span className={classnames({ [styles.required]: required })}>
                    <Label labelId={label?.dictCode} labelTypeCode={label.dictTypeCode} />
                  </span>
                  {extra}
                </div>
              )}
            </Col>
          ))}
      </Row>
      {showArrow && <ShowHideButton show={expand} onChange={toggleExpand} newButtonStyle />}
    </div>
  );
};

const SectionColumns = ({
  section,
  render,
  layoutName,
  config: localConfig,
  defaultExpand = false,
  showArrow,
  toggleArrow,
  onArrow,
  expand,
  hasMarginRight = false,
}: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <Columns
      config={config}
      section={section}
      render={render}
      layoutName={layoutName}
      showArrow={showArrow}
      defaultExpand={defaultExpand}
      toggleArrow={toggleArrow}
      onArrow={onArrow}
      expand={expand}
      hasMarginRight={hasMarginRight}
    />
  );
};

export default SectionColumns;
