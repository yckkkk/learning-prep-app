import React, { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';

const PositiveVisualization = () => {
  const [visualization, setVisualization] = useState('');
  const guidingQuestions = [
    "想象成功完成学习任务后的场景",
    "你会获得什么收获和成就感？",
    "这次学习如何帮助你达成长期目标？"
  ];

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
    </Box>
  );
};

export default PositiveVisualization;