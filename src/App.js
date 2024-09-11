import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Card, CardHeader, CardContent, Button } from '@mui/material';
import GoalEnvironmentPrep from './GoalEnvironmentPrep';
import BreathingExercise from './BreathingExercise';
import PositiveVisualization from './PositiveVisualization';
import PositiveSelfTalk from './PositiveSelfTalk';
import FinalPreparation from './FinalPreparation';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [userGoals, setUserGoals] = useState([]);
  const [encouragements, setEncouragements] = useState([]); // New state for encouragements

  const steps = [
    { name: "环境准备与目标设定", component: <GoalEnvironmentPrep setUserGoals={setUserGoals} /> },
    { name: "深呼吸练习", component: <BreathingExercise /> },
    { name: "积极可视化", component: <PositiveVisualization /> },
    { name: "正面自我对话", component: <PositiveSelfTalk setEncouragements={setEncouragements} /> },
    { name: "最后准备", component: <FinalPreparation userGoals={userGoals} encouragements={encouragements} /> }
  ];

  React.useEffect(() => {
    setProgress((currentStep / (steps.length - 1)) * 100);
  }, [currentStep, steps.length]);

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
      <Typography variant="h4" gutterBottom>高效学习准备</Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
      <Card>
        <CardHeader title={steps[currentStep].name} />
        <CardContent>
          {React.cloneElement(steps[currentStep].component, { nextStep })}
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

export default App;