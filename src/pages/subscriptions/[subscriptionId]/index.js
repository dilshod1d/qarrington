import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeaderMenu from '../../../components/menus/HeaderMenu';
import LeftGrid from '../../../components/grids/LeftGrid';
import Price from '../../../components/charts/Price';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { Badge, Box, Button, Card, Container, Grid, Stack, styled, Tab, TextField, Tooltip, Typography } from '@mui/material';
import Footer from '../../../components/main/Footer';
import useSWR from 'swr';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

const Page = ({ balance, units, price, cost, name, ticker, amount }) => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: pulls } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/pulls`, fetcher);

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <title>{ticker} Subscriptions • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that allows you to buy, sell, and exchange the subscriptions of your favorite technology companies without fees."
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

                                    <Box textAlign="center" sx={{ marginBottom: '16px' }}>
                                        <Grid item xs={12} sm={6} md={6} lg={12}>
                                            <Card style={{ padding: '80px' }}>
                                                <Tooltip title={`Portfolio`} placement="top">
                                                    <Box textAlign="center">
                                                        <CurrencyBadge badgeContent="USD" color="success" fontWeight={700}>
                                                        </CurrencyBadge>
                                                        <Typography variant="h2" fontWeight="700" color="black" marginTop={1} marginBottom={0.5}>
                                                            {balance}
                                                        </Typography>
                                                    </Box>
                                                </Tooltip>
                                                <Box textAlign="center" mt={1}>
                                                    <Tooltip title="Pulled Price" placement="bottom">
                                                        <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                                                            {cost}
                                                        </Typography>
                                                    </Tooltip>
                                                    <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                        usd
                                                    </Typography>
                                                    <Typography component="span" mx={1} variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                        /
                                                    </Typography>
                                                    <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                                                        {units}
                                                    </Typography>
                                                    <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                        units
                                                    </Typography>
                                                    <Typography component="span" mx={1} variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                        \
                                                    </Typography>
                                                    <Tooltip title="Current Price" placement="bottom">
                                                        <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                                                            {price}
                                                        </Typography>
                                                    </Tooltip>
                                                    <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                        usd
                                                    </Typography>
                                                </Box>
                                            </Card>
                                        </Grid>
                                    </Box>

                                    {/* tab starts */}

                                    <TabContext value={value}>

                                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                            <TabsWrapper
                                                onChange={handleChange}
                                                indicatorColor="transparent"
                                                TabIndicatorProps={{
                                                    sx: { backgroundColor: 'transparent', height: 4 }
                                                }}
                                                sx={{
                                                    "& button:hover": { backgroundColor: "#c7c7c7" },
                                                    "& button:active": { backgroundColor: "#b6b6b6" },
                                                    "& button.Mui-selected": { backgroundColor: "#a7a7a7" },
                                                    "& div.MuiTabs-scroller": { overflowY: "auto" },
                                                }}
                                                scrollButtons="auto"
                                                aria-label="scrollable auto tabs example"
                                            >
                                                <TabLabel label="Pull" value="1" />
                                                <TabLabel label="Push" value="2" />
                                            </TabsWrapper>
                                        </Box>

                                        <Box style={{ marginBottom: '0px', marginTop: '16px' }}>

                                            {/* pull starts */}

                                            <TabPanel sx={{ padding: 0 }} value="1">
                                                <Grid item xs={12}>
                                                    <Card style={{ padding: '60px' }}>
                                                        <Stack spacing={1} sx={{ width: '100%' }}>
                                                            <Tooltip title="Kindly specify the price you're willing to pay per subscription unit or leave the field blank to buy at the current price." placement="top">
                                                                <TextField
                                                                    sx={{ input: { textAlign: "center", textTransform: "lowercase" } }}
                                                                    required
                                                                    placeholder="pull price"
                                                                    type="number"
                                                                />
                                                            </Tooltip>
                                                            <Tooltip title="Kindly specify the subscription units you'd like to buy. If there's no pair after 90 days, your request will be canceled." placement="top">
                                                                <TextField
                                                                    sx={{ input: { textAlign: "center", textTransform: "lowercase" } }}
                                                                    required
                                                                    placeholder="pull units"
                                                                    type="number"
                                                                />
                                                            </Tooltip>
                                                            <Stack marginTop={0} direction="row" width="100%" spacing={2}>
                                                                <Tooltip title="To receive the above subscription units in your portfolio, this amount will be charged to your credit/debit card." placement="top">
                                                                    <Button
                                                                        size="large"
                                                                        sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '14px' }}
                                                                        variant="contained"
                                                                        fullWidth={true}
                                                                        type="submit"
                                                                    >
                                                                        {`Transfer ${amount} USD`}
                                                                    </Button>
                                                                </Tooltip>
                                                            </Stack>
                                                        </Stack>
                                                    </Card>
                                                    <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                                                        <Typography variant="body2">
                                                            If there's no pair after 90 days and your pull request is canceled, you'll automatically be refunded. However, kindly note that the transaction fees are non-refundable. With that being said, when you buy a company's subscriptions, you will be able to use the subscription units to access the company's products and services. Each subscription unit gives you a month of access.
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </TabPanel>

                                            {/* pull stops */}

                                            {/* push starts */}

                                            <TabPanel sx={{ padding: 0 }} value="2">
                                                <Grid item xs={12}>
                                                    <Card style={{ padding: '60px' }}>
                                                        <Stack spacing={1} sx={{ width: '100%' }}>
                                                            <Tooltip title="Kindly specify the price you're willing to sell per subscription unit or leave the field blank to sell at the current price." placement="top">
                                                                <TextField
                                                                    sx={{ input: { textAlign: "center", textTransform: "lowercase" } }}
                                                                    required
                                                                    placeholder="push price"
                                                                    type="number"
                                                                />
                                                            </Tooltip>
                                                            <Tooltip title="Kindly specify the subscription units you'd like to sell. If there's no pair after 90 days, your request will be canceled." placement="top">
                                                                <TextField
                                                                    sx={{ input: { textAlign: "center", textTransform: "lowercase" } }}
                                                                    required
                                                                    placeholder="push units"
                                                                    type="number"
                                                                />
                                                            </Tooltip>
                                                            <Stack marginTop={0} direction="row" width="100%" spacing={2}>
                                                                <Tooltip title="To receive this amount in your bank account, the above subscription units will be taken from your portfolio." placement="top">
                                                                    <Button
                                                                        size="large"
                                                                        sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '14px' }}
                                                                        variant="contained"
                                                                        fullWidth={true}
                                                                        type="submit"
                                                                    >
                                                                        {`Receive ${amount} USD`}
                                                                    </Button>
                                                                </Tooltip>
                                                            </Stack>
                                                        </Stack>
                                                    </Card>
                                                    <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                                                        <Typography variant="body2">
                                                        If there's no pair after 90 days and your push request is canceled, you'll still own the subscription units. In addition, no transaction fees will be charged because there's no payout. With that being said, when you sell a company's subscriptions, the payout will automatically be transferred to your connected bank account. However, you might lose access to the company's products and services.
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </TabPanel>

                                            {/* push stops */}

                                        </Box>

                                    </TabContext>

                                    {/* tab stops */}

                                </form>

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Price />
                    </Grid>

                </Grid>
                <Footer />
            </Container>

        </div>

    )
}

export default Page

const TabsWrapper = styled(TabList)(
    ({ theme }) => `
          &.MuiTabs-root {
            height: 0;
            margin-bottom: 0px;
          }
    `
);

const TabLabel = styled(Tab)(
    ({ theme }) => `
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
    `
);

const CurrencyBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: -8,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export async function getServerSideProps({ params }) {
    try {
        const results = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/pulls?pullTicker=${params.subscriptionId.replace(/\-/g, '+')}`)
            .then((r) => r.json());
        return {
            props: {
                balance: results.pullCompany.pullCompanyPortfolio,
                units: results.pullCompany.pullCompanyUnits,
                price: results.pullCompany.pullCompanyPrice,
                cost: results.pullCompany.pullCompanyCost,
                name: results.pullCompany.pullCompanyName,
                ticker: results.pullTicker,
                amount: results.pullAmount
            }
        };
    } catch (error) {
        return {
            notFound: true
        };
    }
}