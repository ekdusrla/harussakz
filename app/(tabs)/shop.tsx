import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// 아이템 타입 정의
type ShopItem = {
  img: any;
  name: string;
};

export default function Shop() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const decoItems: ShopItem[] = [
    { img: require("../../assets/images/deco-castle.png"), name: "동화 속 성" },
    { img: require("../../assets/images/deco-pebbles.png"), name: "조약돌 길" },
    { img: require("../../assets/images/deco-tree.png"), name: "둥근 나무" },
    { img: require("../../assets/images/deco-clover.png"), name: "세잎클로버" },
    { img: require("../../assets/images/deco-bridge.png"), name: "나무 다리" },
    { img: require("../../assets/images/deco-wildflower.png"), name: "코스모스" },
    { img: require("../../assets/images/deco-plants.png"), name: "잔디와 풀" },
  ];

  // 하늘 아이템 배열
  const skyItems = [
    { img: require("../../assets/images/background-morning.png"), name: "아침 햇살" },
    { img: require("../../assets/images/background-night.png"), name: "별밤 하늘" },
    { img: require("../../assets/images/background-sunset.png"), name: "노을빛 하늘" },
    { img: require("../../assets/images/background-dawn.png"), name: "새벽 하늘" },
    { img: require("../../assets/images/background-purple.png"), name: "보랏빛 하늘" },
    { img: require("../../assets/images/background-sea.png"), name: "바닷속 세상" },
  ];

  // 아이템 클릭 시 팝업 열기
  const handleItemPress = (item: ShopItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

  return (
    <ScrollView style={styles.safeareaview} contentContainerStyle={{ paddingBottom: 50 }}>
      <View style={styles.viewBg}>
        {/* 씨앗 표시 */}
        <View style={[styles.view5, styles.viewFlexBox]}>
          <Image
            style={styles.itemIcon}
            resizeMode="contain"
            source={require("../../assets/images/icon-seed.png")}
          />
          <View style={[styles.view6, styles.viewFlexBox]}>
            <Text style={styles.text15}>1234 개</Text>
          </View>
        </View>
                <Pressable
        onPress={() => router.push("/login")} hitSlop={10}
        style={[
            styles.item0,
            { zIndex: 10 },
        ]}
        >
        <Image
            source={require("../../assets/images/icon-menu.png")}
            resizeMode="contain"
            style={{ width: 44, height: 44 }}
        />
        </Pressable>

        {/* ===== 안내 배너 ===== */}
        <View style={styles.bannerContainer}>
          <ImageBackground
            source={require("../../assets/images/shopbanner.png")}
            style={styles.bannerImage}
            imageStyle={{ borderRadius: 0 }}
          >
            <Text style={styles.bannerText1}>베타 버전</Text>
            <Text style={styles.bannerText}>전 상품 무료!</Text>
            <Text style={styles.bannerSub}>* 아이템 구매시 씨앗이 차감되지 않습니다</Text>
          </ImageBackground>
        </View>

        {/* 장식 섹션 */}
        <Text style={[styles.sectionTitle]}>장식</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={styles.twoRowWrapper}>
            <View style={styles.row}>
              {decoItems
                .filter((_, idx) => idx % 2 === 0)
                .map((item, idx) => (
<Pressable
  key={`deco-top-${idx}`}
  style={styles.itemCard}
  onPress={() => handleItemPress(item)}
>
  <Image
    source={item.img}
    style={item.name === "동화 속 성" ? styles.itemImage : styles.itemImageLarge}
    resizeMode="contain"
  />
  <Text style={styles.itemText}>{item.name}</Text>

  {/* 씨앗 표시 대신 구매 완료 표시 */}
  {purchasedItems.includes(item.name) ? (
    <View style={styles.purchaseWrapper}>
      <Image
        source={require("../../assets/images/seedstamp.png")} // ✅ 구매완료 아이콘 (새로 넣으실 이미지)
        style={styles.purchaseIcon}
        resizeMode="contain"
      />
      <Text style={styles.purchaseDoneText}>구매 완료</Text>
    </View>
  ) : (
    <View style={[styles.view55, styles.viewFlexBox]}>
      <Image
        style={styles.itemIcon}
        resizeMode="contain"
        source={require("../../assets/images/icon-seed.png")}
      />
      <View style={[styles.view6, styles.viewFlexBox]}>
        <Text style={styles.text15}>122 개</Text>
      </View>
      </View>
      )}
    </Pressable>
                ))}
            </View>

                        {/* 아래줄 */}
            <View style={styles.row}>
            {decoItems
                .filter((_, idx) => idx % 2 === 1)
                .map((item, idx) => (
                <Pressable
  key={`deco-bottom-${idx}`}
  style={styles.itemCard}
  onPress={() => handleItemPress(item)}
>
  <Image
    source={item.img}
    style={item.name === "동화 속 성" ? styles.itemImage : styles.itemImageLarge}
    resizeMode="cover"
  />
  <Text style={styles.itemText}>{item.name}</Text>

  {/* 씨앗 표시 대신 구매 완료 표시 */}
  {purchasedItems.includes(item.name) ? (
    <View style={styles.purchaseWrapper}>
      <Image
        source={require("../../assets/images/seedstamp.png")} // ✅ 구매완료 아이콘 (새로 넣으실 이미지)
        style={styles.purchaseIcon}
        resizeMode="contain"
      />
      <Text style={styles.purchaseDoneText}>구매 완료</Text>
    </View>
  ) : (
    <View style={[styles.view55, styles.viewFlexBox]}>
      <Image
        style={styles.itemIcon}
        resizeMode="contain"
        source={require("../../assets/images/icon-seed.png")}
      />
      <View style={[styles.view6, styles.viewFlexBox]}>
        <Text style={styles.text15}>122 개</Text>
      </View>
    </View>
  )}
</Pressable>
                ))}
            </View>
          </View>
        </ScrollView>

        

{/* ===== 하늘 섹션 ===== */}
<Text style={[styles.sectionTitle]}>하늘</Text>
<ScrollView horizontal showsHorizontalScrollIndicator={true}>
  <View style={styles.twoRowWrapper}>
    {/* 위줄 */}
    <View style={styles.row}>
      {skyItems
        .filter((_, idx) => idx % 2 === 0)
        .map((item, idx) => (
          <Pressable
            key={`sky-top-${idx}`}
            style={styles.itemCard}
            onPress={() => handleItemPress(item)}
          >
            <Image
              source={item.img}
              style={styles.skyItemImage}
              resizeMode="cover"
            />
            <Text style={styles.itemText}>{item.name}</Text>

            {/* ✅ 구매 여부 체크 */}
            {purchasedItems.includes(item.name) ? (
              <View style={styles.purchaseWrapper}>
                <Image
                  source={require("../../assets/images/seedstamp.png")} // 구매완료 아이콘
                  style={styles.purchaseIcon}
                  resizeMode="contain"
                />
                <Text style={styles.purchaseDoneText}>구매 완료</Text>
              </View>
            ) : (
              <View style={[styles.view55, styles.viewFlexBox]}>
                <Image
                  style={styles.itemIcon}
                  resizeMode="contain"
                  source={require("../../assets/images/icon-seed.png")}
                />
                <View style={[styles.view6, styles.viewFlexBox]}>
                  <Text style={styles.text15}>122 개</Text>
                </View>
              </View>
            )}
          </Pressable>
        ))}
    </View>

    {/* 아래줄 */}
    <View style={styles.row}>
      {skyItems
        .filter((_, idx) => idx % 2 === 1)
        .map((item, idx) => (
          <Pressable
            key={`sky-bottom-${idx}`}
            style={styles.itemCard}
            onPress={() => handleItemPress(item)}
          >
            <Image
              source={item.img}
              style={styles.skyItemImage}
              resizeMode="cover"
            />
            <Text style={styles.itemText}>{item.name}</Text>

            {/* ✅ 구매 여부 체크 */}
            {purchasedItems.includes(item.name) ? (
              <View style={styles.purchaseWrapper}>
                <Image
                  source={require("../../assets/images/seedstamp.png")}
                  style={styles.purchaseIcon}
                  resizeMode="contain"
                />
                <Text style={styles.purchaseDoneText}>구매 완료</Text>
              </View>
            ) : (
              <View style={[styles.view55, styles.viewFlexBox]}>
                <Image
                  style={styles.itemIcon}
                  resizeMode="contain"
                  source={require("../../assets/images/icon-seed.png")}
                />
                <View style={[styles.view6, styles.viewFlexBox]}>
                  <Text style={styles.text15}>122 개</Text>
                </View>
              </View>
            )}
          </Pressable>
        ))}
    </View>
  </View>
</ScrollView>



        {/* Modal 팝업 */}
        <Modal visible={modalVisible} transparent animationType="fade">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      {/* 제목 */}
      <View style={styles.titleWrapper}>
        <Text style={styles.itemName}>"{selectedItem?.name}"</Text>
        <Text style={styles.titleText}>을 구매할까요?</Text>
      </View>

      {/* 소비 씨앗 */}
      <View style={styles.seedWrapper}>
        <Text style={styles.seedLabel}>소비 씨앗 :</Text>
        <Image style={styles.icon} width={15} height={11} resizeMode="contain"
                source={require("../../assets/images/icon-seed.png")} />  
        <Text style={styles.seedOld}>112</Text>
        <Text style={styles.seedCost}>0</Text>
        <Text style={styles.seedUnit}>개</Text>
      </View>

      {/* 버튼 */}
      <View style={styles.buttonWrapper}>
        <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.cancelText}>취소</Text>
        </Pressable>
        <Pressable
          style={styles.purchaseButton}
          onPress={() => {
            if (selectedItem) {
              setPurchasedItems((prev) => [...prev, selectedItem.name]);
            }
            setModalVisible(false);
          }}
        >
          <Text style={styles.purchaseText}>구매하기</Text>
        </Pressable>

      </View>
    </View>
  </View>
</Modal>

      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  viewBg: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#26282c",
    marginTop: 40,
    marginBottom: 12,
    fontFamily: "NanumSquareNeo-Eb",
  },
  /* 배너 */
  bannerContainer: {
    marginTop: 0,
    marginLeft: -30,
    marginBottom: -52
  },
  bannerImage: {
    width: "105%",
    height: 300,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  bannerText1: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "NanumSquareNeo-Bd",
    color: "#FBD730",
    marginLeft: 28,
  },
  bannerText: {
    fontSize: 48,
    fontWeight: "800",
    fontFamily: "NanumSquareNeo-Hv",
    color: "#F6F8FA",
    marginBottom: 4,
    marginLeft: 28,
  },
  bannerSub: {
    fontSize: 12,
    color: "#EAECED",
    fontFamily: "Pretendard-Medium",
    marginLeft: 28,
    marginTop: 36,
  },
  /* 카드 */
  scrollContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 16,
    columnGap: 16,
    height: 340, // 2줄이 들어갈 수 있게 높이 지정
    paddingRight: 20,
  },
  itemImage: {
    width: 48,
    height: 84,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#464B53",
    fontFamily: "NanumSquareNeo-Bd",
    marginBottom: 4
  },
  /* 씨앗 표시 */
  view5: {
    marginTop: 24,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderColor: "#fff",
    borderWidth: 0.8,
    height: 28,
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 30,
    alignItems: "center",
    overflow: "hidden",
    flexDirection: "row",
    		boxShadow: "2px 2px 12px rgba(218, 222, 225, 0.5)",
    		shadowColor: "rgba(218, 222, 225, 0.25)",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 12,
    elevation: 12,
    shadowOpacity: 1,
  },
    view55: {
    marginBottom: -4,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderColor: "#fff",
    borderWidth: 0.8,
    height: 28,
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 30,
    alignItems: "center",
    overflow: "hidden",
    flexDirection: "row",
    shadowColor: "rgba(158, 164, 169, 0.25)",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 12,
    elevation: 12,
    shadowOpacity: 1,
  },
  viewFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  itemIcon: {
    width: 20,
    height: 14,
  },
  text15: {
    fontSize: 12,
    fontWeight: "600",
    color: "#26282c",
    fontFamily: "NanumSquareNeo-Bd",
    marginLeft: 6,
  },
  view6: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginTop: -2,
  },
  twoRowWrapper: {
  flexDirection: "column", // 위아래로 두 줄
  gap: 8,
  marginTop: 8                 // 줄 간격
},
row: {
  flexDirection: "row",    // 가로로 나열
  gap: 10,                 // 아이템 간격
},
itemCard: {
  width: 112,
  height: 148,
  borderRadius: 16,
  backgroundColor: "#EAECED",
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "rgba(0,0,0,0.1)",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 4,
  elevation: 4,
  marginBottom: 8,
},
skyItemImage: {
  width:52,   // 원하는 가로 크기
  height: 80,  // 원하는 세로 크기
  marginBottom: 5,
},
itemImageLarge: {
  width: 80,   // 다른 카드들 좀 더 큰 크기
  height: 72,
  marginBottom: 5,
},
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    height: 160,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "NanumSquareNeo-Bd",
    color: "#1c1e1f",
    marginRight: 4,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "NanumSquareNeo-Bd",
    color: "#1c1e1f",
  },
  seedWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  seedLabel: {
    fontSize: 16,
    fontFamily: "Pretendard",
    color: "#26282c",
    marginRight: 4,
  },
  seedOld: {
    fontSize: 20,
    fontFamily: "NanumSquareNeo-Rg",
    textDecorationLine: "line-through",
    color: "#9ea4a9",
    fontStyle: "italic",
    marginLeft : 4
  },
  seedCost: {
    fontSize: 20,
    fontFamily: "NanumSquareNeo-Rg",
    fontWeight: "600",
    color: "#26282c",
    marginRight: 4,
    fontStyle: "italic",
    marginLeft : 8
  },
  seedUnit: {
    fontSize: 20,
    fontFamily: "NanumSquareNeo-Rg",
    color: "#26282c",
    fontStyle: "italic",
    marginLeft: -4
  },
  icon: {
    marginLeft: 4,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",

  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#eef3f6",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  purchaseButton: {
    flex: 1,
    backgroundColor: "#91e04c",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9ea4a9",
    fontFamily: "NanumSquareNeo-Eb",
  },
  purchaseText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "NanumSquareNeo-Eb",
  },
  purchaseWrapper: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 5,
},

purchaseIcon: {
  width: 16,
  height: 16,
  marginRight: 4,
},

purchaseDoneText: {
  fontSize: 14,
  fontFamily: "NanumSquareNeo-Bd",
  color: "#1C1E1F", // 초록색 같은 강조 컬러
},
    item0: {
        position: "absolute",
        left : 340,
        top : 35
  	},



});