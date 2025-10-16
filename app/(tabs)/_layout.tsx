import { Tabs } from "expo-router";
import { Image, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
            <Tabs.Screen
  name="routine"
  options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={
          focused
            ? require("../../assets/images/routineY.png")
            : require("../../assets/images/routineN.png")
        }
        style={{ width: 30, height: 30, marginTop: 10 }}
        resizeMode="contain"
      />
    ),
    tabBarLabel: ({ focused }) => (
        <Text
          style={{
            fontSize: 10,                 // 글씨 크기
            fontFamily: "NanumSquareNeo-Bd",    // 원하는 글씨체 (Expo Fonts 사용 가능)
            color: focused ? "#26282C" : "#9EA4A9",
            marginTop: 12
          }}
        >
          루틴
        </Text>
      ),
    }}
  />
              <Tabs.Screen
  name="cultivate"
  options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={
          focused
            ? require("../../assets/images/cultivateY.png")
            : require("../../assets/images/cultivateN.png")
        }
        style={{ width: 30, height: 30, marginTop: 10 }}
        resizeMode="contain"
      />
    ),
    tabBarLabel: ({ focused }) => (
        <Text
          style={{
            fontSize: 10,                 // 글씨 크기
            fontFamily: "NanumSquareNeo-Bd",    // 원하는 글씨체 (Expo Fonts 사용 가능)
            color: focused ? "#26282C" : "#9EA4A9",
            marginTop: 12
          }}
        >
          재배
        </Text>
      ),
    }}
  />
      <Tabs.Screen
  name="home"
  options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={
          focused
            ? require("../../assets/images/homeY.png")
            : require("../../assets/images/homeN.png")
        }
        style={{ width: 30, height: 30, marginTop: 10 }}
        resizeMode="contain"
      />
    ),
    tabBarLabel: ({ focused }) => (
        <Text
          style={{
            fontSize: 10,                 // 글씨 크기
            fontFamily: "NanumSquareNeo-Bd",    // 원하는 글씨체 (Expo Fonts 사용 가능)
            color: focused ? "#26282C" : "#9EA4A9",
            marginTop: 12
          }}
        >
          홈
        </Text>
      ),
    }}
  />
      <Tabs.Screen
  name="achieve"
  options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={
          focused
            ? require("../../assets/images/achieveY.png")
            : require("../../assets/images/achieveN.png")
        }
        style={{ width: 30, height: 30, marginTop: 10 }}
        resizeMode="contain"
      />
    ),
    tabBarLabel: ({ focused }) => (
        <Text
          style={{
            fontSize: 10,                 // 글씨 크기
            fontFamily: "NanumSquareNeo-Bd",    // 원하는 글씨체 (Expo Fonts 사용 가능)
            color: focused ? "#26282C" : "#9EA4A9",
            marginTop: 12
          }}
        >
          업적
        </Text>
      ),
    }}
  />
        <Tabs.Screen
  name="shop"
  options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={
          focused
            ? require("../../assets/images/shopY.png")
            : require("../../assets/images/shopN.png")
        }
        style={{ width: 30, height: 30, marginTop: 10 }}
        resizeMode="contain"
      />
    ),
    tabBarLabel: ({ focused }) => (
        <Text
          style={{
            fontSize: 10,                 // 글씨 크기
            fontFamily: "NanumSquareNeo-Bd",    // 원하는 글씨체 (Expo Fonts 사용 가능)
            color: focused ? "#26282C" : "#9EA4A9",
            marginTop: 12
          }}
        >
          상점
        </Text>
      ),
    }}
  />
    </Tabs>
  );
}