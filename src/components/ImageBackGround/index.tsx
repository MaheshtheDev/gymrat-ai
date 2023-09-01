import React from 'react'
import { ImageBackground, ImageResizeMode} from 'react-native'
import styles from './style'

interface CustomImageBackgroundProps {
  src: string
  children?: React.ReactNode
  resizeMode?: ImageResizeMode
}

export const ImageBackgroundComponent: React.FC<CustomImageBackgroundProps> = ({
  src,
  children,
  resizeMode,
  ...props
}) => {
  return (
    <ImageBackground
      source={src}
      {...props}
      style={styles.imgbackground}
      resizeMode={resizeMode}>
      {children}
    </ImageBackground>
  )
}