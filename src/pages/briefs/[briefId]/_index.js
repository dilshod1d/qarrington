import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';
import Navbar from '../../../components/topics/Navbar';
import Footer from '../../../components/topics/Footer';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import dbConnect from "@lib/dbConnect";
import Brief from '@models/brief/Brief';

const Page = ({ url, title, detail, summary, postedAt }) => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: topics } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/topics`, fetcher);

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

                                    {topics && Array.isArray(topics) && topics?.slice(0, 3).map(({ _id, topicUrl, topicTags, topicTitle, topicDetail, topicSummary, topicPostedAt }) => (
                                        <Grid key={_id} item xs={12}>
                                            <Box sx={{ borderBottom: 1, borderColor: '#e7e7e7' }}>
                                                <Box sx={{ padding: '20px 40px 40px 40px' }}>
                                                    <Box mt={2}>
                                                        <Link href={`/briefs/${url}/${topicUrl}`}>
                                                            <Typography sx={ItemTitle} gutterBottom variant="h2" fontWeight={800} color="black">
                                                                {topicTitle}?
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

const ItemTitle = {
    cursor: 'pointer',
    color: '#000000',
    '&:hover': {
        color: '#2ed573'
    }
};

export async function getStaticProps({ params }) {
    await dbConnect()
    const briefItem = await Brief.findOne({ briefUrl: params.briefId });
    return {
        props: {
            url: briefItem.briefUrl,
            title: briefItem.briefTitle,
            detail: briefItem.briefDetail,
            summary: briefItem.briefSummary,
            postedAt: briefItem.briefPostedAt
        },
        revalidate: 60,
    };
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