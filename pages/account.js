import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { Container, Box, Section, Flex, Stack } from "../components/apple/Layout";
import Typography from "../components/apple/Typography";
import Card from "../components/apple/Card";
import Button from "../components/apple/Button";
import { appleTheme } from "../styles/apple-theme";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { ShieldCheck, Timer, SignOut, Trash, ArrowCounterClockwise } from "phosphor-react";

const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1200,
  padding: appleTheme.spacing[4]
};

const AccountConfirmation = ({ open, title, message, confirmLabel, cancelLabel, onConfirm, onCancel, isDarkMode }) => {
  if (!open) return null;

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true" aria-labelledby="account-confirm-title">
      <Box
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: isDarkMode ? appleTheme.colors.dark.background.tertiary : "#FFFFFF",
          borderRadius: appleTheme.borderRadius.xl,
          padding: appleTheme.spacing[6],
          boxShadow: isDarkMode ? "0 20px 60px rgba(0, 0, 0, 0.6)" : "0 20px 60px rgba(15, 23, 42, 0.2)",
          border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          gap: appleTheme.spacing[4]
        }}
      >
        <Typography id="account-confirm-title" variant="title3" style={{ fontWeight: 600, color: isDarkMode ? "#FFFFFF" : "#000000" }}>
          {title}
        </Typography>
        <Typography variant="body" style={{ lineHeight: 1.5, color: isDarkMode ? appleTheme.colors.dark.text.secondary : "#1C1C1E" }}>
          {message}
        </Typography>
        <Flex justify="flex-end" gap={3} wrap="wrap">
          <Button variant="ghost" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

