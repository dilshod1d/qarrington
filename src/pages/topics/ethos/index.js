import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeftSide from '../../../components/topics/LeftSide';
import Navbar from '../../../components/topics/Navbar';
import RightSide from '../../../components/topics/RightSide';
import Footer from '../../../components/main/Footer';
import { Avatar, Badge, Box, Card, Container, Divider, Grid, styled, Typography } from '@mui/material';
import { createClient } from 'contentful';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export async function getStaticProps() {
    const res = await client.getEntries({
        content_type: process.env.CONTENTFUL_ETHOS_MODEL,
    })

    return {
        props: {
            topicItem: res.items,
        },
        revalidate: 60,
    }
}

const Page = ({ topicItem }) => {
    console.log(topicItem);

    return (

        <div style={{ backgroundColor: '#fff' }}>

            <Head>
                <title>Ethos • Qarrington</title>
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
                                Getting to know Qarrington & all.
                            </Typography>
                            <Divider sx={{ my: 3 }} />
                            <Typography mt={1} mb={4} variant="h5" fontWeight={500} color="secondary">
                                Get yourself familiar with what Qarrington is and does.
                            </Typography>
                        </Box>
                        <Grid item xs={12} mb={2}>
                            <Grid container spacing={1}>

                                {topicItem.slice(0, 2).map(ethos => (
                                    <Grid key={ethos.sys.id} item xs={12}>
                                        <Link href={`/topics/ethos/${ethos.fields.topicUrl}`}>
                                            <Card style={{ padding: '20px 40px 40px 40px', cursor: 'pointer' }}>
                                                {/* <Box style={{ textAlign: 'center' }}>
                                                    <Box mt={2}>
                                                        <Typography variant="h5" fontWeight={600} color="secondary">
                                                            {ethos.fields.topicTitle}
                                                        </Typography>
                                                        <Typography mt={1} variant="body2" fontWeight={700}>
                                                            {ethos.fields.topicSummary}
                                                        </Typography>
                                                    </Box>
                                                </Box> */}
                                                <Box mt={2}>
                                                    <Typography variant="h6" fontWeight={700} color="black">
                                                        {ethos.fields.topicTitle}
                                                    </Typography>
                                                    {/* <Typography variant="body" fontWeight={600} color="secondary">
                                                        {ethos.fields.topicSummary}
                                                    </Typography> */}
                                                </Box>
                                            </Card>
                                        </Link>
                                    </Grid>
                                ))}

                                {/* {sections && Array.isArray(sections) && sections?.map(({ sectionId, sectionUrl, sectionIcon, sectionTitle, sectionDetail }) => (
                                    <Grid key={sectionId} item xs={12} sm={6} md={6} lg={6}>
                                        <Link href={`/topics/${sectionUrl}`}>
                                            <Card style={{ padding: '20px 40px 40px 40px', cursor: 'pointer' }}>
                                                <Box mt={2}>
                                                    <Typography gutterBottom variant="h6" fontWeight={700} color="black" textTransform="uppercase">
                                                        {sectionTitle}
                                                    </Typography>
                                                    <Typography variant="body" fontWeight={600} color="secondary">
                                                        {sectionDetail}
                                                    </Typography>
                                                </Box>
                                            </Card>
                                        </Link>
                                    </Grid>
                                ))} */}

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
        sectionTitle: "🎨 Users",
        sectionDetail: "Uncover how, when, and why digital buyers use Qarrington."
    },
    {
        sectionId: "2",
        sectionUrl: "/underwriters",
        sectionIcon: "/assets/media/sections/underwriters.png",
        sectionTitle: "✍️ Underwriters",
        sectionDetail: "Discover how, when, and why underwriters use Qarrington."
    },
    {
        sectionId: "3",
        sectionUrl: "/founders",
        sectionIcon: "/assets/media/sections/founders.png",
        sectionTitle: "👨‍💻 Founders",
        sectionDetail: "See how, when, & why startup founders utilize Qarrington."
    },
    {
        sectionId: "4",
        sectionUrl: "/ethos",
        sectionIcon: "/assets/media/sections/ethos.png",
        sectionTitle: "🏤 Ethos",
        sectionDetail: "Get yourself familiar with what Qarrington is and does."
    },
    {
        sectionId: "5",
        sectionUrl: "/fundamentals",
        sectionIcon: "/assets/media/sections/fundamentals.png",
        sectionTitle: "🖱️ Fundamentals",
        sectionDetail: "Explore how you can easily get started with Qarrington."
    },
    {
        sectionId: "6",
        sectionUrl: "/guidelines",
        sectionIcon: "/assets/media/sections/guidelines.png",
        sectionTitle: "⚖️ Guidelines",
        sectionDetail: "Understand the rules and terms of using Qarrington."
    }
]