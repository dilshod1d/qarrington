import React from 'react';
import Head from 'next/head';
import Navbar from '../../../components/topics/Navbar';
import Footer from '../../../components/topics/Footer';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';

const Page = ({ url, tags, title, detail, summary, postedAt }) => {

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

export async function getStaticProps({ params }) {
    await dbConnect()
    const briefItem = await Brief.findOne({ briefUrl: params.briefId });
    return {
        props: {
            url: briefItem.briefUrl,
            tags: briefItem.briefTags,
            title: briefItem.briefTitle,
            detail: briefItem.briefDetail,
            summary: briefItem.briefSummary,
            postedAt: briefItem.briefPostedAt
        },
        revalidate: 60,
    }
}

export async function getStaticPaths() {
    await dbConnect()
    const briefItems = await Brief.find();
    return {
        paths: briefItems.map(item => {
            const briefId = item.briefUrl;
            return {
                params: {
                    briefId
                }
            }
        }),
        fallback: false
    }
}