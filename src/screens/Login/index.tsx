import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { Button, Input } from "@rneui/base";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigationParams } from "../../routes";

export default function LoginScreen() {
  // Hooks
  const [erro, setErro] = useState<null | string>(null);

  // Constantes

  /** Constante para ajustar o input e dimensionar corretamente a tela */
  const windowHeight = useWindowDimensions().height;

  type navProps = StackNavigationProp<NavigationParams, "login">;
  const navigate = useNavigation<navProps>();

  // Funções

  /** Função de logar do Fã do Guga */
  const logar = async ({ user, password }: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (user.trim() == "Fan do Gugas" && password == "soufan") {
      navigate.navigate("home", { user: "Fanzasso!" });
    } else setErro("Email ou senha incorreta!");
  };

  return (
    <Formik
      initialValues={{ user: "", password: "" }}
      validationSchema={Yup.object({
        user: Yup.string().required("Informe o user fazendo o favor!"),
        password: Yup.string()
          .required("Digite a senha")
          .min(6, "Só aceito no minimo 6 caracteres meu bom!"),
      })}
      onSubmit={logar}
    >
      {({
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        touched,
      }) => (
        <View
          style={[
            styles.mainContainer,
            { minHeight: Math.round(windowHeight) },
          ]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>MySocialMedia</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Input
                label="Usuário"
                placeholder="Escreva aqui seu usuário"
                style={styles.input}
                onChangeText={handleChange("user")}
                inputContainerStyle={{borderBottomWidth: 0}}
              />
              {touched.user && errors.user && (
                <Text style={styles.error}>{errors.user}</Text>
              )}
              <Input
                label="Senha"
                placeholder="Escreva aqui sua senha"
                secureTextEntry
                style={styles.input}
                onChangeText={handleChange("password")}
                inputContainerStyle={{borderBottomWidth: 0}}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              {erro && <Text style={styles.erroLogin}>{erro}</Text>}

              {isSubmitting && (
                <ActivityIndicator size="large" color="#790808" />
              )}
              {!isSubmitting && (
                <Button
                  buttonStyle={styles.button}
                  titleStyle={{ fontSize: 25 }}
                  title="Login"
                  onPress={() => handleSubmit()}
                />
              )}
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 50,
    marginBottom: 100,
    width: 400,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 25,
    borderWidth: 1,
  },
  titleContainer: {
    flex: 1,
    backgroundColor: "#F0F0F2",
    justifyContent: "flex-end"
  },
  formContainer: {
    flex: 3,
    backgroundColor: "#FFFFFF"
  },
  title: {
    fontSize: 32,
    marginLeft: 24,
    marginBottom: 25,
    color: "#1F1F39",
    fontWeight: "bold",
  },
  button: {
    width: 250,
    backgroundColor: "#3D5CFF",
    borderRadius: 20,
  },
  error: {
    color: "white",
    fontSize: 15,
    textAlign: "right",
    marginBottom: 5,
    marginTop: -10,
  },
  erroLogin: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
});
