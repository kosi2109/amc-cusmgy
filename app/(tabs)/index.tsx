import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Switch,
  ActivityIndicator,
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

interface TP {
  fan: boolean;
  is_auto: boolean;
  light: boolean;
  mist: boolean;
  pump: boolean;
  sprink: boolean;
  hum: number;
  tem: number;
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

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          Auto
        </Text>
        <Switch
          value={dht?.is_auto}
          onChange={(val) => toggleSwitch("is_auto", val.nativeEvent.value)}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View>
          <Text style={styles.togglerText}>Fan</Text>
          <Switch
            value={dht?.fan}
            disabled={dht?.is_auto}
            onChange={(val) => toggleSwitch("fan", val.nativeEvent.value)}
          />
        </View>
        <View>
          <Text style={styles.togglerText}>Light</Text>
          <Switch
            value={dht?.light}
            disabled={dht?.is_auto}
            onChange={(val) => toggleSwitch("light", val.nativeEvent.value)}
          />
        </View>
        <View>
          <Text style={styles.togglerText}>Mist</Text>
          <Switch
            value={dht?.mist}
            disabled={dht?.is_auto}
            onChange={(val) => toggleSwitch("mist", val.nativeEvent.value)}
          />
        </View>
        <View>
          <Text style={styles.togglerText}>Pump</Text>
          <Switch
            value={dht?.pump}
            disabled={dht?.is_auto}
            onChange={(val) => toggleSwitch("pump", val.nativeEvent.value)}
          />
        </View>
        <View>
          <Text style={styles.togglerText}>Sprink</Text>
          <Switch
            value={dht?.sprink}
            disabled={dht?.is_auto}
            onChange={(val) => toggleSwitch("sprink", val.nativeEvent.value)}
          />
        </View>
      </View>

      <Text>HUM : {dht?.hum}</Text>
      <Text>TEM : {dht?.tem}</Text>
    </View>
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
});
