import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeftSide from '../../components/topics/LeftSide';
import Navbar from '../../components/topics/Navbar';
import RightSide from '../../components/topics/RightSide';
import Footer from '../../components/main/Footer';
import { Avatar, Badge, Box, Card, Container, Divider, Grid, List, ListItem, ListItemButton, ListItemText, styled, Typography } from '@mui/material';
import { createClient } from 'contentful';
import { CardActionArea } from '@mui/material';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export async function getStaticProps() {
    const res = await client.getEntries({
        content_type: process.env.CONTENTFUL_TOPICS_MODEL,
    });

    return {
        props: {
            topicItem: res.items,
        },
        revalidate: 60,
    }
}

const Page = ({ topicItem }) => {

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
                                Discover answers to 75k questions.
                            </Typography>
                            <Divider sx={{ my: 3 }} />
                            <Typography mt={1} mb={1} variant="h5" fontWeight={500} color="secondary">
                                In ~5 seconds, you can find answers to over 75k questions.
                            </Typography>
                        </Box>
                        <Grid item xs={12} mb={2}>
                            <Grid container spacing={0.1}>

                                {topicItem.slice(0, 2).map(topics => (
                                    <Grid key={topics.sys.id} item xs={12}>
                                        <ListItemButton sx={{ borderBottom: 1, borderColor: '#e7e7e7' }}>
                                            <Link href={`/topics/${topics.fields.topicUrl}`}>
                                                <Box sx={{ padding: '20px 40px 40px 40px' }}>
                                                    <Box mt={2}>
                                                        <Typography gutterBottom variant="h4" fontWeight={700} color="black">
                                                            {topics.fields.topicTitle}
                                                        </Typography>
                                                        <Typography textTransform="uppercase" variant="body2" fontWeight={600} color="secondary">
                                                            {`tag`}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Link>
                                        </ListItemButton>
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