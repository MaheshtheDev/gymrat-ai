import { ActivityIndicator, View } from "react-native";
import Colors from "../../styles/colors";

export function Loader() {
  return (
    <View style={{ backgroundColor: Colors.BLACK, flex: 1 }}>
      <ActivityIndicator
        size={'large'}
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      />
    </View>
  )
}