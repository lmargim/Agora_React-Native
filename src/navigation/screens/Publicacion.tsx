import { StyleSheet, ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native"; // Importa useFocusEffect

export function PublicacionScreen() {
  interface Publicacion {
    id_publicacion: number;
    titulo: string;
    texto: string;
    fecha_creacion: string;
    nombre_usuario: string;
    tema: string;
  }

  const [datos, setDatos] = useState<Publicacion[]>([]);

  // Función para cargar las publicaciones
  const cargarPublicaciones = useCallback(async () => {
    try {
      let response = await fetch("http://localhost:3000/api/publicacion", {
        method: "GET",
      });

      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      }
    } catch (error) {
      console.error("Error al cargar publicaciones:", error);
    }
  }, []);

  // Usar useFocusEffect para cargar las publicaciones cada vez que la pantalla recibe el foco
  useFocusEffect(
    useCallback(() => {
      cargarPublicaciones();
    }, [cargarPublicaciones])
  );

  const handleDelete = async (idPublicacion: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/publicacion/${idPublicacion}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Eliminar la publicación del estado
        setDatos((prevDatos) =>
          prevDatos.filter((publicacion) => publicacion.id_publicacion !== idPublicacion)
        );
        alert("Publicación eliminada correctamente.");
      } else {
        alert("Error al eliminar la publicación.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al intentar eliminar la publicación.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {datos.map((row) => (
        <Card key={row.id_publicacion} style={styles.card}>
          <Text style={styles.fecha}>
            {new Date(row.fecha_creacion).toLocaleString()}
          </Text>
          <VStack style={styles.content}>
            <Heading size="md" style={styles.titulo}>
              {row.titulo}
            </Heading>
            <Text size="sm" style={styles.texto}>
              {row.texto}
            </Text>
          </VStack>
          <Box style={styles.footer}>
            <VStack style={styles.usuarioInfo}>
              <Heading size="sm" style={styles.nombreUsuario}>
                {row.nombre_usuario ? row.nombre_usuario : "Anónimo"}
              </Heading>
              <Text size="sm" style={styles.tema}>
                {row.tema}
              </Text>
            </VStack>
            <Button
              size="md"
              variant="solid"
              action="primary"
              style={styles.botonBorrar}
              onPress={() => handleDelete(row.id_publicacion)}
            >
              <Text style={styles.botonBorrarTexto}>Borrar</Text>
            </Button>
          </Box>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 239, 170, 0.1)",
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  fecha: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
    fontStyle: "italic",
  },
  content: {
    marginBottom: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  texto: {
    fontSize: 14,
    color: "#555",
    lineHeight: 1.5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  usuarioInfo: {
    flex: 1,
  },
  nombreUsuario: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  tema: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  botonBorrar: {
    backgroundColor: "#ff4444",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  botonBorrarTexto: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});