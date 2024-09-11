import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, ButtonGroup, Typography, CircularProgress, Fade } from '@mui/material';

const sentences = [
  "注意你的呼吸，不需要改变它，只需要觉察它。",
  "感受空气进入鼻孔，流过喉咙，进入肺部。",
];

const lastSentence = "你做的很棒";

const BreathingExercise = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [selectedTime, setSelectedTime] = useState(120);
  const [remainingTime, setRemainingTime] = useState(selectedTime);
  const [currentSentence, setCurrentSentence] = useState('');
  const [phase, setPhase] = useState('idle'); // 'idle', 'sentences', 'animation', 'completed', 'ending'
  const [showSentence, setShowSentence] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#fff'); // 新增状态来控制背景颜色
  const times = [120, 180, 240];

  const SENTENCE_DISPLAY_TIME = 5; // 每个句子显示5秒
  const TOTAL_SENTENCE_TIME = SENTENCE_DISPLAY_TIME * sentences.length;
  const COMPLETION_DISPLAY_TIME = 3; // 完成信息显示3秒
  const FADE_DURATION = 1000; // 常规淡入淡出动画持续1秒
  const ENDING_FADE_DURATION = 3000; // 结束信息淡入淡出动画持续3秒

  const calculateAnimationTime = useCallback(() => {
    return selectedTime - TOTAL_SENTENCE_TIME;
  }, [selectedTime]);

  const resetExercise = useCallback(() => {
    setIsBreathing(false);
    setRemainingTime(selectedTime);
    setCurrentSentence('');
    setPhase('idle');
    setShowSentence(false);
    setBackgroundColor('#fff'); // 重置背景颜色为白色
  }, [selectedTime]);

  // 处理整体计时和阶段转换
  useEffect(() => {
    let timer;
    if (isBreathing && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setPhase('completed');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathing, remainingTime]);

  // 处理阶段转换
  useEffect(() => {
    let phaseTimer;
    if (isBreathing) {
      if (phase === 'sentences') {
        phaseTimer = setTimeout(() => {
          setPhase('animation');
        }, TOTAL_SENTENCE_TIME * 1000);
      } else if (phase === 'completed') {
        phaseTimer = setTimeout(() => {
          setPhase('ending');
        }, FADE_DURATION);
      } else if (phase === 'ending') {
        phaseTimer = setTimeout(() => {
          resetExercise();
        }, (COMPLETION_DISPLAY_TIME + ENDING_FADE_DURATION / 1000) * 1000);
      }
    }
    return () => clearTimeout(phaseTimer);
  }, [phase, isBreathing, resetExercise]);

  // 处理句子显示
  useEffect(() => {
    let sentenceTimer;
    if (phase === 'sentences') {
      sentences.forEach((sentence, index) => {
        sentenceTimer = setTimeout(() => {
          setCurrentSentence(sentence);
          setShowSentence(true);
          setTimeout(() => setShowSentence(false), SENTENCE_DISPLAY_TIME * 1000 - FADE_DURATION);
        }, index * SENTENCE_DISPLAY_TIME * 1000);
      });
    }
    return () => clearTimeout(sentenceTimer);
  }, [phase]);

  const handleTimeSelection = (time) => {
    if (!isBreathing) {
      setSelectedTime(time);
      setRemainingTime(time);
    }
  };

  const toggleBreathing = () => {
    if (isBreathing) {
      resetExercise();
    } else {
      setIsBreathing(true);
      setPhase('sentences');
      setBackgroundColor('#000'); // 开始呼吸时，将背景颜色设置为黑色
    }
  };

  return (
    <Box sx={{
      backgroundColor: backgroundColor, // 使用动态背景颜色
      color: isBreathing ? '#fff' : '#000', // 根据呼吸状态动态改变文字颜色
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background-color 0.5s ease, color 0.5s ease', // 添加过渡效果
    }}>
      {/* 倒计时显示 */}
      {isBreathing && phase !== 'ending' && (
        <Box sx={{ position: 'absolute', top: '10%', display: 'flex', alignItems: 'center' }}>
          <CircularProgress
            variant="determinate"
            value={(remainingTime / selectedTime) * 100}
            size={40}
            thickness={4}
            sx={{ color: '#fff' }}
          />
          <Typography sx={{ ml: 2, fontSize: '1rem' }}>
            {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
          </Typography>
        </Box>
      )}

      {/* 句子显示 */}
      <Fade in={phase === 'sentences' && showSentence} timeout={FADE_DURATION}>
        <Typography sx={{
          fontSize: '1.2rem',
          textAlign: 'center',
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '90%',
        }}>
          {currentSentence}
        </Typography>
      </Fade>

      {/* 呼吸动画 */}
      <Fade in={phase === 'animation'} timeout={FADE_DURATION}>
        <Box className="watch-face" sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '100px',
          width: '100px',
          animation: 'pulse 4s cubic-bezier(0.5, 0, 0.5, 1) alternate infinite',
        }}>
          {[...Array(6)].map((_, i) => (
            <Box
              key={i}
              className="circle"
              sx={{
                height: '100px',
                width: '100px',
                borderRadius: '50%',
                position: 'absolute',
                mixBlendMode: 'screen',
                background: i % 2 === 0 ? '#529ca0' : '#61bea2',
                animation: `circle-${i + 1} 4s ease alternate infinite`,
              }}
            />
          ))}
        </Box>
      </Fade>

      {/* 完成消息 */}
      <Fade in={phase === 'ending'} timeout={ENDING_FADE_DURATION}>
        <Typography sx={{
          fontSize: '1.2rem',
          textAlign: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          {lastSentence}
        </Typography>
      </Fade>

      {/* 时间选择按钮 */}
      {!isBreathing && (
        <ButtonGroup sx={{ position: 'absolute', bottom: '70px', left: '50%', transform: 'translateX(-50%)' }}>
          {times.map((time) => (
            <Button
              key={time}
              onClick={() => handleTimeSelection(time)}
              variant={selectedTime === time ? 'contained' : 'outlined'}
              sx={{
                backgroundColor: selectedTime === time ? '#000' : '#fff',
                color: selectedTime === time ? '#fff' : '#000',
                borderColor: '#000',
                ':hover': {
                  backgroundColor: selectedTime === time ? '#000' : '#f0f0f0',
                },
              }}
            >
              {time / 60} 分钟
            </Button>
          ))}
        </ButtonGroup>
      )}

      {/* 开始/停止按钮 */}
      <Button
        onClick={toggleBreathing}
        variant="contained"
        sx={{
          position: 'absolute',
          bottom: '20px',
          width: '200px',
          backgroundColor: isBreathing ? '#fff' : '#000',
          color: isBreathing ? '#000' : '#fff',
          ':hover': { backgroundColor: '#333', color: '#fff' },
        }}
      >
        {isBreathing ? '停止练习' : '开始练习'}
      </Button>

      {/* 样式定义 */}
      <style>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(.15) rotate(180deg); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }

        @keyframes circle-1 { 0% { transform: translate(0, 0); } 100% { transform: translate(-28px, -40px); } }
        @keyframes circle-2 { 0% { transform: translate(0, 0); } 100% { transform: translate(28px, 40px); } }
        @keyframes circle-3 { 0% { transform: translate(0, 0); } 100% { transform: translate(-48px, 0); } }
        @keyframes circle-4 { 0% { transform: translate(0, 0); } 100% { transform: translate(48px, 0); } }
        @keyframes circle-5 { 0% { transform: translate(0, 0); } 100% { transform: translate(-28px, 40px); } }
        @keyframes circle-6 { 0% { transform: translate(0, 0); } 100% { transform: translate(28px, -40px); } }
      `}</style>
    </Box>
  );
};

export default BreathingExercise;