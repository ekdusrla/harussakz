import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, ImageBackground, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function CultivateDetails() {
  const router = useRouter();
  const { token } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { iconIndex, title, fromServerId, isServerCard } = useLocalSearchParams<{
    iconIndex?: string;
    title?: string;
    fromServerId?: string;
    isServerCard?: string;
  }>();

  const serverCardFlag = !!fromServerId;
  const index = Number(iconIndex) || 0;

  const [showCenterImage, setShowCenterImage] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cardData, setCardData] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false); // 삭제 중 상태

  const detailMap: Record<number, any> = {
    0: require("../assets/images/detail0.png"),
    1: require("../assets/images/detail1.png"),
    2: require("../assets/images/detail2.png"),
    3: require("../assets/images/detail3.png"),
    4: require("../assets/images/detail4.png"),
    5: require("../assets/images/detail5.png"),
    6: require("../assets/images/detail6.png"),
  };

  const growthMessageMap = [
    "당신의 마음을 간직한 씨앗이에요!\n꾸준히 노력하면 씨앗이 열려요",
    "처음으로 싹을 틔운 순간이에요!\n포기하지 않은 의지가 빛나고 있어요",
    "단단히 뿌리내리고 서 있는 순간이에요!\n흔들림 없는 노력이 든든한 힘이 되었어요",
    "꽃이 맺히며 기대를 품고 있어요!\n정성과 열정이 아름답게 피어나려 해요",
    "처음으로 싹을 틔운 순간이에요!\n포기하지 않은 의지가 빛나고 있어요",
    "단단히 뿌리내리고 서 있는 순간이에요!\n흔들림 없는 노력이 든든한 힘이 되었어요",
    "꽃이 맺히며 기대를 품고 있어요!\n정성과 열정이 아름답게 피어나려 해요",
  ];
  const growthLevelMap = [
    "Lv.1 꿈꾸는 씨앗",
    "Lv.2 뿌리내린 새싹",
    "Lv.3 흔들리지 않는 줄기",
    "Lv.4 피어나는 꽃봉오리",
    "Lv.2 뿌리내린 새싹",
    "Lv.3 흔들리지 않는 줄기",
    "Lv.4 피어나는 꽃봉오리",
  ];

  useEffect(() => {
    if (!serverCardFlag) {
      // 로컬 카드
      setCardData({
        level: index,
        routineTitle: title || "루틴 이름 없음",
        plantName: "백합과",
        startDate: "2025-06-03",
        endDate: "2025-12-03",
        repeatDays: ["월", "수"],
        emoji: "🌱",
      });
      return;
    }

    const dayMap: Record<string, string> = {
      SUN: "일",
      MON: "월",
      TUE: "화",
      WED: "수",
      THU: "목",
      FRI: "금",
      SAT: "토",
    };


    const fetchCard = async () => {
  if (!token) return;
  try {
    const res = await fetch("http://3.37.215.53:8080/cultivations/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data: any[] = await res.json();
    const selected = data.find(d => d.id === Number(fromServerId));

    if (selected) {
      const dayMap: Record<string, string> = {
        SUN: "일",
        MON: "월",
        TUE: "화",
        WED: "수",
        THU: "목",
        FRI: "금",
        SAT: "토",
      };

      // ✅ 요일 변환 후 순서 정렬
      const orderedDays = ["월", "화", "수", "목", "금", "토", "일"];
      const koreanDays = selected.routineRepeatDays
        ?.map((day: string) => {
          const normalized = day.slice(0, 3).toUpperCase(); // "MONDAY" → "MON"
          return dayMap[normalized] || "";
        })
        .filter(Boolean)
        .sort((a: string, b: string) => orderedDays.indexOf(a) - orderedDays.indexOf(b));

      setCardData({
        ...selected,
        emoji: selected.emoji && selected.emoji !== "?" ? selected.emoji : "🌱",
        level: selected.level ?? 0,
        routineTitle: selected.routineTitle || selected.title || "루틴 이름 없음",
        startDate: selected.startDate || "2024.12.03",
        endDate: selected.endDate || "2025.12.03",
        repeatDays: koreanDays?.length ? koreanDays : ["월", "수"],
        // ✅ 식물 이름 → 씨앗 종류로 표시
        plantName: selected.breed || "미지의 씨앗",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

    fetchCard();
  }, [fromServerId, token, serverCardFlag, index, title]);

  useEffect(() => {
    const timer = setTimeout(() => setShowCenterImage(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showCenterImage) {
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
    }
  }, [showCenterImage]);

  if (!cardData) return null;
  const level = cardData.level ?? 0;

  const middleImageStyle = fromServerId
  ? { width: 440, height: 340, top: 60, left: 12 } // 서버 카드용
  : { width: 340, height: 320, top: 60, left: 36 }; // 로컬 카드용

  const handleDeleteRoutine = async () => {
  if (!token || !cardData?.routineId) return;
  setIsDeleting(true);

  console.log("루틴 삭제 시도, cardData:", cardData);

  try {
    const res = await fetch("http://3.37.215.53:8080/routines/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ routineId: cardData.routineId }),
    });

    if (res.status === 204) {
      console.log("루틴 삭제 성공");
    } else {
      const text = await res.text();
      console.log("루틴 삭제 서버 응답:", text);
      if (!res.ok) throw new Error(text || "루틴 삭제 실패");
    }

    setModalVisible(false);
    setIsDeleting(false);

    // 삭제 후 목록 강제 갱신
    router.replace({
      pathname: "/cultivate",
      params: { refresh: Date.now() }, // timestamp로 강제 갱신
    });

  } catch (err) {
    console.error("루틴 삭제 실패:", err);
    alert("루틴 삭제 중 오류가 발생했습니다.");
    setIsDeleting(false);
  }
};





  return (
            <ImageBackground
            source={require("../assets/images/cultivatebackground.png")} // ✅ 배경 고정
            style={styles.viewBg}
            resizeMode="cover"
            >
              <View>
                {/* 중간 이미지 */}
            <Image
              source={
                fromServerId
                  ? require("../assets/images/cloud.png") // 서버 카드일 때
                  : require("../assets/images/rainbow.png")  // 로컬 카드일 때
              }
            style={[{ position: "absolute" }, middleImageStyle]}
              resizeMode="contain"
            />
                {/* 상세 이미지 */}
                <Image
                  source={detailMap[level]}
                  style={{
                    position: "absolute",
                    top: 212,
                    width: 132,
                    height: 132,
                    left: "35%",
                  }}
                  resizeMode="contain"
                />

                {/* 버블 이미지 */}
                {showCenterImage && (
          <Animated.Image
            source={
              fromServerId
                ? require("../assets/images/bubble-soso.png") // 서버 카드일 때
                : require("../assets/images/bubble-great.png") // 로컬 카드일 때
            }
            style={[styles.centerImage, { opacity: fadeAnim }]}
            resizeMode="contain"
          />
        )}
        {/* 텍스트 */}
        <View style={styles.child} />
        <Text style={styles.text}>{cardData.routineTitle}</Text>
        <Text style={[styles.safeareaviewText, styles.textPosition2]}>기간:</Text>
        <Text style={[styles.text2, styles.textPosition2]}>
          {cardData.startDate} ~ {cardData.endDate}
        </Text>
        <Text style={[styles.text3, styles.textPosition1]}>주기:</Text>
        <Text style={[styles.text4, styles.textPosition1]}>
          매주 {cardData.repeatDays?.join(" ")}
        </Text>
        <Text style={[styles.text5, styles.textPosition]}>씨앗:</Text>
        <Text style={[styles.text6, styles.textPosition]}>{cardData.plantName}</Text>
        <Text style={[styles.text7, styles.textClr]}>
          {growthMessageMap[level]}
        </Text>
        <Text style={[styles.lv2, styles.lv2Typo]}>
          {growthLevelMap[level]}
        </Text>
		{/* 진행 바 */}
		{!serverCardFlag ? (
		<>
			<Text style={[styles.text9, styles.textTypo]}>다음 성장까지</Text>
			<Text style={[styles.text10, styles.textTypo]}>50%</Text>
			<ImageBackground
			style={[styles.item]}
			source={require("../assets/images/bar0.png")}
			resizeMode="contain"
			/>
			<Image
			style={[styles.itemm]}
			source={require("../assets/images/bar-rainbow.png")}
			resizeMode="contain"
			/>
		</>
		) : (
		<>
			<Text style={[styles.text9, styles.textTypo]}>다음 성장까지</Text>
			<Text style={[styles.text10, styles.textTypo]}>0%</Text>
			<ImageBackground
			style={[styles.item]}
			source={require("../assets/images/bar0.png")}
			resizeMode="contain"
			/>
		</>
		)}
		{serverCardFlag && ( // 서버 카드일 때
		<>
			<Text style={[styles.text9, styles.textTypo]}>다음 성장까지</Text>
			<Text style={[styles.text10, styles.textTypo]}>0%</Text>
		</>
		)}


        {/* 루틴 그만하기 버튼 */}
        <Pressable style={styles.stopRoutineButton} onPress={() => setModalVisible(true)}>
          <Image
            style={styles.stopRoutineIcon}
            source={require("../assets/images/icon-erase.png")}
            resizeMode="contain"
          />
          <Text style={styles.stopRoutineText}>루틴 그만하기</Text>
        </Pressable>

        {/* 뒤로가기 */}
        <Pressable style={[styles.iconBack, styles.wrapPosition]} onPress={() => router.push("/cultivate")} hitSlop={10}>
          <Image style={styles.icon} resizeMode="contain" source={require("../assets/images/icon-back.png")} />
        </Pressable>

        {/* 모달 */}
        <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>루틴을 정말 그만하시겠어요?</Text>
              <Text style={styles.modalMessage}>지금까지의 성장 기록이 모두 사라집니다.</Text>
              <View style={styles.modalButtonRow}>
                <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>취소</Text>
                </Pressable>
				<Pressable
				style={[styles.modalButton, styles.confirmButton]}
				onPress={handleDeleteRoutine}
				>
				<Text style={[styles.modalButtonText, { color: "#fff" }]}>그만하기</Text>
				</Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}



const styles = StyleSheet.create({
  	viewBg: {
    		flex: 1
  	},
  	textPosition2: {
    		color: "#1c1e1f",
    		top: 620,
    		textAlign: "left",
    		letterSpacing: -0.43,
    		fontSize: 14,
			fontWeight: "600",
    		lineHeight: 22,
    		left: "45%",
    		position: "absolute"
  	},
  	textPosition1: {
    		top: 650,
    		textAlign: "center",
    		letterSpacing: -0.43,
    		fontSize: 14,
    		color: "#26282c",
			fontWeight: "600",
    		lineHeight: 22,
    		left: "45%",
    		position: "absolute"
  	},
  	textPosition: {
    		top: 680,
    		textAlign: "left",
    		letterSpacing: -0.43,
    		fontSize: 14,
    		color: "#26282c",
			fontWeight: "600",
    		lineHeight: 22,
    		left: "45%",
    		position: "absolute"
  	},
  	textClr: {
    		color: "#74777d",
    		fontWeight: "600",
			fontFamily: "NanumSquareNeo-Bd"
  	},
  	lv2Typo: {
    		fontSize: 18,
    		top: 520,
    		letterSpacing: -0.43,
    		textAlign: "center",
    		color: "#26282c",
    		fontFamily: "NanumSquareNeo-Eb",
    		fontWeight: "600",
    		lineHeight: 22,
    		left: "45%",
    		position: "absolute"
  	},
  	textTypo: {
    		fontSize: 14,
    		top: 440,
    		textAlign: "left",
    		letterSpacing: -0.43,
    		lineHeight: 22,
    		left: "45%",
    		position: "absolute",
			fontWeight: "600"
  	},
  	child: {
    		marginLeft:-180,
    		top: 360,
    		borderTopLeftRadius: 30,
    		borderTopRightRadius: 30,
    		backgroundColor: "#fff",
    		width: 360,
    		height: 520,
    		left: "50%",
    		position: "absolute",
  	},
  	text: {
    		top: 392,
    		fontSize: 24,
    		textAlign: "center",
    		color: "#26282c",
    		fontFamily: "NanumSquareNeo-Eb",
    		fontWeight: "600",
  	},
  	safeareaviewText: {
    		textAlign: "left",
    		fontWeight: "600",
    		marginLeft: -133,
			fontFamily: "NanumSquareNeo-Bd",
  	},
  	text2: {
    		marginLeft: -93,
    		textAlign: "left",
			fontFamily: "NanumSquareNeo-Rg",
  	},
  	text3: {
    		fontWeight: "600",
    		marginLeft: -133,
			fontFamily: "NanumSquareNeo-Bd",
  	},
  	text4: {
    		marginLeft: -93,
			fontFamily: "NanumSquareNeo-Rg",
  	},
  	text5: {
    		fontWeight: "600",
    		marginLeft: -133,
			fontFamily: "NanumSquareNeo-Bd",
  	},
  	text6: {
    		marginLeft: -93,
			fontFamily: "NanumSquareNeo-Rg",
  	},
  	text7: {
    		top: 552,
    		fontSize: 12,
    		letterSpacing: 0.8,
    		lineHeight: 16,
    		textAlign: "left",
    		marginLeft: -133,
    		color: "#74777d",
    		left: "45%",
    		position: "absolute"
  	},
  	lv2: {
    		marginLeft: -132
  	},
  	text9: {
    		marginLeft: -140,
    		color: "#74777d",
    		fontWeight: "600",
			fontFamily: "NanumSquareNeo-Bd",
  	},
  	text10: {
    		marginLeft: 150,
    		color: "#91e04c",
    		fontWeight: "600",
    		fontSize: 14,
    		top: 378,
			fontFamily: "NanumSquareNeo-Eb",
  	},
	 iconBack: {
            top: 0,
            width: 55
    },
        icon: {
        top: 36,
        left: 20,
        width: 20,
        height: 20,
        position: "absolute",
        overflow: "hidden"
    },
        wrapPosition: {
            height: 60,
            left: 0,
            position: "absolute"
    },
	centerImage: {
		position: "absolute",
		width: 120,
		height: 100,
		marginLeft: 148,
		marginTop: 120,
		zIndex:10
		},
		modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  justifyContent: "center",
  alignItems: "center",
},
modalContainer: {
  width: 280,
  backgroundColor: "#fff",
  borderRadius: 16,
  padding: 24,
  alignItems: "center",
},
modalTitle: {
  fontSize: 18,
  fontWeight: "600",
  marginBottom: 12,
  color: "#26282c",
  textAlign: "center",
  fontFamily: "NanumSquareNeo-Eb",
},
modalMessage: {
  fontSize: 14,
  color: "#74777d",
  textAlign: "center",
  lineHeight: 20,
  marginBottom: 20,
  fontFamily: "NanumSquareNeo-Rg",
},
modalButtonRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
},
modalButton: {
  flex: 1,
  paddingVertical: 12,
  borderRadius: 12,
  alignItems: "center",
  marginHorizontal: 6,
},
cancelButton: {
  backgroundColor: "#EEF3F6",
},
confirmButton: {
  backgroundColor: "#FF6337",
},
modalButtonText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#9EA4A9",
  fontFamily: "NanumSquareNeo-Eb",
},
stopRoutineButton: {
  position: "absolute",
  top: 820,
  left: 260,
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 8,
  paddingHorizontal: 8,
  borderRadius: 8,
},

stopRoutineIcon: {
  width: 16,
  height: 16,
  marginRight: 6,
},

stopRoutineText: {
  color: "#ff6337",
  fontSize: 16,
  fontFamily: "NanumSquareNeo-Rg",
  fontWeight: "600",
},
    item: {
            marginLeft: -160,
            top: 462,
            width: 320,
            height: 28,
			left: "50%",
            position: "absolute"
    },
	itemm: {
            marginLeft: -160,
            top: 460,
            width: 160,
			left: "50%",
            position: "absolute"
    },



});