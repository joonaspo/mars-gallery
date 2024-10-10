import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { MarsPhoto } from '../types'
import { useEffect, useState } from 'react'

interface Props {
  photo: MarsPhoto
}

const ImageComponent = ({ photo }: Props) => {
  const [loadingState, setLoadingState] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  useEffect(() => {
    setLoadingState(false)
  }, [photo.img_src])
  const handleImageLoad = () => {
    setLoadingState(true)
  }

  const handleImageError = () => {
    setLoadingState(true)
    setErrorMessage(
      `Image failed to load, link ${photo.img_src} is possibly broken`
    )
  }

  if (!photo) {
    return null
  }

  return (
    <>
      {photo ? (
        <Card sx={{ height: '70vh' }}>
          <CardHeader
            title={`Rover: ${photo.rover.name} - Launched: ${photo.rover.launch_date} - Landed: ${photo.rover.landing_date}`}
          />
          <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            {!loadingState && <Typography>Loading...</Typography>}
            {errorMessage && <Typography>{errorMessage}</Typography>}
            <img
              src={photo.img_src}
              style={{
                height: '58vh',
                width: 'auto',
                objectFit: 'contain',
                display: loadingState ? 'block' : 'none',
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            <p>Date: {photo.earth_date}</p>
          </CardContent>
        </Card>
      ) : null}
    </>
  )
}

export default ImageComponent
