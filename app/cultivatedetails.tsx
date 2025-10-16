import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, ImageBackground, Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function CultivateDatails() {

	const router = useRouter();

	const [showCenterImage, setShowCenterImage] = useState(false);
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const { iconIndex, title } = useLocalSearchParams<{ iconIndex?: string; title?: string }>();
	const index = Number(iconIndex) || 0;
	const routineName = title || "루틴 이름 없음";

	const [modalVisible, setModalVisible] = useState(false);

	const detailMap: Record<number, any> = {
	0: require("../assets/images/detail0.png"),
	1: require("../assets/images/detail1.png"),
	2: require("../assets/images/detail2.png"),
	3: require("../assets/images/detail3.png"),
	4: require("../assets/images/detail4.png"),
	5: require("../assets/images/detail5.png"),
	6: require("../assets/images/detail6.png"),
	};

	useEffect(() => {
		const timer = setTimeout(() => {
		setShowCenterImage(true);
		}, 2500);
		return () => clearTimeout(timer);
	}, []);

	// fade-in 애니메이션
	useEffect(() => {
		if (showCenterImage) {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start();
		}
	}, [showCenterImage]);


	// index에 따라 문구 설정
	let growthMessage = "";
	let growthLevel = "";

	if (index === 0) {
	growthMessage = `당신의 마음을 간직한 씨앗이에요!\n꾸준히 노력하면 씨앗이 열려요`;
	growthLevel = "Lv.1 꿈꾸는 씨앗";
	} else if (index === 1 || index === 4) {
	growthMessage = `처음으로 싹을 틔운 순간이에요!\n포기하지 않은 의지가 빛나고 있어요`;
	growthLevel = "Lv.2 뿌리내린 새싹";
	} else if (index === 2 || index === 5) {
	growthMessage = `단단히 뿌리내리고 서 있는 순간이에요!\n흔들림 없는 노력이 든든한 힘이 되었어요`;
	growthLevel = "Lv.3 흔들리지 않는 줄기";
	} else if (index === 3 || index === 6) {
	growthMessage = `꽃이 맺히며 기대를 품고 있어요!\n정성과 열정이 아름답게 피어나려 해요`;
	growthLevel = "Lv.4 피어나는 꽃봉오리";
	}
      	return (
			    <ImageBackground
					source={require("../assets/images/cultivatebackground.png")} // ✅ 배경 이미지 경로
					style={styles.viewBg} // 기존 viewBg 그대로 사용
					resizeMode="cover" // cover, contain, stretch 중 선택 가능
					>
      			<View>
				<Image
				source={require("../assets/images/rainbow.png")}
				style={{
					position: "absolute",
					top: 80, // ✅ 이미지 width 120의 절반
					width: 300,
					height: 300,
					left: 60
				}}
				resizeMode="contain"
				/>
				<Image
				source={detailMap[index]}  // ✅ iconIndex에 따라 detail 이미지 선택
				style={{
					position: "absolute",
					top: 208,
					width: 132,
					height: 132,
					left: "35%"
				}}
				resizeMode="contain"
				/>
				{showCenterImage && (
				<Animated.Image
					source={require("../assets/images/bubble-great.png")}
					style={[styles.centerImage, { opacity: fadeAnim }]}
					resizeMode="contain"
				/>
				)}
        				<View style={styles.child} />
        				<Text style={styles.text}>{routineName}</Text>
        				<Text style={[styles.safeareaviewText, styles.textPosition2]}>기간 :</Text>
        				<Text style={[styles.text2, styles.textPosition2]}>2024.12.03-2025.12.03</Text>
        				<Text style={[styles.text3, styles.textPosition1]}>주기 :</Text>
        				<Text style={[styles.text4, styles.textPosition1]}>매주 월 수</Text>
        				<Text style={[styles.text5, styles.textPosition]}>씨앗 :</Text>
        				<Text style={[styles.text6, styles.textPosition]}>백합과</Text>
						<Text style={[styles.text7, styles.textClr]}>{growthMessage}</Text>
						<Text style={[styles.lv2, styles.lv2Typo]}>{growthLevel}</Text>
        				<Text style={[styles.text9, styles.textTypo]}>다음 성장까지</Text>
        				<Text style={[styles.text10, styles.textTypo]}>50%</Text>
						<ImageBackground style={[styles.item]}
							source={require("../assets/images/bar0.png")}
							resizeMode="contain"
						/>
						<Image style={[styles.itemm]}
							source={require("../assets/images/bar-rainbow.png")}
							resizeMode="contain"
						/>
						<Pressable
						style={styles.stopRoutineButton}
						onPress={() => setModalVisible(true)}
						>
						<Image
							style={styles.stopRoutineIcon}
							source={require("../assets/images/icon-erase.png")}
							resizeMode="contain"
						/>
						<Text style={styles.stopRoutineText}>루틴 그만하기</Text>
						</Pressable>
						<Pressable style={[styles.iconBack, styles.wrapPosition]} onPress={()=> router.push("/cultivate")}>
						<Image style={styles.icon} resizeMode="contain" source={require("../assets/images/icon-back.png")} />
						</Pressable>
      			</View>
				<Modal
					visible={modalVisible}
					transparent
					animationType="fade"
					onRequestClose={() => setModalVisible(false)}
					>
					<View style={styles.modalOverlay}>
						<View style={styles.modalContainer}>
						<Text style={styles.modalTitle}>루틴을 정말 그만하시겠어요?</Text>
						<Text style={styles.modalMessage}>
							지금까지의 성장 기록이 모두 사라집니다.
						</Text>
						<View style={styles.modalButtonRow}>
							<Pressable
							style={[styles.modalButton, styles.cancelButton]}
							onPress={() => setModalVisible(false)}
							>
							<Text style={styles.modalButtonText}>취소</Text>
							</Pressable>
							<Pressable
							style={[styles.modalButton, styles.confirmButton]}
							onPress={() => {
								setModalVisible(false);
								router.push("/cultivate"); // ✅ "그만하기" 후 이동 (필요 없으면 제거 가능)
							}}
							>
							<Text style={[styles.modalButtonText, { color: "#fff" }]}>
								그만하기
							</Text>
							</Pressable>
						</View>
						</View>
					</View>
					</Modal>
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
    		marginLeft: -180,
    		top: 360,
    		borderTopLeftRadius: 30,
    		borderTopRightRadius: 30,
    		backgroundColor: "#fff",
    		width: 360,
    		height: 520,
    		left: "50%",
    		position: "absolute"
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
		marginTop: 132 // height / 2
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