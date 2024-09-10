import React, { useState, useEffect } from 'react';
import { 
  Card, CardContent, CardHeader, 
  Button, Checkbox, TextField, 
  LinearProgress, FormControlLabel,
  Typography, Box, Dialog, DialogTitle, 
  DialogContent, DialogActions
} from '@mui/material';
import { Circle } from 'lucide-react';

// 主应用组件
const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { name: "环境准备与目标设定", component: <GoalEnvironmentPrep /> },
    { name: "深呼吸练习", component: <BreathingExercise /> },
    { name: "正念专注", component: <MindfulnessFocus /> },
    { name: "积极可视化", component: <PositiveVisualization /> },
    { name: "正面自我对话", component: <PositiveSelfTalk /> },
    { name: "最后准备", component: <FinalPreparation /> }
  ];

  useEffect(() => {
    setProgress((currentStep / (steps.length - 1)) * 100);
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>学习准备(爱你靖靖，靖靖一起加油)</Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
      <Card>
        <CardHeader title={steps[currentStep].name} />
        <CardContent>
          {steps[currentStep].component}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={prevStep} disabled={currentStep === 0}>上一步</Button>
            <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
              {currentStep === steps.length - 1 ? "完成" : "下一步"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

// 环境准备与目标设定组件
const GoalEnvironmentPrep = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [environmentItems, setEnvironmentItems] = useState([
    { id: 1, text: '整理桌面', checked: false },
    { id: 2, text: '调整光线', checked: false },
    { id: 3, text: '准备水和小吃', checked: false },
    { id: 4, text: '确保网络连接', checked: false },
  ]);

  useEffect(() => {
    updateEnvironmentItems();
  }, [goals]);

  const addGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, { id: Date.now(), text: newGoal }]);
      setNewGoal('');
    }
  };

  const updateEnvironmentItems = () => {
    let updatedItems = [...environmentItems];
    if (goals.some(goal => goal.text.toLowerCase().includes('编程'))) {
      updatedItems.push({ id: Date.now(), text: '打开开发环境', checked: false });
    }
    if (goals.some(goal => goal.text.toLowerCase().includes('阅读'))) {
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
    <Box>
      <Typography variant="h6" gutterBottom>设定学习目标</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
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
  );
};

// 深呼吸练习组件
const BreathingExercise = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [timer, setTimer] = useState(120); // 2分钟

  useEffect(() => {
    let interval;
    if (isBreathing && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsBreathing(false);
    }
    return () => clearInterval(interval);
  }, [isBreathing, timer]);

  const startBreathing = () => {
    setIsBreathing(true);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Circle 
        style={{ 
          width: 128, 
          height: 128, 
          margin: 'auto',
          animation: isBreathing ? 'pulse 4s infinite' : 'none'
        }}
      />
      <Typography sx={{ mt: 2 }}>深呼吸：吸气5秒，屏息2秒，呼气7秒</Typography>
      <Typography sx={{ mt: 1 }}>
        剩余时间: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}
      </Typography>
      <Button 
        onClick={startBreathing} 
        disabled={isBreathing} 
        variant="contained"
        sx={{ mt: 2 }}
      >
        {isBreathing ? '呼吸中...' : '开始呼吸练习'}
      </Button>
    </Box>
  );
};

// 正念专注组件
const MindfulnessFocus = () => {
  const [timer, setTimer] = useState(180); // 3分钟
  const [isActive, setIsActive] = useState(false);
  const mindfulnessPrompts = [
    "专注于你的呼吸",
    "感受当下的每一刻",
    "让思绪如云般飘过",
    "觉察身体的感觉",
    "以平和的心态接纳一切"
  ];
  const [currentPrompt, setCurrentPrompt] = useState(mindfulnessPrompts[0]);

  useEffect(() => {
    let interval;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
        if (timer % 30 === 0) { // 每30秒更换一次提示
          setCurrentPrompt(mindfulnessPrompts[Math.floor(Math.random() * mindfulnessPrompts.length)]);
        }
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ bgcolor: 'primary.light', p: 2, borderRadius: 1, mb: 2 }}>
        <Typography>{currentPrompt}</Typography>
      </Box>
      <Typography sx={{ mt: 2 }}>
        剩余时间: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}
      </Typography>
      <Button 
        onClick={toggleTimer} 
        variant="contained"
        sx={{ mt: 2 }}
      >
        {isActive ? '暂停' : '开始正念练习'}
      </Button>
    </Box>
  );
};

// 积极可视化组件
const PositiveVisualization = () => {
  const [visualization, setVisualization] = useState('');
  const guidingQuestions = [
    "想象成功完成学习任务后的场景",
    "你会获得什么收获和成就感？",
    "这次学习如何帮助你达成长期目标？"
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>积极可视化</Typography>
      <ul>
        {guidingQuestions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
      <TextField
        multiline
        rows={4}
        fullWidth
        placeholder="描述你想象的成功场景..."
        value={visualization}
        onChange={(e) => setVisualization(e.target.value)}
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

// 正面自我对话组件
const PositiveSelfTalk = () => {
  const [customAffirmation, setCustomAffirmation] = useState('');
  const [affirmations, setAffirmations] = useState([
    "我有能力克服任何学习障碍",
    "每次学习都让我离目标更近一步",
    "我的努力终将带来丰厚的回报"
  ]);

  const addAffirmation = () => {
    if (customAffirmation.trim() !== '') {
      setAffirmations([...affirmations, customAffirmation]);
      setCustomAffirmation('');
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>正面自我对话</Typography>
      <ul>
        {affirmations.map((affirmation, index) => (
          <li key={index}>{affirmation}</li>
        ))}
      </ul>
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <TextField
          fullWidth
          placeholder="添加自定义鼓励语..."
          value={customAffirmation}
          onChange={(e) => setCustomAffirmation(e.target.value)}
          size="small"
        />
        <Button onClick={addAffirmation} variant="contained">添加</Button>
      </Box>
    </Box>
  );
};

// 计时器组件
const Timer = ({ index, isActive, isPaused, time, totalTime }) => {
  const progress = (time / totalTime) * 100;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <Box sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        计时器{index + 1} ({totalTime / 60}分钟)
      </Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          剩余时间: {minutes}:{seconds.toString().padStart(2, '0')}
        </Typography>
        <Typography>
          {isActive && !isPaused ? '运行中' : '暂停'}
        </Typography>
      </Box>
    </Box>
  );
};

// 最后准备组件
const FinalPreparation = () => {
  const [duration, setDuration] = useState(30); // 默认学习时间30分钟
  const [timers, setTimers] = useState([]);
  const [activeTimer, setActiveTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const timerCount = Math.ceil(duration / 5);
    const newTimers = Array(timerCount).fill(300); // 每个计时器固定为5分钟（300秒）
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

  return (
    <Box>
      <Typography variant="h6" gutterBottom>最后准备</Typography>
      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>设置学习时长（分钟，5的倍数）：</Typography>
        <TextField
          type="number"
          value={duration}
          onChange={handleDurationChange}
          inputProps={{ min: "5", step: "5" }}
          fullWidth
          disabled={!isPaused}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button onClick={handleStart} disabled={!isPaused} variant="contained" color="primary">开始</Button>
        <Button onClick={handlePause} disabled={isPaused} variant="contained" color="secondary">暂停</Button>
        <Button onClick={handleReset} variant="contained" color="warning">重置</Button>
      </Box>
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

export default App;
