import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { onValue, ref } from "firebase/database";
import { db } from "@/firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import { Line, Svg } from "react-native-svg";

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

const graph = () => {
  const [dht, setDht] = useState<TP | null>(null);
  const [temps, setTemps] = useState([30, 30, 30, 30, 30, 30]);
  const [hums, setHums] = useState([80, 80, 80, 80, 80, 80, 80, 80, 80, 80]);
  const [waterlevels, setWaterlevels] = useState([
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
  ]);

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

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (dht?.tem) {
      let newData = dht?.tem;

      // if hum is over 28 set 28
      if (newData > 28) {
        newData = 28;
      }

      // if hum is under 25 set 25
      if (newData < 25) {
        newData = 25;
      }
      setTemps((pre) => [...pre, newData].slice(-10) as any);
    }
  }, [dht?.tem]);

  useEffect(() => {
    if (dht?.hum) {
      let newData = dht?.hum;

      // if hum is over 95 set 95
      if (newData > 95) {
        newData = 95;
      }

      // if hum is under 80 set 80
      if (newData < 80) {
        newData = 80;
      }

      setHums((pre) => [...pre, newData].slice(-10) as any);
    }
  }, [dht?.hum]);

  // Data for the three lines (temperature, humidity, water level)
  const data = {
    labels: [""], // Only one value
    datasets: [
      {
        data: temps, // Temperature
        color: (opacity = 1) => `#FF0000`, // #FF0000 (Temperature)
        strokeWidth: 1,
      },
    ],
    legend: ["Temperature"], // Optional
  };

  const humData = {
    labels: [""], // Only one value
    datasets: [
      {
        data: hums, // Humidity
        color: (opacity = 1) => `#03a5fc`, // #03a5fc (Humidity)
        strokeWidth: 1,
      },
    ],
    legend: ["Humidity"], // Optional
  };

  const waterData = {
    labels: [""], // Only one value
    datasets: [
      {
        data: waterlevels, // Water level
        color: (opacity = 1) => `#0313fc`, // #0313fc (Water Level)
        strokeWidth: 1,
      },
    ],
    legend: ["Water Level"], // Optional
  };

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
          <View style={[styles.card, { padding: 0 }]}>
            {dht && (
              <LineChart
                data={data}
                width={screenWidth - 20}
                height={220}
                chartConfig={{
                  backgroundColor: "transparent",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  propsForDots: {
                    r: "0",
                    strokeWidth: "0",
                    stroke: "#ffa726",
                  },
                  propsForBackgroundLines: {
                    strokeDasharray: "", // Remove dashed lines
                    stroke: "transparent", // Make grid lines transparent
                  },
                  fillShadowGradient: "#ffffff", // this removes the gray shadow under the line
                  fillShadowGradientOpacity: -100,
                  fillShadowGradientFromOffset: 0,
                  fillShadowGradientFrom: "#fff",
                  fillShadowGradientTo: "#fff",
                }}
                bezier={false}
                fromZero
                yAxisInterval={10}
                yLabelsOffset={10}
                segments={5}
                fromNumber={50}
              />
            )}
          </View>

          <View style={[styles.card, { padding: 0 }]}>
            {dht && (
              <LineChart
                data={humData}
                width={screenWidth - 20}
                height={220}
                chartConfig={{
                  backgroundColor: "transparent",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  propsForDots: {
                    r: "0",
                    strokeWidth: "0",
                    stroke: "#ffa726",
                  },
                  propsForBackgroundLines: {
                    strokeDasharray: "", // Remove dashed lines
                    stroke: "transparent", // Make grid lines transparent
                  },
                  fillShadowGradient: "#ffffff", // this removes the gray shadow under the line
                  fillShadowGradientOpacity: -100,
                  fillShadowGradientFromOffset: 0,
                  fillShadowGradientFrom: "#fff",
                  fillShadowGradientTo: "#fff",
                }}
                bezier={false}
                fromZero
                yAxisInterval={10}
                yLabelsOffset={10}
                segments={10}
                fromNumber={100}
              />
            )}
          </View>

          <View style={[styles.card, { padding: 0 }]}>
            {dht && (
              <LineChart
                data={waterData}
                width={screenWidth - 20}
                height={220}
                chartConfig={{
                  backgroundColor: "transparent",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  propsForDots: {
                    r: "0",
                    strokeWidth: "0",
                    stroke: "#ffa726",
                  },
                  propsForBackgroundLines: {
                    strokeDasharray: "", // Remove dashed lines
                    stroke: "transparent", // Make grid lines transparent
                  },
                  fillShadowGradient: "#ffffff", // this removes the gray shadow under the line
                  fillShadowGradientOpacity: -100,
                  fillShadowGradientFromOffset: 0,
                  fillShadowGradientFrom: "#fff",
                  fillShadowGradientTo: "#fff",
                }}
                bezier={false}
                fromZero
                yAxisInterval={10}
                yLabelsOffset={10}
                segments={10}
                fromNumber={100}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
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

export default graph;
