import axios from 'axios'
import { MarsPhoto, RoverCameras, RoverNames } from './types'

const apiKey = import.meta.env.VITE_API_KEY

interface Request {
  photos?: MarsPhoto[]
}

export const getData = async (
  roverName: RoverNames,
  cameraName: keyof typeof RoverCameras
) => {
  if (!roverName || !cameraName) {
    const errorMessage =
      'Invalid parameters: roverName and cameraName are required'
    console.error(errorMessage)
    throw new Error(errorMessage)
  }

  try {
    const { data } = await axios.get<Request>(
      `/.netlify/functions/marsPhotos?roverName=${roverName}&cameraName=${cameraName}&apiKey=${apiKey}`
    )
    if (data.photos) {
      return data.photos
    } else {
      throw new Error('No photos found')
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || 'An error occurred while fetching data'
      throw new Error(`Error ${error.response?.status}: ${message}`)
    } else {
      throw new Error('Unexpected error occurred')
    }
  }
}
