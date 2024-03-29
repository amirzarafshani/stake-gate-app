import React, { useEffect, useReducer, useRef, useState } from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import useAuth, { AuthProvider } from "./hooks/useAuth";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { toast, Toasts } from "@backpackapp-io/react-native-toast";

import {
  Pressable,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from "react-native";
// navigation
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
// svg
import Svg, { Path } from "react-native-svg";
// reanimated
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import { createStackNavigator } from "@react-navigation/stack";
import DashboardIcon from "./src/assets/svg/DashboardIcon";
import AssetsIcon from "./src/assets/svg/AssetsIcon";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import AssetsScreen from "./screens/AssetsScreen";
import DepositScreen from "./screens/DepositScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ReferralsScreen from "./screens/ReferralsScreen";
// ------------------------------------------------------------------
// import {
//   useFonts,
//   Oswald_400Regular as Oswald,
// } from "@expo-google-fonts/oswald";

import { LogBox } from "react-native";
import ReleaseScreen from "./screens/ReleaseScreen";
import { StatusBarHeight } from "./helpers/StatusBarHeight";
import FlashMessage from "react-native-flash-message";
LogBox.ignoreLogs(["new NativeEventEmitter"]);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const navTheme = DefaultTheme;
navTheme.colors.background = "#000";
navTheme.colors.text = "#fff";

// ------------------------------------------------------------------
export const Navigation = () => {
  let { logOut } = useAuth();
  const navigationRef = useRef();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        // console.log(error?.response?.status);
        // @ts-ignore
        if (error?.response?.status === 401) {
          logOut();
          navigationRef.current?.navigate("Login");
        }
      },
    }),
  });

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        theme={navTheme}
        options={{ headerTitleStyle: { fontFamily: "Oswald" } }}
      >
        <QueryClientProvider client={queryClient}>
          <TailwindProvider>
            <Stack.Navigator initialRouteName="Splash">
              <Stack.Screen
                name="Splash"
                options={{ animationEnabled: false, header: () => null }}
                component={SplashScreen}
              />
              <Stack.Screen
                name="Home"
                options={{ header: () => null }}
                component={BottomTabNavigator}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                  headerLeft: () => false,
                  gestureEnabled: false,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                  headerShown: false,
                  headerLeft: () => false,
                  gestureEnabled: false,
                  headerBackVisible: false,
                }}
              />
            </Stack.Navigator>
          </TailwindProvider>
        </QueryClientProvider>
        {/* </View> */}
      </NavigationContainer>
      <Toasts />
    </>
  );
};

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const BottomTabNavigator = ({ navigation }) => {
  let { logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
    navigation.navigate("Login");
  };

  return (
    <Tab.Navigator
      // @ts-ignore
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: "#1E2026" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontFamily: "Oswald" },
      }}
      tabBar={(props) => <AnimatedTabBar {...props} />}
    >
      <Tab.Screen
        name="Dashboard"
        options={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#ddd",
          },
          // @ts-ignore
          tabBarIcon: ({ ref, active }) => {
            return <DashboardIcon sroke={active ? "#000" : "#F0B90B"} />;
          },
        }}
        component={DashboardStackScreen}
      />
      <Tab.Screen
        name="AssetsStack"
        options={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#1E2026",
          },
          // @ts-ignore
          tabBarIcon: ({ ref, active }) => {
            return <AssetsIcon sroke={active ? "#000" : "#F0B90B"} />;
          },
        }}
        component={AssetsStackScreen}
      />
      <Tab.Screen
        name="Referrals"
        options={{
          headerStatusBarHeight: StatusBarHeight,
          // @ts-ignore
          tabBarIcon: ({ ref, active }) => {
            return (
              <MaterialIcons
                name="supervised-user-circle"
                size={32}
                color={active ? "#000" : "#F0B90B"}
              />
            );
          },
        }}
        component={ReferralsScreen}
      />
      <Tab.Screen
        name="Settings"
        options={{
          headerStatusBarHeight: StatusBarHeight,
          // @ts-ignore
          tabBarIcon: ({ ref, active }) => {
            return (
              <Ionicons
                name="settings-outline"
                size={32}
                color={active ? "#000" : "#F0B90B"}
              />
            );
          },
          headerRight: () => (
            <TouchableOpacity onPress={handleLogOut} className="px-4">
              <Feather name="power" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

const DashboardStack = createStackNavigator();

const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#1E2026" },
        headerTintColor: "#fff",
      }}
    >
      <DashboardStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name="Deposit"
        component={DepositScreen}
        options={{
          headerStatusBarHeight: StatusBarHeight,
          headerTitle: "Deposit Request",
          headerTitleStyle: { fontFamily: "Oswald" },
        }}
      />
    </DashboardStack.Navigator>
  );
};

