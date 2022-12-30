import React, { useEffect, useReducer, useRef } from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "react-query";
import useAuth, { AuthProvider } from "./hooks/useAuth";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { Pressable, StatusBar, StyleSheet, View, Text } from "react-native";
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

import { createStackNavigator } from "@react-navigation/stack";
import DashboardIcon from "./src/assets/svg/DashboardIcon";
import AssetsIcon from "./src/assets/svg/AssetsIcon";
import ReferralsIcon from "./src/assets/svg/ReferralsIcon";
import ReleasesIcon from "./src/assets/svg/ReleasesIcon";
import HomeScreen from "./screens/HomeScreen";
import AssetsScreen from "./screens/AssetsScreen";
import DepositScreen from "./screens/DepositScreen";
// ------------------------------------------------------------------

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const navTheme = DefaultTheme;
navTheme.colors.background = "#000";
navTheme.colors.text = "#fff";

// ------------------------------------------------------------------
export const Navigation = () => {
  let { userToken, logOut } = useAuth();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        // @ts-ignore
        if (error?.response?.status === 401) {
          logOut();
        }
      },
    }),
  });

  return (
    <NavigationContainer theme={navTheme}>
      <QueryClientProvider client={queryClient}>
        <TailwindProvider>
          {userToken ? (
            <BottomTabNavigator />
          ) : (
            <Stack.Navigator>
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
          )}
        </TailwindProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      // @ts-ignore
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
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
        component={HomeScreen}
      />
      <Tab.Screen
        name="AssetsStack"
        options={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#000",
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
          // @ts-ignore
          tabBarIcon: ({ ref, active }) => {
            return <ReferralsIcon sroke={active ? "#000" : "#F0B90B"} />;
          },
        }}
        component={PlaceholderScreen}
      />
      <Tab.Screen
        name="Releases"
        options={{
          // @ts-ignore
          tabBarIcon: ({ ref, active }) => {
            return <ReleasesIcon sroke={active ? "#000" : "#F0B90B"} />;
          },
        }}
        component={PlaceholderScreen}
      />
    </Tab.Navigator>
  );
};

const AssetsStack = createStackNavigator();

const AssetsStackScreen = () => {
  return (
    <AssetsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
      }}
    >
      <AssetsStack.Screen name="Assets" component={AssetsScreen} />
      <AssetsStack.Screen name="Deposit" component={DepositScreen} />
    </AssetsStack.Navigator>
  );
};

const App = (props) => {
  return (
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
              onPress={() => navigation.navigate(route.name)}
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
