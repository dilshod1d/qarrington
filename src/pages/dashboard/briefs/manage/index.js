import React from 'react';
import Head from 'next/head';
import Navbar from '../../../../components/dashboard/Navbar';
import Admin from '../../../../components/dashboard/Admin';
import Company from '../../../../components/dashboard/Company';
import Footer from '../../../../components/dashboard/Footer';
import { Button, Card, Container, Grid, Stack, TextField } from '@mui/material';

const Page = () => {

    return (

        <div>

            <Head>
                <title>Manage Brief • Qarrington</title>
                <meta
                    name="description"
                    content="Help users find topical answers to all types of questions about using Qarrington. Alternatively, users can contact our account managers for 24/7 support."
                />
            </Head>

            <Navbar />

            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={6} lg={3}>
                        <Admin />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6} mt={12} mb={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>

                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                    <Stack spacing={1} sx={{ width: '100%' }} direction="row">
                                        <Button
                                            size="large"
                                            sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                            variant="outlined"
                                            color="secondary"
                                            fullWidth={true}
                                        >
                                            copy
                                        </Button>
                                        <Button
                                            size="large"
                                            sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                            variant="outlined"
                                            color="error"
                                            fullWidth={true}
                                        >
                                            remove
                                        </Button>
                                        <Button
                                            size="large"
                                            sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                            variant="outlined"
                                            color="primary"
                                            fullWidth={true}
                                        >
                                            view
                                        </Button>
                                    </Stack>
                                </Card>

                                {/*  */}

                                <form noValidate autoComplete='off'>

                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                        <Stack spacing={2} sx={{ width: '100%' }}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                placeholder="briefTitle"
                                                inputProps={{ style: { textAlign: 'center' } }}
                                            />
                                            <TextField
                                                required
                                                id="outlined-required"
                                                placeholder="briefSlug"
                                                inputProps={{ style: { textAlign: 'center' } }}
                                            />
                                        </Stack>
                                    </Card>

                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                        <Stack spacing={2} sx={{ width: '100%' }}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                placeholder="briefTopic"
                                                inputProps={{ style: { textAlign: 'center' } }}
                                            />
                                            <TextField
                                                required
                                                id="outlined-required"
                                                placeholder="briefSummary"
                                                inputProps={{ style: { textAlign: 'center' } }}
                                            />
                                        </Stack>
                                    </Card>

                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                        <Stack spacing={2} sx={{ width: '100%' }}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                placeholder="briefDetail"
                                                inputProps={{ style: { textAlign: 'center' } }}
                                            />
                                        </Stack>
                                    </Card>

                                    <Card style={{ padding: '60px', marginBottom: '0px' }}>
                                        <Button
                                            size="large"
                                            sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                            variant="contained"
                                            fullWidth={true}
                                            type="submit"
                                        >
                                            save
                                        </Button>
                                    </Card>

                                </form>

                                {/*  */}

                                <Footer />

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Company />
                    </Grid>

                </Grid>
            </Container>

        </div>

    )
}

export default Page