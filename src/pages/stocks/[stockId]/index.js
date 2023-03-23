import React, { useState } from "react";
import Link from 'next/link';
import Head from 'next/head';
import Carousel from 'react-material-ui-carousel';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Badge, Box, Breadcrumbs, Button, Card, Container, Grid, Hidden, Stack, styled, Tooltip, Typography } from '@mui/material';
import useSWR from 'swr';

const Page = ({ name, ticker }) => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data: guides } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/guides`, fetcher);

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <>

      <Head>
        <title>
          How Subscriptions Can Outrun {ticker} Stock • Qarrington
        </title>
        <meta
          name="description"
          content={`Buy and sell the subscriptions of innovative startup companies. It's like buying ${ticker} stock, but instead of shares, it's product-backed subscriptions.`}
        />
      </Head>

      <MainContent style={Body}>

        <Grid
          container
          sx={{ height: '100%' }}
          alignItems="stretch"
          spacing={0}
        >

          {/* left container starts */}

          <Grid
            xs={12}
            md={6}
            alignItems="center"
            display="flex"
            justifyContent="center"
            item
          >
            <Container maxWidth="sm">

              <Box style={{ textAlign: 'center' }}>

                <Box
                  style={{
                    display: 'flex',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    justifyContent: 'center'
                  }}
                >
                  <Avatar
                    style={{ width: 40, height: 40 }}
                    alt="Qarrington Logo"
                    src="/assets/media/companies/qarrington.png"
                  />
                </Box>

                <Typography fontSize="42px" fontWeight="700" lineHeight="50px" component="div" sx={{ my: 1 }}>
                  How subscriptions can outrun {ticker} stock
                  <Tooltip title="Subscriptions only give you access to a company's products and services, they don't represent investments in the firm." placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  We're building a subscription exchange, where you can buy & sell the subscriptions of startup companies. It's like buying {ticker} stock, but instead of shares, it's product-backed subscriptions.
                </Typography>

              </Box>

              <form noValidate autoComplete="on">

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>

                  <Stack spacing={1.2} sx={{ width: '100%' }}>

                    <Link href="/account/access">
                      <Button
                        size="large"
                        sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                        variant="outlined"
                        fullWidth={true}
                      >
                        i'm a qarrington
                      </Button>
                    </Link>

                    <Link href="/account/open">
                      <Button
                        size="large"
                        sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                        variant="contained"
                        fullWidth={true}
                      >
                        i'm not a qarrington yet
                      </Button>
                    </Link>

                  </Stack>

                </Box>

                <Breadcrumbs separator="/" aria-label="breadcrumb"
                  sx={{
                    "& ol": {
                      justifyContent: "center",
                      margin: "auto",
                      mt: "20px"
                    }
                  }}>
                  <Typography variant="body2" fontWeight={700} color="secondary">
                    lower fees
                  </Typography>
                  <Typography variant="body2" fontWeight={700} color="secondary">
                    global coverage
                  </Typography>
                  <Typography variant="body2" fontWeight={700} color="secondary">
                    fewer risks
                  </Typography>

                </Breadcrumbs>

                <Box textAlign="center">
                  <Typography variant="body2" mt={1} component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                    Once {ticker} you log in to your account, kindly provide all the necessary account details and contacts for smooth payouts. Otherwise, your future payouts might be delayed.
                  </Typography>
                </Box>

              </form>

            </Container>
          </Grid>

          {/* left container ends */}

          {/* right container starts */}

          <Hidden mdDown>
            <GridWrapper
              xs={12}
              md={6}
              alignItems="center"
              display="flex"
              justifyContent="center"
              item
            >

              <Container maxWidth="sm">

                {/* tab starts */}

                <Box style={{ marginBottom: '0px', marginTop: '16px' }}>

                  {/* founder tab starts */}

                  <Box textAlign="center" mb={2}>
                    
                        <Carousel>
                          {stories && Array.isArray(stories) && stories?.map(({ _id, storyByInvestorName, storyByInvestorTitle, storyByInvestorAvatar, storyByInvestorContent, storyByInvestorIsActive }) => (
                            <Box key={_id}>
                              <Box
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center'
                                }}
                              >
                                <StyledBadge
                                  overlap="circular"
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                  }}
                                  variant={storyByInvestorIsActive}
                                >
                                  <Avatar
                                    style={{ width: 80, height: 80 }}
                                    alt={storyByInvestorName}
                                    src={storyByInvestorAvatar}
                                  />
                                </StyledBadge>
                              </Box>
                              <Box marginTop="16px">
                                <Typography variant="h5" component="div" fontWeight="600" gutterBottom>{storyByInvestorName}</Typography>
                                <Typography variant="body" component="div" gutterBottom>{storyByInvestorTitle}</Typography>
                                <Typography variant="h5" component="div" fontWeight="600">{storyByInvestorContent}</Typography>
                              </Box>
                            </Box>
                          ))}
                        </Carousel>
                      
                  </Box>

                  <Grid item xs={12} mt={2}>
                    <Grid container spacing={1}>
                      {guides && Array.isArray(guides) && guides?.map(({ _id, guideForCustomer }) => (
                        <>
                          {guideForCustomer && Array.isArray(guideForCustomer) && guideForCustomer?.map(({ _id, guideForCustomerIcon, guideForCustomerTitle, guideForCustomerContent, guideForCustomerTooltip }) => (
                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                              <Tooltip title={guideForCustomerTooltip} placement="top">
                                <Card style={{ padding: '22px' }}>
                                  <Box
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'center'
                                    }}
                                  >
                                    <Badge
                                      overlap="circular"
                                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                      badgeContent={
                                        <InfoRoundedIcon fontSize="small" color="primary" />
                                      }
                                    >
                                      <Avatar
                                        style={{ width: 50, height: 50 }}
                                        alt={guideForCustomerTitle}
                                        src={guideForCustomerIcon}
                                      />
                                    </Badge>
                                  </Box>
                                  <Box style={{ textAlign: 'center' }}>
                                    <Box mt={1.2}>
                                      <Typography variant="h6" fontWeight={700} color="black" textTransform="uppercase">
                                        {guideForCustomerTitle}
                                      </Typography>
                                      <Typography mt={0.2} variant="body2" fontWeight={600} color="secondary">
                                        {guideForCustomerContent}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Card>
                              </Tooltip>
                            </Grid>
                          ))}
                        </>
                      ))}
                    </Grid>
                  </Grid>

                  {/* founder tab ends */}

                </Box>

                <Box textAlign="center" mt={2}>
                  <Typography component="span" variant="body2" fontWeight={600} color="black">
                    An Initial Subscription Offering or ISO allows you to buy the subscriptions of innovative early-stage startup companies before they're listed on a subscription exchange.
                  </Typography>
                </Box>

                {/* tab stops */}

              </Container>

            </GridWrapper>

          </Hidden>

          {/* right container ends */}

        </Grid>
      </MainContent>

    </>

  );

}

export default Page;

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

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors.gradients.green2};
`
);

