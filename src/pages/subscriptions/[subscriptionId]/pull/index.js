import React, { useState } from 'react';
import Head from 'next/head';
import HeaderMenu from '../../../../components/menus/HeaderMenu';
import LeftGrid from '../../../../components/grids/LeftGrid';
import RightGrid from '../../../../components/grids/RightGrid';
import { Box, Button, Card, Container, Grid, Stack, Tooltip, Typography } from '@mui/material';
import Footer from '../../../../components/main/Footer';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

const Page = ({ balance, units, price, cost, amount, name, ticker, slug }) => {

    const [unit, setUnit] = useState(0);
    const handleIncrease = () => {
        setUnit(unit + 12)
    }
    const handleDecrease = () => {
        if (unit > 0)
            setUnit(unit - 12);
    }

    return (

        <div>

            <Head>
                <title>Pull {ticker} • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that allows you to buy, sell, and exchange the subscriptions of your favorite technology companies with lower fees."
                />
            </Head>

            <HeaderMenu />

            <Container>

                <Grid container spacing={2}>

                    {/* LeftGrid Starts Here */}

                    <Grid item xs={12} md={6} lg={3}>
                        <LeftGrid />
                    </Grid>

                    {/* LeftGrid Ends Here */}

                    <Grid item xs={12} md={6} lg={6} mb={4}>
                        <Grid container spacing={1}>

                            <Grid item xs={12}>

                                <form noValidate autoComplete='off'>

                                    {/* pull starts */}

                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                        <Typography component="span" variant="body" color="secondary" fontWeight={500}>
                                            You're about to buy or pull <b>{units}</b> <b>{ticker}</b> of {name} subscriptions at the current price of <b>{price}</b> USD per unit for the amount of <b>{amount}</b> USD.
                                        </Typography>
                                    </Card>

                                    <Card style={{ padding: '60px' }}>
                                        <Stack spacing={2} sx={{ width: '100%' }}>
                                            <Stack marginTop={0} direction="row" width="100%" spacing={2}>
                                                <Button
                                                    size="large"
                                                    sx={{ py: 1.2, textTransform: 'uppercase', fontSize: '12px' }}
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    onClick={handleDecrease}
                                                >
                                                    <RemoveCircleTwoToneIcon />
                                                </Button>
                                                <Tooltip title="This is the total number of subscription units that you're willing to pull or buy." placement="top">
                                                    <Button
                                                        size="large"
                                                        sx={{ py: 1.2, color: 'white', textTransform: 'uppercase', fontSize: '18px' }}
                                                        variant="contained"
                                                        fullWidth={true}
                                                    >
                                                        {unit}
                                                    </Button>
                                                </Tooltip>
                                                <Button
                                                    size="large"
                                                    sx={{ py: 1.2, textTransform: 'uppercase', fontSize: '12px' }}
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    onClick={handleIncrease}
                                                >
                                                    <AddCircleTwoToneIcon />
                                                </Button>
                                            </Stack>
                                            <Stack marginTop={0} direction="row" width="100%" spacing={2}>
                                                <Button
                                                    size="large"
                                                    sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                                    variant="contained"
                                                    fullWidth={true}
                                                    type="submit"
                                                >
                                                    Pull
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </Card>

                                    <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <Typography variant="body2">
                                            Each time you make a pull request to buy the subscriptions of a Qarrington company, the request will be filled at the current price of the subscription.
                                        </Typography>
                                    </Box>

                                    {/* tab stops */}

                                </form>

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <RightGrid />
                    </Grid>

                </Grid>
                <Footer />
            </Container>

        </div>

    )
}

export default Page

export async function getServerSideProps({ params }) {
    try {
        const results = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/pulls?pullTicker`)
            .then((r) => r.json());
        return {
            props: {
                balance: results.pullCompany.pullCompanyPortfolio,
                units: results.pullCompany.pullCompanyUnits,
                price: results.pullCompany.pullCompanyPrice,
                cost: results.pullCompany.pullCompanyCost,
                name: results.pullCompany.pullCompanyName,
                ticker: results.pullTicker,
                slug: results.pullTicker
            }
        };
    } catch (error) {
        return {
            notFound: true
        };
    }
}