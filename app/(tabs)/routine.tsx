import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

type DateObj = {
  date: number;
  month: number;
  year: number;
};

export default function Routine() {
  const router = useRouter();
  const today = new Date().getDate();
  const todayWeekday = new Date().getDay();
  const todayDate = new Date();
  const todayMonth = todayDate.getMonth() + 1;
  const todayYear = todayDate.getFullYear();
  const todayText = `${todayMonth}월 ${today}일`;
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const startOfWeek = new Date();
  startOfWeek.setDate(today - todayWeekday);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d.getDate();
  });

  const routines = [
    "도서 30분 읽기",
    "오후 10시에 잠들기 (성장 1단계)",
    "산책 1시간 하기",
    "오전 9시에 일어나기 (성장 2단계)",
    "유산균 섭취",
    "쾌변하기 (성장 3단계)",
    "오늘도 우렁차게 살아남기 (성장 4단계)"
  ];

  const checkImages = [
    require("../../assets/images/icon-bluecheck.png"),
    require("../../assets/images/icon-yellowcheck.png"),
    require("../../assets/images/icon-pinkcheck.png"),
    require("../../assets/images/icon-greencheck.png")
  ];

  const [checkedImages, setCheckedImages] = useState<(number | null)[]>(Array(routines.length).fill(null));
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupImage, setPopupImage] = useState<number | null>(null);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [prePopupVisible, setPrePopupVisible] = useState(false);
  const [nextPopupIndex, setNextPopupIndex] = useState<number | null>(null);
  const [prePopupStep, setPrePopupStep] = useState<0 | 1>(0);

  const textOpacity = useRef(new Animated.Value(1)).current;

  const [selectedDateObj, setSelectedDateObj] = useState<DateObj>({
    date: today,
    month: todayMonth,
    year: todayYear
  });

  const handleDatePress = (d: DateObj) => {
    setSelectedDateObj(d);
  };

  const toggleCheck = (index: number) => {
    const newCheckedImages = [...checkedImages];
    const isGrowthRoutine = [
      "오후 10시에 잠들기 (성장 1단계)",
      "오전 9시에 일어나기 (성장 2단계)",
      "쾌변하기 (성장 3단계)",
      "오늘도 우렁차게 살아남기 (성장 4단계)"
    ].includes(routines[index]);

    if (!newCheckedImages[index]) {
      newCheckedImages[index] = checkImages[Math.floor(Math.random() * checkImages.length)];
      if (isGrowthRoutine) {
        setPrePopupStep(0);
        setPrePopupVisible(true);
        setNextPopupIndex(index);
      }
    } else {
      newCheckedImages[index] = null;
    }

    setCheckedImages(newCheckedImages);
  };

  const handlePrePopupPress = () => {
    if (prePopupStep === 0) {
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        setPrePopupStep(1);
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }).start();
      });
    } else {
      setPrePopupVisible(false);
      if (nextPopupIndex !== null) {
        const index = nextPopupIndex;
        if (routines[index] === "오후 10시에 잠들기 (성장 1단계)") {
          setPopupImage(require("../../assets/images/growpopup1.png"));
          setPopupTitle("뿌리내린 새싹");
          setPopupMessage("처음으로 싹을 틔운 순간이에요!\n포기하지 않은 의지가 빛나고 있어요");
          setPopupVisible(true);
        }
        if (routines[index] === "오전 9시에 일어나기 (성장 2단계)") {
          setPopupImage(require("../../assets/images/growpopup2.png"));
          setPopupTitle("흔들리지 않는 줄기");
          setPopupMessage("단단히 뿌리내리고 서 있는 순간이에요!\n흔들림 없는 노력이 든든한 힘이 되었어요");
          setPopupVisible(true);
        }
        if (routines[index] === "쾌변하기 (성장 3단계)") {
          setPopupImage(require("../../assets/images/growpopup3.png"));
          setPopupTitle("피어나는 꽃봉오리");
          setPopupMessage("꽃이 맺히며 기대를 품고 있어요!\n정성과 열정이 아름답게 피어나려 해요");
          setPopupVisible(true);
        }
        if (routines[index] === "오늘도 우렁차게 살아남기 (성장 4단계)") {
          setPopupImage(require("../../assets/images/growpopup4.png"));
          setPopupTitle("진실한 성취의 튤립");
          setPopupMessage("드디어 활짝 피어난 결실이에요!\n당신의 행동이 찬란한 성취로 이어졌어요");
          setPopupVisible(true);
        }
      }
    }
  };

  return (
    <View style={styles.safeareaview}>
      <View style={styles.view}>
        <Text style={styles.todayText}>{todayText}</Text>
        <Text style={[styles.textt, styles.textTypo]}>오늘 하루도 힘내!</Text>

        {/* 날짜 선택 */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 30, marginTop: 200 }}>
          {weekDates.map((date, index) => {
            const d: DateObj = { date, month: todayMonth, year: todayYear };
            const isToday = d.date === today && d.month === todayMonth && d.year === todayYear;
            const isSelected =
              selectedDateObj &&
              d.date === selectedDateObj.date &&
              d.month === selectedDateObj.month &&
              d.year === selectedDateObj.year;

            return (
              <View key={index} style={{ alignItems: "center" }}>
                <Text
                  style={[
                    styles.weekdayText,
                    index === 0 && { color: "#FF7C57" },
                    index === 6 && { color: "#5E86DF" }
                  ]}
                >
                  {weekDays[index]}
                </Text>

                <Pressable onPress={() => handleDatePress(d)}>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 36,
                      height: 36
                    }}
                  >
                    {isSelected && (
                      <View
                        style={{
                          position: "absolute",
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          backgroundColor: "#91E04C",
                          zIndex: -1
                        }}
                      />
                    )}

                    <Text
                      style={{
                        color: isSelected ? "#ffffff" : isToday ? "#91E04C" : "#74777D",
                        fontWeight: "600",
                        fontFamily: "NanumSquareNeo-Bd",
                        fontSize: 20,
                      }}
                    >
                      {d.date}
                    </Text>
                  </View>
                </Pressable>

                {isToday && (
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#91E04C",
                      marginTop: 4
                    }}
                  />
                )}
              </View>
            );
          })}
        </View>

                            <Image
                            style={styles.itemm} width={480} height={8}
                            resizeMode="cover"
                            source={require("../../assets/images/routinebar.png")}
                          />
                        <View style={[styles.view2, styles.viewFlexBox]}>
                          <Image
                            style={styles.item} width={20} height={14}
                            resizeMode="contain"
                            source={require("../../assets/images/icon-seed.png")}
                          />
                          <View style={[styles.view3, styles.viewFlexBox]}>
                            <Text style={styles.text15}>1234 개</Text>
                          </View>
                        </View>
                        <View style={{ marginTop: 58, marginHorizontal: 24 }}>
                            {routines.map((routine, index) => (
                                <Pressable
                                key={index}
                                onPress={() => toggleCheck(index)}
                                style={{ flexDirection: "row", alignItems: "center", marginBottom: 22 }}
                                >
                                <Image
                                    source={checkedImages[index] ?? require("../../assets/images/icon-nonecheck.png")}
                                    style={{ width: 24, height: 24, marginRight: 12 }}
                                    resizeMode="contain"
                                />
                                <Text
                                style={{
                                    fontSize: 16,
                                    color: checkedImages[index] ? "#9EA4A9" : "#26282c",
                                    fontWeight: "500",
                                    fontFamily: "NanumSquareNeo-Rg",
                                    textDecorationLine: checkedImages[index] ? "line-through" : "none" // 선택되면 줄 긋기
                                }}>
                                {routine}
                                </Text>

                                </Pressable>
                            ))}
                            </View>
        				<Text style={[styles.myRoutine, styles.text19Typo]}>My Routine</Text>
      			</View>
                    <Pressable
                    onPress={() => router.push("../generateroutine1")}
                    style={{
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        width: 60,   // 터치 영역 확보
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    >
                    <Image
                        source={require("../../assets/images/icon-add.png")}
                        style={{
                        width: 60,
                        height: 60,
                        resizeMode: "contain",
                        }}
                    />
                    </Pressable>
                    <Pressable onPress={() => router.push("/login")} hitSlop={10}>
                      <Image
                        style={styles.item22}
                        source={require("../../assets/images/icon-menu.png")}
                        resizeMode="contain"
                      />
                    </Pressable>
                    {/* ✅ 팝업 모달 */}
                    {/* 1. 사전 팝업 */}
<Modal
  transparent={true}
  visible={prePopupVisible}
  animationType="fade"
>
  <View style={styles.popupOverlay}>
    <Pressable style={styles.popupContainer} onPress={handlePrePopupPress}>
      <Image
        source={require("../../assets/images/prepopup.png")}
        style={styles.prePopupImage}
      />
    <Animated.Text style={[styles.prePopupTitle, { opacity: textOpacity }]}>
    {prePopupStep === 0 ? "두근두근" : "성장의 조짐이 보여요"}
    </Animated.Text>
      <Text style={styles.prePopupMessage}>화면을 클릭해주세요</Text>
    </Pressable>
  </View>
</Modal>


{/* 2. 기존 성장 팝업 */}
<Modal
  transparent={true}
  visible={popupVisible}
  animationType="fade"
  onRequestClose={() => setPopupVisible(false)}
>
  <View style={styles.popupOverlay}>
    <View style={styles.popupContainer}>
      <Image source={require("../../assets/images/tada.png")} style={styles.popupDecorationImage} />
      {popupImage && (<Image source={popupImage} style={styles.popupMainImage} />)}
      <Text style={styles.popupTitle}>{popupTitle}</Text>
      <Text style={styles.popupMessage}>{popupMessage}</Text>
      <Pressable style={styles.popupConfirmButton} onPress={() => setPopupVisible(false)}>
        <Text style={styles.popupConfirmButtonText}>확인</Text>
      </Pressable>
    </View>
  </View>
</Modal>
    		</View>
    );
}

