import React, { useState } from "react";
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { green } from '@mui/material/colors';
import Carousel from 'react-material-ui-carousel';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { Avatar, Badge, Box, Button, Card, Container, Grid, Hidden, Stack, styled, TextField, Tooltip, Typography } from '@mui/material';
import useSWR from 'swr';

const Page = ({ name, ticker, description, logo }) => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data: stories } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/stories`, fetcher);
  const { data: guides } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/guides`, fetcher);
  const { data: companies } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies`, fetcher);

  const getSteps = () => {
    return [
      "card number",
      "card name",
      "card cvc",
      "card country",
      "expiry month",
      "expiry year",
      "email address",
    ];
  }

  const getStepContent = (step) => {
    switch (step) {

      case 0:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="card number" placement="top">
              <TextField
                sx={{ input: { textAlign: "center", textTransform: "lowercase" } }}
                required
                placeholder="card number"
                type="number"
              />
            </Tooltip>
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="card name" placement="top">
              <TextField
                sx={{ input: { textAlign: "center", textTransform: "lowercase" } }}
                required
                placeholder="card name"
              />
            </Tooltip>
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="card cvc" placement="top">
              <TextField
                sx={{ input: { textAlign: "center", textTransform: "lowercase" } }}
                required
                placeholder="card cvc"
                type="number"
              />
            </Tooltip>
          </Stack>
        );

      case 3:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="card country" placement="top">
              <TextField
                sx={{ input: { textAlign: "center", textTransform: "lowercase" } }}
                required
                placeholder="card country"
              />
            </Tooltip>
          </Stack>
        );

      case 4:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="expiry month" placement="top">
              <TextField
                sx={{ input: { textAlign: "center", textTransform: "lowercase" } }}
                required
                placeholder="expiry month"
                type="number"
              />
            </Tooltip>
          </Stack>
        );

      case 5:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="expiry year" placement="top">
              <TextField
                sx={{ input: { textAlign: "center", textTransform: "lowercase" } }}
                required
                placeholder="expiry year"
                type="number"
              />
            </Tooltip>
          </Stack>
        );

      case 6:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="email address" placement="top">
              <TextField
                sx={{ input: { textAlign: "center", textTransform: "lowercase" } }}
                required
                placeholder="email address"
              />
            </Tooltip>
          </Stack>
        );

      default:
        return "unknown step";
    }
  }

  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (

    <>

      <Head>
        <title>Hi {ticker} • Qarrington</title>
        <meta
          name="description"
          content="Qarrington is a subscription exchange that lets you buy and sell the subscriptions of your favorite technology companies with lower fees. Register without email!"
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
                  <Link href="/">
                    <Avatar
                      style={{ width: 40, height: 40 }}
                      alt={name}
                      src={logo}
                    />
                  </Link>
                </Box>

                <Typography fontSize="42px" fontWeight="700" lineHeight="50px" component="div" sx={{ my: 1 }}>
                  Buy {ticker} either with your credit or debit card
                  <Tooltip title="As a customer, subscriptions give you access to a company's products, they don't represent investments in the firm." placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  When you buy {ticker} subscriptions, you will be able to access {name}'s products and services with your subscription units. Kindly note that each unit represents a month of access.
                </Typography>

              </Box>

              <form noValidate autoComplete="on">

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>

                  <Stack spacing={1.2} sx={{ width: '100%' }}>

                    {activeStep === steps.length ? (
                      <Stack spacing={1.2} sx={{ width: '100%', mb: 0 }}>

                        <Link href="/help">
                          <Button
                            size="large"
                            sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                            variant="outlined"
                            fullWidth={true}
                          >
                            get some help
                          </Button>
                        </Link>

                        {companies && companies.slice(0, 1).map(({ _id, companyTicker }) => (
                          <Link key={_id} href={`/subscriptions/${companyTicker}`}>
                            <Button
                              size="large"
                              sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                              variant="contained"
                              fullWidth={true}
                            >
                              track portfolio
                            </Button>
                          </Link>
                        ))}

                        <Button
                          style={FormButton}
                          disabled
                          color="secondary"
                          sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                        >
                          done
                        </Button>

                      </Stack>
                    ) : (
                      <>
                        <form>{getStepContent(activeStep)}</form>
                        <Button
                          size="large"
                          sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                          variant="contained"
                          color="secondary"
                          fullWidth={true}
                          onClick={handleNext}
                        >
                          {activeStep === steps.length - 1 ? "Pay" : "Next"}
                        </Button>
                        <Button
                          style={FormButton}
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          color="secondary"
                          sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                        >
                          Back
                        </Button>
                      </>
                    )}

                  </Stack>

                </Box>

                <Box textAlign="center">
                  <Typography variant="body2" mt={1} component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                    * An Initial Subscription Offering (ISO) is the process of listing a SaaS company on a subscription exchange so the company can advance its subscriptions to customers.
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
                    {stories && stories.map(({ _id, storyByCustomer }) => (
                      <>
                        <Carousel>
                          {storyByCustomer && storyByCustomer.map(({ _id, storyByCustomerName, storyByCustomerTitle, storyByCustomerAvatar, storyByCustomerContent, storyByCustomerIsActive }) => (
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
                                  variant={storyByCustomerIsActive}
                                >
                                  <Avatar
                                    style={{ width: 80, height: 80 }}
                                    alt={storyByCustomerName}
                                    src={storyByCustomerAvatar}
                                  />
                                </StyledBadge>
                              </Box>
                              <Box marginTop="16px">
                                <Typography variant="h5" component="div" fontWeight="600" gutterBottom>{storyByCustomerName}</Typography>
                                <Typography variant="body" component="div" gutterBottom>{storyByCustomerTitle}</Typography>
                                <Typography variant="h5" component="div" fontWeight="600">{storyByCustomerContent}</Typography>
                              </Box>
                            </Box>
                          ))}
                        </Carousel>
                      </>
                    ))}
                  </Box>

                  <Grid item xs={12} mt={2}>
                    <Grid container spacing={1}>
                      {guides && guides.map(({ _id, guideForCustomer }) => (
                        <>
                          {guideForCustomer && guideForCustomer.map(({ _id, guideForCustomerIcon, guideForCustomerTitle, guideForCustomerContent, guideForCustomerTooltip }) => (
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
                    It's easy to buy subscriptions either with a credit/debit card or through a bank transfer. Once your payment is confirmed, your portfolio will be updated within seconds.
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

const FormButton = {
  "&:hover": {
    color: 'white',
    backgroundColor: '#f5f5f5'
  },
};

const AccountButton = {
  fontWeight: '800',
  fontSize: '12px',
  padding: '20px 40px 20px 40px',
  textTransform: 'uppercase',
  backgroundColor: 'white',
  color: '#2f3542',
  '&:hover': {
    backgroundColor: '#ffffff90'
  }
};

const LinkItem = {
  fontWeight: '700',
  fontSize: '12px',
  marginX: '4px',
  textTransform: 'uppercase',
  '&:hover': {
    color: '#000',
    backgroundColor: 'transparent'
  }
};

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

export async function getServerSideProps({ params }) {
  try {
    const results = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies?companyTicker=${params.companyId.replace(/\-/g, '+')}`)
      .then((r) => r.json());
    return {
      props: {
        name: results.companyDetails.companyName,
        ticker: results.companyTicker,
        description: results.companyDetails.companyDescription,
        logo: results.companyDetails.companyLogo
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}