const AccountPage = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();

  const [trialEmail, setTrialEmail] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const themeColors = isDarkMode ? appleTheme.colors.dark : appleTheme.colors;

  const notifyTrialStatusChange = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("trialStatusChange"));
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const active = localStorage.getItem("trialActive") === "true";
    if (!active) {
      router.replace("/");
      return;
    }
    const storedEmail = localStorage.getItem("trialEmail") || "";
    setTrialEmail(storedEmail);
    setIsLoaded(true);
  }, [router]);

  const finishAndRedirect = useCallback((message, removeEmail = false) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("trialActive");
      if (removeEmail) {
        localStorage.removeItem("trialEmail");
      }
      notifyTrialStatusChange();
    }
    setStatusMessage(message);
    setTimeout(() => {
      router.replace("/");
    }, 1200);
  }, [notifyTrialStatusChange, router]);

  const handleCancelTrial = () => {
    setIsCancelModalOpen(false);
    finishAndRedirect(t("account.successCancel"));
  };

  const handleLeaveAccount = () => {
    setIsLeaveModalOpen(false);
    finishAndRedirect(t("account.successLeave"), true);
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(false);
    finishAndRedirect(t("account.successDelete"), true);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", background: isDarkMode ? "#101012" : "#F5F5F7" }}>
      <Section
        padding="lg"
        style={{
          background: isDarkMode
            ? "linear-gradient(135deg, rgba(10,10,12,0.95) 0%, rgba(48,48,52,0.92) 100%)"
            : "linear-gradient(135deg, #E8F1FF 0%, #F6FBFF 100%)",
          paddingBottom: appleTheme.spacing[20]
        }}
      >
        <Container size="lg">
          <Stack spacing={6}>
            <Box style={{ textAlign: "center", color: isDarkMode ? "#FFFFFF" : "#0A2540" }}>
              <Typography
                variant="display"
                style={{
                  marginBottom: appleTheme.spacing[3],
                  fontWeight: 700,
                  color: "inherit"
                }}
              >
                {t("account.title")}
              </Typography>
              <Typography
                variant="body"
                style={{
                  color: isDarkMode ? "rgba(255,255,255,0.75)" : "#1C1C1E",
                  maxWidth: "640px",
                  margin: "0 auto",
                  lineHeight: 1.6
                }}
              >
                {t("account.subtitle")}
              </Typography>
            </Box>

            <Card
              padding="xl"
              style={{
                margin: "0 auto",
                maxWidth: "720px",
                textAlign: "left",
                backgroundColor: isDarkMode ? "rgba(20,20,22,0.85)" : "#FFFFFF",
                boxShadow: isDarkMode
                  ? "0 24px 50px rgba(0,0,0,0.55)"
                  : "0 24px 50px rgba(15, 23, 42, 0.12)",
                border: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,112,243,0.12)",
                backdropFilter: "blur(12px)"
              }}
            >
              <Stack spacing={5}>
                <Flex justify="space-between" wrap="wrap" gap={4}>
                  <Box>
                    <Typography variant="caption1" style={{ color: themeColors.text.tertiary, letterSpacing: "0.08em" }}>
                      {t("account.trialStatus")}
                    </Typography>
                    <Typography variant="title2" style={{ color: themeColors.text.primary, fontWeight: 600, marginTop: appleTheme.spacing[1] }}>
                      {t("account.trialActive")}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption1" style={{ color: themeColors.text.tertiary, letterSpacing: "0.08em" }}>
                      {t("account.trialEmailLabel")}
                    </Typography>
                    <Typography variant="title3" style={{ color: themeColors.text.primary, fontWeight: 600, marginTop: appleTheme.spacing[1] }}>
                      {trialEmail || t("account.trialEmailFallback")}
                    </Typography>
                  </Box>
                </Flex>

                <Flex wrap="wrap" gap={appleTheme.spacing[4]}>
                  <Card
                    padding="lg"
                    style={{
                      flex: "1 1 220px",
                      backgroundColor: isDarkMode ? "rgba(0,122,255,0.15)" : "rgba(0,122,255,0.12)",
                      border: "none"
                    }}
                  >
                    <Flex direction="column" gap={appleTheme.spacing[2]}>
                      <ShieldCheck size={28} color={appleTheme.colors.primary[500]} weight="duotone" />
                      <Typography variant="callout" style={{ color: themeColors.text.primary, fontWeight: 600 }}>
                        {t("account.trialActive")}
                      </Typography>
                      <Typography variant="footnote" style={{ color: themeColors.text.secondary, lineHeight: 1.5 }}>
                        {t("account.manageSubscription")}
                      </Typography>
                    </Flex>
                  </Card>

                  <Card
                    padding="lg"
                    style={{
                      flex: "1 1 220px",
                      backgroundColor: isDarkMode ? "rgba(52,199,89,0.12)" : "rgba(52,199,89,0.12)",
                      border: "none"
                    }}
                  >
                    <Flex direction="column" gap={appleTheme.spacing[2]}>
                      <Timer size={28} color={appleTheme.colors.success} weight="duotone" />
                      <Typography variant="callout" style={{ color: themeColors.text.primary, fontWeight: 600 }}>
                        {t("account.trialBadge")}
                      </Typography>
                      <Typography variant="footnote" style={{ color: themeColors.text.secondary, lineHeight: 1.5 }}>
                        {t("account.trialHeroHighlight")}
                      </Typography>
                    </Flex>
                  </Card>
                </Flex>
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Section>

      <Section padding="lg" style={{ marginTop: "-120px" }}>
        <Container size="lg">
          <Stack spacing={6}>
            {statusMessage && (
              <Box
                style={{
                  backgroundColor: isDarkMode ? "rgba(52, 199, 89, 0.15)" : "rgba(52, 199, 89, 0.15)",
                  border: `1px solid ${isDarkMode ? "rgba(52, 199, 89, 0.35)" : "rgba(82, 190, 120, 0.4)"}`,
                  borderRadius: appleTheme.borderRadius.lg,
                  padding: `${appleTheme.spacing[3]} ${appleTheme.spacing[4]}`,
                  textAlign: "center"
                }}
              >
                <Typography variant="footnote" style={{ color: isDarkMode ? "#34C759" : "#1E5E30", fontWeight: 600 }}>
                  {statusMessage}
                </Typography>
              </Box>
            )}

            <Card
              padding="xl"
              style={{
                backgroundColor: isDarkMode ? themeColors.background.tertiary : "#FFFFFF",
                border: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.05)",
                boxShadow: isDarkMode ? "0 18px 40px rgba(0,0,0,0.4)" : "0 18px 40px rgba(15,23,42,0.08)"
              }}
            >
              <Stack spacing={5}>
                <Typography variant="title2" style={{ color: themeColors.text.primary, fontWeight: 600 }}>
                  {t("account.manageSubscription")}
                </Typography>

                <Flex direction="column" gap={appleTheme.spacing[4]}>
                  <Flex
                    justify="space-between"
                    align="center"
                    wrap="wrap"
                    gap={appleTheme.spacing[3]}
                    style={{ borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`, paddingBottom: appleTheme.spacing[4] }}
                  >
                    <Stack spacing={1.5} style={{ maxWidth: "520px" }}>
                      <Typography variant="callout" style={{ color: themeColors.text.primary, fontWeight: 600 }}>
                        {t("account.cancelTrial")}
                      </Typography>
                      <Typography variant="footnote" style={{ color: themeColors.text.secondary, lineHeight: 1.6 }}>
                        {t("account.cancelTrialDescription")}
                      </Typography>
                    </Stack>
                    <Button variant="primary" onClick={() => setIsCancelModalOpen(true)} startIcon={<ArrowCounterClockwise weight="bold" size={18} />}>
                      {t("account.cancelTrial")}
                    </Button>
                  </Flex>

                  <Flex
                    justify="space-between"
                    align="center"
                    wrap="wrap"
                    gap={appleTheme.spacing[3]}
                    style={{ borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`, paddingBottom: appleTheme.spacing[4] }}
                  >
                    <Stack spacing={1.5} style={{ maxWidth: "520px" }}>
                      <Typography variant="callout" style={{ color: themeColors.text.primary, fontWeight: 600 }}>
                        {t("account.leaveAccount")}
                      </Typography>
                      <Typography variant="footnote" style={{ color: themeColors.text.secondary, lineHeight: 1.6 }}>
                        {t("account.leaveAccountDescription")}
                      </Typography>
                    </Stack>
                    <Button variant="secondary" onClick={() => setIsLeaveModalOpen(true)} startIcon={<SignOut weight="bold" size={18} />}>
                      {t("account.leaveAccount")}
                    </Button>
                  </Flex>

                  <Flex
                    justify="space-between"
                    align="center"
                    wrap="wrap"
                    gap={appleTheme.spacing[3]}
                  >
                    <Stack spacing={1.5} style={{ maxWidth: "520px" }}>
                      <Typography variant="callout" style={{ color: themeColors.text.primary, fontWeight: 600 }}>
                        {t("account.deleteAccount")}
                      </Typography>
                      <Typography variant="footnote" style={{ color: themeColors.text.secondary, lineHeight: 1.6 }}>
                        {t("account.deleteAccountDescription")}
                      </Typography>
                    </Stack>
                    <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)} startIcon={<Trash weight="bold" size={18} />}>
                      {t("account.deleteAccount")}
                    </Button>
                  </Flex>
                </Flex>
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Section>

      <AccountConfirmation
        open={isCancelModalOpen}
        title={t("account.cancelConfirmTitle")}
        message={t("account.cancelConfirmMessage")}
        confirmLabel={t("account.confirmCancel")}
        cancelLabel={t("account.goBack")}
        onConfirm={handleCancelTrial}
        onCancel={() => setIsCancelModalOpen(false)}
        isDarkMode={isDarkMode}
      />

      <AccountConfirmation
        open={isLeaveModalOpen}
        title={t("account.leaveConfirmTitle")}
        message={t("account.leaveConfirmMessage")}
        confirmLabel={t("account.confirmLeave")}
        cancelLabel={t("account.goBack")}
        onConfirm={handleLeaveAccount}
        onCancel={() => setIsLeaveModalOpen(false)}
        isDarkMode={isDarkMode}
      />

      <AccountConfirmation
        open={isDeleteModalOpen}
        title={t("account.deleteConfirmTitle")}
        message={t("account.deleteConfirmMessage")}
        confirmLabel={t("account.confirmDelete")}
        cancelLabel={t("account.goBack")}
        onConfirm={handleDeleteAccount}
        onCancel={() => setIsDeleteModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default AccountPage;