const AssetsStack = createStackNavigator();

const AssetsStackScreen = () => {
  return (
    <AssetsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1E2026",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Oswald",
        },
        headerStatusBarHeight: StatusBarHeight,
        translucent: true,
      }}
    >
      <AssetsStack.Screen
        name="Assets"
        component={AssetsScreen}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      {/* <AssetsStack.Screen name="Deposit" component={DepositScreen} /> */}
      <AssetsStack.Screen
        name="Release"
        component={ReleaseScreen}
        options={{ headerTitle: "Release Request" }}
      />
    </AssetsStack.Navigator>
  );
};

const App = (props) => {
  // let [fontsLoaded] = useFonts({
  //   Oswald,
  // });

  return !true ? (
    <ActivityIndicator />
  ) : (
    <AuthProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </AuthProvider>
  );
};

// ------------------------------------------------------------------

const PlaceholderScreen = () => {
  return <View style={{ flex: 1, backgroundColor: "#000" }} />;
};

// ------------------------------------------------------------------

const AnimatedTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}) => {
  const { bottom } = useSafeAreaInsets();

  // get information about the components position on the screen -----

  const reducer = (state, action) => {
    // Add the new value to the state
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);
  // console.log(layout);

  const handleLayout = (event, index) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };

  // animations ------------------------------------------------------

  const xOffset = useDerivedValue(() => {
    // Our code hasn't finished rendering yet, so we can't use the layout values
    if (layout.length !== routes.length) return 0;
    // We can use the layout values
    // Copy layout to avoid errors between different threads
    // We subtract 25 so the active background is centered behind our TabBar Components
    // 20 pixels is the width of the left part of the svg (the quarter circle outwards)
    // 5 pixels come from the little gap between the active background and the circle of the TabBar Components
    return [...layout].find(({ index }) => index === activeIndex)?.x - 25;
    // Calculate the offset new if the activeIndex changes (e.g. when a new tab is selected)
    // or the layout changes (e.g. when the components haven't finished rendering yet)
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // translateX to the calculated offset with a smooth transition
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    };
  });

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      <AnimatedSvg
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill="#000"
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={(e) => handleLayout(e, index)}
              onPress={() => {
                // console.log(route.state?.routeNames);
                if (route.state?.routeNames?.length > 0) {
                  navigation.navigate(route.name, {
                    screen: route.state.routeNames[0],
                  });
                } else {
                  navigation.navigate(route.name);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

// ------------------------------------------------------------------

const TabBarComponent = ({ active, options, onLayout, onPress }) => {
  // handle lottie animation -----------------------------------------
  const ref = useRef(null);

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play();
      // console.log({ active }, ref);
    }
  }, [active]);

  // animations ------------------------------------------------------

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 }),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 250 }),
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}
      >
        {/* @ts-ignore */}
        {options.tabBarIcon ? (
          // @ts-ignore
          options.tabBarIcon({ ref, active })
        ) : (
          <Text>?</Text>
        )}
      </Animated.View>
    </Pressable>
  );
};

// ------------------------------------------------------------------

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#1E2026",
  },
  activeBackground: {
    position: "absolute",
  },
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  component: {
    height: 60,
    width: 60,
    marginTop: 5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: "#F0B90B",
    bottom: 10,
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
