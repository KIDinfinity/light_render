import React, { PureComponent } from 'react';
import { Popover } from 'antd';
import ErrorTooltip from '@/components/ErrorTooltip';
import type { FormProps, LayoutProps } from '../type';

interface ProverProps {
  form: FormProps;
  params?: LayoutProps;
}
class PopverTips extends PureComponent<ProverProps> {
  render() {
    const { form, params = {}, errors } = this.props;
    return (
      <>
        {params.description ? (
          <Popover content={params.description}>
            <ErrorTooltip
              form={form}
              defaultVisible={true}
              formName={params.key}
              {...params}
              errors={errors}
            />
            {''}
          </Popover>
        ) : (
          <ErrorTooltip
            form={form}
            defaultVisible={true}
            formName={params.key}
            {...params}
            errors={errors}
          />
        )}
      </>
    );
  }
}

export default PopverTips;
