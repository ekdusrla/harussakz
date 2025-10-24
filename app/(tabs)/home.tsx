import { useFocusEffect } from "@react-navigation/native"; // 화면 포커스 체크
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { token } = useAuth();

  const [serverRoutines, setServerRoutines] = useState<{ id: number; routine: string; completed: boolean }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  // ✅ 인트로 & 말풍선 opacity 분리
  const introOpacity = useRef(new Animated.Value(1)).current;
  const bubbleOpacity = useRef(new Animated.Value(0)).current;

  const positions = [
    { top: -640, left: 60 },
    { top: -680, left: 260 },
  ];

  const images = [
    require("../../assets/images/homebubble-cheerup.png"),
    require("../../assets/images/homebubble-good.png"),
  ];

  // ✅ 인트로 화면 20초 후 사라지기
  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(introOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowIntro(false));
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ 말풍선 애니메이션 (인트로와 독립적으로 작동)
  useEffect(() => {
    const showImage = () => {
      Animated.timing(bubbleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }).start();
      setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
      setTimeout(() => {
        Animated.timing(bubbleOpacity, { toValue: 0, duration: 500, useNativeDriver: true }).start();
      }, 5000);
    };

    const initialTimeout = setTimeout(showImage, 30000); // 첫 말풍선은 30초 후
    const interval = setInterval(showImage, 10000); // 이후 10초 간격 반복

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // ✅ 루틴 불러오기
  const fetchServerRoutines = async () => {
    if (!token) return;
    try {
      const res = await fetch(`http://3.37.215.53:8080/routines/by-date/${new Date().toISOString().slice(0, 10)}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "*/*" },
      });
      const data = await res.json();
      setServerRoutines(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("루틴 조회 실패", e);
      setServerRoutines([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchServerRoutines();
    }, [token])
  );

  const totalTodayRoutines = serverRoutines.length;
  const completedRoutines = serverRoutines.filter((r) => r.completed).length;
  const remainingRoutines = totalTodayRoutines - completedRoutines;

  const goToDeco = () => router.push("/deco");

  const webviewRef = useRef<WebView>(null);

useEffect(() => {
  // 홈 씬으로 전환
  const timer = setTimeout(() => {
    if (webviewRef.current) {
      webviewRef.current.injectJavaScript(`
        if (typeof unityInstance !== 'undefined') {
          unityInstance.SendMessage('SceneController', 'ChangeScene', 'HomeScene');
        }
        true;
      `);
    }
  }, 2000); // 2초 정도 기다렸다 씬 전환

  return () => clearTimeout(timer);
}, []);


  return (
<View style={{ flex: 1 }}>
    {/* ✅ WebView는 항상 백그라운드에서 로드 */}
    <WebView
      source={{ uri: "https://harussak-unity-to-webgl.netlify.app/" }}
      style={{ flex: 1 }}
      allowsInlineMediaPlayback
      javaScriptEnabled
      domStorageEnabled
    />

    {/* ✅ 인트로 화면: 화면 전체를 덮음 */}
    {showIntro && (
      <Animated.View
        style={[
          StyleSheet.absoluteFill, // 👈 화면 전체 덮기
          styles.introContainer,
          { opacity: introOpacity, zIndex: 999 },
        ]}
        pointerEvents="auto" // 인트로일 때는 클릭 막기
      >
        <Image
          source={require("../../assets/images/loading.gif")}
          style={styles.background}
          resizeMode="contain"
        />
        <Text style={styles.introText}>테라리움 준비 중...</Text>
      </Animated.View>
    )}

      {/* ✅ 상단 및 하단 UI */}
      <View>
        <View style={[styles.view2, styles.viewFlexBox2]}>
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

        {/* 메뉴 버튼 */}
        <Pressable
          onPress={() => router.push("/login")}
          hitSlop={10}
          style={[styles.itemm, { zIndex: 10 }]}
        >
          <Image
            source={require("../../assets/images/icon-menu.png")}
            resizeMode="contain"
            style={{ width: 44, height: 44 }}
          />
        </Pressable>

        {/* 데코 버튼 */}
        <Pressable
          onPress={goToDeco}
          hitSlop={10}
          style={[styles.item, { zIndex: 10 }]}
        >
          <Image
            source={require("../../assets/images/icon-deco.png")}
            resizeMode="contain"
            style={{ width: 32, height: 32 }}
          />
        </Pressable>

        {/* ✅ 말풍선 애니메이션 */}
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
            opacity: bubbleOpacity,
          }}
        />

        {/* 하단 루틴 정보 */}
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
          <Text style={styles.text1}>남은 루틴 : {remainingRoutines}개</Text>
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
      introContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: 140,
    height: 140,
    top : -20
  },
  introText: {
    fontSize: 20,
    color: "#333",
    fontWeight: "600",
    fontFamily: "NanumSquareNeo-Bd"

  },
    
  })