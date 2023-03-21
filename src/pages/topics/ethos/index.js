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
                                                <Box mt={2}>
                                                    <Typography variant="h6" fontWeight={700} color="black">
                                                        {ethos.fields.topicTitle}
                                                    </Typography>
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