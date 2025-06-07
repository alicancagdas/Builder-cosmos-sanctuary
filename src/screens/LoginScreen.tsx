import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { TextInput, Button, Card, Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { authService } from "../services/authService";
import LanguageSwitch from "../components/common/LanguageSwitch";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async () => {
    if (isLogin) {
      if (!email || !password) {
        Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
        return;
      }

      try {
        const result = await authService.login(email, password);
        if (result.success) {
          navigation.navigate("Main");
        } else {
          Alert.alert("Giriş Hatası", result.error || "Giriş yapılamadı.");
        }
      } catch (error) {
        Alert.alert("Hata", "Giriş işlemi sırasında bir hata oluştu.");
      }
    } else {
      if (!email || !password || !confirmPassword || !firstName || !lastName) {
        Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Hata", "Şifreler eşleşmiyor.");
        return;
      }
      if (!acceptTerms) {
        Alert.alert("Hata", "Kullanım şartlarını kabul etmelisiniz.");
        return;
      }

      try {
        const result = await authService.register({
          email,
          password,
          firstName,
          lastName,
        });

        if (result.success) {
          Alert.alert("Başarılı", "Hesabınız oluşturuldu!", [
            { text: "Tamam", onPress: () => navigation.navigate("Main") },
          ]);
        } else {
          Alert.alert(
            "Kayıt Hatası",
            result.error || "Kayıt işlemi tamamlanamadı.",
          );
        }
      } catch (error) {
        Alert.alert("Hata", "Kayıt işlemi sırasında bir hata oluştu.");
      }
    }
  };

  const handleQuickLogin = async (userId: string) => {
    try {
      const result = await authService.quickLogin(userId);
      if (result.success) {
        Alert.alert(
          "Demo Giriş",
          `${result.user?.displayName} olarak giriş yapıldı!`,
          [{ text: "Tamam", onPress: () => navigation.navigate("Main") }],
        );
      }
    } catch (error) {
      Alert.alert("Hata", "Demo giriş işlemi başarısız.");
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert(
      "Sosyal Giriş",
      `${provider} ile giriş özelliği yakında eklenecek.`,
    );
  };

  return (
    <LinearGradient
      colors={["#030712", "#0f172a", "#1e293b"]}
      style={styles.container}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <LinearGradient
          colors={["#3b82f6", "#8b5cf6"]}
          style={styles.logoGradient}
        >
          <Ionicons name="code-slash" size={40} color="white" />
        </LinearGradient>
        <Text style={styles.logoText}>CodeMentor AI</Text>
        <Text style={styles.logoSubtext}>
          AI destekli programlama öğrenme platformu
        </Text>
      </View>

      {/* Form Card */}
      <Card style={styles.formCard}>
        <Card.Content style={styles.formContent}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Hoş Geldiniz</Text>
            <Text style={styles.formSubtitle}>
              {isLogin ? "Hesabınıza giriş yapın" : "Yeni hesap oluşturun"}
            </Text>
          </View>

          {/* Tab Switcher */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, isLogin && styles.activeTab]}
              onPress={() => setIsLogin(true)}
            >
              <Text style={[styles.tabText, isLogin && styles.activeTabText]}>
                Giriş Yap
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, !isLogin && styles.activeTab]}
              onPress={() => setIsLogin(false)}
            >
              <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>
                Kayıt Ol
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formFields}>
            {!isLogin && (
              <View style={styles.nameRow}>
                <View style={styles.nameField}>
                  <Text style={styles.fieldLabel}>Ad</Text>
                  <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Adınız"
                    placeholderTextColor="#64748b"
                  />
                </View>
                <View style={styles.nameField}>
                  <Text style={styles.fieldLabel}>Soyad</Text>
                  <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Soyadınız"
                    placeholderTextColor="#64748b"
                  />
                </View>
              </View>
            )}

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>E-posta</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="ornek@email.com"
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Şifre</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder={
                    isLogin ? "Şifrenizi girin" : "Güçlü bir şifre seçin"
                  }
                  placeholderTextColor="#64748b"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#64748b"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {!isLogin && (
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Şifre Tekrar</Text>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Şifrenizi tekrar girin"
                  placeholderTextColor="#64748b"
                  secureTextEntry={!showPassword}
                />
              </View>
            )}

            {/* Options */}
            <View style={styles.optionsContainer}>
              {isLogin ? (
                <View style={styles.loginOptions}>
                  <View style={styles.checkboxContainer}>
                    <Checkbox
                      status={rememberMe ? "checked" : "unchecked"}
                      onPress={() => setRememberMe(!rememberMe)}
                      color="#3b82f6"
                    />
                    <Text style={styles.checkboxLabel}>Beni hatırla</Text>
                  </View>
                  <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>
                      Şifremi unuttum
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={acceptTerms ? "checked" : "unchecked"}
                    onPress={() => setAcceptTerms(!acceptTerms)}
                    color="#3b82f6"
                  />
                  <Text style={styles.checkboxLabel}>
                    <Text style={styles.linkText}>Kullanım şartlarını</Text> ve{" "}
                    <Text style={styles.linkText}>gizlilik politikasını</Text>{" "}
                    kabul ediyorum
                  </Text>
                </View>
              )}
            </View>

            {/* Submit Button */}
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
              labelStyle={styles.submitButtonText}
            >
              {isLogin ? "Giriş Yap" : "Hesap Oluştur"}
            </Button>

            {/* Social Login */}
            <View style={styles.socialContainer}>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Veya şununla devam edin</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialButtons}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin("GitHub")}
                >
                  <Ionicons name="logo-github" size={20} color="#f9fafb" />
                  <Text style={styles.socialButtonText}>GitHub</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin("Google")}
                >
                  <Ionicons name="logo-google" size={20} color="#f9fafb" />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Demo Users */}
      <Card style={styles.demoCard}>
        <Card.Content style={styles.demoContent}>
          <Text style={styles.demoTitle}>Demo Kullanıcıları</Text>
          <Text style={styles.demoSubtitle}>
            Hızlı test için demo hesapları
          </Text>

          <View style={styles.demoUsers}>
            <TouchableOpacity
              style={styles.demoUser}
              onPress={() => handleQuickLogin("1")}
            >
              <Chip mode="outlined" style={styles.demoChip}>
                👨‍💻 Ethan Carter (Intermediate)
              </Chip>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.demoUser}
              onPress={() => handleQuickLogin("2")}
            >
              <Chip mode="outlined" style={styles.demoChip}>
                🎓 Demo User (Beginner)
              </Chip>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.demoUser}
              onPress={() => handleQuickLogin("3")}
            >
              <Chip mode="outlined" style={styles.demoChip}>
                🎯 Admin User (Expert)
              </Chip>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      {/* Footer */}
      <TouchableOpacity style={styles.footer}>
        <Text style={styles.footerText}>← Ana sayfaya dön</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#f9fafb",
    marginBottom: 8,
  },
  logoSubtext: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
  },
  formCard: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 24,
  },
  formContent: {
    padding: 24,
  },
  formHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#f9fafb",
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#1e293b",
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#3b82f6",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#94a3b8",
  },
  activeTabText: {
    color: "white",
    fontWeight: "600",
  },
  formFields: {
    gap: 20,
  },
  nameRow: {
    flexDirection: "row",
    gap: 12,
  },
  nameField: {
    flex: 1,
  },
  field: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f9fafb",
  },
  input: {
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#f9fafb",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#f9fafb",
  },
  eyeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  optionsContainer: {
    marginTop: 4,
  },
  loginOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#94a3b8",
    flex: 1,
  },
  linkText: {
    color: "#3b82f6",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#3b82f6",
  },
  submitButton: {
    borderRadius: 8,
    paddingVertical: 4,
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  socialContainer: {
    marginTop: 24,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#334155",
  },
  dividerText: {
    fontSize: 12,
    color: "#64748b",
    paddingHorizontal: 16,
    textTransform: "uppercase",
  },
  socialButtons: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    paddingVertical: 12,
    gap: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f9fafb",
  },
  demoCard: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 24,
  },
  demoContent: {
    padding: 20,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f9fafb",
    marginBottom: 4,
    textAlign: "center",
  },
  demoSubtitle: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 16,
  },
  demoUsers: {
    gap: 8,
  },
  demoUser: {
    width: "100%",
  },
  demoChip: {
    backgroundColor: "transparent",
    borderColor: "#3b82f6",
    width: "100%",
    justifyContent: "center",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#64748b",
  },
});

export default LoginScreen;
