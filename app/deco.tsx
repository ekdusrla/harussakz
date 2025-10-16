import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Deco() {

    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState("식물");


    const plantItems = [
      { id: 1, name: "빨간 튤립", image: require("../assets/images/flower-tulip.png") },
      { id: 2, name: "프리지아", image: require("../assets/images/flower-freesia.png") },
      { id: 3, name: "해바라기", image: require("../assets/images/flower-sunflower.png") },
      { id: 4, name: "보라 수국", image: require("../assets/images/flower-hydrangea.png") },
      { id: 5, name: "은방울 꽃", image: require("../assets/images/flower-lily.png") },
    ];

    const decoItems = [
      { id: 1, name: "동화 속 성", image: require("../assets/images/deco-castle.png") },
      { id: 2, name: "둥근 나무", image: require("../assets/images/deco-tree.png") },
      { id: 3, name: "나무 다리", image: require("../assets/images/deco-bridge.png") },
      { id: 4, name: "조약돌 길", image: require("../assets/images/deco-pebbles.png") },
      { id: 5, name: "세잎클로버", image: require("../assets/images/deco-clover.png") },
      { id: 6, name: "코스모스", image: require("../assets/images/deco-wildflower.png") },
      { id: 7, name: "잔디와 풀", image: require("../assets/images/deco-plants.png") },
    ];

    const skyItems = [
      { id: 1, name: "아침햇살", image: require("../assets/images/background-morning.png") },
      { id: 2, name: "노을빛 하늘", image: require("../assets/images/background-sunset.png") },
      { id: 3, name: "보랏빛 하늘", image: require("../assets/images/background-purple.png") },
      { id: 4, name: "별밤 하늘", image: require("../assets/images/background-night.png") },
      { id: 5, name: "새벽 하늘", image: require("../assets/images/background-dawn.png") },
      { id: 6, name: "바닷 속 세상", image: require("../assets/images/background-sea.png") },
    ];

    const [bgImage, setBgImage] = useState(require("../assets/images/background-morning.png"));
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const [showOverlay, setShowOverlay] = useState(false); // 체크 시 3초 띄울 이미지



    return(
            <View style={{ flex: 1 }}>
              {showOverlay && (
                <Image
                  source={require("../assets/images/decopopup.png")}
                  style={{
                    position: "absolute",
                    width: 300,
                    height: 60,
                    bottom: 20,
                    left: 60,
                    zIndex: 20,
                  }}
                  resizeMode="contain"
                />
              )}
              <ImageBackground
                source={bgImage} // 🔹 상태값으로 변경
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
              >
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
              <Image
                    source={require("../assets/images/terrarium.png")}
                    style={{
                        width: 440,
                        height: 440,
                        bottom : -80
                    }}
                />
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
              <Image
                    source={require("../assets/images/decobackground.png")}
                    style={{
                        width: 640,
                        height: 500,
                        bottom : -60
                    }}
                />
                {/* 꾸미기 하단바 */}
              <View style={styles.decoPanel}>
                {/* 섹션 선택 탭 */}
                <View style={styles.decoTabs}>
                <View style={styles.decoTabGroup}>
                  {["식물", "장식", "하늘"].map((tab) => (
                    <Pressable key={tab} onPress={() => setSelectedTab(tab)}>
                      <Text
                        style={[
                          styles.decoTabText,
                          selectedTab === tab
                            ? styles.decoTabTextActive
                            : styles.decoTabTextInactive,
                        ]}
                      >
                        {tab}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                  {/* 체크 버튼 자리 */}
                  <Pressable
                    style={styles.checkButton}
                    onPress={() => {
                      if (selectedTab === "하늘" && selectedItemId !== null) {
                        // 선택된 카드 객체 가져오기
                        const selectedCard = skyItems.find(item => item.id === selectedItemId);
                        if (selectedCard) {
                          setBgImage(selectedCard.image); // 배경 이미지 저장
                          setShowOverlay(true); // 오버레이 표시
                          setTimeout(() => setShowOverlay(false), 3000); // 3초 후 숨기기
                        }
                      }
                    }}
                  >
                <Image
                  source={require("../assets/images/icon-check.png")}
                  style={{ width: 32, height: 32 }}
                  resizeMode="contain"
                />
              </Pressable>
                </View>
                {/* 아이템 리스트 */}
                <View style={styles.itemList}>
                <ScrollView contentContainerStyle={styles.cardContainer}>
                  {(selectedTab === "식물" ? plantItems :
                    selectedTab === "장식" ? decoItems :
                    skyItems).map((item) => (
                      <Pressable
                        key={item.id}
                        style={[
                          styles.card,
                          selectedItemId === item.id ? styles.cardSelected : null, // 선택 테두리
                        ]}
                        onPress={() => {
                          setSelectedItemId(item.id); // 선택된 카드 업데이트
                          if (selectedTab === "하늘") {
                            setBgImage(item.image); // 하늘 탭 선택 시 배경 변경
                          }
                        }}
                      >
                        <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
                        <Text style={styles.cardText}>{item.name}</Text>
                      </Pressable>
                  ))}
                </ScrollView>

                </View>
              </View>
                    </ImageBackground>
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
        bottom : 420,
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
        decoPanel: {
        position: "absolute",
        bottom: -20,
        width: "100%",
        height: "50%", // 최대 절반까지
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 16,
        alignItems: "center",
      },
    decoTabs: {
      flexDirection: "row",
      justifyContent: "space-between", // 🔹 왼쪽 탭 / 오른쪽 버튼 분리
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 20,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderColor: "#ddd",
    },

    decoTabGroup: {
      left : 12,
      flexDirection: "row",
      gap: 32, // 🔹 탭 사이 여백
      alignItems: "center",
    },

    checkButton: {
      padding: 4,
    },


    decoTab: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },

    itemList: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    itemText: {
      fontSize: 12,
      color: "#9EA4A9",
    },
    decoTabText: {
  fontSize: 18,
  fontWeight: "600",
  fontFamily: "NanumSquareNeo-Rg",
},

decoTabTextInactive: {
  color: "#9EA4A9", // 선택 안 된 탭
},

decoTabTextActive: {
  color: "#26282C", // 선택된 탭 (짙은 색)
},
cardContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-start", // 🔹 왼쪽 정렬
  paddingTop: 12,
  gap: 12, // 카드 사이 간격
  marginLeft : 20,
  paddingBottom: 40,
},


card: {
  width: "30%", // 화면 너비 기준 3열
  height : 140,
  backgroundColor: "#F6F8FA",
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  padding: 8,
  marginBottom: 4 , // 줄 간격
},

cardImage: {
  width: 100,
  height: 100,
  marginBottom: 6,
},

cardText: {
  fontSize: 14,
  color: "#26282c",
  textAlign: "center",
  fontFamily: "NanumSquareNeo-Bd",
},
cardSelected: {
  borderWidth: 2,
  borderColor: "#CACDD3", // 원하는 강조 색
},




})