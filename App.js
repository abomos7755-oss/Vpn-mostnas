import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// محاكاة الاتصال والوظائف البرمجية
const SELECTED_SERVER_KEY = "speedvpn.selectedServer";

export default function DashboardScreen() {
  const [vpnState, setVpnState] = useState("idle");
  const [loading, setLoading] = useState(false);

  const selected = {
    country: "اليابان",
    country_code: "JP",
    host_name: "vpn569352061",
    ping_ms: 1,
    speed_bps: "870.6 MB/s",
  };

  const statusCopy = useMemo(() => {
    if (vpnState === "connecting") return { label: "جاري الاتصال", color: "#f59e0b" };
    if (vpnState === "preview" || vpnState === "connected") return { label: "وضع المعاينة (متصل)", color: "#10b981" };
    return { label: "غير متصل", color: "#9ca3af" };
  }, [vpnState]);

  const toggleConnection = () => {
    if (vpnState === "preview" || vpnState === "connected") {
      setVpnState("idle");
    } else {
      setVpnState("connecting");
      setTimeout(() => setVpnState("preview"), 1200);
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>SPEEDVPN</Text>
            <Text style={styles.title}>اتصالك الآمن</Text>
          </View>
          <View style={styles.secureBadge}>
            <Ionicons name="lock-closed" size={16} color="#fff" />
            <Text style={styles.secureText}>محمي</Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusTop}>
            <View style={[styles.statusDot, { backgroundColor: statusCopy.color }]} />
            <Text style={[styles.statusLabel, { color: statusCopy.color }]}>{statusCopy.label}</Text>
          </View>

          <Pressable onPress={toggleConnection} style={[styles.connectButton, { borderColor: statusCopy.color }]}>
            {vpnState === "connecting" ? (
              <ActivityIndicator color="#00f2fe" size="large" />
            ) : (
              <Ionicons
                name={vpnState === "preview" ? "power" : "shield-checkmark"}
                size={42}
                color={statusCopy.color}
              />
            )}
            <Text style={styles.connectText}>
              {vpnState === "preview" ? "قطع الاتصال" : "اتصال سريع"}
            </Text>
          </Pressable>

          <Text style={styles.helper}>أفضل خادم متاح في {selected.country}</Text>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metric}>
            <Ionicons name="speedometer-outline" size={20} color="#00f2fe" />
            <Text style={styles.metricValue}>{selected.ping_ms} ms</Text>
            <Text style={styles.metricLabel}>زمن الاستجابة</Text>
          </View>
          <View style={styles.metric}>
            <Ionicons name="cloud-download-outline" size={20} color="#00f2fe" />
            <Text style={styles.metricValue}>{selected.speed_bps}</Text>
            <Text style={styles.metricLabel}>السرعة القصوى</Text>
          </View>
        </View>

        <View style={styles.serverCard}>
          <Text style={styles.cardTitle}>الخادم الحالي</Text>
          <View style={styles.serverLine}>
            <Ionicons name="globe-outline" size={28} color="#00f2fe" />
            <View style={styles.serverInfo}>
              <Text style={styles.serverCountry}>{selected.country}</Text>
              <Text style={styles.serverHost}>{selected.host_name} · {selected.country_code}</Text>
            </View>
          </View>
        </View>

        <View style={styles.notice}>
          <Ionicons name="information-circle-outline" size={18} color="#3b82f6" />
          <Text style={styles.noticeText}>
            VPN Gate يوفر خوادم OpenVPN عامة. وضع WireGuard الأصلي يحتاج خادم خاصاً عند استخراج الـ APK.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0f172a" },
  content: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 28, gap: 18 },
  header: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center" },
  eyebrow: { fontSize: 12, fontWeight: "800", color: "#00f2fe", textAlign: "right" },
  title: { fontSize: 26, fontWeight: "800", color: "#fff", textAlign: "right" },
  secureBadge: { flexDirection: "row-reverse", alignItems: "center", gap: 6, backgroundColor: "#1e293b", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  secureText: { fontSize: 12, color: "#fff" },
  statusCard: { borderRadius: 22, borderWidth: 1, borderColor: "#334155", padding: 22, alignItems: "center", backgroundColor: "#1e293b" },
  statusTop: { flexDirection: "row-reverse", alignItems: "center", gap: 7 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusLabel: { fontSize: 14, fontWeight: "700" },
  connectButton: { width: 140, height: 140, borderRadius: 70, borderWidth: 2, alignItems: "center", justifyContent: "center", marginVertical: 20, gap: 8 },
  connectText: { fontSize: 14, fontWeight: "800", color: "#fff" },
  helper: { fontSize: 13, color: "#94a3b8", textAlign: "center" },
  metricsRow: { flexDirection: "row-reverse", gap: 12 },
  metric: { flex: 1, borderRadius: 16, borderWidth: 1, borderColor: "#334155", backgroundColor: "#1e293b", padding: 15, alignItems: "flex-end", gap: 4 },
  metricValue: { fontSize: 16, fontWeight: "800", color: "#fff" },
  metricLabel: { fontSize: 11, color: "#94a3b8" },
  serverCard: { borderRadius: 18, borderWidth: 1, borderColor: "#334155", backgroundColor: "#1e293b", padding: 17, gap: 12 },
  cardTitle: { fontSize: 16, fontWeight: "800", color: "#fff", textAlign: "right" },
  serverLine: { flexDirection: "row-reverse", alignItems: "center", gap: 12 },
  serverInfo: { flex: 1, alignItems: "flex-end" },
  serverCountry: { fontSize: 15, fontWeight: "700", color: "#fff" },
  serverHost: { fontSize: 12, color: "#94a3b8" },
  notice: { flexDirection: "row-reverse", alignItems: "flex-start", gap: 8, backgroundColor: "#0f172a", padding: 12, borderRadius: 12 },
  noticeText: { flex: 1, fontSize: 11, color: "#94a3b8", textAlign: "right", lineHeight: 18 },
});
