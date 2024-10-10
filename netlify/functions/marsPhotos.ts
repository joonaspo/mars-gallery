import { HandlerEvent } from '@netlify/functions'
import { RoverCameras, RoverNames } from '../../src/types'
import axios from 'axios'

const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/'

interface QueryParams {
  roverName?: RoverNames
  cameraName?: keyof typeof RoverCameras
  apiKey?: string
}

export const handler = async (event: HandlerEvent) => {
  if (event.queryStringParameters === null) {
    throw new Error('Please provide required query parameters')
  }

  const { roverName, cameraName, apiKey }: QueryParams =
    event.queryStringParameters

  if (!cameraName) {
    throw new Error('Please provide valid camera name')
  }

  if (!roverName) {
    throw new Error('Please provide valid rover name')
  }

  if (!apiKey) {
    throw new Error('Please provide valid API key')
  }

  const camera = cameraName.toLowerCase()

  try {
    console.log('called api')
    const { data } = await axios.get(
      `${baseUrl}${roverName}/photos?sol=1000&page=1&camera=${camera}&api_key=${apiKey}`
    )
    console.log(data)
    console.log('hello')
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error: unknown) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Error fetching data:', error }),
    }
  }
}
