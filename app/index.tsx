import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function HomeScreen() {

  // Valor inicial de la posición del título para luego aplicar la animacion
  const titlePosition = useSharedValue(-400);

  // Valor inicial al fondo 
  const backgroundColor = useSharedValue('aqua');

  // Opacidad inicial que se le da al titulo
  const opacidadTitulo = useSharedValue(1);

  // Se encarga de iniciar la animación al momento de renderizar y cambiar de lugar el titulo
  titlePosition.value = withTiming(0, { duration: 1000 });

  // Al hacer clic en el boton se cambian los valores
  const handlePress = () => {
    // El titulo sin opacidad
    opacidadTitulo.value = 0;
    // Cambia el fondo a azul
    backgroundColor.value = 'blue';
  };

  // Se define la animacion de desvanecimiento del titulo
  const animacionTitulo = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(titlePosition.value, { duration: 1000 }) }],
      opacity: withTiming(opacidadTitulo.value, { duration: 1000 }),
    };
  });

  // Animacion del fondo
  const animacionFondo = useAnimatedStyle(() => {
    return {
      // Este es la animacion para cambiar de color el fondo
      backgroundColor: withTiming(backgroundColor.value, { duration: 1000 }),
    };
  });

  return (
    <>
        <Animated.View style={[styles.container, animacionFondo]}>
          <Animated.Text style={[styles.title, animacionTitulo]}>Primera App usando Reanimated</Animated.Text>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Iniciar</Text>
          </TouchableOpacity>
        </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    position: "absolute"
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'darkblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
 
})