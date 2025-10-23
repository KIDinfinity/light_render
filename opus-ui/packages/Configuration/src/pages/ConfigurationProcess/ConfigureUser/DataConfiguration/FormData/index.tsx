import React from 'react';
import { Save } from 'configuration/components/Operators';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import User from './User';
import UserGroup from './UserGroup';
import Section from './Section';

const FormData = ({ isAdd, taskNotEditable, functionData, formData, allGroupInfo }: any) => {
  return (
    <>
      <Section
        title={formatMessageApi({
          Label_COM_General: 'User',
        })}
      >
        <User isAdd={isAdd} taskNotEditable={taskNotEditable} formData={formData} />
      </Section>
      <UserGroup groupData={allGroupInfo} isAdd={isAdd} taskNotEditable={taskNotEditable} formData={formData} />
      {isAdd && <Save taskNotEditable={taskNotEditable} functionData={functionData} type='configureUserController' formData={formData} />}
    </>
  );
};

export default connect(({ configureUserController, claimEditable }: any) => ({
  isAdd: configureUserController.isAdd,
  taskNotEditable: claimEditable.taskNotEditable,
  functionData: configureUserController.functionData,
  formData: configureUserController.formData,
  allGroupInfo: configureUserController.allGroupInfo,
}))(FormData);
