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

const Page = () => {

  const getSteps = () => {
    return [
      "access key",
      "secret key",
      "contact email",
      "contact number",
      "first name",
    ];
  }

  const getStepContent = (step) => {
    switch (step) {

      case 0:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="hint" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="access key"
              />
            </Tooltip>
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="hint" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="secret key"
              />
            </Tooltip>
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="hint" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="contact email"
              />
            </Tooltip>
          </Stack>
        );

      case 3:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="hint" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="contact number"
              />
            </Tooltip>
          </Stack>
        );

      case 4:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="hint" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="first name"
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
        <title>Create Account • Qarrington</title>
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
                  Cover your expenses with subscriptions
                  <Tooltip title="Subscriptions only give you access to a company's products and services, they don't represent investments in the firm." placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  Qarrington is a subscription exchange, where you can buy and sell the subscriptions of technology companies to cover your expenses. It's like stocks and cryptos, but backed by products.
                </Typography>

              </Box>

              <form noValidate autoComplete="on">

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>

                  <Stack spacing={1.2} sx={{ width: '100%' }}>

                    {activeStep === steps.length ? (
                      <Stack spacing={1.2} sx={{ width: '100%', mb: 0 }}>

                        <Link href="/help">
                          <Tooltip title="When you click this button, you will be redirected to our support route, where you can ask us literally anything." placement="top">
                            <Button
                              size="large"
                              sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                              variant="outlined"
                              fullWidth={true}
                            >
                              talk to the qarringtons
                            </Button>
                          </Tooltip>
                        </Link>

                        <a href="https://stripe.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none' }}>
                          <Tooltip title="When you click on this button, you will be able to check the status of your account using the accountAccessKey." placement="top">
                            <Button
                              size="large"
                              sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                              variant="contained"
                              fullWidth={true}
                            >
                              connect your bank account
                            </Button>
                          </Tooltip>
                        </a>

                        <Button
                          style={FormButton}
                          disabled
                          color="secondary"
                          sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                        >
                          almost done
                        </Button>

                      </Stack>
                    ) : (
                      <>
                        <form>{getStepContent(activeStep)}</form>
                        <Button
                          size="large"
                          sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                          variant="contained"
                          fullWidth={true}
                          onClick={handleNext}
                        >
                          {activeStep === steps.length - 1 ? "Register" : "Next"}
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
                    By clicking on the Register BUTTON or otherwise submitting this FORM, I do hereby agree with the Service Terms and Privacy Policies of the Qarrington website.
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
                <Box textAlign="center" mb={2}>
                  <Carousel>
                    {underwriters && underwriters.map(({ _id, name, title, avatar, content, isActive }) => (
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
                            variant={isActive}
                          >
                            <Avatar
                              style={{ width: 80, height: 80 }}
                              alt={name}
                              src={avatar}
                            />
                          </StyledBadge>
                        </Box>
                        <Box marginTop="16px">
                          <Typography variant="h5" component="div" fontWeight="600" gutterBottom>{name}</Typography>
                          <Typography variant="body" component="div" gutterBottom>{title}</Typography>
                          <Typography variant="h5" component="div" fontWeight="600">{content}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Carousel>
                </Box>

                {/* principles start here */}

                <Grid item xs={12} mt={2}>
                  <Grid container spacing={1}>

                    {principles && principles.map(({ _id, name, image, helper, content }) => (
                      <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                        <Tooltip title={helper} placement="top">
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
                                <Avatar sx={{ bgcolor: green[200] }}>
                                  {image}
                                </Avatar>
                              </Badge>
                            </Box>
                            <Box style={{ textAlign: 'center' }}>
                              <Box mt={1.5}>
                                <Typography variant="h6" fontWeight={700} color="black" textTransform="uppercase">
                                  {name}
                                </Typography>
                                <Typography mt={0.5} variant="body2" fontWeight={600} color="secondary">
                                  {content}
                                </Typography>
                              </Box>
                            </Box>
                          </Card>
                        </Tooltip>
                      </Grid>
                    ))}

                  </Grid>
                </Grid>

                <Box textAlign="center" mt={2}>
                  <Typography component="span" variant="body2" fontWeight={600} color="black">
                    It's easy to buy subscriptions with a credit/debit card or through a bank transfer. Also, you can link a bank account, which can be any bank, in any country, and in any currency.
                  </Typography>
                </Box>

                {/* principles end here */}

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

const underwriters = [
  {
    _id: 1,
    name: "Amy",
    title: "Partner @ Y Combinator",
    avatar: "/assets/media/underwriters/amy.png",
    content: "At YC, we see the lack of exits and interest from LPs as some of the dilemmas faced by many startup incubators and accelerators. Well then ... a subscription exchange is born.",
    isActive: ""
  },
  {
    _id: 2,
    name: "Scott",
    title: "Partner @ French Tech Visa",
    avatar: "/assets/media/underwriters/scott.png",
    content: "Working with Qarrington in today's global economic downturn has been an absolute game-changer for the startups we back through the French Tech Visa Program.",
    isActive: "dot"
  },
  {
    _id: 3,
    name: "Ciara",
    title: "Partner @ 500 StartUps",
    avatar: "/assets/media/underwriters/ciara.png",
    content: "Whether it's an accelerator like 500 StartUps or a venture capital firm like Accel, investing in 100 startups and expecting 1 unicorn exit in 10 years is beyond flawed.",
    isActive: ""
  },
  {
    _id: 4,
    name: "Adam",
    title: "Partner @ Gorilla Ventures",
    avatar: "/assets/media/underwriters/adam.png",
    content: "As a startup incubator, making 20 deals to hit ROI with 1 was tough for us. On Qarrington, we've seen the possibility of making 20 deals and hitting ROI from each.",
    isActive: "dot"
  },
  {
    _id: 5,
    name: "Judy",
    title: "Partner @ Chicago Angels",
    avatar: "/assets/media/underwriters/judy.png",
    content: "At Chicago Angels, the lack of liquidity is often an issue for us, but we're more than happy to be on a subscription exchange like Qarrington; the world's first of its kind.",
    isActive: "dot"
  }
]

const principles = [
  {
    _id: 1,
    name: "Open",
    image: <MeetingRoomRoundedIcon fontSize="small" />,
    helper: "Primarily, you can always use your Qarrington account as an underwriter, as a company, or as a subscriber.",
    content: "First of all, create a Qarrington account."
  },
  {
    _id: 2,
    name: "Connect",
    image: <AccountBalanceRoundedIcon fontSize="small" />,
    helper: "Each time you sell subscriptions, the subscription payouts will automatically be sent to your linked bank account.",
    content: "After that, link your online bank account."
  },
  {
    _id: 3,
    name: "Pull",
    image: <HistoryEduRoundedIcon fontSize="small" />,
    helper: "If your account is approved, you will be able to buy and sell the subscriptions of the listed companies on Qarrington.",
    content: "And finally, buy and sell subscriptions."
  }
]