import React, { useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const PositiveSelfTalk = ({ setEncouragements }) => {
  const [encouragement, setEncouragement] = useState('');
  const [localEncouragements, setLocalEncouragements] = useState([]);

  const handleSubmit = () => {
    if (encouragement.trim()) {
      const newEncouragements = [...localEncouragements, encouragement.trim()];
      setLocalEncouragements(newEncouragements);
      setEncouragements(newEncouragements); // Update the parent state immediately
      setEncouragement('');
    }
  };

  return (
    <Box sx={{
      height: '50vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <Typography variant="h6" gutterBottom>
        正面自我对话
      </Typography>
      <Typography variant="body1" paragraph>
        积极的自我对话可以提高自信心和学习动力。试着对自己说一些鼓励的话。
      </Typography>
      <TextField
        fullWidth
        value={encouragement}
        onChange={(e) => setEncouragement(e.target.value)}
        placeholder="例如：我能做到！"
        margin="normal"
      />
      <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mb: 2 }}>
        添加鼓励语
      </Button>
      <List sx={{ 
        flexGrow: 1, 
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        }
      }}>
        {localEncouragements.map((text, index) => (
          <ListItem key={index}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PositiveSelfTalk;