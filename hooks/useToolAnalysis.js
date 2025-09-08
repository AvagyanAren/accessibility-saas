import { useState, useCallback } from 'react';
import { validateUrl } from '../utils/accessibilityUtils';

export default function useToolAnalysis(analysisFunction, options = {}) {
  const {
    defaultResults = null,
    successMessage = "Analysis completed successfully",
    errorMessage = "Analysis failed. Please try again."
  } = options;

  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(defaultResults);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const handleAnalysis = useCallback(async () => {
    const validation = validateUrl(url);
    if (!validation.valid) {
      showSnackbar(validation.message, "error");
      return;
    }

    setAnalyzing(true);
    try {
      const analysisResults = await analysisFunction(validation.url);
      setResults(analysisResults);
      showSnackbar(successMessage, "success");
    } catch (error) {
      console.error("Analysis error:", error);
      showSnackbar(errorMessage, "error");
    } finally {
      setAnalyzing(false);
    }
  }, [url, analysisFunction, successMessage, errorMessage, showSnackbar]);

  const resetAnalysis = useCallback(() => {
    setUrl("");
    setResults(defaultResults);
    setAnalyzing(false);
  }, [defaultResults]);

  const closeSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  return {
    url,
    setUrl,
    analyzing,
    results,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    handleAnalysis,
    resetAnalysis,
    closeSnackbar,
    showSnackbar
  };
}
