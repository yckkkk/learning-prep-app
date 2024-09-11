import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Paper } from '@mui/material';

const Timer = ({ index, isActive, isPaused, time, totalTime }) => {
  const progress = (time / totalTime) * 100;
  
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', m: 1 }}>
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
        <Typography 
          variant="caption" 
          component="div" 
          color="text.secondary"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {`${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`}
        </Typography>
      </Box>
    </Box>
  );
};

const Bullet = ({ text, index }) => {
  const [position, setPosition] = useState(-100);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        if (prev > window.innerWidth) {
          return -100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <Typography
      variant="body2"
      sx={{
        position: 'absolute',
        whiteSpace: 'nowrap',
        left: `${position}px`,
        top: `${(index * 30) % 100}px`,
        color: 'primary.main',
        zIndex: 1000,
      }}
    >
      {text}
    </Typography>
  );
};

const FinalPreparation = ({ userGoals, encouragements }) => {
  const [duration, setDuration] = useState(30);
  const [timers, setTimers] = useState([]);
  const [activeTimer, setActiveTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const timerCount = Math.ceil(duration / 5);
    const newTimers = Array(timerCount).fill(300);
    setTimers(newTimers);
  }, [duration]);

  useEffect(() => {
    let interval = null;
    if (!isPaused && timers[activeTimer] > 0) {
      interval = setInterval(() => {
        setTimers(prevTimers => {
          const newTimers = [...prevTimers];
          newTimers[activeTimer] -= 1;
          if (newTimers[activeTimer] === 0 && activeTimer < timers.length - 1) {
            setActiveTimer(activeTimer + 1);
          } else if (newTimers[activeTimer] === 0 && activeTimer === timers.length - 1) {
            setIsPaused(true);
            setOpenDialog(true);
          }
          return newTimers;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, timers, activeTimer]);

  const handleDurationChange = (event) => {
    const value = Math.max(5, Math.round(parseInt(event.target.value) / 5) * 5);
    setDuration(value);
  };

  const handleStart = () => setIsPaused(false);
  const handlePause = () => setIsPaused(true);
  const handleReset = () => {
    const newTimers = Array(Math.ceil(duration / 5)).fill(300);
    setTimers(newTimers);
    setActiveTimer(0);
    setIsPaused(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    handleReset();
  };

  const scrollbarStyle = {
    '&::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '10px',
      '&:hover': {
        background: '#555',
      },
    },
  };

  return (
    <Box sx={{
      height: '50vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Box sx={{ 
        flexGrow: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        px: 2,
        ...scrollbarStyle,
      }}>
        <Paper elevation={3} sx={{ p: 2, my: 2, backgroundColor: '#f0f4f8', flexShrink: 0 }}>
          <Typography variant="subtitle1" gutterBottom>
            专注当前任务：
          </Typography>
          <ul style={{ paddingInlineStart: '20px', margin: 0 }}>
            {userGoals.map((goal, index) => (
              <li key={index}>
                <Typography variant="body2">{goal.text}</Typography>
              </li>
            ))}
          </ul>
        </Paper>

        <Box sx={{ mb: 2, flexShrink: 0 }}>
          <Typography gutterBottom>设置学习时长（分钟，5的倍数）：</Typography>
          <TextField
            type="number"
            value={duration}
            onChange={handleDurationChange}
            inputProps={{ min: "5", step: "5" }}
            fullWidth
            disabled={!isPaused}
            size="small"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexShrink: 0 }}>
          <Button onClick={handleStart} disabled={!isPaused} variant="contained" color="primary" size="small">开始</Button>
          <Button onClick={handlePause} disabled={isPaused} variant="contained" color="secondary" size="small">暂停</Button>
          <Button onClick={handleReset} variant="contained" color="warning" size="small">重置</Button>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'nowrap', 
          justifyContent: 'flex-start',
          overflowX: 'auto',
          pb: 2,
          ...scrollbarStyle,
        }}>
          {timers.map((time, index) => (
            <Timer
              key={index}
              index={index}
              isActive={index === activeTimer}
              isPaused={isPaused}
              time={time}
              totalTime={300}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '100px', 
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {encouragements.map((text, index) => (
          <Bullet key={index} text={text} index={index} />
        ))}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>学习时间结束</DialogTitle>
        <DialogContent>
          <Typography>
            恭喜你完成了 {duration} 分钟的学习！希望你达到了预期的学习目标。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">确定</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FinalPreparation;