import React from 'react';
import Head from 'next/head';
import HeaderMenu from '../../../components/menus/HeaderMenu';
import RightGrid from '../../../components/grids/RightGrid';
import { Avatar, Badge, Box, Card, Container, Grid, styled, Typography } from '@mui/material';
import Footer from '../../../components/main/Footer';

const Page = ({ topicUrl, topicTags, topicTitle, topicDetail, topicAddedAt }) => {

    return (

        <div>

            <Head>
                <title>{topicTitle} • Qarrington</title>
                <meta
                    name="description"
                    content={topicDetail}
                />
            </Head>

            <HeaderMenu />

            <Container>

                <Grid container spacing={2}>

                    <Grid item xs={12} md={6} lg={9} mb={4}>
                        <Grid container spacing={1}>

                            <Grid item xs={12}>

                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        {help && help.map(({ _id, name, email, avatar, content }) => (
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
                                                                alt={name}
                                                                src={avatar}
                                                            />
                                                        </StyledBadge>
                                                    </Box>
                                                    <Box style={{ textAlign: 'center' }}>
                                                        <Box mt={2}>
                                                            <Typography variant="body" fontWeight={600} color="secondary">
                                                                {name}
                                                            </Typography>
                                                            <Typography mt={1} variant="h5" fontWeight={700}>
                                                                {content}
                                                            </Typography>
                                                        </Box>
                                                        <Box mt={1}>
                                                            <Typography variant="body2" fontWeight={600} color="secondary">
                                                                {email}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Card>
                                            </Grid>
                                        ))}

                                    </Grid>
                                </Grid>

                                <Footer />

                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <RightGrid />
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

export async function getServerSideProps({ params }) {
    try {
        const results = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/topics?topicUrl=${params.topicId.replace(/\-/g, '+')}`)
            .then((r) => r.json());
        return {
            props: {
                topicUrl: results.topicUrl,
                topicTags: results.topicTags,
                topicTitle: results.topicTitle,
                topicDetail: results.topicDetail,
                topicAddedAt: results.topicAddedAt
            }
        };
    } catch (error) {
        return {
            notFound: true
        };
    }
}

const help = [
    {
        _id: 1,
        name: "Alexa",
        email: "account@qarrington.com",
        avatar: "/assets/media/team/alexa.webp",
        content: "On Qarrington, we remain at your service for any future questions you might have with your Qarrington account in general."
    },
    {
        _id: 2,
        name: "Dwight",
        email: "business@qarrington.com",
        avatar: "/assets/media/team/dwight.webp",
        content: "If you have any further queries regarding how Qarrington works for businesses, kindly contact us through the below email."
    },
    {
        _id: 3,
        name: "Maria",
        email: "consumer@qarrington.com",
        avatar: "/assets/media/team/maria.webp",
        content: "Should you need any further information on how Qarrington works for consumers, please get in touch with the below email."
    },
    {
        _id: 4,
        name: "Jenn",
        email: "platform@qarrington.com",
        avatar: "/assets/media/team/jenn.webp",
        content: "If we can be of any further assistance on how Qarrington works for platforms, kindly let us know via the below email."
    }
]