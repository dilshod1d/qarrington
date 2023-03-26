import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../../components/dashboard/Navbar';
import Admin from '../../../../components/dashboard/Admin';
import Company from '../../../../components/dashboard/Company';
import Footer from '../../../../components/dashboard/Footer';
import { Box, Button, Card, Container, Grid, ListItem, ListItemIcon, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Pagination } from '@mui/lab';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

const Page = () => {

    return (

        <div>

            <Head>
                <title>Manage Topic • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that allows you to buy, sell, and exchange the subscriptions of your favorite technology companies with lower fees."
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
                                                placeholder="briefUrl"
                                                inputProps={{ style: { textAlign: 'center' } }}
                                            />
                                        </Stack>
                                    </Card>

                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                        <Stack spacing={2} sx={{ width: '100%' }}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                placeholder="briefTags"
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