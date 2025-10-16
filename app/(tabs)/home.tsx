import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { WebView, } from "react-native-webview";

export default function Home() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;

    // 👇 위치도 배열로 관리 (top/left를 원하는 좌표로 바꾸면 됨)
  const positions = [
    { top: -640, left: 60 },
    { top: -680, left: 260 },
  ];

  // 두 개의 이미지 배열로 관리
  const images = [
    require("../../assets/images/homebubble-cheerup.png"),
    require("../../assets/images/homebubble-good.png"),
  ];

useEffect(() => {
  const showImage = () => {
    // 페이드인
    Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }).start();

    // 인덱스 바꾸기
    setCurrentIndex((prev) => (prev === 0 ? 1 : 0));

    // 5초 후 페이드아웃
    setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }).start();
    }, 5000);
  };

  // 5초 뒤 첫 실행
  const initialTimeout = setTimeout(showImage, 10000);

  // 이후 10초마다 반복
  const interval = setInterval(showImage, 10000);

  return () => {
    clearTimeout(initialTimeout);
    clearInterval(interval);
  };
}, []);




  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <WebView source={{ uri: "https://terrarium-web-gl-for-homescreen.vercel.app/" }} // Unity 빌드한 주소 
        style={{ flex: 1 }} 
        allowsInlineMediaPlayback javaScriptEnabled domStorageEnabled />
      </View>
  <View>
    {/* 이제 나머지 UI 요소들은 그대로 */}
        <View style={[styles.view2, styles.viewFlexBox2,]}>
          <Image
            style={styles.item2}
            width={20}
            height={14}
            resizeMode="contain"
            source={require("../../assets/images/icon-seed.png")}
          />
          <View style={[styles.view3, styles.viewFlexBox2]}>
            <Text style={styles.text15}>1234 개</Text>
          </View>
        </View>
        <Pressable
        onPress={() => router.push("/login")} hitSlop={10}
        style={[
            styles.itemm,
            { zIndex: 10 },
        ]}
        >
        <Image
            source={require("../../assets/images/icon-menu.png")}
            resizeMode="contain"
            style={{ width: 44, height: 44 }}
        />
        </Pressable>
        <Pressable
        onPress={() => router.push("/deco")} hitSlop={10}
        style={[
            styles.item,
            { zIndex: 10 },
        ]}
        >
        <Image
            source={require("../../assets/images/icon-deco.png")}
            resizeMode="contain"
            style={{ width: 32, height: 32 }}
        />
        </Pressable>
          {(
            <Animated.Image
              source={images[currentIndex]}
              style={{
                position: "absolute",
                top: positions[currentIndex].top,
                left: positions[currentIndex].left,
                width: 80,
                height: 80,
                resizeMode: "contain",
                zIndex: 50,
                opacity: opacity, // opacity 애니메이션 적용
              }}
            />
          )}
          <ImageBackground
          source={require("../../assets/images/homeborder.png")}
          style={{
            position: "absolute",
            width: 140,
            height: 52,
            bottom: 20,
            left: 20,
          }}
          resizeMode="contain"
        >
          <Text style={styles.text1}>남은 루틴 : 7개</Text>
        </ImageBackground>
        </View>    
    </View>
  );
}


const styles = StyleSheet.create({

    view2: {
        top: -760,
        left: 20, // 화면 왼쪽에서 약간 띄우기
        position: "absolute",
        zIndex: 10, // 최상단으로
    		boxShadow: "2px 2px 12px rgba(218, 222, 225, 0.5)",
    		shadowColor: "rgba(218, 222, 225, 0.25)",
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 12,
        elevation: 12,
        shadowOpacity: 1,
        backgroundColor: "rgba(255, 255, 255, 0.6)", // 조금 더 선명하게
        borderStyle: "solid",
        borderColor: "#fff",
        borderWidth: 0.8,
        height: 28,
        paddingHorizontal: 8,
        paddingVertical: 7,
        gap: 2,
        borderRadius: 30,
        alignItems: "center",
        flexDirection: "row", // flexbox로 내부 정렬
    },
        viewFlexBox2: {
                alignItems: "center",
                flexDirection: "row"
        },
        item2: {
                width: 20,
                height: 14
        },
            view3: {
                justifyContent: "center",
                paddingLeft: 4,
                alignItems: "center",
                overflow: "hidden",
                marginTop: -2
        },
        text15: {
        fontSize: 12,
        fontWeight: "600",
        color: "#26282c",
        fontFamily: "NanumSquareNeo-Bd",
        },
        text1 : {
        fontSize: 16,
        fontWeight: "600",
        color: "#26282c",
        fontFamily: "NanumSquareNeo-Bd",
        left : 34,
        bottom : -18
        },
        item: {
            position: "absolute",
        left : 356,
        top : -700,
  	},
    itemm: {
        position: "absolute",
        left : 340,
        top : -770
  	},
    
  })