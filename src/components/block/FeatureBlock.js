import React from 'react';
import Link from 'next/link';
import { pink } from '@mui/material/colors';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import { Box, Card, Grid, Tooltip, Typography } from '@mui/material';

const Component = () => {

    return (

        <>

            <Grid my={20}>

                <Grid sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h2" color="black" fontWeight={800}>
                        Build your first subscription portfolio on a leading subscription exchange.
                    </Typography>
                    <Typography sx={{ my: 2 }} variant="h5" color="secondary" fontWeight={600}>
                        Qarrington allows you to build your first subscription portfolio by buying and selling the subscriptions of industry-leading startup companies that disrupt the world and touch lives.
                    </Typography>
                </Grid>

                <Grid item xs={12}>

                    {/* globalization starts */}

                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Card style={{ padding: '100px' }}>
                                <Box
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <PublicRoundedIcon sx={{ fontSize: '80px', color: '#2ed573' }} />
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
                                    You can buy, sell, and transfer subscriptions from more than 120 countries without strict regulations as in stocks and cryptos.
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
                            <Card style={{ padding: '100px' }}>
                                <Box
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <AccountTreeRoundedIcon sx={{ fontSize: '80px', color: '#2ed573' }} />
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* automation ends */}

                    {/* protection starts */}

                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Card style={{ padding: '100px' }}>
                                <Box
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <HealthAndSafetyRoundedIcon sx={{ fontSize: '80px', color: '#2ed573' }} />
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
    color: '#2ed573',
    '&:hover': {
        color: '#000000'
    }
}