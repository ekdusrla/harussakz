import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useAuth } from "../context/AuthContext"; // ✅ 토큰 context

        export default function GenerateRoutine3() {
        const router = useRouter();
        const { token } = useAuth(); 
        const { routineText, selectedEmoji } = useLocalSearchParams<{
        routineText?: string;
        selectedEmoji?: string;
        }>();

        const [routine, setRoutine] = useState("");
        const [period, setPeriod] = useState("");
        const [selectedDays, setSelectedDays] = useState<string[]>([]);
        const [modalVisible, setModalVisible] = useState(false);
        const [selectedDates, setSelectedDates] = useState<string[]>([]);
        const [isLoading, setIsLoading] = useState(false);
        // 요일 순서 배열
        const weekOrder = ["월", "화", "수", "목", "금", "토", "일"];

        // 선택된 요일 weekOrder 순으로 정렬
        const sortedSelectedDays = weekOrder.filter((day) => selectedDays.includes(day));


        // ✅ 카드에서 전달받은 emoji 처리
        const emoji = selectedEmoji ? JSON.parse(selectedEmoji)[0] : "🌱";

        // ✅ 루틴 텍스트 초기화
        useEffect(() => {
        if (routineText && routineText !== "나의 루틴 만들기") {
        setRoutine(routineText.slice(2));
        } else {
        setRoutine("");
        }
        }, [routineText]);

        const isConfirmEnabled =
        routine.trim() !== "" && period.trim() !== "" && selectedDays.length > 0;

        // ✅ 요일 선택 토글
        const toggleDay = (day: string) => {
        setSelectedDays((prev) =>
        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
        };

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayString = today.toISOString().split("T")[0];

        const handleDayPress = (day: any) => {
        const dayDate = new Date(day.dateString);
        dayDate.setHours(0, 0, 0, 0);
        if (dayDate < today) return;

        let newSelectedDates = [...selectedDates];
        if (newSelectedDates.length === 2) newSelectedDates = [];
        newSelectedDates.push(day.dateString);
        setSelectedDates(newSelectedDates);

        if (newSelectedDates.length === 2) {
        const sorted = [...newSelectedDates].sort();
        const start = new Date(sorted[0]);
        const end = new Date(sorted[1]);
        const formatDate = (d: Date) =>
                `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
                d.getDate()
                ).padStart(2, "0")}`;
        setPeriod(`${formatDate(start)}~${formatDate(end)}`);
        } else if (newSelectedDates.length === 1) {
        const d = new Date(newSelectedDates[0]);
        const formatDate = (d: Date) =>
                `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
                d.getDate()
                ).padStart(2, "0")}`;
        setPeriod(`${formatDate(d)}~`);
        }
        };

        const getMarkedDates = () => {
        const marks: { [date: string]: any } = {};
        if (selectedDates.length === 0) {
        marks[todayString] = { marked: true, dotColor: "#91E04C" };
        return marks;
        }
        const sortedDates = [...selectedDates].sort();
        const startDate = new Date(sortedDates[0]);
        const endDate = selectedDates.length === 2 ? new Date(sortedDates[1]) : startDate;

        let d = new Date(startDate);
        while (d <= endDate) {
        const dateStr = d.toISOString().split("T")[0];
        if (d.getTime() === startDate.getTime()) {
                marks[dateStr] = { startingDay: true, color: "#91E04C", textColor: "white" };
        } else if (d.getTime() === endDate.getTime()) {
                marks[dateStr] = { endingDay: true, color: "#91E04C", textColor: "white" };
        } else {
                marks[dateStr] = { color: "#91E04C", textColor: "white" };
        }
        d.setDate(d.getDate() + 1);
        }
        return marks;
        };

        // ✅ 요일 매핑
        const dayMap: Record<string, string> = {
        일: "SUNDAY",
        월: "MONDAY",
        화: "TUESDAY",
        수: "WEDNESDAY",
        목: "THURSDAY",
        금: "FRIDAY",
        토: "SATURDAY",
        };

        const createRoutine = async () => {
  if (!token) return Alert.alert("로그인이 필요합니다.");
  if (selectedDates.length === 0) return Alert.alert("날짜를 선택해주세요.");

  const sortedDates = [...selectedDates].sort();
  const startDate = sortedDates[0];
  const endDate = sortedDates.length === 2 ? sortedDates[1] : sortedDates[0];

  try {
    setIsLoading(true);

    // 1️⃣ AI 루틴 생성
    const aiResponse = await fetch(
      "http://3.37.215.53:8080/users/plantRoutine/generate-ai-routine",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMood: "neutral" }),
      }
    );
    const aiData = await aiResponse.json();
    if (!aiResponse.ok)
      throw new Error(`AI 루틴 API 실패: ${JSON.stringify(aiData)}`);

    const plantId = aiData.flowerId;
    const userMood = aiData.userMood;

    // 2️⃣ 루틴 생성 API 호출
    const response = await fetch("http://3.37.215.53:8080/routines", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: routine,
        startDate,
        endDate,
        repeatDays: selectedDays.map((day) => dayMap[day]),
        plantId,
        emoji,
        userMood,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`루틴 생성 실패: ${errText}`);
    }

