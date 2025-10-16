import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const SERVER_IP = "http://3.37.215.53:8080";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
  setShowWarning(true);
  if (!email || !password) return;

  setLoading(true);
  try {
    const res = await fetch(`${SERVER_IP}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password })
    });

    const text = await res.text();
    console.log("로그인 서버 응답:", text); // 서버에서 실제 반환값 확인
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      data = { token: null, memberId: null, message: text };
    }

if (res.ok && data.accessToken) {
  console.log("로그인 성공, 토큰:", data.accessToken);
  // 토큰 저장 가능: AsyncStorage, Context 등
  router.replace("/home");
} else {
  alert("로그인 실패: " + (data.message || "이메일 또는 비밀번호를 확인하세요."));
}

  } catch (err) {
    console.error(err);
    alert("로그인 중 오류가 발생했습니다.");
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.view}>
      <View style={styles.view1}>
        <View style={[styles.child, styles.textPosition1]}>
          <Image style={styles.iconlogo} resizeMode="contain" source={require("../assets/images/logo.png")} />
          <Text style={styles.text0}>{"하루싹과 함께 일상을 기록할까요?\n먼저 로그인을 진행해주세요"}</Text>
        </View>

        <Image style={[styles.icon, styles.iconPosition]} resizeMode="contain" source={require("../assets/images/kakao.png")} />
        <Image style={[styles.icon1, styles.iconPosition]} resizeMode="contain" source={require("../assets/images/google.png")} />

        <View style={styles.item} />
        <Text style={[styles.text1, styles.textTypo]}>회원이 아니신가요?</Text>
        <Pressable style={[styles.wrapper, styles.view2FlexBox]} onPress={() => router.push("./signup")}>
          <Text style={styles.text2}>회원가입</Text>
        </Pressable>

        <View style={[styles.view2, styles.view2FlexBox]}>
          <Text style={[styles.text3, styles.textTypo3]}>소셜 로그인</Text>
        </View>

        {/* 비밀번호 */}
        <View style={styles.lineargradient}>
          <View style={[styles.pressable, styles.pressableShadowBox]}>
            <Image style={styles.iconPw} resizeMode="cover" source={require("../assets/images/icon-pw.png")} />
            <TextInput
              style={[styles.textInput, styles.textPosition, { color: "#1C1E1F" }]}
              placeholder="비밀번호"
              placeholderTextColor="#9EA4A9"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable style={[styles.iconHide, styles.textPosition1]} onPress={() => setShowPassword(prev => !prev)}>
              <Image
                style={{ width: 44, height: 40 }}
                resizeMode="cover"
                source={showPassword
                  ? require("../assets/images/icon-show.png")
                  : require("../assets/images/icon-hide.png")}
              />
            </Pressable>
          </View>
        </View>

        {/* 이메일 */}
        <View style={styles.lineargradient}>
          <View style={[styles.pressable1, styles.pressableShadowBox]}>
            <Image style={styles.iconPw} resizeMode="cover" source={require("../assets/images/icon-id.png")} />
            <TextInput
              style={[styles.textInput, styles.textPosition, { color: "#1C1E1F" }]}
              placeholder="이메일"
              placeholderTextColor="#9EA4A9"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {showWarning && (
          <Text style={styles.warningtext}>
            {!email ? "이메일을 입력하시오" : !password ? "비밀번호를 입력하시오" : ""}
          </Text>
        )}

        <Pressable
          style={({ pressed }) => [styles.pressable2, pressed && { backgroundColor: "#7acb3e" }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.text7}>{loading ? "로그인 중..." : "로그인"}</Text>
        </Pressable>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
    view: {
            backgroundColor: "#f8f8f8",
            flex: 1
    },
    textPosition1: {
            left: "50%",
            top: "50%",
            position: "absolute"
    },
    iconPosition: {
            height: 56,
            width: 56,
            borderRadius: 100,
            marginTop: 233,
            left: "50%",
            top: "50%",
            position: "absolute",
            overflow: "hidden"
    },
    textTypo: {
            color: "#9ea4a9",
            textAlign: "center",
            fontFamily: "Pretendard-Regular",
            fontWeight: "300",
            lineHeight: 22,
            letterSpacing: -0.43,
            fontSize: 14
    },
        textTypo3: {
            color: "#9ea4a9",
            textAlign: "center",
            fontFamily: "Pretendard-Regular",
            fontWeight: "300",
            lineHeight: 22,
            letterSpacing: -0.43,
            fontSize: 12
    },
    view2FlexBox: {
            justifyContent: "center",
            width: 60,
            alignItems: "center",
            flexDirection: "row",
            left: "50%",
            top: "50%",
            position: "absolute"
    },
    pressableShadowBox: {
            borderWidth: 0.4,
            borderColor: "#ffffff",
            backgroundColor: "#fafafa",
            borderRadius: 30,
            marginLeft: -160,
            borderStyle: "solid",
            height: "100%",
            overflow: "hidden",
            width: "100%",
            boxShadow: [
                {
                        offsetX: 0,
                        offsetY: 0,
                        blurRadius: 10,
                        spreadDistance: 0.2,
                        color: "rgba(0, 0, 0, 0.05)",
                },
                ],
    },
    textPosition: {
            letterSpacing: 0.43,
            marginLeft: -100,
            fontFamily: "NanumSquareNeo-Rg",
            fontSize: 16,
            color: "#9ea4a9",
            lineHeight: 22,
            textAlign: "left",
            left: "50%",
            position: "absolute"
    },
    child: {
            marginTop: -299,
            marginLeft: -130,
            backgroundColor: "#f8f8f8",
            width: 260,
            height: 120
    },
    icon: {
            marginLeft: -64,
            width : 39,
            height : 39,
    },
    icon1: {
            marginLeft: 8
    },
    item: {
            marginTop: 209.85,
            marginLeft: -147.15,
            borderColor: "#9ea4a9",
            borderTopWidth: 0.3,
            width: 294,
            height: 0,
            borderStyle: "solid",
            left: "50%",
            top: "50%",
            position: "absolute"
    },
    text1: {
            marginTop: 325,
            marginLeft: -90,
            textAlign: "center",
            left: "50%",
            top: "50%",
            position: "absolute"
    },
    text2: {
            color: "#26282c",
            textAlign: "center",
            fontFamily: "Pretendard-Regular",
            fontWeight: "300",
            lineHeight: 14,
            letterSpacing: -0.43,
            fontSize: 14,
            borderBottomWidth: 1,
    },
    text0: {
            color: "#A8ACAF",
            textAlign: "center",
            fontFamily: "NanumSqaureNeo-Rg",
            fontWeight: "600",
            lineHeight: 16,
            letterSpacing: -0.43,
            fontSize: 14,
            top: 120
    },
    wrapper: {
            marginTop: 314,
            marginLeft: 18,
            height: 44
    },
    text3: {
            textAlign: "center"
    },
    view2: {
            marginTop: 199,
            marginLeft: -30,
            height: 22,
            backgroundColor: "#f8f8f8"
    },
    iconPw: {
            top: 16,
            left: 20,
            width: 24,
            height: 24,
            position: "absolute",
            overflow: "hidden"
    },
    iconlogo: {
            top: 0,
            left: 80,
            width: 100,
            height: 100,
            position: "absolute",
            overflow: "hidden"
    },
    iconHide: {
            marginTop: -20,
            marginLeft: 100,
            width: 44,
            height: 40,
            overflow: "hidden"
    },
    pressable: {
            marginTop: -31
    },
    lineargradient: {
            height: 60,
            width: 320,
            left: "50%",
            top: "50%",
            position: "absolute",
            marginVertical: 10,
    },
    pressable1: {
            marginTop: -110
    },
    text7: {
            fontWeight: "600",
            color: "#fff",
            fontFamily: "NanumSquareNeo-Bd",
            fontSize: 16,
            textAlign: "center",
            lineHeight: 22,
            letterSpacing: -0.43
    },
    pressable2: {
            marginTop: 81,
            borderRadius: 8,
            backgroundColor: "#91e04c",
            height: 52,
            marginLeft: -160,
            width: 320,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            left: "50%",
            top: "50%",
            position: "absolute"
    },
    view1: {
            height: 758,
            overflow: "hidden",
            width: "100%",
            backgroundColor: "#f8f8f8",
            flex: 1
    },
    textInput: {
        flex: 1,
        height: "100%",
        paddingLeft: -100,
        fontFamily: "NanumSquareNeo-Rg",
        fontSize: 16,
        textAlign: "left",
    },
    warningtext: {
        width: "100%",
        fontSize: 12,
        letterSpacing: -0.43,
        lineHeight: 22,
        fontFamily: "Pretendard-Regular",
        color: "#fd3333",
        top: 460,
        textAlign: "center",
    }

});