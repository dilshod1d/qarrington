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

const Page = () => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data: institutions } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/institutions`, fetcher);

  const getSteps = () => {
    return [
      "company ticker",
      "listing name",
      "listing logo",
      "listing product",
      "listing headline",
      "listing description",
      "listing industry",
      "listing website",
      "listing email",
      "listing market",
      "iso units",
      "iso price",
      "start month",
      "start day",
      "start year",
      "companyUnderwriterAccountId",
      "companyFounderAccountId",
    ];
  }

  const getStepContent = (step) => {
    switch (step) {

      case 0:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What's the unique three-letter symbol of the company? No special characters." placement="top">
              <TextField
                sx={{ input: { textAlign: "center", textTransform: "lowercase" } }}
                required
                placeholder="company ticker"
              />
            </Tooltip>
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What's the name of the company? This can either be the legal or DBA name." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="listing name"
              />
            </Tooltip>
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What's the link to the company's logo? Please ensure the background is filled." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="listing logo"
              />
            </Tooltip>
          </Stack>
        );

      case 3:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What's the product that the company offers or will offer its future customers?" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="listing product"
              />
            </Tooltip>
          </Stack>
        );

      case 4:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What is the catchy headline of the company? Please keep it simple & short." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="listing headline"
              />
            </Tooltip>
          </Stack>
        );

      case 5:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="How would you break down what the company is or does to a 5yr or 95yr old?" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="listing description"
              />
            </Tooltip>
          </Stack>
        );

      case 6:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="In which industry does the company operate it? Please keep it to 1 or 2 words." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="listing industry"
              />
            </Tooltip>
          </Stack>
        );

      case 7:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What's the website of the company? This must be accessible to all customers." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="listing website"
              />
            </Tooltip>
          </Stack>
        );

      case 8:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="How can customers get in touch with the company should they need any help?" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="listing email"
              />
            </Tooltip>
          </Stack>
        );

      case 9:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="In which country are the majority of the company's customers based or located?" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="listing market"
              />
            </Tooltip>
          </Stack>
        );

      case 10:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="How many units of subscriptions does the company plan to issue for its ISO?" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="iso units"
              />
            </Tooltip>
          </Stack>
        );

      case 11:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What's the price per unit during the ISO? Please make sure that this is justifiable." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="iso price"
              />
            </Tooltip>
          </Stack>
        );

      case 12:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="Which month does the company want the ISO to start? It can change anytime." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="start month"
              />
            </Tooltip>
          </Stack>
        );

      case 13:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="Which day does the company want the ISO to start? This can change anytime." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="start day"
              />
            </Tooltip>
          </Stack>
        );

      case 14:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="Which year does the company want the ISO to start? This can change anytime." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="start year"
              />
            </Tooltip>
          </Stack>
        );

      case 15:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What's the unique identification string of the company's underwriter account?" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="companyUnderwriterAccountId"
              />
            </Tooltip>
          </Stack>
        );

      case 16:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What is the unique identification string of the company's founder account?" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="companyFounderAccountId"
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
        <title>List Company • Qarrington</title>
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
                  Help your portfolios raise funds through an ISO
                  <Tooltip title="ISO subscriptions only give customers access to a company's products, they don't represent investments in the firm." placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  If you're an existing underwriter with an approved institution, you can continue to list a company. Otherwise, kindly <Link href="/institutions/create">
                    <Typography
                      component="span"
                      color="black"
                      variant="h6"
                      fontWeight="700"
                      backgroundColor="#2ed57390"
                      sx={{
                        cursor: 'pointer', "&:hover": {
                          color: '#2f3542',
                          backgroundColor: '#2ed57350'
                        }
                      }}>click here</Typography></Link> to create an institution profile and add underwriters to the profile.
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

                        <Link href={`/companies`}>
                          <Button
                            size="large"
                            sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                            variant="contained"
                            fullWidth={true}
                          >
                            manage companies
                          </Button>
                        </Link>

                        <Button
                          style={FormButton}
                          disabled
                          color="secondary"
                          sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                        >
                          submitted
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
                    Kindly note that a company will only be listed if the whitelist threshold is met before the start date. Otherwise, the start and end dates will be postponed by at least two weeks.
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
    name: "Submit",
    image: <MeetingRoomRoundedIcon fontSize="small" />,
    helper: "When you submit a company for listing, we will review the company to ensure it meets all our listing requirements.",
    content: "First of all, submit a company for listing."
  },
  {
    _id: 2,
    name: "List",
    image: <AccountBalanceRoundedIcon fontSize="small" />,
    helper: "When a company is listed, the listing will start at 10:00 PM EST on the start date and end at 11:00 PM EST on the end date.",
    content: "Next, the company's ISO will be listed."
  },
  {
    _id: 3,
    name: "Launch",
    image: <HistoryEduRoundedIcon fontSize="small" />,
    helper: "When a company's ISO is launched on Qarrington, only the whitelisted subscribers can participate in the ISO.",
    content: "Finally, subscribers can buy the ISO."
  }
]