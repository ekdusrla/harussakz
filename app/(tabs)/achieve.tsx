import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Achieve() {

  const router = useRouter();

  const { tab } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<"achieve" | "plant">(
    tab === "plant" ? "plant" : "achieve");

  const achievements = [
        {
      id: 2,
      title: "식물 3개 심기",
      count: "10개",
      barWidth: 160,
      showBar: false,
      bgImage: require("../../assets/images/seedachieve-done.png"),
      countPosition: "bottom",
      contentBgColor: "#EAECED",
    },
    {
      id: 1,
      title: "일주일 루틴 완수",
      count: "8개",
      barWidth: 100,
      showBar: true,         
      bgImage: require("../../assets/images/seedachieve.png"), 
      countPosition: "bottom", 
      contentBgColor: "#f8f8f8", // 글씨 감싼 영역 색
    },
    {
      id: 3,
      title: "식물 10종류 재배하기",
      count: "10개",
      barWidth: 100,
      showBar: true,         
      bgImage: require("../../assets/images/seedachieve.png"), 
      countPosition: "bottom", 
      contentBgColor: "#f8f8f8", // 글씨 감싼 영역 색
    }
  ];
const cards = [
  { id: 1, img: require("../../assets/images/achieve-hide.png"), flowerType: "" },
  { id: 2, img: require("../../assets/images/achieve-hide.png"), flowerType: "" },
  { id: 3, img: require("../../assets/images/card-hydrangea.png"), flowerType: "hydrangea" },
  { id: 4, img: require("../../assets/images/achieve-hide.png"), flowerType: "" },
  { id: 5, img: require("../../assets/images/card-lily.png"), flowerType: "lily" },
  { id: 6, img: require("../../assets/images/achieve-hide.png"), flowerType: "" },
  { id: 7, img: require("../../assets/images/card-tulip.png"), flowerType: "tulip" },
  { id: 8, img: require("../../assets/images/achieve-hide.png"), flowerType: "" },
  { id: 9, img: require("../../assets/images/achieve-hide.png"), flowerType: "" },
  { id: 10, img: require("../../assets/images/card-freesia.png"), flowerType: "freesia" },
  { id: 11, img: require("../../assets/images/achieve-hide.png"), flowerType: "" },
  { id: 12, img: require("../../assets/images/achieve-hide.png"), flowerType: "" },
  { id: 13, img: require("../../assets/images/achieve-hide.png"), flowerType: "" },
  { id: 14, img: require("../../assets/images/card-sunflower.png"), flowerType: "sunflower" },
  { id: 15, img: require("../../assets/images/achieve-hide.png"), flowerType: "" },
];



  	return (
    		<View style={[styles.safeareaview, styles.viewFlexBox]}>

              <View style={[styles.view2, styles.viewFlexBox2]}>
                <Image
                  style={styles.item2}
                  width={20}
                  height={14}
                  resizeMode="contain"
                  source={require("../../assets/images/icon-seed.png")}/>
                  <View style={[styles.view3, styles.viewFlexBox2]}>
                    <Text style={styles.text15}>1234 개</Text>
                  </View>
              </View>

              {/* 탭 버튼 Row */}
              <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 0 }}>
                <TouchableOpacity onPress={() => setActiveTab("achieve")} style={{ position: "absolute", left: 64, top: 140, zIndex: 10 }}>
                  <Text style={[{ fontSize: 24, fontWeight: "600", color: "#9ea4a9", fontFamily:"NanumSquareNeo-Bd" }, activeTab === "achieve" && { color: "#464b53" }]}>
                    업적 도감
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab("plant")} style={{ position: "absolute", right:64, top: 140, zIndex: 10 }}>
                  <Text style={[{ fontSize: 24, fontWeight: "600", color: "#9ea4a9", fontFamily:"NanumSquareNeo-Bd" }, activeTab === "plant" && { color: "#464b53" }]}>
                    식물 도감
                  </Text>
                </TouchableOpacity>
              </View>

              {activeTab === "achieve" ? (
              <View style={[styles.viewFlexBox]}>
              <ImageBackground
                  style={styles.border}
                  resizeMode="contain"
                  source={require("../../assets/images/achieveborder.png")}/>
              <Text style={[styles.reward, styles.rewardTypo]}>Reward</Text>
              <Text style={[styles.content, styles.rewardTypo]}>Content</Text>
                <View style={styles.cardList}>
                {achievements.map((item) => (
                    <View key={item.id} style={styles.achieveCard}>
                        <View style={styles.iconWrapper}>
                        <ImageBackground style={styles.cardBg} source={item.bgImage} />
                        <Image style={styles.cardIcon} resizeMode="contain" source={require("../../assets/images/icon-seed.png")} />
                        <Text
                            style={[
                            styles.cardCount,
                            item.countPosition === "center" ? { bottom: undefined, top: 20 } : {}
                            ]}
                        >
                            {item.count}
                        </Text>
                        </View>
                        <View style={[styles.cardContent, { backgroundColor: item.contentBgColor }]}>
                        {item.showBar ? (
                            <>
                            <Text style={styles.text2}>{item.title}</Text>
                            <ImageBackground style={styles.item} resizeMode="contain" source={require("../../assets/images/achievebar.png")} />
                            <Image style={[styles.itemm, { width: item.barWidth }]} resizeMode="contain" source={require("../../assets/images/bar-green.png")} />
                            </>
                        ) : (
                            <View style={styles.noBarRow}>
                            <Text style={[styles.text2, { position: "absolute", top: "50%", marginTop: -10 }]}>
                                {item.title}
                            </Text>
                            <Image
                                source={require("../../assets/images/done.png")}
                                style={[styles.noBarIcon, { position: "absolute", right: -8, top: "50%", marginTop: -12 }]}
                                resizeMode="contain"
                            />
                            </View>
                        )}
                        </View>
                    </View>
                    ))}
              </View>
        </View>
          ) : (
                <View style={[styles.viewFlexBox]}>
                <ImageBackground
                    style={styles.border}
                    resizeMode="contain"
                    source={require("../../assets/images/plantborder.png")}/>
                  <ScrollView style = {styles.scroll}>
                    <View style={styles.container}>
                  {cards.map((card) => (
                    <TouchableOpacity
                      key={card.id}
                      style={styles.card}
                      onPress={() => {
                      if (card.flowerType) {
                      router.push({
                        pathname: "/plantdetails",
                        params: { flowerType: card.flowerType.toLowerCase() },
                      });
                    }
                    }}
                    >
                      <Image source={card.img} style={styles.cardImage} resizeMode="contain" />
                    </TouchableOpacity>
                  ))}

                    </View>
                  </ScrollView>
              </View>
          )
          }
    		</View>
  );
}

