import React from 'react';
import Head from 'next/head';
import Navbar from '../../../components/topics/Navbar';
import Footer from '../../../components/topics/Footer';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

const Page = ({ topicItem }) => {

    const { topicTitle, topicDetail, topicSummary } = topicItem.fields

    return (

        <>

            <Head>
                <title>{topicTitle} • Qarrington</title>
                <meta
                    name="description"
                    content={topicSummary}
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
                                    {topicTitle}
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                                    {topicSummary}
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography component="div" mt={1.5} variant="body" fontWeight={500} color="secondary">
                                    {documentToReactComponents(topicDetail)}
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

export const getStaticProps = async ({ params }) => {
    const { items } = await client.getEntries({
        content_type: 'topics',
        'fields.topicUrl': params.topicId
    });
    return {
        props: { topicItem: items[0] },
        revalidate: 60
    }
}

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: 'topics'
    });
    const paths = res.items && res.items.map(item => {
        return {
            params: { topicId: item.fields.topicUrl }
        }
    });
    return {
        paths,
        fallback: true
    }
}