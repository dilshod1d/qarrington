import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeftSide from '../../../components/topics/LeftSide';
import Navbar from '../../../components/topics/Navbar';
import RightSide from '../../../components/topics/RightSide';
import Footer from '../../../components/main/Footer';
import { createClient } from 'contentful';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Box, Breadcrumbs, Button, Card, Container, Divider, Grid, Stack, TextField, Tooltip, Typography } from '@mui/material';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: 'topics'
    });
    const paths = res.items.map(item => {
        return {
            params: { topicId: item.fields.topicUrl }
        }
    });
    return {
        paths,
        fallback: true
    }
}

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

                {/* header starts */}

                <Navbar />

                {/* header ends */}

                <Container style={{ backgroundColor: '#fff' }}>

                    <Grid container spacing={2}>

                        <Grid item xs>
                            {/* <LeftSide /> */}
                        </Grid>

                        <Grid my={8} item xs={7}>
                            <Box style={{ padding: '100px 0px 0px 0px' }}>
                                <Typography variant="h1" fontWeight={700} color="black">
                                    {topicTitle}?
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                                    {topicSummary}
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography mt={1} variant="body" fontWeight={500} color="secondary">
                                    {documentToReactComponents(topicDetail)}
                                </Typography>
                            </Box>
                            <Box mb={4}>
                                <Typography variant="body" fontWeight={500} color="secondary">
                                    If you think this topic is not helpful enough and you would like to talk to one of our account managers, you can always email us using the below form and we'd try to reply within 12hrs.
                                </Typography>
                            </Box>
                            <Box>
                                <form noValidate autoComplete="on">
                                    <Card style={{ padding: '100px', marginBottom: '20px' }}>
                                        <Stack spacing={1.2} sx={{ width: '100%' }}>
                                            <Tooltip title="In order to submit this form, you have to be logged in. Otherwise, you would be prompted to log in to your account." placement="top">
                                                <TextField
                                                    inputProps={{ style: { textAlign: 'center' } }}
                                                    rows={3}
                                                    maxRows={3}
                                                    multiline
                                                    placeholder="what can we help you with?"
                                                />
                                            </Tooltip>
                                            <Button
                                                size="large"
                                                sx={{ color: 'white', py: 2, textTransform: 'uppercase', fontSize: '13px' }}
                                                variant="contained"
                                                fullWidth={true}
                                                type="submit"
                                            >
                                                submit
                                            </Button>
                                        </Stack>
                                    </Card>
                                    <Box textAlign="center">
                                        <Typography variant="body2" mt={3} component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                                            By clicking on the "Submit" button or otherwise submitting the form above, I acknowledge that I have read and that I do hereby agree with the Service Terms and Privacy Policies of using the Qarrington website.
                                        </Typography>
                                    </Box>
                                </form>


                            </Box>

                            {/* footer starts */}



                            {/* footer ends */}

                        </Grid>

                        <Grid item xs>
                            {/* <RightSide /> */}
                        </Grid>

                    </Grid>

                    <Footer />

                </Container>

            </Grid>

        </>

    )
}

export default Page

const BreadcrumbItem = {
    cursor: 'pointer',
    fontWeight: '500',
    '&:hover': {
        color: '#000'
    }
};

const footer = {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 20px 10px 20px'
};

const footerBrand = {
    textAlign: 'center'
};