const Body = {
  backgroundColor: "#ffffff"
};

export async function getStaticProps({ params }) {
  const stockItem = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stocks?stockUrl=${params.stockId}`).then(r => r.json());
  return {
    props: {
      name: stockItem.stockName,
      ticker: stockItem.stockTicker
    }
  }
}

export async function getStaticPaths() {
  const stockItems = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stocks?stockUrl`).then((r) => r.json());
  return {
    paths: stockItems.map(item => {
      const stockId = item.stockUrl;
      return {
        params: {
          stockId
        }
      }
    }),
    fallback: false
  }
}

const stories = [
  {
    storyByInvestorName: "Galia",
    storyByInvestorTitle: "Partner @ Brake Capital",
    storyByInvestorAvatar: "/assets/media/underwriters/galia.webp",
    storyByInvestorContent: "At the NASDAQ, the lack of exits and interest from LPs are the major dilemmas faced by many startup incubators and accelerators. Well then ... a subscription exchange is born.",
    storyByInvestorIsActive: "dot"
  },
  {
    storyByInvestorName: "Fabian",
    storyByInvestorTitle: "Partner @ French Tech Visa",
    storyByInvestorAvatar: "/assets/media/underwriters/fabian.webp",
    storyByInvestorContent: "Working with Qarrington in today's global economic downturn has been an absolute game-changer for the startups we back through the French Tech Visa Program.",
    storyByInvestorIsActive: ""
  },
  {
    storyByInvestorName: "Hadar",
    storyByInvestorTitle: "Partner @ Lemonade Funds",
    storyByInvestorAvatar: "/assets/media/underwriters/hadar.webp",
    storyByInvestorContent: "Whether it's a Fund like Lemonade or a venture capital firm like Accel, investing in 100 startups and expecting 1 unicorn exit in 10 years is beyond flawed.",
    storyByInvestorIsActive: "dot"
  },
  {
    storyByInvestorName: "Chris",
    storyByInvestorTitle: "Partner @ Gorilla Ventures",
    storyByInvestorAvatar: "/assets/media/underwriters/chris.webp",
    storyByInvestorContent: "As a startup incubator, making 20 deals to hit ROI with 1 was tough for us. On Qarrington, we've seen the possibility of making 20 deals and hitting ROI from each.",
    storyByInvestorIsActive: "dot"
  },
  {
    storyByInvestorName: "Stephanie",
    storyByInvestorTitle: "Partner @ Chicago Angels",
    storyByInvestorAvatar: "/assets/media/underwriters/stephanie.webp",
    storyByInvestorContent: "At Chicago Angels, the lack of liquidity is often an issue for us, but we're more than happy to be on a subscription exchange like Qarrington; the world's first of its kind.",
    storyByInvestorIsActive: ""
  }
]