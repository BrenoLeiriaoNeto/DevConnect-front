import { useEffect, useState } from 'react';

import { Box, useComputedColorScheme, useMantineTheme } from '@mantine/core';

export function BridgeLoader() {
  const theme = useMantineTheme();
  const computedColorScheme = useComputedColorScheme('light');
  const [lightsOn, setLightsOn] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setLightsOn(i);
      if (i >= 5) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: computedColorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.8s ease-in-out',
      }}
    >
      <Box
        style={{
          position: 'relative',
          width: 300,
          height: 150,
        }}
      >
        {/* Cloud */}
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: '-50%',
            width: '200%',
            height: 80,
            background: '#AEE0FF',
            borderRadius: '50%',
            filter: 'blur(8px)',
            animation: 'cloudDrift 8s linear infinite',
          }}
        />

        {/* Bridge */}
        <svg
          viewBox="0 0 300 150"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Bridge silhouette */}
          <path
            d="M 0 100 Q 75 50 150 100 Q 225 50 300 100"
            stroke="url(#bridgeGradient)"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Lights */}
          {[...Array(5)].map((_, idx) => (
            <circle
              key={idx}
              cx={50 + idx * 50}
              cy={95}
              r={5}
              fill="#FFD966"
              opacity={lightsOn > idx ? 1 : 0.2}
              style={{
                transition: 'opacity 0.4s ease-in-out',
                filter: lightsOn > idx ? 'drop-shadow(0 0 4px #FFD966)' : 'none',
              }}
            />
          ))}
          <defs>
            <linearGradient id="bridgeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF8C42" />
              <stop offset="100%" stopColor="#FF6B00" />
            </linearGradient>
          </defs>
        </svg>
      </Box>

      {/* Cloud drift animation */}
      <style>
        {`
            @keyframes cloudDrift {
              0% { transform: translateX(0); }
              100% { transform: translateX(-25%); }
            }
          `}
      </style>
    </Box>
  );
}
