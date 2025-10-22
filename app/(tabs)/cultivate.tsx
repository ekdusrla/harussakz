import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Cultivate() {

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const router = useRouter();

  // 카드에 들어갈 데이터
const cards = [
  { id: 1, emoji: "📖", title: "(예시)도서 30분 읽기", dday: "D-123", icon: require("../../assets/images/growth0.png"), iconIndex: 0 },
  { id: 2, emoji: "💊", title: "(예시)영양제 섭취", dday: "D-100", icon: require("../../assets/images/growth1.png"), iconIndex: 1 },
  { id: 3, emoji: "🚶", title: "(예시)산책 1시간 하기", dday: "D-78", icon: require("../../assets/images/growth2.png"), iconIndex: 2 },
  { id: 4, emoji: "👤", title: "(예시)오늘도 우렁차게 살아남기", dday: "D-54", icon: require("../../assets/images/growth3.png"), iconIndex: 3 },
  { id: 5, emoji: "🌞", title: "(예시)오전 9시에 일어나기", dday: "D-42", icon: require("../../assets/images/growth4.png"), iconIndex: 4 },
  { id: 6, emoji: "🌛", title: "(예시)오후 10시에 잠들기", dday: "D-21", icon: require("../../assets/images/growth5.png"), iconIndex: 5 },
  { id: 7, emoji: "🌞", title: "(예시)쾌변하기", dday: "D-13", icon: require("../../assets/images/growth6.png"), iconIndex: 6 },
];


  return (
    <View style={styles.safeareaview}>
      {/* 카드 리스트 */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={[styles.view2, styles.viewFlexBox]}>
          <Image
            style={styles.item}
            width={20}
            height={14}
            resizeMode="contain"
            source={require("../../assets/images/icon-seed.png")}
          />
          <View style={[styles.view3, styles.viewFlexBox]}>
            <Text style={styles.text15}>1234 개</Text>
          </View>
        </View>

        <View style={{ position: "relative" }}>
          {/* ❓ 질문 아이콘 버튼 */}
          <Pressable
            onPress={() => setIsTooltipVisible((prev) => !prev)}
            style={[styles.iconGridCalendar, styles.d2Parent2Layout]}
          >
            <Image
              style={styles.item}
              width={24}
              height={24}
              source={require("../../assets/images/icon-question.png")}
              resizeMode="contain"
            />
          </Pressable>

          {/* 💬 말풍선 */}
          {isTooltipVisible && (
            <ImageBackground
              source={require("../../assets/images/questionbubble.png")}
              style={styles.tooltipImage}
              resizeMode="contain"
            />
          )}
        </View>

        {/* 상단 바 */}
        <View style={styles.topBar}></View>

        {/* 제목 */}
        <Text style={styles.title}>나의 정원</Text>
        <Text style={styles.subtitle}>식물과 함께 성장하는 우리의 하루</Text>
        <Image
          style={styles.item1}
          width={360}
          height={96}
          resizeMode="cover"
          source={require("../../assets/images/ground.png")}
        />

        {/* ✅ 카드 리스트 렌더링 */}
        <View style={styles.cardContainer}>
          {cards.map((card) => (
            <Pressable
              key={card.id}
              onPress={() =>
                router.push({
                  pathname: "/cultivatedetails",
                  params: { 
                    iconIndex: card.iconIndex.toString(), // 이미지용
                    title: card.title,             // 루틴 이름 전달
                  }, // ✅ 이미지 번호 전달
                })
              }
              style={({ pressed }) => [
                styles.card,
                pressed && { opacity: 0.7 }, // 눌렀을 때 시각적 피드백
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.emojiCircle}>
                  <Text style={styles.emoji}>{card.emoji}</Text>
                </View>
                <Text style={styles.dday}>{card.dday}</Text>
              </View>

              <Image source={card.icon} style={styles.cardImage} resizeMode="contain" />
              
              <Text style={styles.cardTitle}>
                {card.title.length > 7 ? card.title.slice(0, 7) + "…" : card.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#26282c",
    textAlign: "center",
    marginTop: 24,
    fontFamily: "NanumSquareNeo-Eb",
  },
  subtitle: {
    textAlign: "center",
    color: "#74777d",
    fontSize: 14,
    marginBottom: 28,
    marginTop: 10,
    fontFamily: "Pretendard-Regular",
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#eaeced",
    paddingVertical: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  dday: {
    color: "#9EA4A9",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "NanumSquareNeo-Bd",
  },
  emojiCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f3f4f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  emoji: {
    fontSize: 16,
  },
  cardImage: {
    width: 100,
    height: 100,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    color: "#1c1e1f",
    textAlign: "center",
    fontFamily: "NanumSquareNeo-Rg",
  },
  item: {
    		width: 20,
    		height: 14
  	},
    
  item1: {
    		width: 400,
    		height: 60,
            marginLeft: 8
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
    view2: {
    		top: 44,
    		boxShadow: "2px 2px 12px rgba(218, 222, 225, 0.25)",
    		shadowColor: "rgba(218, 222, 225, 0.25)",
    		shadowOffset: {
      			width: 2,
      			height: 2
    		},
    		shadowRadius: 12,
    		elevation: 12,
    		shadowOpacity: 1,
    		backgroundColor: "rgba(255, 255, 255, 0.6)",
    		borderStyle: "solid",
    		borderColor: "#fff",
    		borderWidth: 0.8,
    		height: 28,
    		paddingHorizontal: 8,
    		paddingVertical: 7,
    		gap: 2,
    		borderRadius: 30,
    		alignItems: "center",
    		overflow: "hidden",
    		left: 4,
    		position: "absolute"
  	},
  	viewFlexBox: {
    		alignItems: "center",
    		flexDirection: "row"
  	},
    iconGridCalendar: { left: 340, width: 28, top: 40, height: 28 },
    d2Parent2Layout: { height: 28, position: "absolute" },
    tooltipImage: {
    position: "absolute", // 절대 위치
    top: 68,              // 아이콘 바로 아래
    left: 208,            // 아이콘 기준 위치 (필요 시 조정)
    width: 160,           // 말풍선 이미지 크기
    height: 60,           // 말풍선 이미지 높이
    justifyContent: "center", // 텍스트 수직 중앙
    alignItems: "center",     // 텍스트 수평 중앙
    zIndex: 100,
    },
    cardHeader: {
    flexDirection: "row",   // 아이콘과 D-2 가로 배치
    alignItems: "center",   // 수직 중앙 정렬
    marginBottom: 8,        // 카드 내부 여백
    gap: 6,                 // 아이콘과 D-2 사이 간격
    },




});