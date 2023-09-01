import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native'
import Colors from '../../styles/colors'
import LottieView from 'lottie-react-native'
import { MONTSERRAT_MEDIUM } from '../../styles'

export function Loader() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <LottieView
        style={{ flex: 1, backgroundColor: 'black' }}
        source={require('../../assets/dumbdell-loader.json')}
        colorFilters={[
          {
            keypath: 'button',
            color: '#F00000',
          },
          {
            keypath: 'Sending Loader',
            color: '#F00000',
          },
        ]}
        autoPlay
        loop
      />
      <Text
        style={{
          flex: 1,
          alignItems: 'center',
          textAlign: 'center',
          color: 'white',
          fontFamily: MONTSERRAT_MEDIUM,
        }}>
        Loading...
      </Text>
    </SafeAreaView>
  )
}
