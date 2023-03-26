import React from 'react';
import Head from 'next/head';
import Navbar from '../../../../components/topics/Navbar';
import Footer from '../../../../components/topics/Footer';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import dbConnect from "@lib/dbConnect";
import Topic from '@models/topic/Topic'

const Page = ({ url, tags, title, detail, summary, postedAt, briefId }) => {

    return (

        <>

            <Head>
                <title>{title} • Qarrington</title>
                <meta
                    name="description"
                    content={detail}
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

                            <Box style={{ padding: '0px 0px 0px 0px' }}>
                                <Typography variant="h1" fontWeight={700} color="black">
                                    {title}
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                                    {summary}
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography component="div" mt={1.5} variant="body" fontWeight={500} color="secondary">
                                    {detail}
                                </Typography>
                            </Box>

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

export async function getStaticProps({ params }) {
    await dbConnect()
    const topicItem = await Topic.findOne({ topicUrl: params.topicId });
    return {
        props: {
            url: topicItem.topicUrl,
            title: topicItem.topicTitle,
            detail: topicItem.topicDetail,
            summary: topicItem.topicSummary,
            postedAt: topicItem.topicPostedAt,
            briefId: topicItem.topicBriefId
        },
        revalidate: 60,
    }
}

export async function getStaticPaths() {
    await dbConnect()
    const topicItems = await Topic.find();
    return {
        paths: topicItems.map(item => {
            const topicId = item.topicUrl;
            return {
                params: {
                    topicId
                }
            }
        }),
        fallback: false
    }
}