import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, radius } from "../theme";

type Props = {
  label: string;
  onPress: () => void;
  color?: string;
  darkColor?: string;
  textColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
};

export function Button3D({
  label,
  onPress,
  color = colors.green,
  darkColor = colors.greenDark,
  textColor = "#FFFFFF",
  disabled = false,
  style,
}: Props) {
  const [pressed, setPressed] = useState(false);
  const bg = disabled ? colors.locked : color;
  const edge = disabled ? colors.lockedDark : darkColor;
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={style}
    >
      <View style={[styles.base, { backgroundColor: bg, borderBottomColor: edge }, pressed && styles.pressed]}>
        <Text style={[styles.label, { color: disabled ? colors.muted : textColor }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    borderBottomWidth: 5,
    paddingVertical: 14,
    alignItems: "center",
  },
  pressed: { borderBottomWidth: 1, marginTop: 4 },
  label: { fontSize: 16, fontWeight: "800", letterSpacing: 0.8, textTransform: "uppercase" },
});
