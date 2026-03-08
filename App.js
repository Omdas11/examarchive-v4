/**
 * ExamArchive v4 — React Native / Expo UI Skeleton
 *
 * Pure UI skeleton — no backend, no database, no functional forms.
 * Color scheme mirrors the V3 PWA academic-red dark theme.
 *
 * Screens: Home · Search · Contribute · Profile
 * Navigation: Bottom Tab Navigator (native dock)
 */

import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// ─────────────────────────────────────────────────────────────────────────────
// Design Tokens  (mirrors V3 globals.css dark theme)
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  primary: "#ff5252",       // accent red (dark-theme primary from V3)
  primaryDark: "#d32f2f",   // deeper red for pressed / danger states (reserved)
  bg: "#121212",            // root background
  surface: "#1e1e1e",       // card / sheet surface
  surfaceAlt: "#262626",    // slightly lighter surface (reserved)
  border: "#2a2a2a",        // subtle border
  text: "#eaeaea",          // primary text
  textMuted: "#9ca3af",     // secondary / placeholder text
  accentSoft: "#2a1a1a",    // soft red tint background
  white: "#ffffff",
};

// ─────────────────────────────────────────────────────────────────────────────
// Shared Components
// ─────────────────────────────────────────────────────────────────────────────

/** Reusable pill / badge */
function Chip({ label, color = C.accentSoft, textColor = C.primary }) {
  return (
    <View style={[styles.chip, { backgroundColor: color }]}>
      <Text style={[styles.chipText, { color: textColor }]}>{label}</Text>
    </View>
  );
}

/** Paper card matching V3's left-accent-bar card design */
function PaperCard({ title, course, year, department, examType }) {
  return (
    <View style={styles.paperCard}>
      <View style={styles.paperCardAccent} />
      <View style={styles.paperCardBody}>
        <Text style={styles.paperCardTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.paperCardSub}>{course}</Text>
        <View style={styles.paperCardChips}>
          <Chip label={year} />
          <Chip label={department} />
          <Chip label={examType} />
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={C.textMuted} style={{ alignSelf: "center" }} />
    </View>
  );
}

