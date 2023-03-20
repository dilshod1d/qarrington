import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeftSide from '../../components/topics/LeftSide';
import Navbar from '../../components/topics/Navbar';
import RightSide from '../../components/topics/RightSide';
import Footer from '../../components/main/Footer';
import { Avatar, Badge, Box, Card, Container, Divider, Grid, styled, Typography } from '@mui/material';

const Page = () => {

    return (

        <div style={{ backgroundColor: '#fff' }}>

            <Head>
                <title>Topics • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that lets you buy and sell the subscriptions of your favorite technology companies with lower fees. Register without email!"
                />
            </Head>

            <Navbar />

            <Container>

                <Grid container spacing={2}>

                    <Grid item xs>
                        <LeftSide />
                    </Grid>

                    <Grid mt={8} item xs={6}>
                        <Box style={{ padding: '100px 20px 20px 20px' }}>
                            <Typography variant="h1" fontWeight={700} color="black">
                                Hello.
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography mt={1} mb={4} variant="h5" fontWeight={500} color="secondary">
                                How are you.
                            </Typography>
                        </Box>
                        <Grid item xs={12} mb={2}>
                            <Grid container spacing={2}>

                                {sections && Array.isArray(sections) && sections?.map(({ sectionId, sectionUrl, sectionIcon, sectionTitle, sectionDetail }) => (
                                    <Grid key={sectionId} item xs={12} sm={6} md={6} lg={6}>
                                        <Link href={`/topics/${sectionUrl}`}>
                                            <Card style={{ padding: '60px', cursor: 'pointer' }}>
                                                <Box
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <Avatar
                                                        style={{ width: 50, height: 50 }}
                                                        alt={sectionDetail}
                                                        src={sectionIcon}
                                                    />
                                                </Box>
                                                <Box style={{ textAlign: 'center' }}>
                                                    <Box mt={2}>
                                                        <Typography variant="h5" fontWeight={600} color="secondary">
                                                            {sectionTitle}
                                                        </Typography>
                                                        <Typography mt={1} variant="body2" fontWeight={700}>
                                                            {sectionDetail}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Link>
                                    </Grid>
                                ))}

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs>
                        <RightSide />
                    </Grid>

                </Grid>

                <Footer />

            </Container>

        </div>

    )
}

export default Page

const sections = [
    {
        sectionId: "1",
        sectionUrl: "/users",
        sectionIcon: "/assets/media/sections/users.png",
        sectionTitle: "Users",
        sectionDetail: "This is user section card detail."
    },
    {
        sectionId: "2",
        sectionUrl: "/underwriters",
        sectionIcon: "/assets/media/sections/underwriters.png",
        sectionTitle: "Underwriters",
        sectionDetail: "This is underwriter section card detail."
    },
    {
        sectionId: "3",
        sectionUrl: "/founders",
        sectionIcon: "/assets/media/sections/founders.png",
        sectionTitle: "Founders",
        sectionDetail: "This is founder section card detail."
    },
    {
        sectionId: "4",
        sectionUrl: "/ethos",
        sectionIcon: "/assets/media/sections/ethos.png",
        sectionTitle: "Ethos",
        sectionDetail: "This is etho section card detail."
    },
    {
        sectionId: "5",
        sectionUrl: "/fundamentals",
        sectionIcon: "/assets/media/sections/fundamentals.png",
        sectionTitle: "Fundamentals",
        sectionDetail: "This is fundamental section card detail."
    },
    {
        sectionId: "6",
        sectionUrl: "/guidelines",
        sectionIcon: "/assets/media/sections/guidelines.png",
        sectionTitle: "Guidelines",
        sectionDetail: "This is guideline section card detail."
    }
]