import React from 'react';
import {useTranslate} from 'react-admin';
import Slide from '@mui/material/Slide';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useScrollTrigger from '@mui/material/useScrollTrigger';

interface AddEventButtonProps {
  onClick: () => void;
}

export const AddEventButton = ({onClick}: AddEventButtonProps) => {
  const translate = useTranslate();

  const HideOnScroll = ({children}: {children: React.ReactElement}) => {
    const trigger = useScrollTrigger();

    return (
      <Slide appear={false} direction='down' in={!trigger}>
        {children}
      </Slide>
    );
  };

  return (
    <HideOnScroll>
      <Fab
        variant='extended'
        color='success'
        aria-label='add'
        onClick={onClick}
        style={{position: 'fixed', right: 8, bottom: 8}}
      >
        <AddIcon sx={{mr: 1}} />
        {translate('events.create_event')}
      </Fab>
    </HideOnScroll>
  );
};