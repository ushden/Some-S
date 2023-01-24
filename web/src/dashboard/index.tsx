import React from 'react';
import {WithPermissionsChildrenParams} from 'ra-core/src/auth/WithPermissions';
import {Calendar} from '../calendar';
import Box from '@mui/material/Box';

import classes from './dashboard.module.css';

export const Dashboard = (props: WithPermissionsChildrenParams) => {
  const {permissions} = props;

  return (
    <Box className={classes.container}>
      <Calendar permissions={permissions} />
    </Box>
  );
};
