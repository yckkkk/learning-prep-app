import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const Timer = ({ index, isActive, isPaused, time, totalTime }) => {
  const progress = (time / totalTime) * 100;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <Box sx={{ 
      display: 'inline-flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      m: 2, 
      position: 'relative' 
    }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        计时器 {index + 1}
      </Typography>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={80}
          thickness={4}
          color={isActive ? 'primary' : 'secondary'}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${minutes}:${seconds.toString().padStart(2, '0')}`}
          </Typography>
        </Box>
      </Box>
      <Typography variant="caption" sx={{ mt: 1 }}>
        {isActive && !isPaused ? '运行中' : '暂停'}
      </Typography>
    </Box>
  );
};

export default Timer;