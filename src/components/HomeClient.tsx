import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function HomeClient() {
  const getScoreColor = (score: number) => {
    if (score < 30) return "#EF4444";
    if (score < 60) return "#F59E0B";
    if (score < 80) return "#3B82F6";
    return "#22C55E";
  };

  const demoFeedback = {
    communication: 85,
    technical: 78,
    problemSolving: 83,
  };

  const scores = [
    {
      label: "Communication",
      value: demoFeedback.communication,
    },
    {
      label: "Technical",
      value: demoFeedback.technical,
    },
    {
      label: "Problem Solving",
      value: demoFeedback.problemSolving,
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        minHeight: {
          xs: "auto",
          md: "calc(100vh - 72px)",
        },

        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",
          md: "1.15fr 0.85fr",
        },

        alignItems: "center",

        gap: {
          xs: 6,
          sm: 7,
          md: 8,
          lg: 10,
        },

        py: {
          xs: 6,
          sm: 8,
          md: 10,
        },

        px: {
          xs: 2,
          sm: 4,
          md: 5,
          lg: 7,
        },

        borderRadius: {
          xs: 0,
          sm: 4,
        },

        background:
          "linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 55%, #F5F3FF 100%)",

        overflow: "hidden",
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          maxWidth: 720,
          mx: {
            xs: "auto",
            md: 0,
          },
          textAlign: {
            xs: "center",
            md: "left",
          },
        }}
      >
        <Chip
          label="AI-powered interview practice"
          sx={{
            mb: {
              xs: 3,
              md: 4,
            },

            px: 1,

            bgcolor: "#E0E7FF",
            color: "#3730A3",
            fontWeight: 600,
          }}
        />

        <Typography
          component="h1"
          sx={{
            fontWeight: 800,

            fontSize: {
              xs: "2.5rem",
              sm: "3.5rem",
              md: "4rem",
              lg: "4.5rem",
            },

            lineHeight: {
              xs: 1.1,
              md: 1.05,
            },

            letterSpacing: "-0.04em",
            color: "#0F172A",
          }}
        >
          Practice smarter.
          <br />

          <Box
            component="span"
            sx={{
              background:
                "linear-gradient(90deg, #2563EB, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Interview better.
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 3,

            mx: {
              xs: "auto",
              md: 0,
            },

            maxWidth: 600,

            color: "text.secondary",

            lineHeight: 1.8,

            fontSize: {
              xs: "1rem",
              sm: "1.1rem",
            },
          }}
        >
          Turn your resume into a personalized mock interview.
          Practice your answers and get AI-powered feedback on
          communication, technical knowledge, and problem solving.
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          sx={{
            mt: 5,

            justifyContent: {
              xs: "center",
              md: "flex-start",
            },

            alignItems: {
              xs: "stretch",
              sm: "center",
            },

            maxWidth: {
              xs: 400,
              md: "none",
            },

            mx: {
              xs: "auto",
              md: 0,
            },
          }}
        >
          <Button
            component={Link}
            href="/resume"
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Start Practicing
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<PlayArrowIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            See How It Works
          </Button>
        </Stack>

        <Typography
          variant="body2"
          sx={{
            mt: 2.5,
            color: "text.secondary",
          }}
        >
          Practice at your own pace. Get feedback in minutes.
        </Typography>
      </Box>

      {/* DEMO RESULT CARD */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 480,

          mx: {
            xs: "auto",
            md: 0,
          },

          justifySelf: {
            md: "end",
          },

          bgcolor: "background.paper",

          borderRadius: {
            xs: 3,
            md: 4,
          },

          p: {
            xs: 2.5,
            sm: 3.5,
            md: 4,
          },

          boxShadow:
            "0 24px 70px rgba(15, 23, 42, 0.12)",

          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
              }}
            >
              Interview Performance
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              Software Engineer
            </Typography>
          </Box>

          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: "#EFF6FF",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "#2563EB",
              }}
            >
              82
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Example interview question
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontWeight: 600,
            lineHeight: 1.6,
          }}
        >
          Tell me about a challenging project you worked on
          and how you approached it.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography
          sx={{
            fontWeight: 700,
            mb: 2.5,
          }}
        >
          AI Feedback
        </Typography>

        {scores.map((score) => (
          <Box
            key={score.label}
            sx={{
              mb: 2.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                }}
              >
                {score.label}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                }}
              >
                {score.value}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={score.value}
              sx={{
                height: 8,
                borderRadius: 10,
                bgcolor: "#E5E7EB",

                "& .MuiLinearProgress-bar": {
                  borderRadius: 10,
                  backgroundColor:
                    getScoreColor(score.value),
                },
              }}
            />
          </Box>
        ))}

        <Box
          sx={{
            mt: 3,
            p: 2.5,

            bgcolor: "#F0FDF4",

            border: "1px solid #BBF7D0",
            borderRadius: 2.5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: "#166534",
            }}
          >
            Strong communication
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "#475569",
              lineHeight: 1.6,
            }}
          >
            Good overall performance. Add more technical
            depth and specific project examples to make your
            answers stronger.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}