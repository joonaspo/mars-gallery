import { useEffect, useState } from 'react'
import './App.css'
import { useQuery } from '@tanstack/react-query'
import { getData } from './api'
import { RoverCameras, RoverNames } from './types'
import SearchForm from './Components/SearchForm'
import RenderImageAndData from './Components/RenderImageAndData'
import { Card, Typography } from '@mui/material'

function App() {
  const [cameraType, setCameraType] =
    useState<keyof typeof RoverCameras>('CHEMCAM')
  const [roverName, setRoverName] = useState<RoverNames>(RoverNames.Curiosity)

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['marsImages'],
    queryFn: () => getData(roverName, cameraType),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    refetch()
  }, [cameraType, refetch, roverName])

  return (
    <>
      <SearchForm setCameraType={setCameraType} setRoverName={setRoverName} />
      <Card sx={{ padding: 1, width: '80%' }}>
        {isFetching ? <Typography>Loading...</Typography> : null}
        {data ? <RenderImageAndData data={data} /> : null}
        {error ? <Typography>{error.message}</Typography> : null}
      </Card>
    </>
  )
}

export default App