const styles = StyleSheet.create({
  	safeareaview: {
    		backgroundColor: "#f8f8f8",
    		flex: 1
  	},
  	viewFlexBox: {
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	text19Typo: {
    		fontFamily: "Pretendard-Medium",
    		lineHeight: 24,
    		letterSpacing: -0.43,
    		textAlign: "left",
    		position: "absolute"
  	},
  	iconPosition: {
    		left: 25,
    		height: 24,
    		width: 24,
    		position: "absolute"
  	},
  	view: {
    		width: "100%",
    		height: 758,
    		overflow: "hidden",
    		backgroundColor: "#f8f8f8",
    		flex: 1
  	},
  	todayText: {
    		top: 100,
    		fontSize: 26,
    		letterSpacing: -0.26,
    		lineHeight: 28,
    		fontWeight: "600",
    		textAlign: "left",
    		color: "#26282c",
    		fontFamily: "NanumSquareNeo-Eb",
    		left: 20,
    		position: "absolute"
  	},
  	view2: {
    		top: 44,
    		boxShadow: "2px 2px 12px rgba(218, 222, 225, 0.25)",
    		shadowColor: "rgba(218, 222, 225, 0.25)",
    		shadowOffset: {
      			width: 2,
      			height: 2
    		},
    		shadowRadius: 12,
    		elevation: 12,
    		shadowOpacity: 1,
    		backgroundColor: "rgba(255, 255, 255, 0.6)",
    		borderStyle: "solid",
    		borderColor: "#fff",
    		borderWidth: 0.8,
    		height: 28,
    		paddingHorizontal: 8,
    		paddingVertical: 7,
    		gap: 2,
    		borderRadius: 30,
    		alignItems: "center",
    		overflow: "hidden",
    		left: 20,
    		position: "absolute"
  	},
  	item: {
    		width: 20,
    		height: 14
  	},
  	itemm: {
    		width: 480,
    		height: 8,
        marginTop: 20
  	},
    item22: {
      position: "absolute",
    		width: 44,
    		height: 44,
        left: 340,
        bottom: 72
        
  	},
  	view3: {
    		justifyContent: "center",
    		paddingLeft: 4,
    		alignItems: "center",
    		overflow: "hidden",
            marginTop: -2
  	},
  	text15: {
    fontSize: 12,
    fontWeight: "600",
    color: "#26282c",
    fontFamily: "NanumSquareNeo-Bd",
  	},
  	text17: {
    		fontSize: 17,
    		fontFamily: "SF Pro",
    		color: "#464b53",
    		textAlign: "right",
    		lineHeight: 22
  	},
  	myRoutine: {
    		top: 308,
    		left: 24,
    		fontSize: 16,
    		color: "#9ea4a9"
  	},
    weekdayText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#9ea4a9",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "NanumSquareNeo-Bd",
    },
    dateText: {
    fontSize: 18,
    color: "#74777d",
    textAlign: "center",
    fontFamily: "NanumSquareNeo-Bd",
    fontWeight: "600",
    marginTop: 10
    },
    lineargradientShadowBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
},
cardBorderImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
},
text2: {
    fontSize: 16,
    color: "#26282c",
    fontWeight: "500",
    fontFamily: "NanumSquareNeo-Rg",
},
popupOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popupContainer: {
    borderRadius: 18,
    alignItems: "center",
    position: "relative",
  },
  popupDecorationImage: {
    position: "absolute",
    width: 600,
    height: 600,
    resizeMode: "contain",
    top: -120,
  },
  popupMainImage: {
    width: 260,
    height: 360,
    resizeMode: "contain",
  },
  popupTitle: {
    fontSize: 16,
    color: "#26282C",
    fontFamily: "NanumSquareNeo-Bd",
    marginTop: 32,
    position: "absolute",
  },
  popupMessage: {
    fontSize: 10,
    color: "#9EA4A9",
    fontFamily: "NanumSquareNeo-Bd",
    marginTop: 58,
    position: "absolute",
    textAlign: "center",
    letterSpacing: 0.8,
  },
  popupConfirmButton: {
    backgroundColor: "#91E04C",
    paddingVertical: 8,
    paddingHorizontal: 90,
    borderRadius: 14,
    alignItems: "center",
    position: "absolute",
    bottom: 16,
  },
  popupConfirmButtonText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "NanumSquareNeo-Bd",
  },
  prePopupImage: {
  width: 260,
  height: 360,
  resizeMode: "contain",
},
prePopupTitle: {
  position: "absolute",
  top: 170,
  fontSize: 18,
  fontFamily: "NanumSquareNeo-Bd",
  fontWeight: "600",
  color: "#26282C",
  textAlign: "center",
},
prePopupMessage: {
  position: "absolute",
  bottom: -32,
  fontSize: 14,
  color: "#EAECED",
  textAlign: "center",
  fontFamily: "NanumSquareNeo-Rg",
},
  	textt: {
    		top: 132,
    		left: 24,
    		fontSize: 20,
    		color: "#74777D"
  	},
  	textTypo: {
    		fontFamily: "Pretendard-Medium",
    		lineHeight: 24,
    		letterSpacing: -0.43,
    		textAlign: "left",
    		position: "absolute"
  	},

});