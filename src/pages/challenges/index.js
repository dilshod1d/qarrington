import React from 'react';
import Head from 'next/head';
import MainNavbar from '../../components/navbar/MainNavbar';
import MainRightbar from '../../components/rightbar/MainRightbar';
import { Avatar, Badge, Box, Card, Container, Grid, styled, Typography } from '@mui/material';
import DisclaimerFooter from '../../components/footer/DisclaimerFooter';

const Page = () => {

    return (

        <div>

            <Head>
                <title>Challenges • Qarrington</title>
                <meta
                    name="description"
                    content="We created Qarrington as a subscription exchange so founders of early-stage startup companies can raise funds while keeping 100% of their equity ownership."
                />
            </Head>

            <MainNavbar />

            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={6} lg={9} mb={4}>
                        <Grid container spacing={1}>

                            <Grid item xs={12}>

                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        {challenges && Array.isArray(challenges) && challenges.map(({ _id, image, source, content, postedAt }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={6}>
                                                <Card style={{ padding: '60px' }}>
                                                    <Box
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <StyledBadge
                                                            overlap="circular"
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right'
                                                            }}
                                                            variant="dot"
                                                        >
                                                            <Avatar
                                                                style={{ width: 50, height: 50 }}
                                                                alt={source}
                                                                src={image}
                                                            />
                                                        </StyledBadge>
                                                    </Box>
                                                    <Box style={{ textAlign: 'center' }}>
                                                        <Box my={2}>
                                                            <Typography variant="h5" fontWeight={700}>
                                                                {content}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="body2" fontWeight={600} color="secondary">
                                                                {postedAt}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Card>
                                            </Grid>
                                        ))}

                                    </Grid>
                                </Grid>

                                <DisclaimerFooter />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <MainRightbar />
                    </Grid>

                </Grid>
            </Container>

        </div>

    )
}

export default Page

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -2,
        top: 0,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const challenges = [
    {
        _id: 1,
        image: "/assets/media/publications/wsj.png",
        source: "wsj",
        content: "Inflation Creeps Into the Asian economies—‘My Salary Is the Same, but Everything Is Becoming More Expensive’.",
        postedAt: "February 21, 2022"
    },
    {
        _id: 2,
        image: "/assets/media/publications/cnbc.png",
        source: "CNBC",
        content: "Inflation in the eurozone is extremely high. Protestors in Italy used empty shopping trolleys to demonstrate high prices.",
        postedAt: "October 31, 2022"
    },
    {
        _id: 3,
        image: "/assets/media/publications/ft.png",
        source: "FT",
        content: "Many African economies have been hit hard by the global rise in prices ... across the continent struggle to cope.",
        postedAt: "September 13, 2022"
    },
    {
        _id: 4,
        image: "/assets/media/publications/fortune.png",
        source: "Fortune",
        content: "U.K.’s inflation just hit a 40-year high, and the government warned that some may struggle to afford food and heating.",
        postedAt: "May 19, 2022"
    },
    {
        _id: 5,
        image: "/assets/media/publications/bloomberg.png",
        source: "Bloomberg",
        content: "The American middle class is facing the biggest hit to its wealth in a generation going into the midterm election.",
        postedAt: "October 26, 2022"
    },
    {
        _id: 6,
        image: "/assets/media/publications/reuters.png",
        source: "Reuters",
        content: "Latin America's leaders have pulled no punches in the battle against inflation. The region has some of the highest interest rates.",
        postedAt: "June 24, 2022"
    },
    {
        _id: 7,
        image: "/assets/media/publications/aljazeera.png",
        source: "Aljazeera",
        content: "Turkey’s inflation is triggered by the lira’s decline as well as the economic consequences of Russia’s invasion of Ukraine.",
        postedAt: "August 03, 2022"
    },
    {
        _id: 8,
        image: "/assets/media/publications/forbes.png",
        source: "Forbes",
        content: "The higher costs of doing business have been passed onto customers, leaving everyday Australians materially worse off.",
        postedAt: "December 01, 2022"
    },
    {
        _id: 9,
        image: "/assets/media/publications/forbes.png",
        source: "Forbes",
        content: "The U.S. Chamber of Commerce found that 85% of small-business owners surveyed expressed concern about inflation.",
        postedAt: "May 25, 2022"
    },
    {
        _id: 10,
        image: "/assets/media/publications/fox.png",
        source: "FOX",
        content: "Inflation concerns hit a fever pitch for small business owners. Small business owners believe the 'worst is yet to come' on inflation.",
        postedAt: "September 21, 2022"
    }
]