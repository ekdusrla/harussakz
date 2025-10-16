import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";


export default function GenerateRoutine4() {

    const router = useRouter();
	const { routine, period, selectedDays } = useLocalSearchParams();

	const parsedDays =
	typeof selectedDays === "string" ? JSON.parse(selectedDays) : [];


    return (
        <View style={styles.safeareaview}>
            <View style={[styles.view, styles.viewBg]}>
                    <Text style={styles.text}>확인</Text>
                    <Image style={[styles.frameIcon, styles.frameIconPosition]} width={153} height={28} source={require("../assets/images/bar4.png")}/>
                    <Text style={styles.safeareaviewText}>루틴이 완성되었어요!</Text>
                    <Image style={[styles.untitled8Icon, styles.itemPosition]} resizeMode="cover" source={require("../assets/images/detail0.png")}/>
                    <Text style={[styles.text5, styles.textTypo]}>루틴</Text>
                    <Text style={[styles.text4, styles.textPosition3]}>설정기간</Text>
                    <Text style={[styles.text8, styles.textPosition2]}>주기</Text>
                    <Text style={[styles.text10, styles.textPosition1]}>씨앗</Text>
					<Text style={[styles.text7, styles.textFlexBox]}>{routine}</Text>
					<Text style={[styles.text6, styles.textFlexBox]}>{period}</Text>
					<Text style={[styles.text9, styles.textPosition5]}>
					{parsedDays.length > 0 ? `매주 ${parsedDays.join(" ")}` : ""}
					</Text>
                    <Text style={[styles.text11, styles.textPosition6]}>백합과</Text>
                    <View style={[styles.inner, styles.innerLayout]} />
                    <View style={[styles.lineView, styles.innerLayout]} />
                    <View style={[styles.safeareaviewChild, styles.innerLayout]} />
                    <View style={styles.child2} />
                    <View style={[styles.buttonWrap, styles.frameIconPosition]}>
                            <Pressable
                                    style={[
                                    styles.wrapper7,
                                    styles.wrapperLayout,
                                    ]}
                                    onPress={() => router.push("/(tabs)/routine")}
                                    >
                                    <Text style={[styles.text15, styles.textPosition]}>확인</Text>
                                    </Pressable>
                            <Pressable
                            style={[styles.wrapper8, styles.wrapperLayout]}
                            onPress={() => router.push("/generateroutine3")}
                            >
                            <Text style={[styles.text16, styles.textPosition]}>이전으로</Text>
                            </Pressable>
                    </View>
            </View>
        </View>
    );

}


