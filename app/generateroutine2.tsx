import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function GenerateRoutine2() {
    const router = useRouter();
    const [routines, setRoutines] = useState<string[]>([]);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    useEffect(() => {
        const loadRoutines = async () => {
            try {
                const stored = await AsyncStorage.getItem("aiRoutines");
                const arr = stored ? JSON.parse(stored) : null;

                setRoutines(arr && Array.isArray(arr)
                    ? [...arr, "나의 루틴 만들기"]
                    : ["도서 30분 읽기", "오전 10시에 일어나기", "명상 30분 하기", "나의 루틴 만들기"]);
            } catch (err) {
                console.error("루틴 불러오기 에러:", err);
                setRoutines(["도서 30분 읽기", "오전 10시에 일어나기", "명상 30분 하기", "나의 루틴 만들기"]);
            }
        };
        loadRoutines();
    }, []);

    return (
        <View style={styles.safeareaview}>
            <Image
                style={[styles.item, styles.itemPosition]}
                width={153}
                height={28}
                resizeMode="contain"
                source={require("../assets/images/bar2.png")}
            />
            <Text style={styles.text}>당신에게 꼭 맞는{"\n"}루틴을 찾아드릴게요</Text>

            <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
                {routines.map((title, index) => {
                    const isSelected = selectedCard === index;
                    const isCustomRoutine = title === "나의 루틴 만들기";

                    return (
                        <Pressable
                            key={index}
                            style={[
                                styles.lineargradientShadowBox,
                                isCustomRoutine && { backgroundColor: "#FEF6CE" },
                                isSelected && !isCustomRoutine && { backgroundColor: "#EBF5E3" },
                                isSelected && isCustomRoutine && { backgroundColor: "#F8EBA9" },
                            ]}
                            onPress={() => setSelectedCard(index)}
                        >
                            <View style={styles.cardContent}>
                                <Text style={styles.title}>{title}</Text>
                            </View>
                            {isSelected && (
                                <Image
                                    source={require("../assets/images/cardborder.png")}
                                    style={styles.cardBorderImage}
                                    resizeMode="stretch"
                                />
                            )}
                        </Pressable>
                    );
                })}
            </ScrollView>

            <View style={[styles.buttonWrap, styles.itemPosition]}>
                <Pressable
                    style={[styles.wrapper, styles.wrapperLayout, selectedCard !== null && { backgroundColor: "#91E04C" }]}
                    onPress={() => {
                        if (selectedCard !== null) {
                            router.push({
                                pathname: "./generateroutine3",
                                params: { routineText: routines[selectedCard] },
                            });
                        }
                    }}
                >
                    <Text style={[styles.text30, styles.textPosition]}>확인</Text>
                </Pressable>
                <Pressable
                    style={[styles.container, styles.wrapperLayout]}
                    onPress={() => router.push("./generateroutine1")}
                >
                    <Text style={[styles.text31, styles.textPosition]}>이전으로</Text>
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
    lineargradientShadowBox: {
            gap: 10,
            paddingVertical: 0,
            paddingHorizontal: 32,
            alignItems: "center",
            flexDirection: "row",
            height: 56,
            borderRadius: 32,
            shadowOpacity: 1,
            elevation: 4,
            shadowRadius: 4,
            shadowOffset: {
                width: 0,
                height: 0
            },
            shadowColor: "rgba(70, 75, 83, 0.12)",
            boxShadow: "0px 0px 4px rgba(70, 75, 83, 0.12)",
            backgroundColor: "#fafafa",
            marginHorizontal: 20,
            marginVertical: 8,
    },
    itemPosition: {
            left: "50%",
            position: "absolute"
    },
    wrapperLayout: {
            height: 44,
            borderRadius: 8,
            top: 18,
            position: "absolute",
            overflow: "hidden"
    },
    textPosition: {
            top: "50%",
            marginTop: -11,
            left: "50%",
            lineHeight: 22,
            letterSpacing: -0.43,
            fontSize: 14,
            textAlign: "center",
            fontFamily: "NanumSquareNeo-Bd",
            fontWeight: "600",
            position: "absolute"
    },
    text: {
            top: 100,
            lineHeight: 28,
            textAlign: "left",
            color: "#26282c",
            fontFamily: "NanumSquareNeo-Bd",
            fontWeight: "600",
            letterSpacing: -0.26,
            fontSize: 20,
            left: 20,
            position: "absolute"
    },
    text2: {
            lineHeight: 22,
            letterSpacing: -0.43,
            fontSize: 14,
            textAlign: "center",
            color: "#26282c",
            fontFamily: "NanumSquareNeo-Rg"
    },
    item: {
            marginLeft: -77,
            top: 60,
            width: 153,
            height: 28
    },
    buttonWrap: {
            marginLeft: -180,
            bottom: 0,
            height: 90,
            width: 400,
            left: "50%",
            overflow: "hidden",
            backgroundColor: "#f8f8f8"
    },
    wrapper: {
            left: 114,
            backgroundColor: "rgba(28, 30, 31, 0.25)",
            width: 250
    },
    text30: {
            marginLeft: -14,
            color: "#fff"
    },
    container: {
            borderColor: "#cacdd3",
            width: 104,
            borderWidth: 1,
            borderStyle: "solid",
            left: 0,
    },
    text31: {
            marginLeft: -27,
            color: "#9ea4a9"
    },
scrollWrapper: {
  flex: 1,
  marginTop: 120,      // header 높이만큼 아래에서 시작
  overflow: "hidden",  // 스크롤이 header 위로 올라가지 않음
},
scrollContent: {
  paddingBottom: 120,  // 하단 버튼 영역 확보
},
   scrollArea: {
  flex: 1,
  marginTop: 160,
},
cardBorderImage: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: 32,
  width: 372, // 카드 테두리 반경과 맞춰주세요
},
cardContent: {
  flexDirection: "row",
  alignItems: "center",
},
emoji: {
  fontSize: 20,
  marginRight: 6,
},
title: {
  fontSize: 16,
  fontFamily: "NanumSquareNeo-Rg",
  color: "#333",
},

});