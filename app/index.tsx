import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Switch,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import {
  getDatabase,
  onValue,
  query,
  ref,
  runTransaction,
  set,
} from "firebase/database";
import { app, database, db } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, setDoc } from "firebase/firestore";
import {
  Entypo,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";
import { useNavigation, useRouter } from "expo-router";

interface TP {
  fan: boolean;
  is_auto: boolean;
  esp_wifi: boolean;
  light: boolean;
  mist: boolean;
  pump: boolean;
  sprink: boolean;
  hum: number;
  tem: number;
  water_level: number;
}

export default function App() {
  const [dht, setDht] = useState<TP | null>(null);

  const getList = () => {
    const starCountRef = ref(db, "DHT");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setDht(data);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const toggleSwitch = (path: string, val: boolean) => {
    set(ref(db, "DHT/" + path), val);
  };

  const nav = useRouter();

  return (
    <LinearGradient
      // Background Linear Gradient
      style={{
        flex: 1,
      }}
      colors={["#2980B9", "#6DD5FA", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.5, 1]}
    >
      <ScrollView style={styles.container}>
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 700,
              textAlign: "center",
              marginVertical: 10,
              paddingHorizontal: 20,
              marginBottom: 20,
              color: "#fafafa",
            }}
          >
            Advanced Mushroom Cultivation System
          </Text>
          <View
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                backgroundColor: dht?.esp_wifi ? "#00A300" : "#FF0000",
                paddingHorizontal: 20,
                paddingVertical: 8,
                width: 100,
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#fafafa", fontWeight: "700" }}>
                {dht?.esp_wifi ? "Online" : "Offline"}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => nav.push("/graph")}
            style={styles.cardFixed}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                height: 100,
                padding: 10,
                width: 90,
                alignItems: "center",
              }}
            >
              <FontAwesome6 name="temperature-half" size={50} color="#ff0000" />
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: 600 }}>Temperature</Text>
              <Text style={{ fontSize: 45, fontWeight: 700 }}>
                {dht?.tem} °C
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                width: 100,
                height: 100,
                borderRadius: 350,
                borderColor: "#ff0000",
                borderWidth: 5,
                top: -30,
                right: -40,
                zIndex: -1,
              }}
            ></View>
          </Pressable>

          <Pressable
            onPress={() => nav.push("/graph")}
            style={styles.cardFixed}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                height: 100,
                padding: 10,
                width: 90,
                alignItems: "center",
              }}
            >
              <Entypo name="drop" size={50} color="#03a5fc" />
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: 600 }}>Humidity</Text>
              <Text style={{ fontSize: 45, fontWeight: 700 }}>
                {dht?.hum} %
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                width: 100,
                height: 100,
                borderRadius: 350,
                borderColor: "#03a5fc",
                borderWidth: 5,
                top: -30,
                right: -40,
                zIndex: -1,
              }}
            ></View>
          </Pressable>

          <Pressable
            onPress={() => nav.push("/graph")}
            style={styles.cardFixed}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                height: 100,
                padding: 10,
                width: 90,
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="water" size={50} color="#0313fc" />
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: 600 }}>Water Level</Text>
              <Text style={{ fontSize: 45, fontWeight: 700 }}>
                {dht?.water_level ?? 0} %
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                width: 100,
                height: 100,
                borderRadius: 350,
                borderColor: "#0313fc",
                borderWidth: 5,
                top: -30,
                right: -40,
                zIndex: -1,
              }}
            ></View>
          </Pressable>

          <View style={[styles.card, { marginBottom: 30 }]}>
            <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
              Mode
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                Auto
              </Text>
              <Switch
                value={dht?.is_auto}
                onChange={(val) =>
                  toggleSwitch("is_auto", val.nativeEvent.value)
                }
              />
            </View>

            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  marginBottom: 10,
                  color: dht?.is_auto ? "gray" : "black",
                }}
              >
                Manual Controls
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={[
                    styles.togglerText,
                    { color: dht?.is_auto ? "gray" : "black" },
                  ]}
                >
                  Fan
                </Text>
                <Switch
                  value={dht?.fan}
                  disabled={dht?.is_auto}
                  onChange={(val) => toggleSwitch("fan", val.nativeEvent.value)}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={[
                    styles.togglerText,
                    { color: dht?.is_auto ? "gray" : "black" },
                  ]}
                >
                  Light
                </Text>
                <Switch
                  value={dht?.light}
                  disabled={dht?.is_auto}
                  onChange={(val) =>
                    toggleSwitch("light", val.nativeEvent.value)
                  }
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={[
                    styles.togglerText,
                    { color: dht?.is_auto ? "gray" : "black" },
                  ]}
                >
                  Mist
                </Text>
                <Switch
                  value={dht?.mist}
                  disabled={dht?.is_auto}
                  onChange={(val) =>
                    toggleSwitch("mist", val.nativeEvent.value)
                  }
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={[
                    styles.togglerText,
                    { color: dht?.is_auto ? "gray" : "black" },
                  ]}
                >
                  Pump
                </Text>
                <Switch
                  value={dht?.pump}
                  disabled={dht?.is_auto}
                  onChange={(val) =>
                    toggleSwitch("pump", val.nativeEvent.value)
                  }
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={[
                    styles.togglerText,
                    { color: dht?.is_auto ? "gray" : "black" },
                  ]}
                >
                  Sprink
                </Text>
                <Switch
                  value={dht?.sprink}
                  disabled={dht?.is_auto}
                  onChange={(val) =>
                    toggleSwitch("sprink", val.nativeEvent.value)
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
  },
  togglerText: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
  togglerBtn: {
    width: 80,
    height: 80,
    backgroundColor: "#1db484",
    borderRadius: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  togglerIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
  },
  card: {
    backgroundColor: "#fafafa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    // Shadow for Android
    elevation: 1,
    borderRadius: 7,

    display: "flex",
    padding: 10,
    marginBottom: 10,
    position: "relative",
    overflow: "hidden",
  },
  cardFixed: {
    height: 120,
    backgroundColor: "#fafafa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    // Shadow for Android
    elevation: 1,
    borderRadius: 7,

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 30,
    marginBottom: 10,
    position: "relative",
    overflow: "hidden",
  },
});
