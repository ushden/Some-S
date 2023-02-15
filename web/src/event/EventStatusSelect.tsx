import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import {eventStatuses} from "../constants";

interface IEventStatusSelect {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

export const EventStatusSelect = ({value, onChange}: IEventStatusSelect): JSX.Element => (
  <FormControl fullWidth margin='dense'>
    <InputLabel id='status-select-label'>Майстри</InputLabel>
    <Select labelId='status-select-label' id='masters-select' value={value} onChange={onChange}>
      {eventStatuses.map(status => (
        <MenuItem value={status} key={status}>
          {status}
        </MenuItem>
      ))}
    </Select>
    <FormHelperText>Ви можете змінити статус запису, клієнт буде автоматично проінформований</FormHelperText>
  </FormControl>
);
