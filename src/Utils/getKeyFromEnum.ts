import { RoverCameras } from '../types'

export const getKeyFromRoverCamerasEnum = (enumValue: RoverCameras): string => {
  const entries = Object.entries(RoverCameras) as [string, string][]
  for (const [key, value] of entries) {
    if (value === enumValue) {
      return key
    }
  }
  return ''
}
