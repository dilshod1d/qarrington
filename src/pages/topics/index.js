import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeftSide from '../../components/topics/LeftSide';
import Navbar from '../../components/topics/Navbar';
import RightSide from '../../components/topics/RightSide';
import Footer from '../../components/topics/Footer';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Box, Breadcrumbs, Button, Card, Container, Divider, Grid, Stack, TextField, Tooltip, Typography } from '@mui/material';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

const Page = ({ topicItem }) => {

    return (

        <>

            <Head>
                <title>Topics • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that lets you buy and sell the subscriptions of your favorite technology companies with lower fees. Register without email!"
                />
            </Head>

            <Grid style={{ backgroundColor: '#fff' }}>

                <Navbar />

                <Container style={{ backgroundColor: '#fff' }}>
                    <Grid container spacing={2}>

                        <Grid item xs>
                            {/* <LeftSide /> */}
                        </Grid>

                        <Grid my={8} item xs={7}>

                            <Grid item xs={12} mb={2}>
                                <Grid container spacing={0.1}>

                                    {topicItem.slice(0, 5).map(topics => (
                                        <Grid key={topics.sys.id} item xs={12}>
                                            <Box sx={{ borderBottom: 1, borderColor: '#e7e7e7' }}>
                                                <Box sx={{ padding: '20px 40px 40px 40px' }}>
                                                    <Box mt={2}>
                                                        <Link href={`/topics/${topics.fields.topicUrl}`}>
                                                            <Typography sx={TopicTitle} gutterBottom variant="h2" fontWeight={800} color="black">
                                                                {topics.fields.topicTitle}?
                                                            </Typography>
                                                        </Link>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}

                                </Grid>
                            </Grid>

                            {/* footer starts */}

                            <Footer />

                            {/* footer ends */}

                        </Grid>

                        <Grid item xs>
                            {/* <RightSide /> */}
                        </Grid>

                    </Grid>
                </Container>
            </Grid >

        </>

    )
}

export default Page

const TopicTitle = {
    cursor: 'pointer',
    color: '#000000',
    '&:hover': {
        color: '#2ed573'
    }
};

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