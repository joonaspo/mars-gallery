export enum RoverNames {
  Curiosity = 'curiosity',
  Opportunity = 'opportunity',
  Spirit = 'spirit',
}

export enum RoverCameras {
  FHAZ = 'Front Hazard Avoidance Camera',
  RHAZ = 'Rear Hazard Avoidance Camera',
  MAST = 'Mast Camera',
  CHEMCAM = 'Chemistry and Camera Complex',
  MAHLI = 'Mars Hand Lens Imager',
  MARDI = 'Mars Descent Imager',
  NAVCAM = 'Navigation Camera',
  PANCAM = 'Panoramic Camera',
  MINITES = 'Miniature Thermal Emission Spectrometer',
}

interface Camera {
  id: number
  name: string
  rover_id: number
  full_name: string
}

interface RoverCamera {
  name: string
  full_name: string
}

interface Rover {
  id: number
  name: string
  landing_date: string
  launch_date: string
  status: string
  max_sol: number
  max_date: string
  total_photos: number
  cameras: RoverCamera[]
}

export interface MarsPhoto {
  id: number
  sol: number
  camera: Camera
  img_src: string
  earth_date: string
  rover: Rover
}