const styles = StyleSheet.create({
  	safeareaview: {
    		backgroundColor: "#f8f8f8"
  	},
  	viewFlexBox: {
    		flex: 1,  
  	},
  	rewardTypo: {
    		top: 208,
    		fontFamily: "Pretendard-Regular",
    		textAlign: "left",
    		fontSize: 16,
    		color: "#9ea4a9",
    		lineHeight: 22,
    		letterSpacing: -0.43,
    		position: "absolute"
  	},
  	text: {
    		right: 80,
    		textAlign: "center",
    		color: "#9ea4a9",
    		fontFamily: "NanumSquareNeo-Bd",
    		fontWeight: "600",
    		lineHeight: 22,
    		letterSpacing: -0.43,
    		fontSize: 20,
    		top: 140,
    		position: "absolute"
  	},
  	safeareaviewText: {
    		left: 64,
    		color: "#464b53",
    		textAlign: "center",
    		fontFamily: "NanumSquareNeo-Bd",
    		fontWeight: "600",
    		lineHeight: 22,
    		letterSpacing: -0.43,
    		fontSize: 20,
    		top: 140,
    		position: "absolute"
  	},
  	text2: {
    		color: "#74777d",
    		fontSize: 16,
    		fontFamily: "NanumSquareNeo-Bd",
    		fontWeight: "600",
    		lineHeight: 22,
    		letterSpacing: -0.43,
            top: -8,
  	},
  	reward: {
    		left: 28
  	},
  	content: {
    		left: 104,
  	},
achieveCard: {
  width: "100%",
  height: 80,
  flexDirection: "row",
  alignItems: "center",
},
cardContent: {
  marginLeft: -4,
  flex: 1,
  height: 64,
  borderWidth: 1,
  borderColor: "#eaeced",
  borderStyle: "solid",
  borderRadius: 16,
  justifyContent: "center",
  paddingHorizontal: 12,
},
border: {
  width: 800,
  height: 720,
  top : 108,
  left : -196
},
    item: {
        marginLeft: -160,
        top: 40,
        width: 240,
        height: 12,
        left: 172,
        position: "absolute"
    },
    itemm: {
        marginLeft: -160,
        top: 44,
        height: 4.8,
        left: 168,
        position: "absolute"
    },
    cardList: {
    position: "absolute",
    top: 240,
    left: 20,
    width: "90%",
    },
iconWrapper: {
  width: 64,
  height: 64,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 16,
},
cardBg: {
  width: 64,
  height: 64,
  position: "absolute",
  top: 0,
  left: 0,
},
cardIcon: {
  width: 32,
  height: 32,
  top : -10
},
cardCount: {
  position: "absolute",
  bottom: 10, // 아이콘 기준 아래쪽 정렬
  fontSize: 12,
  color: "#464b53",
  textAlign: "center",
  fontFamily: "NanumSquareNeo-Bd",
  fontWeight: "600",
},
noBarRow: {
  position: "relative",  // title과 icon의 absolute 기준
  width: "100%",
  height: 64,            // 카드 높이에 맞춰 조정
  justifyContent: "center",
},
noBarIcon: {
  width: 80,
  height: 24,
  // 위치는 inline style에서 absolute로 지정
},
view2: {
    top: 40,
    left: 20, // 화면 왼쪽에서 약간 띄우기
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
container: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center", // 좌측 정렬로 카드 사이 간격 최소화
  gap: 2, // 카드 사이 열 간격 (React Native 0.70+에서 지원, 안되면 marginRight/marginBottom 사용)
},

card: {
  width: "32%",      // 3열 유지하면서 카드 조금 키움
  height: 150,       // 높이를 직접 지정, aspectRatio 제거
  marginBottom: 16,   // 행 간격
  justifyContent: "center",
  alignItems: "center",
},


  cardImage: {
    width: "100%",   // 카드 크기 꽉 채우기
    height: "100%",  // 카드 크기 꽉 채우기
    resizeMode: "contain", // 이미지 비율 유지
  },
  scroll:{
    marginTop: -500
  }
});