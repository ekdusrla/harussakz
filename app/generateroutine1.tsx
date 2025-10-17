import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/AuthContext";

const SERVER_IP = "http://3.37.215.53:8080"; 

export default function GenerateRoutine1() {
    const { token } = useAuth();
    const [text, setText] = useState("");
    const maxLength = 1000;
    const router = useRouter();
    const [loading, setLoading] = useState(false);

const handleConfirm = async () => {
  if (!text || text.length > maxLength) return;
  setLoading(true);

  try {
    const res = await fetch(`${SERVER_IP}/users/plantRoutine/generate-ai-routine`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ userMood: text })
    });

    const data = await res.json();
    console.log("AI 루틴 반환:", data);

    // ✅ flowerId 저장
    if (data.flowerId) {
    console.log("💡 AI 루틴 반환 flowerId (원본):", data.flowerId);
    await AsyncStorage.setItem("flowerId", String(data.flowerId));
    }


    // routines 저장
    const routinesToStore = Array.isArray(data.routines)
      ? data.routines
      : ["도서 30분 읽기", "오전 10시에 일어나기", "명상 30분 하기"];

    await AsyncStorage.setItem("aiRoutines", JSON.stringify(routinesToStore));

    router.push("./generateroutine2");
  } catch (err) {
    console.error(err);
    alert("AI 루틴 생성 중 오류가 발생했습니다.");
  } finally {
    setLoading(false);
  }
};


    return (
        <View style={styles.safeareaview}>
            <View style={[styles.view, styles.viewBg]}>
                <View style={styles.child} />
                <Text style={[styles.text, styles.textTypo]}>
                    지금 감정을 적어주세요{"\n"}변화의 시작이 될 거에요
                </Text>
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
                    {text.length > maxLength && (
                        <Text style={[styles.errorText]}>
                            입력수를 초과하였습니다
                        </Text>
                    )}
                    <Pressable
                        style={[styles.wrapper, text.length > 0 && text.length <= maxLength && styles.wrapperActive]}
                        onPress={handleConfirm}
                        disabled={loading} // 로딩 중 버튼 비활성화
                    >
                        <Text style={[styles.text2, styles.itemPosition]}>
                            {loading ? "AI 생성 중..." : "확인"} {/* 버튼 글씨 변경 */}
                        </Text>
                    </Pressable>
                </View>
                <Image style={[styles.item, styles.itemPosition]} width={153} height={28} resizeMode="contain" source={require("../assets/images/bar1.png")} />
                <Pressable style={[styles.iconBack, styles.wrapPosition]} onPress={() => router.push("/routine")}>
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
            height: 520,
            backgroundColor: "#fafafa"
    },
    safeareaviewText: {
            top: 480,
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
            bottom: -40,
            borderRadius: 8,
            backgroundColor: "#C1C1C2",
            width: 360,
            height: 44,
            justifyContent: "center", // 세로 중앙
            alignItems: "center",
    },
    text2: {
            justifyContent: "center", // 세로 중앙
            alignItems: "center",
            fontSize: 16,
            color: "#fff",
            textAlign: "center",
            lineHeight: 22,
            letterSpacing: -0.43,
            fontFamily: "NanumSquareNeo-Bd",
            fontWeight: "600",
            marginLeft: -16
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