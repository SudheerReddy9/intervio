import { Box, Typography } from "@mui/material";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload Your Resume",
      description:
        "Upload your resume so YourCareerForge can understand your experience, skills, and background.",
      color: "#4F46E5",
    },
    {
      number: "02",
      title: "Practice Your Interview",
      description:
        "Answer personalized interview questions designed around your resume, skills, and target role.",
      color: "#2563EB",
    },
    {
      number: "03",
      title: "Get AI Feedback",
      description:
        "Receive instant feedback and scores across communication, technical knowledge, and problem solving.",
      color: "#7C3AED",
    },
  ];

  return (
    <Box
      id="how-it-works"
      component="section"
      sx={{
        my: {
          xs: 3,
          md: 5,
        },

        py: {
          xs: 7,
          sm: 8,
          md: 10,
        },

        px: {
          xs: 2.5,
          sm: 4,
          md: 6,
        },

        borderRadius: {
          xs: 3,
          md: 5,
        },

        background:
          "linear-gradient(135deg, #0F172A 0%, #111827 55%, #1E1B4B 100%)",

        overflow: "hidden",
      }}
    >
      {/* Section heading */}

      <Box
        sx={{
          maxWidth: 650,

          mb: {
            xs: 5,
            md: 7,
          },

          textAlign: {
            xs: "center",
            md: "left",
          },

          mx: {
            xs: "auto",
            md: 0,
          },
        }}
      >
        <Typography
          sx={{
            color: "#818CF8",
            fontWeight: 700,
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            mb: 1.5,
          }}
        >
          How it works
        </Typography>

        <Typography
          component="h2"
          sx={{
            color: "#FFFFFF",
            fontWeight: 800,

            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
            },

            lineHeight: 1.15,
            letterSpacing: "-0.03em",
          }}
        >
          From resume to better interview answers.
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: "#94A3B8",

            fontSize: {
              xs: "1rem",
              md: "1.05rem",
            },

            lineHeight: 1.8,
          }}
        >
          Practice in three simple steps and understand where
          you`&apos;`re strong and where you can improve.
        </Typography>
      </Box>

      {/* Steps */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },

          gap: {
            xs: 2,
            md: 3,
          },
        }}
      >
        {steps.map((step) => (
          <Box
            key={step.number}
            sx={{
              position: "relative",

              minHeight: {
                xs: 240,
                md: 270,
              },

              p: {
                xs: 3,
                md: 3.5,
              },

              display: "flex",
              flexDirection: "column",

              borderRadius: 4,

              bgcolor: "rgba(255,255,255,0.06)",

              border:
                "1px solid rgba(255,255,255,0.10)",

              backdropFilter: "blur(10px)",

              transition:
                "transform 0.25s ease, border-color 0.25s ease, background 0.25s ease",

              "&:hover": {
                transform: {
                  md: "translateY(-6px)",
                },

                bgcolor: "rgba(255,255,255,0.09)",

                borderColor:
                  "rgba(129,140,248,0.35)",
              },
            }}
          >
            {/* Step number */}

            <Box
              sx={{
                width: 52,
                height: 52,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: 2.5,

                bgcolor: `${step.color}20`,

                border: `1px solid ${step.color}50`,

                mb: 4,
              }}
            >
              <Typography
                sx={{
                  color: step.color,
                  fontWeight: 800,
                }}
              >
                {step.number}
              </Typography>
            </Box>

            <Typography
              sx={{
                color: "#FFFFFF",

                fontSize: {
                  xs: "1.25rem",
                  md: "1.4rem",
                },

                fontWeight: 700,
                mb: 1.5,
              }}
            >
              {step.title}
            </Typography>

            <Typography
              sx={{
                color: "#94A3B8",
                lineHeight: 1.75,
              }}
            >
              {step.description}
            </Typography>

            {/* Decorative line */}

            <Box
              sx={{
                mt: "auto",
                pt: 4,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 3,
                  borderRadius: 10,
                  bgcolor: step.color,
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}