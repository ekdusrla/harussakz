import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PlantDetails() {
  const router = useRouter();

  const routines = [
    { id: 1, title: "도서 30분 읽기"},
    { id: 2, title: "오늘도 우렁차게 살아남기"},
  ];

const flowerImages: Record<string, { main: any; info: any }> = {
  hydrangea: {
    main: require("../assets/images/achieve-hydrangea.png"),
    info: require("../assets/images/achieve-hydrangea-info.png"),
  },
  lily: {
    main: require("../assets/images/achieve-lily.png"),
    info: require("../assets/images/achieve-lily-info.png"),
  },
  tulip: {
    main: require("../assets/images/achieve-tulip.png"),
    info: require("../assets/images/achieve-tulip-info.png"),
  },
  freesia: {
    main: require("../assets/images/achieve-freesia.png"),
    info: require("../assets/images/achieve-freesia-info.png"),
  },
  sunflower: {
    main: require("../assets/images/achieve-sunflower.png"),
    info: require("../assets/images/achieve-sunflower-info.png"),
  },
};

// flowerType 파라미터 처리
const { flowerType } = useLocalSearchParams() as { flowerType?: string };
const selectedFlower = flowerType ? flowerType.toLowerCase() : "freesia";

// 선택된 꽃 데이터
const flowerData = flowerImages[selectedFlower] || flowerImages["freesia"];




  return (
    <View style={styles.view}>
      {/* 뒤로가기 버튼 */}
      <Pressable
        style={styles.iconBack}
        onPress={() => router.push({ pathname: "/achieve", params: { tab: "plant" } })}
      >
        <Image
          style={styles.icon}
          resizeMode="contain"
          source={require("../assets/images/icon-back.png")}
        />
      </Pressable>

      {/* 스크롤뷰 */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
<Image
  source={flowerData.main}
  style={styles.mainImage}
  resizeMode="contain"
/>

<Image
  source={flowerData.info}
  style={styles.infoImage}
  resizeMode="contain"
/>

        {/* 루틴 섹션 */}
        <Text style={styles.routine}>루틴</Text>

        <View style={styles.routineList}>
        {routines.map((routine) => (
        <View key={routine.id} style={styles.routineCard}>
            <Text style={styles.routineTitle}>{routine.title}</Text>
            {/* 🔹 자세히 보기 버튼 추가 */}
            <Pressable
            style={styles.detailButton}
            onPress={() =>
                router.push({
                pathname: "/routinedetails",
                params: { id: routine.id, title: routine.title },
                })
            }
            >
            <Text style={styles.detailText}>자세히</Text>
            </Pressable>
        </View>
        ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContent: {
    paddingVertical: 60,
    alignItems: "center",
  },
  iconBack: {
    position: "absolute",
    top: 36,
    left: 20,
    zIndex: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  mainImage: {
    width: 340,
    height: 340,
  },
  infoImage: {
    width: 340,
    height: 340,
    marginBottom: 20,
    marginTop: -40
  },
  routine: {
    fontFamily: "NanumSquareNeo-Eb",
    fontSize: 24,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginLeft: 36,
    marginBottom: 16,
  },
  routineList: {
    width: "90%",
    gap: 12,
  },
  routineCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  routineTitle: {
    fontFamily: "Pretendard-Regular",
    fontSize: 18,
    color: "#26282C",
  },
detailButton: {
  alignSelf: "flex-end",
  backgroundColor: "#91E04C",
  paddingHorizontal: 24,
  paddingVertical: 8,
  borderRadius: 12,
  marginTop:-28
},
detailText: {
  fontFamily: "NanumSquareNeo-Bd",
  color: "#fff",
  fontSize: 16,
},

});