import React from 'react';
import Link from 'next/link';
import { grey } from '@mui/material/colors';
import { Box, Card, Grid, Tooltip, Typography } from '@mui/material';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import DatasetLinkedRoundedIcon from '@mui/icons-material/DatasetLinkedRounded';
import LockClockRoundedIcon from '@mui/icons-material/LockClockRounded';

const Component = () => {

    return (

        <>

            <Grid my={20}>

                <Grid item xs={12}>

                    {/* globalization starts */}

                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Card style={{ padding: '102px', background: grey[100] }}>
                                <Box
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <PublicRoundedIcon sx={{ fontSize: '80px' }} />
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Card style={{ padding: '60px' }}>
                                <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                    globalization
                                </Typography>
                                <Link href={`/qa`}>
                                    <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                        Access Qarrington from more than 120 countries.
                                    </Typography>
                                </Link>
                                <Typography variant="body" fontWeight={500} color="secondary">
                                    You can buy, sell, and transfer subscriptions from more than 120 countries without strict regulation scares as in stocks and cryptos.
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* globalization ends */}

                    {/* automation starts */}

                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Card style={{ padding: '60px' }}>
                                <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                    automation
                                </Typography>
                                <Link href={`/qa`}>
                                    <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                        Leverage our automated subscription mechanism.
                                    </Typography>
                                </Link>
                                <Typography variant="body" fontWeight={500} color="secondary">
                                    If there's no available match for your buy or sell request after 24hrs, your request will automatically be matched with <Tooltip title="Marie® is an automated market maker created by Qarrington to facilitate and provide rapid subscription liquidity." placement="top">
                                        <Typography
                                            component="span"
                                            fontWeight={700}
                                            color="black"
                                            variant="h6"
                                            sx={{
                                                "&:hover": {
                                                    color: '#2ed573'
                                                }
                                            }}>Marie®</Typography></Tooltip>.
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Card style={{ padding: '102px', background: grey[300] }}>
                                <Box
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <DatasetLinkedRoundedIcon sx={{ fontSize: '80px' }} />
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* automation ends */}

                    {/* protection starts */}

                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Card style={{ padding: '102px', background: grey[200] }}>
                                <Box
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <LockClockRoundedIcon sx={{ fontSize: '80px' }} />
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Card style={{ padding: '60px' }}>
                                <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                    protection
                                </Typography>
                                <Link href={`/qa`}>
                                    <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                        Hedge your subscriptions with innovative products.
                                    </Typography>
                                </Link>
                                <Typography variant="body" fontWeight={500} color="secondary">
                                    When you buy a company's subscriptions, each subscription unit will be fully backed by the underlying products of the company.
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* protection ends */}

                </Grid>

            </Grid>

        </>

    )
}

export default Component

const CardTitle = {
    cursor: 'pointer',
    color: '#000000',
    '&:hover': {
        color: '#2ed573'
    }
}