// POST 응답 이후
const createdRoutine = await response.json();
const routineId = createdRoutine.id;
const breed = createdRoutine.breed || "백합과"; // POST 응답에서 바로 가져오기

// 3️⃣ 주기 정렬 (월~일)
const sortedSelectedDays = ["월","화","수","목","금","토","일"].filter((d) =>
  selectedDays.includes(d)
);

console.log("createdRoutine POST 응답:", createdRoutine);
console.log("생성된 routineId:", routineId);
console.log("breed:", breed);

// 4️⃣ GenerateRoutine4로 params 전달 (breed 포함)
router.push({
  pathname: "/generateroutine4",
  params: {
    routine,
    period: `${startDate} ~ ${endDate}`,
    selectedDays: JSON.stringify(sortedSelectedDays),
    breed, // 여기 추가
    routineId, 
  },
});

  } catch (error) {
    console.error("createRoutine error:", error);
    Alert.alert("네트워크 오류", "서버에 연결할 수 없습니다.");
  } finally {
    setIsLoading(false);
  }
};




  return (
    <View style={styles.safeareaview}>
      <View style={[styles.view, styles.viewBg]}>
        <View style={[styles.rectangleLineargradient, styles.child4Border]} />
        <View style={[styles.child4, styles.child4Layout]} />
        <Text style={styles.text}>기간을 설정해주세요</Text>
        <Text style={[styles.text2, styles.textTypo1]}>루틴</Text>
        <Text style={[styles.text3, styles.textTypo1]}>루틴 기간</Text>
        <Text style={[styles.text4, styles.textTypo1]}>반복 주기</Text>

        {/* 요일 선택 */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 32, marginTop: 500 }}>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
        <Pressable
        key={day}
        style={[
                styles.dayButton,
                selectedDays.includes(day) && styles.daySelected,
        ]}
        onPress={() => toggleDay(day)}
        >
        <Text style={[styles.textTypo]}>{day}</Text>
        </Pressable>
        ))}
        </View>


        {/* 달력 아이콘 */}
        <Pressable
          style={[styles.iconCalendarParent, styles.iconLayout]}
          onPress={() => setModalVisible(true)}
        >
          <Image
            style={[styles.iconCalendar, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/images/calendar.png")}
          />
        </Pressable>

        {/* 달력 모달 */}
        <Modal transparent visible={modalVisible} animationType="fade">
          <View style={styles.modalWrapper}>
            <View style={styles.modalContent}>
              <Calendar
                style={styles.calendar}
                markedDates={getMarkedDates()}
                markingType="period"
                onDayPress={handleDayPress}
                theme={{
                  arrowColor: "#91E04C",
                  todayTextColor: "#91E04C",
                  textDayFontSize: 14,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 12,
                }}
              />
            </View>
            <Pressable style={[styles.button, { marginTop: -44 }]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>확인</Text>
            </Pressable>
          </View>
        </Modal>

        {/* 루틴 입력 */}
        <Image style={[styles.frameIcon, styles.frameIconPosition]} width={153} height={28} source={require("../assets/images/bar3.png")} />
        <View style={[styles.wrapper5, styles.wrapperFlexBox]}>
          <TextInput
            style={styles.textInput}
            value={routine}
            onChangeText={setRoutine}
            placeholder={routineText === "나의 루틴 만들기" ? "반복하고 싶은 습관을 적어주세요" : ""}
            placeholderTextColor="#CACDD3"
          />
        </View>

        {/* 루틴 기간 (달력 눌렀을 때처럼) */}
        <View style={[styles.wrapper6, styles.wrapperFlexBox]}>
          <Pressable onPress={() => setModalVisible(true)} style={{ flex: 1 }}>
            <Text
              style={[
                styles.textInput,
                styles.textTypo2,
                { color: period ? "black" : "#CACDD3", top: 24, left: 20 },
              ]}
            >
              {period || "당신의 루틴 언제까지 할까요?"}
            </Text>
          </Pressable>
        </View>

        {/* 버튼 영역 */}
        <View style={[styles.buttonWrap, styles.frameIconPosition]}>
<Pressable
  style={[
    styles.wrapper7,
    styles.wrapperLayout,
    { backgroundColor: isConfirmEnabled ? "#91E04C" : "#CACDD3" },
  ]}
  disabled={!isConfirmEnabled || isLoading} // 🔹 로딩 중엔 비활성화
  onPress={createRoutine}
>
  <Text style={[styles.text15, styles.textPosition]}>
    {isLoading ? "생성 중..." : "확인"} {/* 🔹 상태에 따라 변경 */}
  </Text>
</Pressable>


          <Pressable
            style={[styles.wrapper8, styles.wrapperLayout]}
            onPress={() => router.push("/generateroutine2")}
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
    child4Border: {
            borderWidth: 0.8,
            borderColor: "#eaeced",
            backgroundColor: "transparent",
            borderRadius: 12,
            marginLeft: -186,
            borderStyle: "solid",
            left: "50%",
            position: "absolute"
    },
    child4Layout: {
            height: 52,
            top: 207
    },
    textTypo1: {
            fontSize: 16,
            lineHeight: 22,
            letterSpacing: -0.43,
            color: "#26282c",
            fontFamily: "NanumSquareNeo-Bd",
            fontWeight:"600"
    },
        textTypo2: {
            fontSize: 16,
            lineHeight: 22,
            letterSpacing: -0.43,
    },
    frameWrapperFlexBox: {
            justifyContent: "center",
            height: 44,
            width: 44,
            top: 498,
            alignItems: "center",
            flexDirection: "row",
            position: "absolute",
    },
    textTypo: {
            lineHeight: 21,
            letterSpacing: -0.41,
            fontSize: 16,
            textAlign: "center",
            fontFamily: "NanumSquareNeo-Rg"
    },
    iconLayout: {
            height: 50,
            width: 55,
            position: "absolute"
    },
    frameIconPosition: {
            left: "50%",
            position: "absolute"
    },
    wrapperFlexBox: {
            alignItems: "center",
            flexDirection: "row",
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
    rectangleLineargradient: {
            height: 80,
            width: 370,
            top: 329,
            marginLeft: -186,
    },
    child4: {
            width: 370,
            borderWidth: 0.8,
            borderColor: "#eaeced",
            backgroundColor: "transparent",
            borderRadius: 12,
            marginLeft: -186,
            borderStyle: "solid",
            left: "50%",
            position: "absolute"
    },
    text: {
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
    text2: {
            top: 173,
            textAlign: "left",
            fontWeight: "700",
            fontSize: 16,
            left: 20,
            position: "absolute"
    },
    text3: {
            top: 295,
            textAlign: "left",
            fontWeight: "700",
            fontSize: 16,
            left: 20,
            position: "absolute"
    },
    text4: {
            top: 456,
            textAlign: "left",
            fontWeight: "700",
            fontSize: 16,
            left: 20,
            position: "absolute"
    },
    iconCalendarParent: {
            top: 344,
            left: 29
    },
    iconCalendar: {
            top: 0,
            left: 0
    },
    frameIcon: {
            marginLeft: -77,
            top: 50,
            width: 153,
            height: 28
    },
    wrapper5: {
            paddingLeft: 12,
            left: 20,
            height: 52,
            top: 207,
            width: 320
    },
    wrapper6: {
            left: 86,
            width: 254,
            paddingLeft: 16,
            height: 80,
            top: 329
    },
    buttonWrap: {
            marginLeft: -180,
            bottom: 10,
            width: 400,
            height: 80,
            overflow: "hidden",
            backgroundColor: "#f8f8f8"
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
    textInput: {
        flex: 1,
        paddingHorizontal: 10,
        paddingLeft: -6,
        paddingVertical: 6,
        fontSize: 16,
        color: "#26282C",
        fontFamily: "NanumSquareNeo-Rg",
        fontWeight: "600"
    },
    daySelected: {
    backgroundColor: "#F9EEED",
    borderColor: "#FBCBC9",
    borderWidth: 0.5, // 선택되면 빨간 원
    },
    dayButton: {
    width: 40,
    height: 40,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: "#f8f8f8", // 기본 회색 배경
    },
    button: { backgroundColor: "#91E04C", padding: 8, borderRadius: 6 },
  buttonText: { color: "white", fontSize: 14, textAlign: "center", paddingHorizontal: 12 },
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    width: 300,
    height: 430,
    justifyContent: "flex-start",
    elevation: 10,
  },
  calendar: {
    width: "100%",
  },
});