/// <reference types="react-scripts" />

// Allows importing of image files (png, jpg, jpeg, gif, webp, svg)
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.webp'
declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

// Allows importing of video files (mp4, webm, ogg)
declare module '*.mp4'
declare module '*.webm'
declare module '*.ogg'

// Allows importing of audio files (mp3, wav, ogg)
declare module '*.mp3'
declare module '*.wav'
declare module '*.ogg'

// Allows importing of font files (woff, woff2, eot, ttf, otf)
declare module '*.woff'
declare module '*.woff2'
declare module '*.eot'
declare module '*.ttf'
declare module '*.otf'

// Allows importing of data files (json, csv, txt, xml)
declare module '*.json'
declare module '*.csv'
declare module '*.txt'
declare module '*.xml'

// Allows importing of source map files
declare module '*.map'

// Add any additional custom type declarations here if needed for your project