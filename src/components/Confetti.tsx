import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";

const PIECES = ["🎉", "✨", "⭐", "💥", "🔥"];

type Piece = { x: number; delay: number; duration: number; char: string; spin: number };

export function Confetti({ count = 24 }: { count?: number }) {
  const { width, height } = Dimensions.get("window");
  const anims = useRef<Animated.Value[]>([]);
  if (anims.current.length === 0) {
    anims.current = Array.from({ length: count }, () => new Animated.Value(0));
  }

  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: Math.random() * (width - 30),
        delay: Math.random() * 600,
        duration: 1800 + Math.random() * 1400,
        char: PIECES[i % PIECES.length],
        spin: Math.random() > 0.5 ? 1 : -1,
      })),
    [count, width]
  );

  useEffect(() => {
    const loops = anims.current.map((v, i) =>
      Animated.timing(v, {
        toValue: 1,
        delay: pieces[i].delay,
        duration: pieces[i].duration,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      })
    );
    Animated.parallel(loops).start();
  }, [pieces]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {pieces.map((p, i) => {
        const translateY = anims.current[i].interpolate({
          inputRange: [0, 1],
          outputRange: [-40, height],
        });
        const rotate = anims.current[i].interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", `${p.spin * 540}deg`],
        });
        return (
          <Animated.Text
            key={i}
            style={[
              styles.piece,
              { left: p.x, transform: [{ translateY }, { rotate }] },
            ]}
          >
            {p.char}
          </Animated.Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  piece: { position: "absolute", top: 0, fontSize: 26 },
});