const styles = StyleSheet.create({
  	safeareaview: {
    		backgroundColor: "#f8f8f8",
    		flex: 1
  	},
  	viewBg: {
    		overflow: "hidden",
    		backgroundColor: "#f8f8f8"
  	},
  	itemPosition: {
    		left: "50%",
    		position: "absolute"
  	},
  	textPosition3: {
    		top: 507,
    		fontFamily: "NanumSquareNeo-Bd",
    		lineHeight: 22,
    		letterSpacing: -0.43,
    		fontSize: 14,
    		left: "50%",
    		position: "absolute"
  	},
  	textTypo: {
    		marginLeft: -160,
    		textAlign: "left",
    		color: "#26282c",
    		fontWeight: "600"
  	},
  	textFlexBox: {
    		textAlign: "right",
    		color: "#1c1e1f"
  	},
  	textPosition2: {
    		top: 551,
    		fontFamily: "NanumSquareNeo-Bd",
    		lineHeight: 22,
    		letterSpacing: -0.43,
    		fontSize: 14,
    		left: "50%",
    		position: "absolute"
  	},
    textPosition5: {
    		top: 551,
    		fontFamily: "NanumSquareNeo-Rg",
    		lineHeight: 22,
    		letterSpacing: -0.43,
    		fontSize: 14,
    		left: "50%",
    		position: "absolute"
  	},
  	textPosition1: {
    		top: 595,
    		fontFamily: "NanumSquareNeo-Bd",
    		lineHeight: 22,
    		letterSpacing: -0.43,
    		fontSize: 14,
    		left: "50%",
    		position: "absolute"
  	},
    textPosition6: {
    		top: 595,
    		fontFamily: "NanumSquareNeo-Rg",
    		lineHeight: 22,
    		letterSpacing: -0.43,
    		fontSize: 14,
    		left: 220,
    		position: "absolute"
  	},
  	innerLayout: {
    		height: 0,
    		width: 320,
    		left: 40,
    		borderTopWidth: 1.2,
    		borderColor: "#eaeced",
    		borderStyle: "solid",
    		position: "absolute"
  	},
    wrapperLayout: {
            borderRadius: 8,
            top: 18,
            height: 44,
            position: "absolute",
            overflow: "hidden"
    },
    textPosition: {
            marginTop: -11,
            textAlign: "center",
            lineHeight: 22,
            letterSpacing: -0.43,
            fontSize: 14,
            top: "50%",
            fontFamily: "NanumSquareNeo-Bd",
            fontWeight: "600",
            left: "50%",
            position: "absolute"
    },
  	view: {
    		width: "100%",
    		height: 758,
    		flex: 1,
    		overflow: "hidden"
  	},
  	text: {
    		marginTop: 300,
    		textAlign: "center",
    		fontWeight: "600",
    		top: "50%",
    		color: "#fff",
    		fontFamily: "NanumSquareNeo-Bd",
    		lineHeight: 22,
    		letterSpacing: -0.43,
    		fontSize: 14,
    		left: "50%",
    		marginLeft: -14,
    		position: "absolute"
  	},
  	safeareaviewText: {
            top: 100,
            fontSize: 20,
            letterSpacing: -0.26,
            lineHeight: 28,
            textAlign: "left",
            color: "#26282c",
            fontFamily: "NanumSquareNeo-Bd",
            fontWeight: "600",
            left: 20,
            position: "absolute"
  	},
  	untitled8Icon: {
    		marginLeft: -70,
    		top: 217,
    		width: 139,
    		height: 181
  	},
  	text4: {
    		marginLeft: -160,
    		textAlign: "left",
    		color: "#26282c",
    		fontWeight: "600"
  	},
  	text5: {
    		top: 463,
    		fontFamily: "NanumSquareNeo-Bd",
    		lineHeight: 22,
    		letterSpacing: -0.43,
    		fontSize: 14,
    		left: "50%",
    		position: "absolute"
  	},
  	text6: {
    		top: 507,
    		fontFamily: "NanumSquareNeo-Rg",
    		lineHeight: 22,
    		letterSpacing: -0.43,
    		fontSize: 14,
			right:60,
    		position: "absolute"
  	},
  	text7: {
    		top: 463,
    		fontFamily: "NanumSquareNeo-Rg",
    		lineHeight: 22,
    		letterSpacing: -0.43,
    		fontSize: 14,
    		right:60,
    		position: "absolute"
  	},
  	text8: {
    		marginLeft: -160,
    		textAlign: "left",
    		color: "#26282c",
    		fontWeight: "600"
  	},
  	text9: {
    		right:60,
    		textAlign: "right",
    		color: "#1c1e1f"
  	},
  	text10: {
    		marginLeft: -160,
    		textAlign: "left",
    		color: "#26282c",
    		fontWeight: "600"
  	},
  	text11: {
    		right:60,
    		textAlign: "right",
    		color: "#1c1e1f"
  	},
  	inner: {
    		top: 533
  	},
  	lineView: {
    		top: 489
  	},
  	safeareaviewChild: {
    		top: 577
  	},
  	child2: {
    		top: 620,
    		width: 320,
    		left: 40,
    		height: 2,
    		borderTopWidth: 1.2,
    		borderColor: "#eaeced",
    		borderStyle: "solid",
    		position: "absolute"
  	},
    buttonWrap: {
            marginLeft: -180,
            bottom: 10,
            width: 400,
            height: 80,
            overflow: "hidden",
            backgroundColor: "#f8f8f8"
    },
        frameIcon: {
            marginLeft: -77,
            top: 50,
            width: 153,
            height: 28
    },
    frameIconPosition: {
            left: "50%",
            position: "absolute"
    },
    wrapper7: {
            left: 114,
            backgroundColor: "#91e04c",
            width: 250
    },
        text15: {
            color: "#fff",
            marginLeft: -14,
            marginTop: -11
    },
    wrapper8: {
            borderColor: "#cacdd3",
            width: 104,
            borderWidth: 1,
            borderStyle: "solid",
            left: 0,
    },
    text16: {
            marginLeft: -27,
            color: "#9ea4a9"
    },
      label: {
    position: "absolute",
    fontFamily: "NanumSquareNeo-Bd",
    fontWeight: "700",
    fontSize: 14,
    color: "#26282c",
    lineHeight: 22,
    letterSpacing: -0.43,
    textAlign: "left",
    left: "20%", // 왼쪽 정렬 위치
  },
  value: {
    position: "absolute",
    fontFamily: "NanumSquareNeo-Bd",
    fontWeight: "700",
    fontSize: 14,
    color: "#1c1e1f",
    lineHeight: 22,
    letterSpacing: -0.43,
    textAlign: "right",
    right: "20%", // 오른쪽 정렬 위치
  },
});