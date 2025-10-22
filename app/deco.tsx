import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function Deco() {

    const router = useRouter();
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);



    return(
            <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                  <WebView source={{ uri: "https://harussak-unity-to-webgl.netlify.app/" }} // Unity 빌드한 주소 
                  style={{ flex: 1 }} 
                  allowsInlineMediaPlayback javaScriptEnabled domStorageEnabled />
                </View>
              <Pressable
                style={styles.iconBack}
                onPress={() => router.back()}
              >
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={require("../assets/images/icon-back.png")}
                />
              </Pressable>
              <View style={[styles.view2, styles.viewFlexBox2]}>
                <Image
                  style={styles.item2}
                  width={20}
                  height={14}
                  resizeMode="contain"
                  source={require("../assets/images/icon-seed.png")}
                />
                <View style={[styles.view3, styles.viewFlexBox2]}>
                  <Text style={styles.text15}>1234 개</Text>
                </View>
              </View>
              <View style={{ position: "absolute" }}>
                <Pressable onPress={() => setIsTooltipVisible(p => !p)} style={styles.iconGridCalendar}>
                  <Image style={styles.item} width={28} height={28} source={require("../assets/images/icon-question.png")} resizeMode="contain" />
                </Pressable>
                {isTooltipVisible && <Image source={require("../assets/images/questionbubble-deco.png")} style={styles.tooltipImage} resizeMode="contain" />}
              </View>
              <Pressable
                style={styles.iconshop}
                onPress={() => router.push("/shop")}
              >
                <Image
                  style={styles.icon1}
                  resizeMode="contain"
                  source={require("../assets/images/icon-shop.png")}
                />
              </Pressable>
            </View>  
    )
}

const styles = StyleSheet.create({
    iconBack: {
        position: "absolute",
        top: 36,
        left: 20,
        zIndex: 10,
  },
      iconshop: {
        position: "absolute",
        top : 40,
        right: 20,
        zIndex: 10,
  },
    icon: {
        width: 20,
        height: 20,
    },
    icon1: {
        width: 40,
        height: 40,
    },
        view2: {
        top: 34,
        left: 60, // 화면 왼쪽에서 약간 띄우기
        position: "absolute",
        zIndex: 10, // 최상단으로
        boxShadow: "2px 2px 12px rgba(158, 164, 169, 0.25)",
        shadowColor: "rgba(158, 164, 169, 0.25)",
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
        iconGridCalendar: { left: 160, width: 32, top: 36, height: 32 },
  item: {
    		width: 20,
    		height: 14
  	},
    tooltipImage: {
    position: "absolute", // 절대 위치
    top: 68,              // 아이콘 바로 아래
    left: 160,            // 아이콘 기준 위치 (필요 시 조정)
    width: 160,           // 말풍선 이미지 크기
    height: 60,           // 말풍선 이미지 높이
    justifyContent: "center", // 텍스트 수직 중앙
    alignItems: "center",     // 텍스트 수평 중앙
    zIndex: 100,
    },
})