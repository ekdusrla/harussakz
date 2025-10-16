import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";


export default function RoutineDetails() {

    const router = useRouter();

  	return (
    		<View style={styles.safeareaview}>
                    <Pressable style={styles.iconBack} onPress={() => router.back()}>
                        <Image
                          style={styles.icon}
                          resizeMode="contain"
                          source={require("../assets/images/icon-back.png")}
                        />
                      </Pressable>
      			<View style={styles.view}>
                    <Text style={[styles.text1]}>도서 30분 읽기</Text>
                        <Image
                        source={require("../assets/images/routinedetailbackground.png")}
                        style={{
                            position: "absolute",
                            top: 140, // ✅ 이미지 width 120의 절반
                            width: 360,
                            height: 360,
                            left: 20
                        }}
                        resizeMode="contain"
                        />
                        <View style={styles.content}>
                        <Text style={styles.text2}>
                            {`사람들과 대화하는게 어려워\n놀고는 싶은데 자꾸 불편한 감정이 생겨\n나는 문어 꿈을 꾸는 문어 꿈속에서는 무엇이든지 될 수 있어 나는 문어 잠을 자는 문어 잠에 드는 순간 여행이 시작되는 거야 높은 산에 올라가면 나는 초록색 문어 장미 꽃밭 숨어들면 나는 빨간색 문어 횡단보도 건너가면 나는 줄무늬 문어 밤하늘을 날아가면 나는 오색찬란한 문어가 되는 거`}
                        </Text>
                        </View>
                        <View style={styles.vieww}>
                            <Text style={[styles.text5, styles.textTypo1]}>설정기간</Text>
                            <Text style={[styles.text7, styles.textFlexBox1]}>날이 좋아서</Text>
                            <Text style={[styles.text4, styles.textPosition3]}>완수기간</Text>
                            <Text style={[styles.text6, styles.textFlexBox1]}>날이 좋지 않아서</Text>
                            <Text style={[styles.text8, styles.textPosition2]}>주기</Text>
                            <Text style={[styles.text9, styles.textPosition5]}>그 모든 어쩌구...</Text>
                            <Text style={[styles.text10, styles.textPosition1]}>감정</Text>
                            <Text style={[styles.text11, styles.textPosition6]}>으아악</Text>
                            <View style={[styles.child1]} />
                            <View style={[styles.child2]} />
                            <View style={[styles.child3]} />
                            <View style={styles.child4} />
                        </View>
                </View>
                <Image
                source={require("../assets/images/seeds.png")}
                style={{
                    position: "absolute",
                    bottom: -20,
                    width: 200,
                    height: 100,
                    left: 100
                }}
                resizeMode="contain"
                />
      		</View>
        );
};



const styles = StyleSheet.create({
  	safeareaview: {
    		backgroundColor: "#f8f8f8",
    		flex: 1
  	},
  	childLayout: {
    		borderRadius: 12,
    		position: "absolute",
    		overflow: "hidden"
  	},
  	textFlexBox: {
    		textAlign: "left",
    		left: 24,
    		letterSpacing: -0.43
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
  	view: {
    		width: "100%",
    		height: 758,
    		overflow: "hidden",
    		backgroundColor: "#f8f8f8",
    		flex: 1
  	},
    text1: {
    		marginLeft: 40,
            marginTop: 100,
    		color: "#26282c",
    		fontWeight: "600",
            fontFamily: "NanumSquareNeo-Eb",
    		position: "absolute",
            fontSize: 24
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
    textTypo1: {
    		marginLeft: -160,
    		textAlign: "left",
    		color: "#26282c",
    		fontWeight: "600"
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
      	textPosition2: {
    		top: 551,
    		fontFamily: "NanumSquareNeo-Bd",
    		lineHeight: 22,
    		letterSpacing: -0.43,
    		fontSize: 14,
    		left: "50%",
    		position: "absolute"
  	},
    textFlexBox1: {
    		textAlign: "right",
    		color: "#1c1e1f"
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
        textPosition6: {
    		top: 595,
    		fontFamily: "NanumSquareNeo-Rg",
    		lineHeight: 22,
    		letterSpacing: -0.43,
    		fontSize: 14,
    		left: 220,
    		position: "absolute"
  	},
    vieww :{
        marginTop: -320
    },
    content: {
    width: 320,
    height: 246, // 이미지 영역 높이에 맞춰서 제한
    marginTop: 140, // 상단 이미지 아래로 위치
    padding: 16, // 텍스트 여백
    },
    text2: {
    fontSize: 16,
    color: "#1c1e1f",
    fontFamily: "Pretendard-Regular",
    textAlign: "left",
    left:"15%",
    top:"24%"
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
    child1: {
        top: 488,
        width: 320,
        left: 40,
        height: 2,
        borderTopWidth: 1.2,
        borderColor: "#eaeced",
        borderStyle: "solid",
        position: "absolute"
},
    child2: {
        top: 532,
        width: 320,
        left: 40,
        height: 2,
        borderTopWidth: 1.2,
        borderColor: "#eaeced",
        borderStyle: "solid",
        position: "absolute"
},
    child3: {
        top: 576,
        width: 320,
        left: 40,
        height: 2,
        borderTopWidth: 1.2,
        borderColor: "#eaeced",
        borderStyle: "solid",
        position: "absolute"
},
    child4: {
        top: 620,
        width: 320,
        left: 40,
        height: 2,
        borderTopWidth: 1.2,
        borderColor: "#eaeced",
        borderStyle: "solid",
        position: "absolute"
},
});