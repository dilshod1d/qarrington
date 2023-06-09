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
      "institution name",
      "Institution slug",
      "institution size",
      "institution market",
      "institution logo",
      "institution website",
      "institution headline",
      "institution description",
    ];
  }

  const getStepContent = (step) => {
    switch (step) {

      case 0:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What's the name of the institution? This can either be the legal or DBA name." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="institution name"
              />
            </Tooltip>
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What's the slug for the institution? This will be used as the institution route." placement="top">
              <TextField
                sx={{ input: { textAlign: "center", textTransform: "lowercase" } }}
                required
                placeholder="institution slug"
              />
            </Tooltip>
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="How many portfolio companies is the institution capable of listing per month?" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="institution size"
              />
            </Tooltip>
          </Stack>
        );

      case 3:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="In which country are the majority of the institution's portfolio companies based?" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="institution market"
              />
            </Tooltip>
          </Stack>
        );

      case 4:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What's the link to the institution's logo? Please ensure the background is filled." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="institution logo"
              />
            </Tooltip>
          </Stack>
        );

      case 5:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What's the website of the institution? Please ensure it's publicly accessible." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="institution website"
              />
            </Tooltip>
          </Stack>
        );

      case 6:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What is the catchy headline of the institution? Please keep it simple & short." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="institution headline"
              />
            </Tooltip>
          </Stack>
        );

      case 7:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="How would you break down what the institution is or does to a 5yr or 95yr old?" placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="institution description"
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
        <title>Create Institution • Qarrington</title>
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
                  Act as the investment bank for your portfolios
                  <Tooltip title="On Qarrington, we work with institutional investors from business incubators, accelerators, to private equity firms." placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  If you're not an underwriter with an approved institution, you can continue to create an institution profile and add underwriters to the profile. Otherwise, kindly <Link href="/companies/list">
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
                      }}>click here</Typography></Link> to list a company.
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

                        {institutions && institutions.slice(0, 1).map(({ _id, institutionSlug }) => (
                          <Link key={_id} href={`/institutions/${institutionSlug}`}>
                            <Button
                              size="large"
                              sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                              variant="contained"
                              fullWidth={true}
                            >
                              manage institution
                            </Button>
                          </Link>
                        ))}

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
                    As a SaaS Underwriter, you get 10% from the <b>subscription proceeds</b> and keep 10% of the <b>subscription volumes</b> in circulation. Kindly download our
                    <Typography component="span" mx={0.5} variant="body2">
                      <a href="https://bit.ly/saas-underwriters"
                        style={{ fontWeight: '700', color: 'black' }}
                        target="_blank"
                        rel="noopener noreferrer">
                        Underwriter Slide
                      </a>
                    </Typography>
                    <Typography component="span" variant="body2" fontWeight={600} color="black">
                      for more info.
                    </Typography>
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
    name: "Create",
    image: <MeetingRoomRoundedIcon fontSize="small" />,
    helper: "When you submit a company for listing, we will review the company to ensure it meets all our listing requirements.",
    content: "First of all, create an institution profile."
  },
  {
    _id: 2,
    name: "Add",
    image: <AccountBalanceRoundedIcon fontSize="small" />,
    helper: "When a company is listed, the listing will start at 10:00 PM EST on the start date and end at 11:00 PM EST on the end date.",
    content: "Next, invite members to the institution."
  },
  {
    _id: 3,
    name: "Submit",
    image: <HistoryEduRoundedIcon fontSize="small" />,
    helper: "When a company's ISO is launched on Qarrington, only the whitelisted subscribers can participate in the ISO.",
    content: "And finally, submit a company for listing."
  }
]