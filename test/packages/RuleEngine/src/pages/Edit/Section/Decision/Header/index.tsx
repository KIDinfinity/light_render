import React, { Component } from 'react';
import FormSection, { FormItemInput } from 'basic/components/Form/FormSection';

class Header extends Component {
  render() {
    const { form, taskNotEditable }: any = this.props;
    return (
      <FormSection
        layConf={{
          name: 4,
          nodeDescription: 20,
        }}
        isMargin={false}
      >
        <FormItemInput
          form={form}
          name="name"
          formName="nodeNameTemp"
          labelId="Decision Name"
          required
          disabled={taskNotEditable}
        />
        <FormItemInput
          form={form}
          name="nodeDescription"
          formName="nodeDescription"
          labelId="Decision Description"
          disabled={taskNotEditable}
        />
      </FormSection>
    );
  }
}

export default Header;
