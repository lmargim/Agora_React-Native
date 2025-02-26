import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native"; // Importa View y StyleSheet

function AltaScreen() {
  const navigation = useNavigation();
  const temas = [
    "Actualidad",
    "Tecnología",
    "Deportes",
    "Entretenimiento",
    "Política",
    "Educación",
    "Salud",
    "Negocios",
    "Ciencia",
    "Medio Ambiente",
    "Arte y Cultura",
    "Viajes",
    "Moda",
    "Gastronomía",
    "Humor",
    "Videojuegos",
    "Automóviles",
    "Fitness",
    "Relaciones",
    "Mascotas",
  ];

  const [datos, setDatos] = useState({
    titulo: "",
    texto: "",
    nombre_usuario: "",
    tema: "",
  });

  const [errores, setErrores] = useState({
    titulo: "",
    texto: "",
    tema: "",
  });

  const validarDatos = () => {
    let erroresTemp = { titulo: "", texto: "", tema: "" };
    let valido = true;

    if (datos.titulo.trim() === "") {
      erroresTemp.titulo = "El título es obligatorio.";
      valido = false;
    } else if (datos.titulo.length < 5) {
      erroresTemp.titulo = "El título debe tener al menos 5 caracteres.";
      valido = false;
    }

    if (datos.texto.trim() === "") {
      erroresTemp.texto = "El texto es obligatorio.";
      valido = false;
    } else if (datos.texto.length < 10) {
      erroresTemp.texto = "El texto debe tener al menos 10 caracteres.";
      valido = false;
    }

    if (datos.tema.trim() === "") {
      erroresTemp.tema = "El tema es obligatorio.";
      valido = false;
    }

    setErrores(erroresTemp);
    return valido;
  };

  const handleSubmit = async () => {
    if (validarDatos()) {
      try {
        const response = await fetch("http://localhost:3000/api/publicacion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });

        if (response.ok) {
          const respuesta = await response.json();
          alert(respuesta.mensaje);
          if (respuesta.ok) {
            navigation.goBack();
          }
        } else {
          alert("Error al enviar los datos.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error: " + error);
      }
    }
  };

  return (
    <View style={styles.container}> {/* Contenedor con fondo */}
      <VStack className="w-full p-6 bg-white rounded-lg shadow-sm">
        {/* Campo: Título */}
        <FormControl
          isInvalid={!!errores.titulo}
          size="md"
          isDisabled={false}
          isReadOnly={false}
          isRequired={true}
          className="mb-4"
        >
          <FormControlLabel>
            <FormControlLabelText className="text-sm font-medium text-gray-700">
              Título
            </FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1 border border-gray-300 rounded-md">
            <InputField
              type="text"
              placeholder="Escribe un título"
              value={datos.titulo}
              onChangeText={(text) => setDatos({ ...datos, titulo: text })}
              className="text-base text-gray-800"
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText className="text-red-500 text-sm">
              {errores.titulo}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Campo: Texto */}
        <FormControl
          isInvalid={!!errores.texto}
          size="md"
          isDisabled={false}
          isReadOnly={false}
          isRequired={true}
          className="mb-4"
        >
          <FormControlLabel>
            <FormControlLabelText className="text-sm font-medium text-gray-700">
              Texto
            </FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1 border border-gray-300 rounded-md">
            <InputField
              type="text"
              placeholder="Escribe tu texto"
              value={datos.texto}
              onChangeText={(text) => setDatos({ ...datos, texto: text })}
              className="text-base text-gray-800"
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText className="text-red-500 text-sm">
              {errores.texto}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Campo: Nombre de usuario */}
        <FormControl
          size="md"
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
          className="mb-4"
        >
          <FormControlLabel>
            <FormControlLabelText className="text-sm font-medium text-gray-700">
              Nombre de usuario
            </FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1 border border-gray-300 rounded-md">
            <InputField
              type="text"
              placeholder="Tu nombre de usuario"
              value={datos.nombre_usuario}
              onChangeText={(text) =>
                setDatos({ ...datos, nombre_usuario: text })
              }
              className="text-base text-gray-800"
            />
          </Input>
        </FormControl>

        {/* Campo: Tema (Select de Gluestack) */}
        <FormControl
          isInvalid={!!errores.tema}
          size="md"
          isDisabled={false}
          isReadOnly={false}
          isRequired={true}
          className="mb-6"
        >
          <FormControlLabel>
            <FormControlLabelText className="text-sm font-medium text-gray-700">
              Tema
            </FormControlLabelText>
          </FormControlLabel>
          <Select
            selectedValue={datos.tema}
            onValueChange={(text) => setDatos({ ...datos, tema: text })}
          >
            <SelectTrigger
              variant="outline"
              size="md"
              className="border border-gray-300 rounded-md"
            >
              <SelectInput
                placeholder="Selecciona un tema"
                className="text-base text-gray-800"
              />
              <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent className="bg-white rounded-md shadow-lg">
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {temas.map((tema, index) => (
                  <SelectItem
                    key={index}
                    label={tema}
                    value={tema}
                    className="text-base text-gray-800"
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText className="text-red-500 text-sm">
              {errores.tema}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Botón de envío */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-md py-2 mt-4 transition-colors duration-200"
          size="sm"
          onPress={handleSubmit}
        >
          <ButtonText className="text-white font-semibold">Enviar</ButtonText>
        </Button>
      </VStack>
    </View>
  );
}

// Estilos para el contenedor principal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 239, 170, 0.1)",
    padding: 16,
    justifyContent: "center",
  },
});

export default AltaScreen;