/** Section heading */
function SectionHeading({ title, subtitle }) {
  return (
    <View style={styles.sectionHeadingContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dummy Data
// ─────────────────────────────────────────────────────────────────────────────
const DUMMY_PAPERS = [
  {
    id: "1",
    title: "Advanced Database Management Systems",
    course: "CS-401",
    year: "2024",
    department: "CSE",
    examType: "End-Sem",
  },
  {
    id: "2",
    title: "Operating Systems & Process Management",
    course: "CS-302",
    year: "2023",
    department: "CSE",
    examType: "Mid-Sem",
  },
  {
    id: "3",
    title: "Digital Signal Processing",
    course: "EC-501",
    year: "2024",
    department: "ECE",
    examType: "End-Sem",
  },
  {
    id: "4",
    title: "Engineering Mathematics – III",
    course: "MA-301",
    year: "2023",
    department: "Common",
    examType: "End-Sem",
  },
  {
    id: "5",
    title: "Computer Networks & Security",
    course: "CS-403",
    year: "2024",
    department: "CSE",
    examType: "Mid-Sem",
  },
];

const DUMMY_STREAMS = ["CSE", "ECE", "ME", "CE", "EEE", "BBA", "MCA"];

const DUMMY_NOTICES = [
  "📌  New papers for 2024 End-Sem are now available.",
  "🎓  B.Tech 3rd Year CSE papers uploaded.",
  "📢  Contribute your papers to earn XP and badges!",
];

// ─────────────────────────────────────────────────────────────────────────────
// Screen: Home
// ─────────────────────────────────────────────────────────────────────────────
function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ── Hero ── */}
        <View style={styles.hero}>
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>EA</Text>
            </View>
            <View>
              <Text style={styles.appName}>ExamArchive</Text>
              <Text style={styles.appTagline}>Your academic resource hub</Text>
            </View>
          </View>

          <Text style={styles.heroHeading}>
            Find past papers,{"\n"}ace your exams.
          </Text>
          <Text style={styles.heroBody}>
            A community-driven archive of university question papers and syllabi — free, forever.
          </Text>

          {/* Quick search bar (decorative / navigational hint) */}
          <TouchableOpacity activeOpacity={0.8} style={styles.heroSearchBar}>
            <Ionicons name="search" size={18} color={C.textMuted} />
            <Text style={styles.heroSearchPlaceholder}>Search papers, subjects…</Text>
          </TouchableOpacity>
        </View>

        {/* ── Notice Board ── */}
        <SectionHeading title="📋  Notice Board" />
        <View style={styles.noticeBoard}>
          {DUMMY_NOTICES.map((notice, i) => (
            <Text key={i} style={styles.noticeItem}>
              {notice}
            </Text>
          ))}
        </View>

        {/* ── Browse by Stream ── */}
        <SectionHeading title="Browse by Stream" subtitle="Tap a stream to filter papers" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.streamRow}
        >
          {DUMMY_STREAMS.map((s) => (
            <TouchableOpacity key={s} activeOpacity={0.75} style={styles.streamChip}>
              <Text style={styles.streamChipText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Recent Papers ── */}
        <SectionHeading title="Recent Papers" subtitle="Latest uploads by the community" />
        {DUMMY_PAPERS.map((p) => (
          <PaperCard key={p.id} {...p} />
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Screen: Search
// ─────────────────────────────────────────────────────────────────────────────
const FILTER_OPTIONS = {
  Stream: ["All", "CSE", "ECE", "ME", "CE", "EEE"],
  Year: ["All", "2024", "2023", "2022", "2021"],
  Semester: ["All", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
  Type: ["All", "End-Sem", "Mid-Sem", "Internal"],
};

function SearchScreen() {
  const [query, setQuery] = React.useState("");
  const [activeFilters, setActiveFilters] = React.useState({
    Stream: "All",
    Year: "All",
    Semester: "All",
    Type: "All",
  });

  function toggleFilter(group, value) {
    setActiveFilters((prev) => ({ ...prev, [group]: value }));
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <SectionHeading title="Search Papers" subtitle="Filter by stream, year, semester or type" />

        {/* Search input */}
        <View style={styles.searchInputRow}>
          <Ionicons name="search" size={18} color={C.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Subject, course code, keyword…"
            placeholderTextColor={C.textMuted}
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={18} color={C.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter groups */}
        {Object.entries(FILTER_OPTIONS).map(([group, opts]) => (
          <View key={group} style={{ marginBottom: 16 }}>
            <Text style={styles.filterGroupLabel}>{group}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterRow}>
                {opts.map((opt) => {
                  const active = activeFilters[group] === opt;
                  return (
                    <TouchableOpacity
                      key={opt}
                      activeOpacity={0.75}
                      style={[styles.filterChip, active && styles.filterChipActive]}
                      onPress={() => toggleFilter(group, opt)}
                    >
                      <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        ))}

        {/* Results heading */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>{DUMMY_PAPERS.length} results</Text>
          <TouchableOpacity>
            <Text style={styles.sortLabel}>Sort ▾</Text>
          </TouchableOpacity>
        </View>

        {/* Result cards */}
        {DUMMY_PAPERS.map((p) => (
          <PaperCard key={p.id} {...p} />
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Screen: Contribute
// ─────────────────────────────────────────────────────────────────────────────
const CONTRIB_FIELDS = [
  { label: "Paper Title", placeholder: "e.g. Advanced Database Management Systems", multiline: false },
  { label: "Course Code", placeholder: "e.g. CS-401", multiline: false },
  { label: "Course Name", placeholder: "e.g. Database Systems", multiline: false },
  { label: "Department / Stream", placeholder: "e.g. CSE", multiline: false },
  { label: "Year", placeholder: "e.g. 2024", multiline: false },
];

function ContributeScreen() {
  const [step, setStep] = React.useState(1); // 1 = details, 2 = upload, 3 = done

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <SectionHeading
          title="Contribute a Paper"
          subtitle="Help the community — upload your question papers"
        />

        {/* Step indicator */}
        <View style={styles.stepRow}>
          {["Details", "Upload", "Done"].map((label, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <React.Fragment key={label}>
                <View style={styles.stepItem}>
                  <View
                    style={[
                      styles.stepCircle,
                      active && styles.stepCircleActive,
                      done && styles.stepCircleDone,
                    ]}
                  >
                    {done ? (
                      <Ionicons name="checkmark" size={14} color={C.white} />
                    ) : (
                      <Text style={[styles.stepNum, active && { color: C.white }]}>{n}</Text>
                    )}
                  </View>
                  <Text style={[styles.stepLabel, active && { color: C.primary }]}>{label}</Text>
                </View>
                {i < 2 && <View style={[styles.stepLine, done && styles.stepLineDone]} />}
              </React.Fragment>
            );
          })}
        </View>

        {/* Step 1: Details */}
        {step === 1 && (
          <View>
            {CONTRIB_FIELDS.map((f) => (
              <View key={f.label} style={styles.formGroup}>
                <Text style={styles.formLabel}>{f.label}</Text>
                <TextInput
                  style={[styles.formInput, f.multiline && { height: 80, textAlignVertical: "top" }]}
                  placeholder={f.placeholder}
                  placeholderTextColor={C.textMuted}
                  multiline={f.multiline}
                />
              </View>
            ))}

            {/* Semester picker (decorative) */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Semester</Text>
              <View style={styles.semesterRow}>
                {["1", "2", "3", "4", "5", "6", "7", "8"].map((s) => (
                  <TouchableOpacity key={s} style={styles.semChip}>
                    <Text style={styles.semChipText}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Exam type (decorative) */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Exam Type</Text>
              <View style={styles.semesterRow}>
                {["End-Sem", "Mid-Sem", "Internal"].map((t) => (
                  <TouchableOpacity key={t} style={styles.semChip}>
                    <Text style={styles.semChipText}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.85} onPress={() => setStep(2)}>
              <Text style={styles.btnPrimaryText}>Next: Upload File →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 2: Upload */}
        {step === 2 && (
          <View>
            <TouchableOpacity style={styles.uploadBox} activeOpacity={0.75}>
              <Ionicons name="cloud-upload-outline" size={48} color={C.primary} />
              <Text style={styles.uploadBoxTitle}>Tap to select a PDF</Text>
              <Text style={styles.uploadBoxSub}>Maximum file size: 50 MB</Text>
            </TouchableOpacity>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Additional Notes (optional)</Text>
              <TextInput
                style={[styles.formInput, { height: 80, textAlignVertical: "top" }]}
                placeholder="Any extra info about this paper…"
                placeholderTextColor={C.textMuted}
                multiline
              />
            </View>

            <View style={styles.rowGap}>
              <TouchableOpacity
                style={styles.btnSecondary}
                activeOpacity={0.75}
                onPress={() => setStep(1)}
              >
                <Text style={styles.btnSecondaryText}>← Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnPrimary, { flex: 1 }]}
                activeOpacity={0.85}
                onPress={() => setStep(3)}
              >
                <Text style={styles.btnPrimaryText}>Submit Paper</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 3: Done */}
        {step === 3 && (
          <View style={styles.doneBox}>
            <View style={styles.doneIconCircle}>
              <Ionicons name="checkmark-circle" size={64} color={C.primary} />
            </View>
            <Text style={styles.doneTitle}>Paper Submitted!</Text>
            <Text style={styles.doneSub}>
              Your paper has been submitted for review. Once approved by a moderator it will appear in the archive.
            </Text>
            <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.85} onPress={() => setStep(1)}>
              <Text style={styles.btnPrimaryText}>Contribute Another</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Screen: Profile
// ─────────────────────────────────────────────────────────────────────────────
const DUMMY_USER = {
  name: "Alex Kumar",
  username: "@alexkumar",
  email: "alex@university.edu",
  role: "student",
  tier: "silver",
  xp: 340,
  streak: 7,
  uploads: 12,
};

const TIER_COLORS = {
  bronze: "#cd7f32",
  silver: "#a8a9ad",
  gold: "#ffd700",
  platinum: "#e5e4e2",
  diamond: "#b9f2ff",
};

const MENU_ITEMS = [
  { icon: "person-outline", label: "Edit Profile" },
  { icon: "settings-outline", label: "Settings" },
  { icon: "shield-checkmark-outline", label: "Privacy & Security" },
  { icon: "notifications-outline", label: "Notifications" },
  { icon: "help-circle-outline", label: "Help & Support" },
  { icon: "information-circle-outline", label: "About ExamArchive" },
];

function ProfileScreen() {
  const tierColor = TIER_COLORS[DUMMY_USER.tier] ?? C.textMuted;

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Avatar + name */}
        <View style={styles.profileHeader}>
          <View style={[styles.avatarRing, { borderColor: tierColor }]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitial}>
                {DUMMY_USER.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.profileName}>{DUMMY_USER.name}</Text>
          <Text style={styles.profileUsername}>{DUMMY_USER.username}</Text>
          <Text style={styles.profileEmail}>{DUMMY_USER.email}</Text>

          <View style={styles.profileBadgeRow}>
            <Chip label={DUMMY_USER.role} color={C.accentSoft} textColor={C.primary} />
            <Chip label={DUMMY_USER.tier.toUpperCase()} color={C.surface} textColor={tierColor} />
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { value: DUMMY_USER.xp, label: "XP" },
            { value: DUMMY_USER.streak + "🔥", label: "Streak" },
            { value: DUMMY_USER.uploads, label: "Uploads" },
          ].map(({ value, label }) => (
            <View key={label} style={styles.statItem}>
              <Text style={styles.statValue}>{value}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Menu list */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.7}
              style={[styles.menuRow, i < MENU_ITEMS.length - 1 && styles.menuRowBorder]}
            >
              <View style={styles.menuIconBox}>
                <Ionicons name={item.icon} size={20} color={C.primary} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={C.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign out */}
        <TouchableOpacity style={styles.btnDanger} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={18} color="#ff5252" style={{ marginRight: 8 }} />
          <Text style={styles.btnDangerText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: C.primary,
            background: C.bg,
            card: C.surface,
            text: C.text,
            border: C.border,
            notification: C.primary,
          },
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: C.primary,
            tabBarInactiveTintColor: C.textMuted,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIcon: ({ focused, color, size }) => {
              const icons = {
                Home: focused ? "home" : "home-outline",
                Search: focused ? "search" : "search-outline",
                Contribute: focused ? "add-circle" : "add-circle-outline",
                Profile: focused ? "person" : "person-outline",
              };
              return <Ionicons name={icons[route.name]} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen
            name="Contribute"
            component={ContributeScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (
                <View style={[styles.tabAddButton, focused && styles.tabAddButtonActive]}>
                  <Ionicons name="add" size={26} color={focused ? C.white : C.primary} />
                </View>
              ),
              tabBarLabel: () => null,
            }}
          />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // ── Layout ──
  screen: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  // ── Tab Bar ──
  tabBar: {
    backgroundColor: C.surface,
    borderTopColor: C.border,
    borderTopWidth: 1,
    height: 64,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  tabAddButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: C.accentSoft,
    borderWidth: 2,
    borderColor: C.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  tabAddButtonActive: {
    backgroundColor: C.primary,
    borderColor: C.primary,
  },

  // ── Hero ──
  hero: {
    paddingVertical: 24,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  logoBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: C.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: C.white,
    fontWeight: "900",
    fontSize: 18,
    letterSpacing: 1,
  },
  appName: {
    color: C.text,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  appTagline: {
    color: C.textMuted,
    fontSize: 12,
  },
  heroHeading: {
    color: C.text,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 36,
    marginBottom: 10,
  },
  heroBody: {
    color: C.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 18,
  },
  heroSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  heroSearchPlaceholder: {
    color: C.textMuted,
    fontSize: 14,
  },

  // ── Notice Board ──
  noticeBoard: {
    backgroundColor: C.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    marginBottom: 20,
  },
  noticeItem: {
    color: C.text,
    fontSize: 13,
    lineHeight: 22,
  },

  // ── Stream chips ──
  streamRow: {
    paddingVertical: 4,
    gap: 8,
    flexDirection: "row",
    marginBottom: 20,
  },
  streamChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
  },
  streamChipText: {
    color: C.text,
    fontSize: 13,
    fontWeight: "600",
  },

  // ── Section Heading ──
  sectionHeadingContainer: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: C.text,
    fontSize: 17,
    fontWeight: "700",
  },
  sectionSubtitle: {
    color: C.textMuted,
    fontSize: 12,
    marginTop: 2,
  },

  // ── Paper Card ──
  paperCard: {
    flexDirection: "row",
    backgroundColor: C.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 10,
    overflow: "hidden",
  },
  paperCardAccent: {
    width: 4,
    backgroundColor: C.primary,
  },
  paperCardBody: {
    flex: 1,
    padding: 12,
  },
  paperCardTitle: {
    color: C.text,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
    lineHeight: 20,
  },
  paperCardSub: {
    color: C.textMuted,
    fontSize: 12,
    marginBottom: 8,
  },
  paperCardChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  // ── Chip ──
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  chipText: {
    fontSize: 11,
    fontWeight: "600",
  },

  // ── Search Screen ──
  searchInputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: C.text,
    fontSize: 14,
    padding: 0,
  },
  filterGroupLabel: {
    color: C.textMuted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 2,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
  },
  filterChipActive: {
    backgroundColor: C.primary,
    borderColor: C.primary,
  },
  filterChipText: {
    color: C.text,
    fontSize: 13,
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: C.white,
    fontWeight: "700",
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  resultsCount: {
    color: C.textMuted,
    fontSize: 13,
  },
  sortLabel: {
    color: C.primary,
    fontSize: 13,
    fontWeight: "600",
  },

  // ── Contribute Screen ──
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  stepItem: {
    alignItems: "center",
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: C.surface,
    borderWidth: 2,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  stepCircleActive: {
    borderColor: C.primary,
    backgroundColor: C.primary,
  },
  stepCircleDone: {
    borderColor: C.primary,
    backgroundColor: C.primary,
  },
  stepNum: {
    color: C.textMuted,
    fontSize: 13,
    fontWeight: "700",
  },
  stepLabel: {
    color: C.textMuted,
    fontSize: 11,
    fontWeight: "600",
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: C.border,
    marginHorizontal: 4,
    marginBottom: 18,
  },
  stepLineDone: {
    backgroundColor: C.primary,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    color: C.textMuted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  formInput: {
    backgroundColor: C.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
    color: C.text,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  semesterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  semChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
  },
  semChipText: {
    color: C.text,
    fontSize: 13,
    fontWeight: "600",
  },
  btnPrimary: {
    backgroundColor: C.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  btnPrimaryText: {
    color: C.white,
    fontSize: 15,
    fontWeight: "700",
  },
  btnSecondary: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
  },
  btnSecondaryText: {
    color: C.text,
    fontSize: 15,
    fontWeight: "600",
  },
  rowGap: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  uploadBox: {
    backgroundColor: C.accentSoft,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: C.primary,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    marginBottom: 20,
  },
  uploadBoxTitle: {
    color: C.primary,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
  },
  uploadBoxSub: {
    color: C.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  doneBox: {
    alignItems: "center",
    paddingVertical: 32,
  },
  doneIconCircle: {
    marginBottom: 16,
  },
  doneTitle: {
    color: C.text,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },
  doneSub: {
    color: C.textMuted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },

  // ── Profile Screen ──
  profileHeader: {
    alignItems: "center",
    paddingVertical: 24,
  },
  avatarRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: C.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: {
    color: C.white,
    fontSize: 32,
    fontWeight: "800",
  },
  profileName: {
    color: C.text,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 2,
  },
  profileUsername: {
    color: C.primary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  profileEmail: {
    color: C.textMuted,
    fontSize: 13,
    marginBottom: 12,
  },
  profileBadgeRow: {
    flexDirection: "row",
    gap: 8,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: C.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  statValue: {
    color: C.text,
    fontSize: 20,
    fontWeight: "800",
  },
  statLabel: {
    color: C.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  menuCard: {
    backgroundColor: C.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 16,
    overflow: "hidden",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: C.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    color: C.text,
    fontSize: 15,
    fontWeight: "500",
  },
  btnDanger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: "#d32f2f",
  },
  btnDangerText: {
    color: C.primary,
    fontSize: 15,
    fontWeight: "700",
  },
});
