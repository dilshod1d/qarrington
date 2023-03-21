import React from 'react';
import Head from 'next/head';
import LeftSide from '../../../components/topics/LeftSide';
import Navbar from '../../../components/topics/Navbar';
import RightSide from '../../../components/topics/RightSide';
import Footer from '../../../components/main/Footer';
import { createClient } from 'contentful';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export async function getStaticPaths() {
    const res = await client.getEntries({
        content_type: process.env.CONTENTFUL_TOPICS_MODEL,
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
        content_type: process.env.CONTENTFUL_TOPICS_MODEL,
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
                    content={topicItem.fields.topicSummary}
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

                        <Grid mt={8} item xs={7}>
                            <Box style={{ padding: '100px 0px 20px 0px' }}>
                                <Typography variant="h1" fontWeight={700} color="black">
                                    {topicItem.fields.topicTitle}?
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                                    {topicItem.fields.topicSummary}
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography mt={1} variant="body" fontWeight={500} color="secondary">
                                    {documentToReactComponents(topicItem.fields.topicDetail)}
                                </Typography>
                            </Box>
                            <Box mb={4}>
                                <Typography variant="body" fontWeight={500} color="secondary">
                                    Hello
                                </Typography>
                            </Box>
                            <Box>
                                <form noValidate autoComplete="on">
                                    <Card style={{ padding: '100px', marginBottom: '20px' }}>
                                        <Stack spacing={1.2} sx={{ width: '100%' }}>
                                            <TextField
                                                inputProps={{ style: { textAlign: 'center' } }}
                                                rows={3}
                                                maxRows={3}
                                                multiline
                                                placeholder="access key"
                                            />
                                            <Button
                                                size="large"
                                                sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                                variant="contained"
                                                fullWidth={true}
                                                type="submit"
                                            >
                                                Login
                                            </Button>
                                        </Stack>
                                    </Card>
                                    <Box textAlign="center">
                                        <Typography variant="body2" mt={1} component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                                            In order to sell subscriptions and receive payouts, you're required to provide verifiable personal, business, bank, and contact details from within your account.
                                        </Typography>
                                    </Box>
                                </form>
                            </Box>
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