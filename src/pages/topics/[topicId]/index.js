import React from 'react';
import Head from 'next/head';
import HeaderMenu from '../../../components/menus/HeaderMenu';
import RightGrid from '../../../components/grids/RightGrid';
import { Avatar, Badge, Box, Card, Container, Divider, Grid, styled, Typography } from '@mui/material';
import Footer from '../../../components/main/Footer';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export async function getStaticPaths() {
    const res = await client.getEntries({
        content_type: "topic",
    })

    return {
        paths: res.items.map((item) => ({
            params: { topicId: item.fields.topicUrl },
        })),
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const res = await client.getEntries({
        content_type: "topic",
        'fields.topicUrl': params.topicId
    })

    return {
        props: {
            topic: res.items[0],
        },
        revalidate: 60,
    };
}

const Page = ({ topic }) => {
    console.log(topic);

    return (

        <div>

            <Head>
                <title>{topic.fields.topicTitle} • Qarrington</title>
                <meta
                    name="description"
                    content={topic.fields.topicDetail}
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

                                        <Grid item xs={12}>
                                            <Card style={{ padding: '80px 80px 100px 80px' }}>
                                                <Typography variant="h1" fontWeight={700} color="black">
                                                    {topic.fields.topicTitle}?
                                                </Typography>
                                                <Divider sx={{ my: 4 }} />
                                                <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                                                    {topic.fields.topicSummary}
                                                </Typography>
                                                <Divider sx={{ my: 4 }} />
                                                <Typography mt={1} variant="body" fontWeight={500} color="secondary">
                                                    {documentToReactComponents(topic.fields.topicDetail)}
                                                </Typography>
                                            </Card>
                                        </Grid>

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