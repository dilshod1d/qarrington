import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { green } from '@mui/material/colors';
import HeaderMenu from '../../../components/menus/HeaderMenu';
import LeftGrid from '../../../components/grids/LeftGrid';
import Buy from '../../../components/cards/Buy';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { Avatar, Badge, Box, Button, Breadcrumbs, Card, Container, Grid, Stack, styled, Tab, TextField, Tooltip, Typography } from '@mui/material';
import Footer from '../../../components/main/Footer';
import useSWR from 'swr';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const Page = ({ slug, ticker, name, logo, headline, product, description, industry, market, website, email, units, price, date, time }) => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: companies } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies`, fetcher);
    const { data: accounts } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/accounts`, fetcher);

    const [value, setValue] = useState('3');

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
                <title>{name} ({ticker}) Subscriptions • Qarrington</title>
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
                                            <Card style={{ padding: '60px', marginBottom: '10px' }}>

                                                {companies && companies.slice(0, 1).map(({ _id, companyKpi }) => (
                                                    <>
                                                        {companyKpi && companyKpi.slice(0, 1).map(({ _id, companyNow }) => (
                                                            <>
                                                                {companyNow && companyNow.slice(0, 1).map(({ _id, companyCapitalization, companyVolume, companyPrice, companyPercentChange, companyPointChange, companyActiveCustomers, companyIsRecordedAt }) => (
                                                                    <Box key={_id} textAlign="center" marginBottom="10px">
                                                                        <Box>
                                                                            <Typography mr={1} variant="h2" fontWeight={700} component="span" color="black">
                                                                                ${companyPrice}
                                                                            </Typography>
                                                                            <Typography variant="h2" fontWeight={700} component="span" color="primary">
                                                                                +{companyPercentChange}%
                                                                            </Typography>
                                                                        </Box>

                                                                        <Box>
                                                                            <Typography style={Data2Item} component="span" color="black">
                                                                                {companyVolume}
                                                                            </Typography>
                                                                            <Typography style={Data2Helper} component="span" color="secondary">
                                                                                Vol
                                                                            </Typography>
                                                                            <Typography style={Data2Item} component="span" color="black">
                                                                                {`${companyCapitalization}`}
                                                                            </Typography>
                                                                            <Typography style={Data2Helper} component="span" color="secondary">
                                                                                Cap
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                ))}
                                                            </>
                                                        ))}
                                                    </>
                                                ))}

                                                <Grid item xs={12} mt={1.5}>
                                                    <Grid container spacing={1}>
                                                        {cubes && cubes.map(({ _id, date, price, variant }) => (
                                                            <Tooltip title={date} placement="top">
                                                                <Grid key={_id} item xs={12} sm={6} md={6} lg={1} mb={0}>
                                                                    <Box style={{ padding: '7px', border: '1px', borderRadius: '3px', backgroundColor: green[variant] }}>
                                                                        <></>
                                                                    </Box>
                                                                </Grid>
                                                            </Tooltip>
                                                        ))}
                                                    </Grid>
                                                </Grid>

                                                <Box role="presentation">
                                                    <Breadcrumbs
                                                        separator="|"
                                                        aria-label="breadcrumb"
                                                        sx={{
                                                            '& ol': {
                                                                justifyContent: 'center',
                                                                fontSize: '12px',
                                                                margin: '20px -20px 0px 0px',
                                                                textDecoration: 'none'
                                                            }
                                                        }}
                                                    >
                                                        <Link href="#">
                                                            <Typography
                                                                variant="body2"
                                                                color="black"
                                                                sx={PeriodItem}
                                                            >
                                                                N
                                                            </Typography>
                                                        </Link>
                                                        <Link href="#">
                                                            <Typography
                                                                variant="body2"
                                                                color="black"
                                                                sx={PeriodItem}
                                                            >
                                                                H
                                                            </Typography>
                                                        </Link>
                                                        <Link href="#">
                                                            <Typography
                                                                variant="body2"
                                                                color="black"
                                                                sx={PeriodItem}
                                                            >
                                                                D
                                                            </Typography>
                                                        </Link>
                                                        <Link href="#">
                                                            <Typography
                                                                variant="body2"
                                                                color="black"
                                                                sx={PeriodItem}
                                                            >
                                                                W
                                                            </Typography>
                                                        </Link>
                                                        <Link href="#">
                                                            <Typography
                                                                variant="body2"
                                                                color="black"
                                                                sx={PeriodItem}
                                                            >
                                                                M
                                                            </Typography>
                                                        </Link>
                                                        <Link href="#">
                                                            <Typography
                                                                variant="body2"
                                                                color="black"
                                                                sx={PeriodItem}
                                                            >
                                                                Q
                                                            </Typography>
                                                        </Link>
                                                        <Link href="#">
                                                            <Typography
                                                                variant="body2"
                                                                color="black"
                                                                sx={PeriodItem}
                                                            >
                                                                Y
                                                            </Typography>
                                                        </Link>
                                                    </Breadcrumbs>
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
                                                <TabLabel label="About" value="1" />
                                                <TabLabel label="ISO" value="2" />
                                                <TabLabel label="Market" value="3" />
                                                <TabLabel label="FAQ" value="4" />
                                                <TabLabel label="Founder" value="5" />
                                            </TabsWrapper>
                                        </Box>

                                        <Box style={{ marginBottom: '0px', marginTop: '16px' }}>

                                            {/* about starts */}

                                            <TabPanel sx={{ padding: 0 }} value="1">
                                                <Grid item xs={12}>
                                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                        <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                            What is {name}?
                                                        </Typography>
                                                        <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                            {description}
                                                        </Typography>
                                                    </Card>
                                                    <Card style={{ padding: '60px', marginBottom: '10px', background: '#f5f5f5' }}>
                                                        <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                            What does {name} do?
                                                        </Typography>
                                                        <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                            {product}
                                                        </Typography>
                                                    </Card>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                                            <Card style={{ padding: '60px' }}>
                                                                <Typography mb={0.5} component="div" variant="body" color="black" fontWeight={700}>
                                                                    Name
                                                                </Typography>
                                                                <Typography textTransform="uppercase" component="div" variant="body" color="secondary" fontWeight={700}>
                                                                    {name}
                                                                </Typography>
                                                            </Card>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                                            <Card style={{ padding: '60px' }}>
                                                                <Typography mb={0.5} component="div" variant="body" color="black" fontWeight={700}>
                                                                    Ticker
                                                                </Typography>
                                                                <Typography textTransform="uppercase" component="div" variant="body" color="secondary" fontWeight={700}>
                                                                    {ticker}
                                                                </Typography>
                                                            </Card>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                                            <Card style={{ padding: '60px', background: '#f5f5f5' }}>
                                                                <Typography mb={0.5} component="div" variant="body" color="black" fontWeight={700}>
                                                                    Market
                                                                </Typography>
                                                                <Typography textTransform="uppercase" component="div" variant="body" color="secondary" fontWeight={700}>
                                                                    {market}
                                                                </Typography>
                                                            </Card>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                                            <Card style={{ padding: '60px', background: '#f5f5f5' }}>
                                                                <Typography mb={0.5} component="div" variant="body" color="black" fontWeight={700}>
                                                                    Industry
                                                                </Typography>
                                                                <Typography textTransform="uppercase" component="div" variant="body" color="secondary" fontWeight={700}>
                                                                    {industry}
                                                                </Typography>
                                                            </Card>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                                            <Card style={{ padding: '60px' }}>
                                                                <Typography mb={0.5} component="div" variant="body" color="black" fontWeight={700}>
                                                                    Website
                                                                </Typography>
                                                                <Typography component="div" variant="body" color="secondary" fontWeight={700}>
                                                                    {website}
                                                                </Typography>
                                                            </Card>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                                            <Card style={{ padding: '60px' }}>
                                                                <Typography mb={0.5} component="div" variant="body" color="black" fontWeight={700}>
                                                                    Email
                                                                </Typography>
                                                                <Typography component="div" variant="body" color="secondary" fontWeight={700}>
                                                                    {email}
                                                                </Typography>
                                                            </Card>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </TabPanel>

                                            {/* about stops */}

                                            {/* iso starts */}

                                            <TabPanel sx={{ padding: 0 }} value="2">
                                                <Grid item xs={12}>
                                                    <Grid item xs={12} sm={6} md={6} lg={12}>
                                                        <Card style={{ padding: '80px' }}>
                                                            <Box textAlign="center">
                                                                <Tooltip title={`The total number of ${ticker} subscriptions in supply. Each subscription costs $${price} and you can buy with a credit/debit card.`} placement="top">
                                                                    <Typography variant="h2" fontWeight="700" color="black" marginTop={1} marginBottom={1}>
                                                                        {units}
                                                                    </Typography>
                                                                </Tooltip>
                                                            </Box>
                                                            <Box textAlign="center">
                                                                <Typography mb={2} variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                                    Fri, May 25, 2023, 04:45 PM
                                                                </Typography>
                                                                <Link href={`/portfolio/${slug}`}>
                                                                    <Button
                                                                        size="medium"
                                                                        sx={{ color: 'white', textTransform: 'uppercase', fontSize: '12px' }}
                                                                        variant="contained"
                                                                        fullWidth={false}
                                                                    >
                                                                        buy {ticker}
                                                                    </Button>
                                                                </Link>
                                                            </Box>
                                                        </Card>
                                                    </Grid>
                                                </Grid>
                                            </TabPanel>

                                            {/* iso stops */}

                                            {/* market starts */}

                                            <TabPanel sx={{ padding: 0 }} value="3">
                                                <Grid item xs={12}>
                                                    <Grid container spacing={1}>
                                                        {companies && companies.slice(0, 1).map(({ _id, companyKpi }) => (
                                                            <>
                                                                {companyKpi && companyKpi.slice(0, 1).map(({ _id, companyNow }) => (
                                                                    <>
                                                                        {companyNow && companyNow.slice(0, 1).map(({ _id, companyCapitalization, companyVolume, companyPrice, companyPercentChange, companyPointChange, companyActiveCustomers, companyIsRecordedAt }) => (
                                                                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                                                                <Card style={{ padding: '60px', textAlign: 'center' }}>
                                                                                    <Tooltip title="The total number of customers of this subscription is the number of all customers with the subscription." placement="top">
                                                                                        <InfoRoundedIcon sx={{ color: '#2ed573' }} />
                                                                                    </Tooltip>
                                                                                    <Typography my={0.5} component="div" variant="h3" color="black" fontWeight={700}>
                                                                                        {companyActiveCustomers}
                                                                                    </Typography>
                                                                                    <Typography textTransform="uppercase" variant="body2" color="secondary" fontWeight={700}>
                                                                                        Total Customers
                                                                                    </Typography>
                                                                                </Card>
                                                                            </Grid>
                                                                        ))}
                                                                    </>
                                                                ))}
                                                            </>
                                                        ))}
                                                        {companies && companies.slice(0, 1).map(({ _id, companyKpi }) => (
                                                            <>
                                                                {companyKpi && companyKpi.slice(0, 1).map(({ _id, companyNow }) => (
                                                                    <>
                                                                        {companyNow && companyNow.slice(0, 1).map(({ _id, companyCapitalization, companyVolume, companyPrice, companyPercentChange, companyPointChange, companyActiveCustomers, companyIsRecordedAt }) => (
                                                                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                                                                <Card style={{ padding: '60px', textAlign: 'center' }}>
                                                                                    <Tooltip title="The current price of this subscription is the last price at which the buy/pull and sell/push request are executed." placement="top">
                                                                                        <InfoRoundedIcon sx={{ color: '#2ed573' }} />
                                                                                    </Tooltip>
                                                                                    <Typography my={0.5} component="div" variant="h3" color="black" fontWeight={700}>
                                                                                        {companyPrice}
                                                                                    </Typography>
                                                                                    <Typography textTransform="uppercase" variant="body2" color="secondary" fontWeight={700}>
                                                                                        Current Price
                                                                                    </Typography>
                                                                                </Card>
                                                                            </Grid>
                                                                        ))}
                                                                    </>
                                                                ))}
                                                            </>
                                                        ))}
                                                        {companies && companies.slice(0, 1).map(({ _id, companyKpi }) => (
                                                            <>
                                                                {companyKpi && companyKpi.slice(0, 1).map(({ _id, companyNow }) => (
                                                                    <>
                                                                        {companyNow && companyNow.slice(0, 1).map(({ _id, companyCapitalization, companyVolume, companyPrice, companyPercentChange, companyPointChange, companyActiveCustomers, companyIsRecordedAt }) => (
                                                                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                                                                <Card style={{ padding: '60px', textAlign: 'center', background: '#f5f5f5' }}>
                                                                                    <Tooltip title="The percent change of this subscription is calculated as the difference between the price 24 hours and 48 hours ago." placement="top">
                                                                                        <InfoRoundedIcon sx={{ color: '#2ed573' }} />
                                                                                    </Tooltip>
                                                                                    <Typography my={0.5} component="div" variant="h3" color="black" fontWeight={700}>
                                                                                        {companyPercentChange}
                                                                                    </Typography>
                                                                                    <Typography textTransform="uppercase" variant="body2" color="secondary" fontWeight={700}>
                                                                                        Percent Change
                                                                                    </Typography>
                                                                                </Card>
                                                                            </Grid>
                                                                        ))}
                                                                    </>
                                                                ))}
                                                            </>
                                                        ))}
                                                        {companies && companies.slice(0, 1).map(({ _id, companyKpi }) => (
                                                            <>
                                                                {companyKpi && companyKpi.slice(0, 1).map(({ _id, companyNow }) => (
                                                                    <>
                                                                        {companyNow && companyNow.slice(0, 1).map(({ _id, companyCapitalization, companyVolume, companyPrice, companyPercentChange, companyPointChange, companyActiveCustomers, companyIsRecordedAt }) => (
                                                                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                                                                <Card style={{ padding: '60px', textAlign: 'center', background: '#f5f5f5' }}>
                                                                                    <Tooltip title="The point change of this subscription is calculated as the difference between the price 24 hours and 48 hours ago." placement="top">
                                                                                        <InfoRoundedIcon sx={{ color: '#2ed573' }} />
                                                                                    </Tooltip>
                                                                                    <Typography my={0.5} component="div" variant="h3" color="black" fontWeight={700}>
                                                                                        {companyPointChange}
                                                                                    </Typography>
                                                                                    <Typography textTransform="uppercase" variant="body2" color="secondary" fontWeight={700}>
                                                                                        Point Change
                                                                                    </Typography>
                                                                                </Card>
                                                                            </Grid>
                                                                        ))}
                                                                    </>
                                                                ))}
                                                            </>
                                                        ))}
                                                        {companies && companies.slice(0, 1).map(({ _id, companyKpi }) => (
                                                            <>
                                                                {companyKpi && companyKpi.slice(0, 1).map(({ _id, companyNow }) => (
                                                                    <>
                                                                        {companyNow && companyNow.slice(0, 1).map(({ _id, companyCapitalization, companyVolume, companyPrice, companyPercentChange, companyPointChange, companyActiveCustomers, companyIsRecordedAt }) => (
                                                                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                                                                <Card style={{ padding: '60px', textAlign: 'center' }}>
                                                                                    <Tooltip title="The market cap of this subscription is calculated as the total subscriptions in supply multiplied by the current price." placement="top">
                                                                                        <InfoRoundedIcon sx={{ color: '#2ed573' }} />
                                                                                    </Tooltip>
                                                                                    <Typography my={0.5} component="div" variant="h3" color="black" fontWeight={700}>
                                                                                        {companyCapitalization}
                                                                                    </Typography>
                                                                                    <Typography textTransform="uppercase" variant="body2" color="secondary" fontWeight={700}>
                                                                                        Market Capitalization
                                                                                    </Typography>
                                                                                </Card>
                                                                            </Grid>
                                                                        ))}
                                                                    </>
                                                                ))}
                                                            </>
                                                        ))}
                                                        {companies && companies.slice(0, 1).map(({ _id, companyKpi }) => (
                                                            <>
                                                                {companyKpi && companyKpi.slice(0, 1).map(({ _id, companyNow }) => (
                                                                    <>
                                                                        {companyNow && companyNow.slice(0, 1).map(({ _id, companyCapitalization, companyVolume, companyPrice, companyPercentChange, companyPointChange, companyActiveCustomers, companyIsRecordedAt }) => (
                                                                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                                                                <Card style={{ padding: '60px', textAlign: 'center' }}>
                                                                                    <Tooltip title="The trading volume of this subscription is calculated as the total number of subscriptions traded in the past 24hrs." placement="top">
                                                                                        <InfoRoundedIcon sx={{ color: '#2ed573' }} />
                                                                                    </Tooltip>
                                                                                    <Typography my={0.5} component="div" variant="h3" color="black" fontWeight={700}>
                                                                                        {companyVolume}
                                                                                    </Typography>
                                                                                    <Typography textTransform="uppercase" variant="body2" color="secondary" fontWeight={700}>
                                                                                        Trading Volume
                                                                                    </Typography>
                                                                                </Card>
                                                                            </Grid>
                                                                        ))}
                                                                    </>
                                                                ))}
                                                            </>
                                                        ))}
                                                    </Grid>
                                                </Grid>
                                            </TabPanel>

                                            {/* market stops */}

                                            {/* faq starts */}

                                            <TabPanel sx={{ padding: 0 }} value="4">
                                                {companies && companies.slice(0, 1).map(({ _id, companyKpi }) => (
                                                    <>
                                                        {companyKpi && companyKpi.slice(0, 1).map(({ _id, companyNow }) => (
                                                            <>
                                                                {companyNow && companyNow.slice(0, 1).map(({ _id, companyCapitalization, companyVolume, companyPrice, companyPercentChange, companyPointChange, companyActiveCustomers, companyIsRecordedAt }) => (
                                                                    <Grid item xs={12}>
                                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                                            <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                                                What is {ticker}?
                                                                            </Typography>
                                                                            <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                                                {ticker} is a unique ticker symbol that is used to quickly identify and represent the subscriptions of {name} on Qarrington.
                                                                            </Typography>
                                                                        </Card>
                                                                        <Card style={{ padding: '60px', marginBottom: '10px', background: '#f5f5f5' }}>
                                                                            <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                                                How to buy/sell {ticker}?
                                                                            </Typography>
                                                                            <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                                                First, you can buy {ticker} with your credit/debit card. Similarly, you can sell {ticker} and receive the payouts to your connected bank account.
                                                                            </Typography>
                                                                        </Card>
                                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                                            <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                                                When to buy/sell {ticker}?
                                                                            </Typography>
                                                                            <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                                                Fundamentally, there's no specific date, time, or period to buy or sell {ticker}. You can buy {ticker} with your credit/debit card at any given time.
                                                                            </Typography>
                                                                        </Card>
                                                                        <Card style={{ padding: '60px', marginBottom: '10px', background: '#f5f5f5' }}>
                                                                            <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                                                Why should I buy {ticker}?
                                                                            </Typography>
                                                                            <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                                                When you buy {ticker}, you can use a portion of it to access the products and services provided by {ticker}. In addition to that, you can sell a portion of your {ticker} subscriptions to potential {ticker} customers.
                                                                            </Typography>
                                                                        </Card>
                                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                                            <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                                                Where to buy/sell {ticker}?
                                                                            </Typography>
                                                                            <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                                                Qarrington is the first and largest subscription exchange that allows you to buy/sell {ticker} and the subscriptions of several technology companies. Buy with a credit/debit and sell to your bank account.
                                                                            </Typography>
                                                                        </Card>
                                                                        <Card style={{ padding: '60px', marginBottom: '10px', background: '#f5f5f5' }}>
                                                                            <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                                                How to earn {ticker}?
                                                                            </Typography>
                                                                            <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                                                When you refer a verified friend or a family member with at least $100 worth of subscriptions in their account portfolio, Qarrington will reward you with 1 {ticker} and compensate your friend with 1 {ticker}.
                                                                            </Typography>
                                                                        </Card>
                                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                                            <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                                                How to use {ticker}?
                                                                            </Typography>
                                                                            <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                                                If you have {ticker} in your subscription portfolio, you can use a portion to access the products and services provided by the company.
                                                                            </Typography>
                                                                        </Card>
                                                                        <Card style={{ padding: '60px', marginBottom: '10px', background: '#f5f5f5' }}>
                                                                            <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                                                How is {ticker} price determined?
                                                                            </Typography>
                                                                            <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                                                Technically, the current price of {ticker} is calculated as the price at which the most recent buy/pull and sell/push request is executed.
                                                                            </Typography>
                                                                        </Card>
                                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                                            <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                                                What is {ticker} price?
                                                                            </Typography>
                                                                            <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                                                The current price of {ticker} is ${companyPrice}. While this figure was updated on Fri, May 22, 2023, at 7:45 PM, the next update is in 5 seconds.
                                                                            </Typography>
                                                                        </Card>
                                                                        <Card style={{ padding: '60px', marginBottom: '10px', background: '#f5f5f5' }}>
                                                                            <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                                                What is {ticker} capitalization?
                                                                            </Typography>
                                                                            <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                                                The current capitalization of {ticker} is ${companyCapitalization}. It was updated on Fri, May 22, 2023, at 7:45 PM and will be updated in 5 seconds.
                                                                            </Typography>
                                                                        </Card>
                                                                    </Grid>
                                                                ))}
                                                            </>
                                                        ))}
                                                    </>
                                                ))}
                                            </TabPanel>

                                            {/* faq stops */}

                                            {/* founder starts */}

                                            <TabPanel sx={{ padding: 0 }} value="5">
                                                <Grid item xs={12} sm={6} md={6} lg={12}>
                                                    <Card style={{ padding: '80px' }}>
                                                        <Box style={{ textAlign: 'center' }}>
                                                            <Box component="label" display="flex" justifyContent="center">
                                                                {accounts && accounts.slice(0, 1).map(({ _id, accountPersonal, accountStatus }) => (
                                                                    <StyledBadge
                                                                        key={_id}
                                                                        overlap="circular"
                                                                        anchorOrigin={{
                                                                            vertical: 'bottom',
                                                                            horizontal: 'right'
                                                                        }}
                                                                        variant={accountStatus.accountIsActive}
                                                                    >
                                                                        {accounts && accounts.slice(0, 1).map(({ _id, accountProfile }) => (
                                                                            <Avatar
                                                                                style={{ width: 65, height: 65 }}
                                                                                alt={accountPersonal.accountFirstName}
                                                                                src={accountProfile.accountAvatarUrl}
                                                                            />
                                                                        ))}
                                                                    </StyledBadge>
                                                                ))}
                                                            </Box>
                                                            {accounts && accounts.slice(0, 1).map(({ _id, accountPersonal, accountContact }) => (
                                                                <>
                                                                    <Box mt={1.5} key={_id}>
                                                                        <Typography mr={1} component="span" variant="h4" fontWeight="500" color="black">{accountPersonal.accountFirstName}</Typography>
                                                                        <Typography component="span" variant="h4" fontWeight="700" color="black">{accountPersonal.accountLastName}</Typography>
                                                                    </Box>
                                                                    <Box mt={-0.5} mb={1.2}>
                                                                        <Typography component="span" textTransform="uppercase" variant="body2" color="secondary" fontWeight={700}>
                                                                            {accountContact.accountCityName}
                                                                        </Typography>
                                                                        <Typography component="span" mr={0.5} variant="h4" fontWeight="500" color="secondary">,</Typography>
                                                                        <Typography component="span" textTransform="uppercase" variant="body2" color="secondary" fontWeight={700}>
                                                                            {accountContact.accountStateName}
                                                                        </Typography>
                                                                    </Box>
                                                                </>
                                                            ))}
                                                            <Link href={`/portfolio/${slug}`}>
                                                                <Button
                                                                    size="medium"
                                                                    sx={{ color: 'white', textTransform: 'uppercase', fontSize: '12px' }}
                                                                    variant="contained"
                                                                    fullWidth={false}
                                                                >
                                                                    buy {ticker}
                                                                </Button>
                                                            </Link>
                                                        </Box>
                                                    </Card>
                                                </Grid>
                                            </TabPanel>

                                            {/* founder stops */}

                                        </Box>

                                    </TabContext>

                                    {/* tab stops */}

                                    <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <Typography variant="body2">
                                            When you open a Qarrington account, a secretKey will automatically be generated for the account. Although you can always change your accessKey, once your secretKey is generated, you will not be able to change it later. For this reason, you're required to copy your secretKey somewhere safe. It's called a secretKey because it's the sole of your account and it must not be shared with anyone.
                                        </Typography>
                                    </Box>

                                </form>

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Buy />
                    </Grid>

                </Grid>
                <Footer />
            </Container>

        </div>

    )
}

