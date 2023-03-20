import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeftSide from '../../../components/topics/LeftSide';
import Navbar from '../../../components/topics/Navbar';
import RightSide from '../../../components/topics/RightSide';
import Footer from '../../../components/main/Footer';
import { Avatar, Badge, Box, Card, Container, Grid, styled, Typography } from '@mui/material';
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

        <div>

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

                    <Grid item xs={12} md={6} lg={9} mb={4}>
                        <Grid container spacing={1}>

                            <Grid item xs={12}>

                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        {topicItem.map(ethos => (
                                            <Grid key={ethos.sys.id} item xs={12} sm={6} md={6} lg={6}>
                                                <Link href={`/topics/ethos/${ethos.fields.topicUrl}`}>
                                                    <Card style={{ padding: '60px', cursor: 'pointer' }}>
                                                        <Box style={{ textAlign: 'center' }}>
                                                            <Box mt={2}>
                                                                <Typography variant="h5" fontWeight={600} color="secondary">
                                                                    {ethos.fields.topicTitle}
                                                                </Typography>
                                                                <Typography mt={1} variant="body2" fontWeight={700}>
                                                                    {ethos.fields.topicSummary}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </Card>
                                                </Link>
                                            </Grid>
                                        ))}

                                    </Grid>
                                </Grid>

                                <Footer />

                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs>
                        <RightSide />
                    </Grid>

                </Grid>

            </Container>

        </div>

    )
}

export default Page