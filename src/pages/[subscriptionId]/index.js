import React, { useState } from "react";
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Badge, Box, Button, Container, Grid, Hidden, Stack, styled, TextField, Tooltip, Typography } from '@mui/material';
import useSWR from 'swr';

const Page = ({ name, ticker, detail, logo }) => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/accounts`, fetcher);
  const { data: subscriptions } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/subscriptions`, fetcher)

  const getSteps = () => {
    return [
      "Account Key",
    ];
  }

  const getStepContent = (step) => {
    switch (step) {

      case 0:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="Enter or create your unique accountKey to use Qarrington without an email." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="accountKey"
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
        <title>
          Get Whitelisted for the {name} Subscription Launch • Qarrington
        </title>
        <meta
          name="description"
          content={`When you join the whitelist for the ${name} subscription launch, you must add your phone number to your account to receive SMS 24hrs before the launch.`}
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

                <Box sx={{ cursor: 'pointer' }}>
                  <Link href="/">
                    <Image
                      alt="Qarrington Logo"
                      height={32}
                      width={32}
                      src="/assets/media/logos/aa/primary.png"
                    />
                  </Link>
                </Box>

                <Typography fontSize="42px" fontWeight="700" lineHeight="50px" component="div" sx={{ my: 1 }}>
                  Join the {name} subscription whitelist
                  <Tooltip title="Subscriptions only give you access to a company's products and services, they don't represent investments in the firm." placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  {detail}
                </Typography>

              </Box>

              <form noValidate autoComplete="on">

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>

                  <Stack spacing={1.2} sx={{ width: '100%' }}>

                    {activeStep === steps.length ? (
                      <Stack spacing={1.2} sx={{ width: '100%', mb: 0 }}>

                        <Link href="/subscription/list">
                          <Button
                            size="large"
                            sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '13px' }}
                            variant="outlined"
                            fullWidth={true}
                          >
                            i want to fund my business
                          </Button>
                        </Link>

                        <Link href="/">
                          <Button
                            size="large"
                            sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '13px' }}
                            variant="contained"
                            fullWidth={true}
                          >
                            i don't have a business
                          </Button>
                        </Link>

                        <Link href="/account/create">
                          <Button
                            style={FormButton}
                            disabled
                            color="secondary"
                            sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                          >
                            submitted
                          </Button>
                        </Link>

                      </Stack>
                    ) : (
                      <>
                        <form>{getStepContent(activeStep)}</form>
                        <Button
                          size="large"
                          sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '13px' }}
                          variant="contained"
                          fullWidth={true}
                          onClick={handleNext}
                        >
                          {activeStep === steps.length - 1 ? "Done" : "Next"}
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
                    By clicking the above button and submitting the above form, I hereby agree to the Service Terms and Privacy Policies governing my use of the Qarrington website.
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
                <Box textAlign="center">
                  <Carousel>
                    <Box>
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
                          variant="dot"
                        >
                          <Avatar
                            style={{ width: 80, height: 80 }}
                            alt={name}
                            src={logo}
                          />
                        </StyledBadge>
                      </Box>
                      <Box marginTop="16px">
                        <Typography variant="h5" component="div" fontWeight="600" gutterBottom>{name}</Typography>
                        <Typography variant="body" component="div" gutterBottom>{ticker}</Typography>
                        <Typography variant="h4" component="div" fontWeight="600">When you join the whitelist for the {name} subscription launch, you must add your phone number to your account to receive SMS 24hrs before the launch.</Typography>
                      </Box>
                    </Box>
                  </Carousel>
                </Box>
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

export async function getServerSideProps({ params }) {
  try {
    const results = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/subscriptions?subscriptionSlug=${params.subscriptionId.replace(/\-/g, '+')}`)
      .then((r) => r.json());
    return {
      props: {
        name: results.subscriptionListing.listingName,
        ticker: results.subscriptionListing.listingTicker,
        detail: results.subscriptionListing.listingDetail,
        logo: results.subscriptionListing.listingLogo
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}