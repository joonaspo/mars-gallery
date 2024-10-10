import { useState } from 'react'
import { MarsPhoto } from '../types'
import { Button, Typography } from '@mui/material'
import ImageComponent from './ImageComponent'

interface Props {
  data: MarsPhoto[]
}

const RenderImageAndData = ({ data }: Props) => {
  const [index, setIndex] = useState(0)

  const maxIndex = data.length
  const changeIndex = (term: '+' | '-') => {
    if (term === '+' && index < maxIndex - 1) {
      setIndex(index + 1)
    }
    if (term === '-' && index > 0) {
      setIndex(index - 1)
    }
  }

  return (
    <>
      {data.length > 0 ? (
        <>
          <ImageComponent photo={data[index]} />
          <Typography>
            {index + 1} of {maxIndex}
          </Typography>
          <Button
            onClick={() => changeIndex('-')}
            variant="contained"
            sx={{ marginRight: 0.5 }}
          >
            Previous
          </Button>
          <Button
            onClick={() => changeIndex('+')}
            variant="contained"
            sx={{ marginLeft: 0.5 }}
          >
            Next
          </Button>
        </>
      ) : (
        <Typography>
          No images, try selecting a different category or a different rover!
        </Typography>
      )}
    </>
  )
}

export default RenderImageAndData
