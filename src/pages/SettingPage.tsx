import React from 'react'
import { useSettingStore } from '../stores/settingStore'
import { Box, Slider, Typography } from '@mui/material'

const SettingPage = () => {
  const { fontSize, primaryColor, setFontSize } = useSettingStore()
  

  return (
    <Box p={3}>
      <Typography variant="h4">Settings</Typography>
      <Box>
        <Typography variant="h6">Font Size {fontSize}</Typography>
        <Slider
          value={fontSize}
          onChange={(e, newValue) => setFontSize(newValue)}
          aria-labelledby="font-size-slider"
          min={12}
          max={50}
        />
      </Box>
      <Box>
        <Typography variant="h6">Theme</Typography>
      </Box>
    </Box>
  )
}

export default SettingPage