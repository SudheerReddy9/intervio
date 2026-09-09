import { Box, Typography } from "@mui/material";

interface InterviewDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const InterviewDetailsPage = async ({
    params,
}: InterviewDetailsPageProps) => {
    const { id } = await params;

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4">
                Interview #{id}
            </Typography>
        </Box>
    );
};

export default InterviewDetailsPage;