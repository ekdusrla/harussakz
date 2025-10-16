import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";



export default function GenerateRoutine1() {

    const [text, setText] = useState("");
    const maxLength = 1000;

    const router = useRouter();


    return (
        <View style={styles.safeareaview}>
                <View style={[styles.view, styles.viewBg]}>
                        <View style={styles.child} />
                        <Text style={[styles.text, styles.textTypo]}>지금 감정을 적어주세요{"\n"}변화의 시작이 될 거에요</Text>
                        <View style={[styles.lineargradient, styles.wrapperPosition]}>
                        <TextInput
                            style={styles.input}
                            multiline
                            placeholder={"현재 나의 상태 및 목표를 기록하고\n루틴을 추천해줍니다"}
                            placeholderTextColor="#9EA4A9"
                            value={text}
                            onChangeText={setText}
                        />
                        <Text style={[styles.safeareaviewText, styles.textFlexBox]}>
                            {text.length}/{maxLength}자
                        </Text>
                        </View>
                        <View style={[styles.buttonWrap, styles.itemPosition]}>
                        { text.length > maxLength && (
                        <Text style={[styles.errorText]}>
                            입력수를 초과하였습니다
                        </Text>
                        )}
                            <Pressable
                            style={[
                                styles.wrapper,
                                styles.wrapperPosition,
                                text.length > 0 && text.length <= 1000 && styles.wrapperActive
                            ]}
                            onPress={() => {
                                // 글자 수가 1~1000일 때만 이동
                                if (text.length > 0 && text.length <= 1000) {
                                router.push("./generateroutine2"); // 이동할 페이지 경로
                                }
                            }}
                            >
                            <Text style={[styles.text2, styles.itemPosition]}>확인</Text>
                            </Pressable>
                        </View>
                        <Image style={[styles.item, styles.itemPosition]} width={153} height={28} resizeMode="contain" source={require("../assets/images/bar1.png")} />
                        <Pressable style={[styles.iconBack, styles.wrapPosition]} onPress={()=> router.push("/routine")}>
                        <Image style={styles.icon} resizeMode="contain" source={require("../assets/images/icon-back.png")} />
                        </Pressable>
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
    textTypo: {
            fontFamily: "NanumSquareNeo-Bd",
            fontWeight: "600"
    },
    wrapperPosition: {
            shadowOpacity: 1,
            left: 20,
            position: "absolute",
            overflow: "hidden"
    },
    textFlexBox: {
            textAlign: "center",
            lineHeight: 22,
            letterSpacing: -0.43
    },
    itemPosition: {
            left: "50%",
            position: "absolute"
    },
    view: {
            width: "100%",
            height: 758,
            flex: 1,
            overflow: "hidden"
    },
    child: {
            top: 157,
            left: 0,
            height: 137,
            backgroundColor: "transparent",
            width: 360,
            position: "absolute"
    },
    text: {
            top: 100,
            fontSize: 20,
            letterSpacing: -0.26,
            lineHeight: 28,
            color: "#26282c",
            textAlign: "left",
            left: 20,
            fontFamily: "NanumSquareNeo-Bd",
            fontWeight: "600",
            position: "absolute"
    },
    lineargradient: {
            top: 200,
            right: 20,
            boxShadow: "2px 8px 20px rgba(28, 30, 31, 0.08)",
            shadowColor: "rgba(28, 30, 31, 0.08)",
            shadowOffset: {
                width: 2,
                height: 8
            },
            shadowRadius: 20,
            elevation: 20,
            borderRadius: 12,
            height: 450,
            backgroundColor: "#fafafa"
    },
    safeareaviewText: {
            top: 415,
            right: 16,
            fontSize: 12,
            fontFamily: "Pretendard-Regular",
            color: "#cacdd3",
            width: 55,
            height: 19,
            position: "absolute"
    },
    buttonWrap: {
            marginLeft: -180,
            bottom: 0,
            height: 120,
            width: 360,
            overflow: "hidden",
            backgroundColor: "#f8f8f8"
    },
    wrapper: {
            bottom: 34,
            marginLeft: -20,
            borderRadius: 8,
            backgroundColor: "#C1C1C2",
            width: 360,
            height: 44,
    },
    text2: {
            marginTop: -11,
            marginLeft: -14,
            top: "50%",
            fontSize: 14,
            color: "#fff",
            textAlign: "center",
            lineHeight: 22,
            letterSpacing: -0.43,
            fontFamily: "NanumSquareNeo-Bd",
            fontWeight: "600"
    },
    item: {
            marginLeft: -77,
            top: 60,
            width: 153,
            height: 28
    },
    input: {
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
        flex: 1,
        fontSize: 18,
        color: "#26282c",
        textAlignVertical: "top",
    },
    wrapperActive: {
        backgroundColor: "#91E04C",
    },
    errorText: {
        marginLeft: 120,
        fontSize: 12,
        color: "red",
        fontFamily: "Pretendard-Regular",
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
});