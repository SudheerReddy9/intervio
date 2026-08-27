"use client";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ResumeUpload = () => {
  const router = useRouter();

  const [resume, setResume] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDestination, setLoadingDestination] = useState<
    "/interview" | "/questions" | null
  >(null);
  const [error, setError] = useState("");

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (file.type !== "application/pdf") {
      setResume(null);
      setError("Please upload a PDF file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setResume(null);
      setError("Your resume must be smaller than 5 MB.");
      return;
    }

    setResume(file);
  };

  const handleUpload = async (
    destination: "/interview" | "/questions"
  ) => {
    if (!resume || isLoading) return;

    setIsLoading(true);
    setLoadingDestination(destination)
    setError("");

    try {
      const formData = new FormData();

      formData.append("resume", resume);

      const response = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
          "We couldn't process your resume. Please try again."
        );
        return;
      }

      sessionStorage.setItem(
        "interviewQuestions",
        JSON.stringify(data.questions)
      );

      router.push(destination);
    } catch (error) {
      console.error("Resume upload error:", error);

      setError(
        "Something went wrong while processing your resume."
      );
    } finally {
      setIsLoading(false);
      setLoadingDestination(null)
    }
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: {
          xs: "calc(100vh - 64px)",
          sm: "calc(100vh - 72px)",
        },

        py: {
          xs: 6,
          sm: 8,
          md: 10,
        },

        px: {
          xs: 1,
          sm: 2,
        },

        background: `
          radial-gradient(
            circle at 50% 25%,
            rgba(79, 70, 229, 0.20) 0%,
            rgba(37, 99, 235, 0.08) 30%,
            transparent 55%
          ),
          linear-gradient(
            180deg,
            #0F172A 0%,
            #020617 100%
          )
        `,
      }}
    >
      <Container maxWidth="md">
        {/* PAGE HEADING */}

        <Box
          sx={{
            textAlign: "center",
            maxWidth: 700,
            mx: "auto",

            mb: {
              xs: 4,
              md: 5,
            },
          }}
        >
          <Typography
            component="h1"
            sx={{
              color: "#FFFFFF",

              fontSize: {
                xs: "2.25rem",
                sm: "3rem",
                md: "3.5rem",
              },

              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
            }}
          >
            Turn your resume into a{" "}
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(90deg, #60A5FA, #A78BFA)",

                backgroundClip: "text",
                WebkitBackgroundClip: "text",

                WebkitTextFillColor: "transparent",
              }}
            >
              personalized interview
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 2,

              mx: "auto",
              maxWidth: 600,

              color: "#94A3B8",

              fontSize: {
                xs: "1rem",
                md: "1.1rem",
              },

              lineHeight: 1.7,
            }}
          >
            Upload your resume and YourCareerForge will
            generate interview questions based on your
            experience and skills.
          </Typography>
        </Box>

        {/* MAIN CARD */}

        <Box
          sx={{
            width: "100%",
            maxWidth: 680,
            mx: "auto",

            bgcolor: "#FFFFFF",

            borderRadius: {
              xs: 3,
              sm: 4,
            },

            p: {
              xs: 2.5,
              sm: 4,
              md: 5,
            },

            border: "1px solid rgba(255,255,255,0.15)",

            boxShadow:
              "0 30px 80px rgba(0,0,0,0.35)",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",

              fontSize: {
                xs: "1.4rem",
                sm: "1.6rem",
              },

              fontWeight: 800,
              color: "#0F172A",
            }}
          >
            Upload your resume
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "#64748B",
              mt: 1,
              mb: 3,
            }}
          >
            We`&apos;`ll use it to personalize your practice
            experience.
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
              }}
            >
              {error}
            </Alert>
          )}

          {/* UPLOAD AREA */}

          {!resume ? (
            <Box
              sx={{
                p: {
                  xs: 3,
                  sm: 5,
                },

                textAlign: "center",

                bgcolor: "#F8FAFC",

                border: "2px dashed #CBD5E1",
                borderRadius: 3,

                transition:
                  "border-color 0.2s ease, background 0.2s ease",

                "&:hover": {
                  borderColor: "#6366F1",
                  bgcolor: "#F8FAFF",
                },
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,

                  mx: "auto",
                  mb: 2,

                  borderRadius: 3,

                  bgcolor: "#EEF2FF",
                  color: "#4F46E5",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <UploadFileOutlinedIcon
                  sx={{
                    fontSize: 32,
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#1E293B",
                  mb: 0.5,
                }}
              >
                Choose your resume
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#64748B",
                  mb: 3,
                }}
              >
                PDF format • Maximum 5 MB
              </Typography>

              <Button
                component="label"
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.2,

                  borderRadius: 2.5,

                  textTransform: "none",
                  fontWeight: 700,

                  background:
                    "linear-gradient(135deg, #4F46E5, #6366F1)",

                  boxShadow:
                    "0 8px 20px rgba(79,70,229,0.22)",
                }}
              >
                Browse Resume

                <input
                  hidden
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                />
              </Button>
            </Box>
          ) : (
            /* SELECTED FILE */

            <Box
              sx={{
                p: {
                  xs: 2,
                  sm: 2.5,
                },

                display: "flex",
                alignItems: "center",
                gap: 2,

                bgcolor: "#F0FDF4",

                border: "1px solid #BBF7D0",
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,

                  flexShrink: 0,

                  borderRadius: 2,

                  bgcolor: "#DCFCE7",
                  color: "#15803D",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DescriptionOutlinedIcon />
              </Box>

              <Box
                sx={{
                  minWidth: 0,
                  flex: 1,
                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#166534",

                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {resume.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748B",
                  }}
                >
                  {(resume.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
              </Box>

              <Button
                color="error"
                disabled={isLoading}
                onClick={() => {
                  setResume(null);
                  setError("");
                }}
                sx={{
                  flexShrink: 0,
                  textTransform: "none",
                }}
              >
                Remove
              </Button>
            </Box>
          )}

          {/* ACTIONS */}

          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={!resume || isLoading}
            onClick={() =>
              handleUpload("/interview")
            }
            sx={{
              mt: 4,
              py: 1.5,

              borderRadius: 2.5,

              textTransform: "none",
              fontWeight: 700,

              boxShadow:
                "0 8px 20px rgba(37,99,235,0.18)",
            }}
          >
            {isLoading ? (
              <>
                <CircularProgress
                  size={20}
                  sx={{
                    color: "#FFFFFF",
                    mr: 1.5,
                  }}
                />

                Preparing your interview...
              </>
            ) : (
              "Start Mock Interview"
            )}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            disabled={!resume || isLoading}
            onClick={() =>
              handleUpload("/questions")
            }
            sx={{
              mt: 1.5,
              py: 1.4,

              borderRadius: 2.5,

              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Generate Questions Only
          </Button>

          <Typography
            variant="body2"
            sx={{
              mt: 2.5,
              textAlign: "center",
              color: "#94A3B8",
              lineHeight: 1.6,
            }}
          >
            Your resume is used only to personalize your
            interview questions.
          </Typography>
        </Box>
        {isLoading && (
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              px: 2,

              bgcolor: "rgba(2, 6, 23, 0.90)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 500,

                p: {
                  xs: 3,
                  sm: 4,
                },

                bgcolor: "#FFFFFF",
                borderRadius: 4,
                textAlign: "center",

                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.45)",
              }}
            >
              {/* Loading icon */}

              <Box
                sx={{
                  width: 68,
                  height: 68,

                  mx: "auto",
                  mb: 2.5,

                  borderRadius: 3,

                  bgcolor: "#EEF2FF",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  size={32}
                  thickness={4}
                />
              </Box>

              {/* Loading title */}

              <Typography
                sx={{
                  fontSize: {
                    xs: "1.4rem",
                    sm: "1.65rem",
                  },

                  fontWeight: 800,
                  color: "#0F172A",
                }}
              >
                {loadingDestination === "/interview"
                  ? "Preparing your interview..."
                  : "Generating your questions..."}
              </Typography>

              {/* Description */}

              <Typography
                sx={{
                  mt: 1.5,
                  color: "#64748B",
                  lineHeight: 1.7,
                }}
              >
                {loadingDestination === "/interview"
                  ? "YourCareerForge is analyzing your resume and creating personalized interview questions based on your experience and skills."
                  : "YourCareerForge is analyzing your resume and generating personalized questions based on your experience and skills."}
              </Typography>

              {/* Animated progress bar */}

              <LinearProgress
                sx={{
                  mt: 3,

                  height: 7,
                  borderRadius: 10,

                  bgcolor: "#E2E8F0",

                  "& .MuiLinearProgress-bar": {
                    borderRadius: 10,
                    background:
                      "linear-gradient(90deg, #2563EB, #7C3AED)",
                  },
                }}
              />

              {/* Current activity */}

              <Box
                sx={{
                  mt: 3,
                  p: 2,

                  bgcolor: "#F8FAFC",

                  border: "1px solid #E2E8F0",
                  borderRadius: 2.5,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#475569",
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  ✨ Identifying your skills, experience,
                  and relevant interview topics
                </Typography>
              </Box>

              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 2,
                  color: "#94A3B8",
                }}
              >
                This may take a few moments. Please
                don&apos;t close this page.
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ResumeUpload;