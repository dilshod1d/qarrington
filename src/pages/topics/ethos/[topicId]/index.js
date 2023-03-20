import React from 'react';
import Head from 'next/head';
import LeftSide from '../../../../components/topics/LeftSide';
import Navbar from '../../../../components/topics/Navbar';
import RightSide from '../../../../components/topics/RightSide';
import Footer from '../../../../components/main/Footer';
import { createClient } from 'contentful';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export async function getStaticPaths() {
    const res = await client.getEntries({
        content_type: process.env.CONTENTFUL_ETHOS_MODEL,
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
        content_type: process.env.CONTENTFUL_ETHOS_MODEL,
        'fields.topicUrl': params.topicId
    })

    return {
        props: {
            topicItem: res.items[0],
        },
        revalidate: 60,
    };
}

const Page = ({ topicItem }) => {

    return (

        <>

            <Head>
                <title>{topicItem.fields.topicTitle} • Qarrington</title>
                <meta
                    name="description"
                    content={topicItem.fields.topicDetail}
                />
            </Head>

            <Grid style={{ backgroundColor: '#fff' }}>

                {/* header starts */}

                <Navbar />

                {/* header ends */}

                <Container style={{ backgroundColor: '#fff' }}>

                    <Grid container spacing={2}>

                        <Grid item xs>
                            <LeftSide />
                        </Grid>

                        <Grid mt={8} item xs={6}>
                            <Box style={{ padding: '100px 20px 20px 20px' }}>
                                <Typography variant="h1" fontWeight={700} color="black">
                                    {topicItem.fields.topicTitle}?
                                </Typography>
                                <Divider sx={{ my: 4 }} />
                                <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                                    {topicItem.fields.topicSummary}
                                </Typography>
                                <Divider sx={{ my: 4 }} />
                                <Typography mt={1} variant="body" fontWeight={500} color="secondary">
                                    {documentToReactComponents(topicItem.fields.topicDetail)}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs>
                            <RightSide />
                        </Grid>

                    </Grid>

                    <Footer />

                </Container>

            </Grid>

        </>

    )
}

export default Page