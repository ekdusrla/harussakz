import { useFonts } from 'expo-font';
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
          "NanumSquareNeo-Bd" : require('../assets/fonts/NanumSquareNeo-Bd.ttf'),
          "NanumSquareNeo-Eb" : require('../assets/fonts/NanumSquareNeo-Eb.ttf'),
          "NanumSquareNeo-Hv" : require('../assets/fonts/NanumSquareNeo-Hv.ttf'),
          "NanumSquareNeo-Lt" : require('../assets/fonts/NanumSquareNeo-Lt.ttf'),
          "NanumSquareNeo-Rg" : require('../assets/fonts/NanumSquareNeo-Rg.ttf'),
          "Pretendard-Black" : require('../assets/fonts/Pretendard-Black.ttf'),
          "Pretendard-Bold" : require('../assets/fonts/Pretendard-Bold.ttf'),
          "Pretendard-ExtraBold" : require('../assets/fonts/Pretendard-ExtraBold.ttf'),
          "Pretendard-ExtraLight" : require('../assets/fonts/Pretendard-ExtraLight.ttf'),
          "Pretendard-Light" : require('../assets/fonts/Pretendard-Light.ttf'),
          "Pretendard-Medium" : require('../assets/fonts/Pretendard-Medium.ttf'),
          "Pretendard-Regular" : require('../assets/fonts/Pretendard-Regular.ttf'),
          "Pretendard-SemiBold" : require('../assets/fonts/Pretendard-SemiBold.ttf'),
          "Pretendard-Thin" : require('../assets/fonts/Pretendard-Thin.ttf'),
      });
      if (!fontsLoaded) return null;


  return <Stack screenOptions={{headerShown : false}}/>;
}