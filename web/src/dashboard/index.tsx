import React, {Fragment} from 'react';
import {WithPermissionsChildrenParams} from "ra-core/src/auth/WithPermissions";
import {Calendar} from "../calendar";

export const Dashboard = (props: WithPermissionsChildrenParams) => {
  const {permissions} = props;

  return (
    <Fragment>
      <Calendar permissions={permissions}/>
    </Fragment>
  );
};