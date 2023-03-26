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
import Company from '@models/company/Company';
import dbConnect from '@lib/dbConnect';
import Account from '@models/account/Account';
import { getParseDateNow, parseDateAndTime } from '@helpers/helpers';
import PriceGrid from '@components/cards/PriceGrid';
import { useEffect } from 'react';
import { getCompanyBy } from '@services/companies-services';

const Page = ({ 
        id,
        companySlug, 
        companyTicker, 
        companyName, 
        companyProduct, 
        companyDescription, 
        companyIndustry, 
        companyMarket, 
        companyWebsite, 
        companyEmail, 
        companyIsoUnits, 
        companyIsoPrice, 
        accountFirstName,
        accountAvatarUrl,
        accountLastName,
        accountCityName,
        accountStateName,
        accountIsActive,
        companyIsoDate,
        companyIsoTime,
        companyActiveCustomers,
        companyPrice,
        companyPercentChange,
        companyPointChange,
        companyCapitalization,
        companyVolume,
        companyKpi
    }) => {

    const [value, setValue] = useState('3');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [unit, setUnit] = useState(0);
    // const handleIncrease = () => {
    //     setUnit(unit + 12)
    // }
    // const handleDecrease = () => {
    //     if (unit > 0)
    //         setUnit(unit - 12);
    // }

    return (

        <div>

            <Head>
                <title>{companyName} ({companyTicker}) Subscriptions • Qarrington</title>
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
                                            <PriceGrid id={id} kpi={companyKpi} />
                                            {/* <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                {companies && Array.isArray(companies) && companies?.slice(0, 1).map(({ _id, companyKpi }) => (
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
                                                            <Tooltip key={_id} title={date} placement="top">
                                                                <Grid item xs={12} sm={6} md={6} lg={1} mb={0}>
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

                                            </Card> */}
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
                                                            What is {companyName}?
                                                        </Typography>
                                                        <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                            {companyDescription}
                                                        </Typography>
                                                    </Card>
                                                    <Card style={{ padding: '60px', marginBottom: '10px', background: '#f5f5f5' }}>
                                                        <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                            What does {companyName} do?
                                                        </Typography>
                                                        <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                            {companyProduct}
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
                                                                    {companyName}
                                                                </Typography>
                                                            </Card>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                                            <Card style={{ padding: '60px' }}>
                                                                <Typography mb={0.5} component="div" variant="body" color="black" fontWeight={700}>
                                                                    Ticker
                                                                </Typography>
                                                                <Typography textTransform="uppercase" component="div" variant="body" color="secondary" fontWeight={700}>
                                                                    {companyTicker}
                                                                </Typography>
                                                            </Card>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                                            <Card style={{ padding: '60px', background: '#f5f5f5' }}>
                                                                <Typography mb={0.5} component="div" variant="body" color="black" fontWeight={700}>
                                                                    Market
                                                                </Typography>
                                                                <Typography textTransform="uppercase" component="div" variant="body" color="secondary" fontWeight={700}>
                                                                    {companyMarket}
                                                                </Typography>
                                                            </Card>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                                            <Card style={{ padding: '60px', background: '#f5f5f5' }}>
                                                                <Typography mb={0.5} component="div" variant="body" color="black" fontWeight={700}>
                                                                    Industry
                                                                </Typography>
                                                                <Typography textTransform="uppercase" component="div" variant="body" color="secondary" fontWeight={700}>
                                                                    {companyIndustry}
                                                                </Typography>
                                                            </Card>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                                            <Card style={{ padding: '60px' }}>
                                                                <Typography mb={0.5} component="div" variant="body" color="black" fontWeight={700}>
                                                                    Website
                                                                </Typography>
                                                                <Typography component="div" variant="body" color="secondary" fontWeight={700}>
                                                                    {companyWebsite}
                                                                </Typography>
                                                            </Card>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                                            <Card style={{ padding: '60px' }}>
                                                                <Typography mb={0.5} component="div" variant="body" color="black" fontWeight={700}>
                                                                    Email
                                                                </Typography>
                                                                <Typography component="div" variant="body" color="secondary" fontWeight={700}>
                                                                    {companyEmail}
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
                                                                <Tooltip title={`The total number of ${companyTicker} subscriptions in supply. Each subscription costs $${companyIsoPrice} and you can buy with a credit/debit card.`} placement="top">
                                                                    <Typography variant="h2" fontWeight="700" color="black" marginTop={1} marginBottom={1}>
                                                                        {companyIsoUnits}
                                                                    </Typography>
                                                                </Tooltip>
                                                            </Box>
                                                            <Box textAlign="center">
                                                                <Typography mb={2} variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                                    {companyIsoDate}, {companyIsoTime}
                                                                </Typography>
                                                                <Link href={`/portfolio/${companySlug}`}>
                                                                    <Button
                                                                        size="medium"
                                                                        sx={{ color: 'white', textTransform: 'uppercase', fontSize: '12px' }}
                                                                        variant="contained"
                                                                        fullWidth={false}
                                                                    >
                                                                        buy {companyTicker}
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
                                                    </Grid>
                                                </Grid>
                                            </TabPanel>

                                            {/* market stops */}

                                            {/* faq starts */}

                                            <TabPanel sx={{ padding: 0 }} value="4">
                                                <Grid item xs={12}>
                                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                        <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                            What is {companyTicker}?
                                                        </Typography>
                                                        <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                            {companyTicker} is a unique ticker symbol that is used to quickly identify and represent the subscriptions of {companyName} on Qarrington.
                                                        </Typography>
                                                    </Card>
                                                    <Card style={{ padding: '60px', marginBottom: '10px', background: '#f5f5f5' }}>
                                                        <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                            How to buy/sell {companyTicker}?
                                                        </Typography>
                                                        <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                            First, you can buy {companyTicker} with your credit/debit card. Similarly, you can sell {companyTicker} and receive the payouts to your connected bank account.
                                                        </Typography>
                                                    </Card>
                                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                        <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                            When to buy/sell {companyTicker}?
                                                        </Typography>
                                                        <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                            Fundamentally, there's no specific date, time, or period to buy or sell {companyTicker}. You can buy {companyTicker} with your credit/debit card at any given time.
                                                        </Typography>
                                                    </Card>
                                                    <Card style={{ padding: '60px', marginBottom: '10px', background: '#f5f5f5' }}>
                                                        <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                            Why should I buy {companyTicker}?
                                                        </Typography>
                                                        <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                            When you buy {companyTicker}, you can use a portion of it to access the products and services provided by {companyTicker}. In addition to that, you can sell a portion of your {companyTicker} subscriptions to potential {companyTicker} customers.
                                                        </Typography>
                                                    </Card>
                                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                        <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                            Where to buy/sell {companyTicker}?
                                                        </Typography>
                                                        <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                            Qarrington is the first and largest subscription exchange that allows you to buy/sell {companyTicker} and the subscriptions of several technology companies. Buy with a credit/debit and sell to your bank account.
                                                        </Typography>
                                                    </Card>
                                                    <Card style={{ padding: '60px', marginBottom: '10px', background: '#f5f5f5' }}>
                                                        <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                            How to earn {companyTicker}?
                                                        </Typography>
                                                        <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                            When you refer a verified friend or a family member with at least $100 worth of subscriptions in their account portfolio, Qarrington will reward you with 1 {companyTicker} and compensate your friend with 1 {companyTicker}.
                                                        </Typography>
                                                    </Card>
                                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                        <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                            How to use {companyTicker}?
                                                        </Typography>
                                                        <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                            If you have {companyTicker} in your subscription portfolio, you can use a portion to access the products and services provided by the company.
                                                        </Typography>
                                                    </Card>
                                                    <Card style={{ padding: '60px', marginBottom: '10px', background: '#f5f5f5' }}>
                                                        <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                            How is {companyTicker} price determined?
                                                        </Typography>
                                                        <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                            Technically, the current price of {companyTicker} is calculated as the price at which the most recent buy/pull and sell/push request is executed.
                                                        </Typography>
                                                    </Card>
                                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                        <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                            What is {companyTicker} price?
                                                        </Typography>
                                                        <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                            The current price of {companyTicker} is ${companyPrice}. While this figure was updated on {getParseDateNow()}, the next update is in 5 seconds.
                                                        </Typography>
                                                    </Card>
                                                    <Card style={{ padding: '60px', marginBottom: '10px', background: '#f5f5f5' }}>
                                                        <Typography mb={0.8} component="div" variant="h4" color="black" fontWeight={700}>
                                                            What is {companyTicker} capitalization?
                                                        </Typography>
                                                        <Typography component="div" variant="body" color="secondary" fontWeight={500}>
                                                            The current capitalization of {companyTicker} is ${companyCapitalization}. It was updated on {getParseDateNow()} and will be updated in 5 seconds.
                                                        </Typography>
                                                    </Card>
                                                </Grid>
                                            </TabPanel>

                                            {/* faq stops */}

                                            {/* founder starts */}

                                            <TabPanel sx={{ padding: 0 }} value="5">
                                                <Grid item xs={12} sm={6} md={6} lg={12}>
                                                    <Card style={{ padding: '80px' }}>
                                                        <Box style={{ textAlign: 'center' }}>
                                                            <Box component="label" display="flex" justifyContent="center">
                                                                <StyledBadge
                                                                    overlap="circular"
                                                                    anchorOrigin={{
                                                                        vertical: 'bottom',
                                                                        horizontal: 'right'
                                                                    }}
                                                                    variant={accountIsActive && "dot"}
                                                                >
                                                                        <Avatar
                                                                            style={{ width: 65, height: 65 }}
                                                                            alt={accountFirstName}
                                                                            src={accountAvatarUrl}
                                                                        />
                                                                </StyledBadge>
                                                            </Box>
                                                                <>
                                                                    <Box mt={1.5}>
                                                                        <Typography mr={1} component="span" variant="h4" fontWeight="500" color="black">{accountFirstName}</Typography>
                                                                        <Typography component="span" variant="h4" fontWeight="700" color="black">{accountLastName}</Typography>
                                                                    </Box>
                                                                    <Box mt={-0.5} mb={1.2}>
                                                                        <Typography component="span" textTransform="uppercase" variant="body2" color="secondary" fontWeight={700}>
                                                                            {accountCityName}
                                                                        </Typography>
                                                                        <Typography component="span" mr={0.5} variant="h4" fontWeight="500" color="secondary">,</Typography>
                                                                        <Typography component="span" textTransform="uppercase" variant="body2" color="secondary" fontWeight={700}>
                                                                            {accountStateName}
                                                                        </Typography>
                                                                    </Box>
                                                                </>
                                                            <Link href={`/portfolio/${companySlug}`}>
                                                                <Button
                                                                    size="medium"
                                                                    sx={{ color: 'white', textTransform: 'uppercase', fontSize: '12px' }}
                                                                    variant="contained"
                                                                    fullWidth={false}
                                                                >
                                                                    buy {companyTicker}
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
        const { subscriptionId: companySlug } = params
        await dbConnect();
        const company = await Company.findOne({ companySlug });
        const parsedCompany = JSON.parse(JSON.stringify(company));
        
        const account = await Account.findById(company.companyAccountId);
        const parsedAccout = JSON.parse(JSON.stringify(account));
        
        const { companyListing, companyIso, companyKpi, _id: id }= parsedCompany
        const { companyTicker, companyName, companyProduct, companyDescription, companyIndustry, companyMarket, companyWebsite, companyEmail } = companyListing
        const { companyIsoUnits, companyIsoPrice, companyIsoDate, companyIsoTime } = companyIso
        const { companyActiveCustomers, companyPrice, companyCapitalization } = companyKpi.companyNow.data[0]
        const { companyPercentChange, companyPointChange, companyVolume } = companyKpi.companyDay.data[1] ? companyKpi.companyDay.data[1] : companyKpi.companyDay.data[0]



        const accountFirstName = parsedAccout.accountPersonal?.accountFirstName ? parsedAccout.accountPersonal.accountFirstName : "Unknown"
        const accountLastName = parsedAccout.accountPersonal?.accountLastName ? parsedAccout.accountPersonal.accountLastName : "Unknown"
        const accountAvatarUrl = parsedAccout.accountProfile?.accountAvatarUrl ? parsedAccout.accountProfile.accountAvatarUrl : "/assets/media/avatars/famale/000.webp"
        
        const accountCityName = parsedAccout.accountContact?.accountCityName ? parsedAccout.accountContact.accountCityName : "Unknown"
        const accountStateName = parsedAccout.accountContact?.accountStateName ? parsedAccout.accountContact.accountStateName : "Unknown"
        
        const accountIsActive = parsedAccout.accountStatus?.accountIsActive ? parsedAccout.accountStatus?.accountIsActive : false

        return {
            props: {
                id,
                companySlug,
                companyTicker,
                companyName,
                companyProduct,
                companyDescription,
                companyIndustry,
                companyMarket,
                companyWebsite,
                companyEmail,
                companyIsoUnits,
                companyIsoPrice,
                accountFirstName,
                accountLastName,
                accountAvatarUrl,
                accountCityName,
                accountStateName,
                accountIsActive,
                companyIsoDate: companyIsoDate.split('T')[0],
                companyIsoTime,
                companyActiveCustomers,
                companyPrice,
                companyPercentChange,
                companyPointChange,
                companyCapitalization,
                companyVolume,
                companyKpi: companyKpi.companyNow.data
            }
        };
    } catch (error) {
        return {
        notFound: true
        };
    }
}