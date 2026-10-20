import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { shortcuts } from "./shortcuts";

export default function App() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const data = shortcuts.filter((s) =>
    (s.title + " " + s.category + " " + s.steps).toLowerCase().includes(q)
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.heading}>ZipMath</Text>
      <TextInput
        style={styles.search}
        placeholder="Search shortcuts"
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
      />
      <FlatList
        data={data}
        keyExtractor={(s) => s.id}
        ListEmptyComponent={<Text style={styles.empty}>No shortcuts found.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.steps}</Text>
            <Text style={styles.example}>{item.example}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 56, backgroundColor: "#fff" },
  heading: { fontSize: 28, fontWeight: "700", marginBottom: 12 },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  card: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  category: { fontSize: 12, color: "#666" },
  title: { fontSize: 18, fontWeight: "600", marginVertical: 4 },
  example: { marginTop: 6, fontStyle: "italic" },
  empty: { textAlign: "center", color: "#666", marginTop: 24 },
});
