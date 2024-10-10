import { useState } from 'react'

import { RoverCameras, RoverNames } from '../types'
import { getKeyFromRoverCamerasEnum } from '../Utils/getKeyFromEnum'
import {
  Card,
  CardHeader,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

interface Props {
  setCameraType: (cameraType: keyof typeof RoverCameras) => void
  setRoverName: (roverName: RoverNames) => void
}

const SearchForm = ({ setCameraType, setRoverName }: Props) => {
  const cameraOptions = Object.keys(RoverCameras).map((key) => ({
    value: getKeyFromRoverCamerasEnum(
      RoverCameras[key as keyof typeof RoverCameras]
    ),
    label: RoverCameras[key as keyof typeof RoverCameras],
  }))

  const nameOptions = Object.keys(RoverNames).map((key) => ({
    value: RoverNames[key as keyof typeof RoverNames] as string,
    label: RoverNames[key as keyof typeof RoverNames],
  }))
  const [cameraValue, setCameraValue] = useState<string>(cameraOptions[0].value)
  const [nameValue, setNameValue] = useState<string>(nameOptions[0].value)

  const handleCameraChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string
    setCameraValue(value)
    setCameraType(cameraValue as keyof typeof RoverCameras)
  }

  const handleNameChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string
    setNameValue(value)
    setRoverName(value as RoverNames)
  }

  return (
    <Card sx={{ padding: 1, marginBottom: 1, width: '80%' }}>
      <CardHeader title="NASA Mars Rovers Photo Gallery" />
      <FormControl fullWidth>
        <FormLabel>Select Rover's name</FormLabel>
        <Select
          value={nameValue}
          onChange={handleNameChange}
          sx={{ textTransform: 'capitalize' }}
        >
          {nameOptions.map((option) => (
            <MenuItem
              value={option.value}
              sx={{ textTransform: 'capitalize' }}
              key={option.label}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <FormLabel>Select Rover's camera</FormLabel>
        <Select fullWidth value={cameraValue} onChange={handleCameraChange}>
          {cameraOptions.map((option) => (
            <MenuItem value={option.value} key={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Card>
  )
}

export default SearchForm
