import { theme } from "@/theme";
import { Box, Typography } from "@mui/material";

export default function HowItWorks(): React.JSX.Element | null {
  const steps = [
    {
      number: "01",
      title: "Upload Resume",
      description:
        "Upload your resume so Intervio can personalize interview questions based on your experience.",
      color: "#4F46E5",
    },
    {
      number: "02",
      title: "Practice Interviews",
      description:
        "Answer AI-generated interview questions tailored to your target role and technology stack.",
      color: "#06B6D4",
    },
    {
      number: "03",
      title: "Receive AI Feedback",
      description:
        "Get instant scores, strengths, weaknesses, and actionable suggestions after every interview.",
      color: "#16A34A",
    },
  ];
  return (
    <Box
      sx={{
        justifyContent: "space-between",

        py: {
          xs: 8,
          md: 10,
        },
        px: 2,
        my: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "24px",
        bgcolor: "#111827",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: "#FFFFFF",
          fontWeight: 700,
        }}
      >
        How It Works
      </Typography>

      <Typography
        variant="body1"
        sx={{
          py: 2,
          color: "#CBD5E1",
        }}
      >
        Everything you need to prepare for your next interview in three simple
        steps.
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {steps.map((s, index) => {
          return (
            <Box
              key={index}
              sx={{
                mx: 1,
                p: 3,
                position: "relative",
                overflow: "hidden",

                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "20px",
                background: "#f4f0f0",
                boxShadow: "0 28px 30px rgba(15, 23, 42, 0.06)",

                transition: "all 0.3s ease",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 16px 40px rgba(79, 70, 229, 0.12)",
                  borderColor: "rgba(79, 70, 229, 0.25)",
                },
              }}
            >
              <Typography
                variant="h1"
                component="div"
                sx={{
                  fontWeight: 700,
                  fontSize: "8rem",
                  lineHeight: 1,
                  color: s.color,
                  transform: "translate(-40px, -60px) scaleY(1.2)",
                  transformOrigin: "top left",
                }}
              >
                {s.number}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {s.title}
              </Typography>
              <Typography variant="body1">{s.description}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