export default Page

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const PeriodItem = {
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontWeight: '700',
    '&:hover': {
        color: '#c5c5c5'
    }
};

const DomainItem = {
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontWeight: '600',
    '&:hover': {
        color: '#000'
    }
};

const Data2Item = {
    fontWeight: '600',
    fontSize: '18px',
    marginRight: '4px'
};

const Data2Helper = {
    fontWeight: '600',
    fontSize: '10px',
    marginRight: '8px',
    textTransform: 'uppercase'
};

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
        const results = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies?companySlug=${params.subscriptionId.replace(/\-/g, '+')}`)
            .then((r) => r.json());
        return {
            props: {
                slug: results.companySlug,
                ticker: results.companyListing.companyTicker,
                name: results.companyListing.companyName,
                logo: results.companyListing.companyLogo,
                headline: results.companyListing.companyHeadline,
                product: results.companyListing.companyProduct,
                description: results.companyListing.companyDescription,
                industry: results.companyListing.companyIndustry,
                market: results.companyListing.companyMarket,
                website: results.companyListing.companyWebsite,
                email: results.companyListing.companyEmail,
                units: results.companyIso.companyIsoUnits,
                price: results.companyIso.companyIsoPrice,
                date: results.companyIso.companyIsoDate,
                time: results.companyIso.companyIsoTime
            }
        };
    } catch (error) {
        return {
            notFound: true
        };
    }
}

const cubes = [
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 300
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 600
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 200
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 100
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 800
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 500
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 300
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 600
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 200
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 100
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 800
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 500
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 300
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 600
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 200
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 100
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 800
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 500
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 100
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 800
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 500
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 300
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 600
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 200
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 100
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 800
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 100
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 800
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 500
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 300
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 600
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 200
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 100
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 800
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 100
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 800
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 500
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 300
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 600
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 200
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 100
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 800
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 100
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 800
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 500
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 300
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 600
    },
    {
        date: "Fri, May 22, 2023, 7:45 PM",
        price: "20",
        variant: 200
    }
]

const faqs = [
    {
        title: "hddh",
        detail: "ssksks"
    },
    {
        title: "hddh",
        detail: "ssksks"
    },
    {
        title: "hddh",
        detail: "ssksks"
    },
    {
        title: "hddh",
        detail: "ssksks"
    },
    {
        title: "hddh",
        detail: "ssksks"
    },
    {
        title: "hddh",
        detail: "ssksks"
    },
    {
        title: "hddh",
        detail: "ssksks"
    },
    {
        title: "hddh",
        detail: "ssksks"
    },
    {
        title: "hddh",
        detail: "ssksks"
    },
    {
        title: "hddh",
        detail: "ssksks"
    }
]