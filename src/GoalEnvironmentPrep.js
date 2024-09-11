import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';

const GoalEnvironmentPrep = ({ setUserGoals, nextStep }) => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [environmentItems, setEnvironmentItems] = useState([
    { id: 1, text: '整理桌面', checked: false },
    { id: 2, text: '调整光线', checked: false },
    { id: 3, text: '准备水和小吃', checked: false },
    { id: 4, text: '安静环境', checked: false },
  ]);

  useEffect(() => {
    updateEnvironmentItems();
    setUserGoals(goals); // 更新 App 组件中的 userGoals
  }, [goals, setUserGoals]);

  const addGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, { id: Date.now(), text: newGoal }]);
      setNewGoal('');
    }
  };

  const updateEnvironmentItems = () => {
    let updatedItems = [...environmentItems];
    if (goals.some(goal => goal.text.toLowerCase().includes('编程')) && 
        !updatedItems.some(item => item.text === '打开开发环境')) {
      updatedItems.push({ id: Date.now(), text: '打开开发环境', checked: false });
    }
    if (goals.some(goal => goal.text.toLowerCase().includes('阅读')) && 
        !updatedItems.some(item => item.text === '准备阅读材料')) {
      updatedItems.push({ id: Date.now() + 1, text: '准备阅读材料', checked: false });
    }
    setEnvironmentItems(updatedItems);
  };

  const toggleEnvironmentItem = (id) => {
    setEnvironmentItems(environmentItems.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh',
      position: 'relative',
      overflow: 'auto',
    }}>
      <Box sx={{ width: '100%', maxWidth: '600px', padding: '20px' }}>
        <Typography variant="h6" gutterBottom>设定学习目标</Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2}}>
          <TextField 
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="输入新目标"
            size="small"
            fullWidth
          />
          <Button onClick={addGoal} variant="contained">添加</Button>
        </Box>
        <ul>
          {goals.map(goal => (
            <li key={goal.id}>{goal.text}</li>
          ))}
        </ul>
        <Typography variant="h6" gutterBottom>环境准备清单</Typography>
        {environmentItems.map(item => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox 
                checked={item.checked}
                onChange={() => toggleEnvironmentItem(item.id)}
              />
            }
            label={item.text}
          />
        ))}
      </Box>
    </Box>
  );
};

export default GoalEnvironmentPrep;