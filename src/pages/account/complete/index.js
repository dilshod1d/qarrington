import React, { useState } from "react";
import Link from 'next/link';
import Head from 'next/head';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Carousel from 'react-material-ui-carousel';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Badge, Box, Button, Card, Container, Grid, Hidden, Stack, styled, Tab, TextField, Tooltip, Typography } from '@mui/material';
import useSWR from 'swr';

const Page = () => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data: stories } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/stories`, fetcher);
  const { data: guides } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/guides`, fetcher);
  const { data: companies } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies`, fetcher);

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getSteps = () => {
    return [
      "first name",
      "last name",
      "email address",
      "home address",
      "phone number",
      "social link",
      "birth date",
      "government id",
      "country code",
      "zip code",
      "avatar url",
      "current title",
      "currency code",
      "iban number",
      "account number",
      "routing number",
      "sort code",
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
                placeholder="first name"
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
                placeholder="last name"
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
                placeholder="email address"
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
                placeholder="home address"
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
                placeholder="phone number"
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
                placeholder="social link"
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
                placeholder="birth date"
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
                placeholder="government id"
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
                placeholder="country code"
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
                placeholder="zip code / postal code"
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
                placeholder="avatar url"
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
                placeholder="current title"
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
                placeholder="currency code"
              />
            </Tooltip>
          </Stack>
        );

      case 13:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What time does the company want the ISO to start? It can change anytime." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="iban number"
              />
            </Tooltip>
          </Stack>
        );

      case 14:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What time does the company want the ISO to start? It can change anytime." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="account number"
              />
            </Tooltip>
          </Stack>
        );

      case 15:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What time does the company want the ISO to start? It can change anytime." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="routing number"
              />
            </Tooltip>
          </Stack>
        );

      case 16:
        return (
          <Stack spacing={1.2} sx={{ width: '100%' }}>
            <Tooltip title="What time does the company want the ISO to start? It can change anytime." placement="top">
              <TextField
                sx={{ input: { textAlign: "center" } }}
                required
                placeholder="sort code"
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
        <title>Complete Account • Qarrington</title>
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
                      alt="Qarrington Logo"
                      src="/assets/media/companies/qarrington.png"
                    />
                  </Link>
                </Box>

                <Typography fontSize="42px" fontWeight="700" lineHeight="50px" component="div" sx={{ my: 1 }}>
                Viola! You're about to become a Qarrington
                  <Tooltip title="ISO or subscriptions only give customers access to a company's products, they don't represent investments in the firm." placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                In order to facilitate payouts, you must answer <b>~15 questions</b> about your personal, business, and bank details for KYC purposes. You'd need a PDF link to your government-issued document.
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

                        <Link href="/account/access">
                          <Button
                            size="large"
                            sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                            variant="contained"
                            fullWidth={true}
                          >
                            access account
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
                        "& button:hover": { backgroundColor: "#ffffff" },
                        "& button:active": { backgroundColor: "#b6b6b6" },
                        "& button.Mui-selected": { backgroundColor: "#000000" },
                        "& div.MuiTabs-scroller": { overflowY: "auto" },
                      }}
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                    >
                      <TabLabel label="Customer" value="1" />
                      <TabLabel label="Founder" value="2" />
                    </TabsWrapper>
                  </Box>

                  <Box style={{ marginBottom: '0px', marginTop: '16px' }}>

                    {/* customer tab starts */}

                    <TabPanel sx={{ padding: 0 }} value="1">

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

                    </TabPanel>

                    {/* customer tab ends */}

                    {/* founder tab starts */}

                    <TabPanel sx={{ padding: 0 }} value="2">

                      <Box textAlign="center" mb={2}>
                        {stories && stories.map(({ _id, storyByFounder }) => (
                          <>
                            <Carousel>
                              {storyByFounder && storyByFounder.map(({ _id, storyByFounderName, storyByFounderTitle, storyByFounderAvatar, storyByFounderContent, storyByFounderIsActive }) => (
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
                                      variant={storyByFounderIsActive}
                                    >
                                      <Avatar
                                        style={{ width: 80, height: 80 }}
                                        alt={storyByFounderName}
                                        src={storyByFounderAvatar}
                                      />
                                    </StyledBadge>
                                  </Box>
                                  <Box marginTop="16px">
                                    <Typography variant="h5" component="div" fontWeight="600" gutterBottom>{storyByFounderName}</Typography>
                                    <Typography variant="body" component="div" gutterBottom>{storyByFounderTitle}</Typography>
                                    <Typography variant="h5" component="div" fontWeight="600">{storyByFounderContent}</Typography>
                                  </Box>
                                </Box>
                              ))}
                            </Carousel>
                          </>
                        ))}
                      </Box>

                      <Grid item xs={12} mt={2}>
                        <Grid container spacing={1}>
                          {guides && guides.map(({ _id, guideForFounder }) => (
                            <>
                              {guideForFounder && guideForFounder.map(({ _id, guideForFounderIcon, guideForFounderTitle, guideForFounderContent, guideForFounderTooltip }) => (
                                <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                  <Tooltip title={guideForFounderTooltip} placement="top">
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
                                            alt={guideForFounderTitle}
                                            src={guideForFounderIcon}
                                          />
                                        </Badge>
                                      </Box>
                                      <Box style={{ textAlign: 'center' }}>
                                        <Box mt={1.2}>
                                          <Typography variant="h6" fontWeight={700} color="black" textTransform="uppercase">
                                            {guideForFounderTitle}
                                          </Typography>
                                          <Typography mt={0.2} variant="body2" fontWeight={600} color="secondary">
                                            {guideForFounderContent}
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

                    </TabPanel>

                    {/* founder tab ends */}

                  </Box>

                </TabContext>

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

const TabsWrapper = styled(TabList)(
  ({ theme }) => `
        &.MuiTabs-root {
          height: 0;
          margin-bottom: 16px;
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

const Breadcrumb = {
  cursor: "pointer",
  fontWeight: "500",
  "&:hover": {
    color: '#000'
  },
};

const FormButton = {
  "&:hover": {
    color: 'white',
    backgroundColor: '#f5f5f5'
  },
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

const countries = [
  [
    {
      name: "Albania"
    },
    {
      name: "Algeria"
    },
    {
      name: "Angola"
    },
    {
      name: "Antigua & Barbuda"
    },
    {
      name: "Argentina"
    },
    {
      name: "Armenia"
    },
    {
      name: "Australia"
    },
    {
      name: "Austria"
    },
    {
      name: "Azerbaijan"
    },
    {
      name: "Bahamas"
    },
    {
      name: "Bahrain"
    },
    {
      name: "Bangladesh"
    },
    {
      name: "Belgium"
    },
    {
      name: "Benin"
    },
    {
      name: "Bhutan"
    },
    {
      name: "Bolivia"
    },
    {
      name: "Bosnia & Herzegovina"
    },
    {
      name: "Botswana"
    },
    {
      name: "Brunei"
    },
    {
      name: "Bulgaria"
    },
    {
      name: "Cambodia"
    },
    {
      name: "Canada"
    },
    {
      name: "Chile"
    },
    {
      name: "Colombia"
    },
    {
      name: "Costa Rica"
    },
    {
      name: "Côte d’Ivoire"
    },
    {
      name: "Croatia"
    },
    {
      name: "Cyprus"
    },
    {
      name: "Czech Republic"
    },
    {
      name: "Denmark"
    },
    {
      name: "Dominican Republic"
    },
    {
      name: "Ecuador"
    },
    {
      name: "Egypt"
    },
    {
      name: "El Salvador"
    },
    {
      name: "Estonia"
    },
    {
      name: "Ethiopia"
    },
    {
      name: "Finland"
    },
    {
      name: "France"
    },
    {
      name: "Gabon"
    },
    {
      name: "Gambia"
    },
    {
      name: "Germany"
    },
    {
      name: "Ghana"
    },
    {
      name: "Greece"
    },
    {
      name: "Guatemala"
    },
    {
      name: "Guyana"
    },
    {
      name: "Hong Kong"
    },
    {
      name: "Hungary"
    },
    {
      name: "Iceland"
    },
    {
      name: "India"
    },
    {
      name: "Indonesia"
    },
    {
      name: "Ireland"
    },
    {
      name: "Israel"
    },
    {
      name: "Italy"
    },
    {
      name: "Jamaica"
    },
    {
      name: "Japan"
    },
    {
      name: "Jordan"
    },
    {
      name: "Kenya"
    },
    {
      name: "Kuwait"
    },
    {
      name: "Laos"
    },
    {
      name: "Latvia"
    },
    {
      name: "Liechtenstein"
    },
    {
      name: "Lithuania"
    },
    {
      name: "Luxembourg"
    },
    {
      name: "Macao SAR China"
    },
    {
      name: "Madagascar"
    },
    {
      name: "Malaysia"
    },
    {
      name: "Malta"
    },
    {
      name: "Mauritius"
    },
    {
      name: "Mexico"
    },
    {
      name: "Moldova"
    },
    {
      name: "Monaco"
    },
    {
      name: "Mongolia"
    },
    {
      name: "Morocco"
    },
    {
      name: "Mozambique"
    },
    {
      name: "Namibia"
    },
    {
      name: "Netherlands"
    },
    {
      name: "New Zealand"
    },
    {
      name: "Niger"
    },
    {
      name: "Nigeria"
    },
    {
      name: "North Macedonia"
    },
    {
      name: "Norway"
    },
    {
      name: "Oman"
    },
    {
      name: "Panama"
    },
    {
      name: "Paraguay"
    },
    {
      name: "Peru"
    },
    {
      name: "Philippines"
    },
    {
      name: "Poland"
    },
    {
      name: "Portugal"
    },
    {
      name: "Qatar"
    },
    {
      name: "Romania"
    },
    {
      name: "Rwanda"
    },
    {
      name: "San Marino"
    },
    {
      name: "Saudi Arabia"
    },
    {
      name: "Senegal"
    },
    {
      name: "Serbia"
    },
    {
      name: "Singapore"
    },
    {
      name: "Slovakia"
    },
    {
      name: "Slovenia"
    },
    {
      name: "South Africa"
    },
    {
      name: "South Korea"
    },
    {
      name: "Spain"
    },
    {
      name: "Sri Lanka"
    },
    {
      name: "St. Lucia"
    },
    {
      name: "Sweden"
    },
    {
      name: "Switzerland"
    },
    {
      name: "Taiwan"
    },
    {
      name: "Tanzania"
    },
    {
      name: "Thailand"
    },
    {
      name: "Trinidad & Tobago"
    },
    {
      name: "Tunisia"
    },
    {
      name: "Turkey"
    },
    {
      name: "United Arab Emirates"
    },
    {
      name: "United Kingdom"
    },
    {
      name: "Uruguay"
    },
    {
      name: "Uzbekistan"
    },
    {
      name: "Vietnam"
    }
  ]
]