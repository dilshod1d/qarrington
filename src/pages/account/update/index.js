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
import { useEffect } from "react";
import { updateAccount } from "@services/accounts-services";

const Page = () => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data: stories } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/stories`, fetcher);
  const { data: guides } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/guides`, fetcher);
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/accounts`, fetcher);

  const contentData = [
    {
      placeholder: "first name",
      title: "Kindly provide your First Name exactly as it appears on your bank statement.",
      required: true
    },
    {
      placeholder: "last name",
      title: "Kindly provide your Last Name exactly as it appears on your bank statement.",
      required: true
    },
    {
      placeholder: "government id",
      title: "Kindly provide your Government-Issued ID as a link to the PNG or JPG image file.",
      required: true
    },
    {
      placeholder: "id number",
      title: "Kindly provide the ID Number or SSN exactly as shown on the government id.",
      required: true
    },
    {
      placeholder: "home country",
      title: "Kindly provide the 2-letter code of the country, where the id was legally issued.",
      required: true
    },
    {
      placeholder: "birth date",
      title: "Kindly provide your Birth Date exactly as it appears on all your legal documents.",
      required: true
    },
    {
      placeholder: "business name",
      title: "Kindly provide your Business Name or Full Name if you don't have a business.",
      required: true
    },
    {
      placeholder: "business type",
      title: "By default, your Business Type is set to Individual and you can't change it later.",
      required: true
    },
    {
      placeholder: "business industry",
      title: "By default, your Business Industry is set to SaaS and you cannot change it later.",
      required: true
    },
    {
      placeholder: "business website",
      title: "Kindly provide your Business Website or Social Link if you don't have a business.",
      required: true
    },
    {
      placeholder: "business address",
      title: "Kindly provide your Business Address or leave it blank to use your Home Address.",
      required: true
    },
    {
      placeholder: "business country",
      title: "Kindly provide your Business Country or leave it blank to use your Home Country.",
      required: true
    },
    {
      placeholder: "business email",
      title: "Kindly provide your Business Email or leave it blank to use your Email Address.",
      required: true
    },
    {
      placeholder: "bank country",
      title: "Kindly provide the 2-letter code of the country, where your bank is located.",
      required: true
    },
    {
      placeholder: "bank currency",
      title: "Kindly provide the 3-letter code of the currency that your bank account uses.",
      required: true
    },
    {
      placeholder: "iban number",
      title: "Kindly provide your IBAN Number in case you don't have a bank Account Number.",
      required: true
    },
    {
      placeholder: "account number",
      title: "Kindly enter your bank Account Number in case you don't have an IBAN Number.",
      required: true
    },
    {
      placeholder: "routing number",
      title: "Kindly provide your Routing Number if your bank is based or located in the U.S.",
      required: true
    },
    {
      placeholder: "sort code",
      title: "Kindly provide your Sort Code in case your bank is based or located in the UK.",
      required: true
    },
    {
      placeholder: "email address",
      title: "Kindly provide your Email Address and once you do, you cannot change it later.",
      required: true
    },
    {
      placeholder: "phone number",
      title: "Kindly provide your Phone Number and once you do, you cannot change it later.",
      required: true
    },
    {
      placeholder: "home address",
      title: "Kindly provide your Home Address and once you do, you cannot change it later.",
      required: true
    },
    {
      placeholder: "zip code",
      title: "Kindly provide the zip code or postal code of your current residential address.",
      required: true
    },
    {
      placeholder: "city name",
      title: "Kindly provide the city, where you're currently located as a legal resident.",
      required: true
    },
    {
      placeholder: "state name",
      title: "Kindly provide the state, where you're currently located as a legal resident.",
      required: true
    }
  ];

  const [account, setAccount] = useState(null)
  const [value, setValue] = useState('2');
  const [steps, setSteps] = useState([])
  const [stepsCount, setStepsCount] = useState(0)
  const [inputValues, setInputValues] = useState({})
  const [inputValue, setInputValue] = useState('')
  const [stepContent, setStepContent] = useState(contentData[0])
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);


  useEffect(() => {
    if (!error && data?.data) {
        setAccount(data.data.account)
    }
  }, [data])

  useEffect(() => {
    if(account !== null) {
      setSteps(getSteps())
    }
  }, [account])

  useEffect(() => {
    if(inputValues !== null && activeStep === 0) {
      StepContent(0)
    }
  }, [inputValues])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getSteps = () => {

    const schema = {
      accountPersonal: ["accountFirstName", "accountLastName", "accountGovernmentId", "accountIdNumber", "accountBirthDate", "accountHomeCountry"],
      accountBusiness: ["accountBusinessName", "accountBusinessType", "accountBusinessIndustry", "accountBusinessWebsite", "accountBusinessAddress", "accountBusinessCountry", "accountBusinessEmail"],
      accountBank: ["accountBankCountry", "accountBankCurrency", "accountIbanNumber", "accountNumber", "accountRoutingNumber", "accountSortCode"],
      accountContact: ["accountEmailAddress", "accountPhoneNumber", "accountHomeAddress", "accountZipCode", "accountCityName", "accountStateName"],
    }

    const previousInputs = {}
    let count = 0

    Object.keys(schema).forEach((key) => {
      previousInputs[key] = {}
      schema[key].forEach((keyValue) => {
          // if(keyValue == "accountAccessKey" && req.body[keyValue].length > 13 )
          if(account[key]) {
            if (account[key][keyValue] && account[key][keyValue] != null) {
              previousInputs[key][keyValue] = account[key][keyValue]
            } else {
              previousInputs[key][keyValue] = ''
            }
          } else {
            previousInputs[key][keyValue] = ''
          }
          count++

      })
    })

    setStepsCount(count)

    setInputValues(previousInputs)

    return schema
  }

  const getStep = (position) => {
    let count = 0
    let currentStep

    Object.keys(inputValues).forEach((key) => {
      Object.keys(inputValues[key]).forEach((keyValue) => {
        if(count === position && !currentStep) {
          currentStep = inputValues[key][keyValue]
        }
        count++
      })
    })

    return currentStep
  }

  const setStep = (position, value) => {
    let count = 0
    let inputValuesCopy = JSON.parse(JSON.stringify(inputValues))

    Object.keys(inputValuesCopy).forEach((key) => {
      Object.keys(inputValuesCopy[key]).forEach((keyValue) => {
        if(count === position) {
          inputValuesCopy[key][keyValue] = value
        }
        count++
      })
    })

    setInputValues(inputValuesCopy)
  }

  const handleNext = () => {

    if(activeStep === stepsCount - 1) {
      const obj = {}
      Object.keys(inputValues).forEach((key) => {
        Object.keys(inputValues[key]).forEach((keyValue) => {
          if(inputValues[key][keyValue]) obj[keyValue] = inputValues[key][keyValue]
        })
      })
      updateAccount(obj)
    }

    setInputValue('')
    setStep(activeStep, inputValue)
    setActiveStep(activeStep + 1);
    StepContent(activeStep + 1)
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
  };

  const handleBack = () => {
    setInputValue('')
    StepContent(activeStep - 1)
    setActiveStep(activeStep - 1);
  };


  const StepContent = (step) => {

    const currentStep = getStep(step)
    currentStep && setInputValue(currentStep)

    setStepContent(contentData[step])
  }

  return (

    <>

      <Head>
        <title>Update Account • Qarrington</title>
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
                  <Tooltip title="Subscriptions only give you access to a company's products and services, they don't represent investments in the firm." placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  Dear {account?.accountPersonal?.accountFirstName}, in order to sell subscriptions on Qarrington and receive payouts to your bank account, you're required to provide verifiable <b>personal</b>, <b>business</b>, <b>bank</b>, and <b>contact</b> details.
                </Typography>

              </Box>

              <form noValidate autoComplete="on">

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>

                  <Stack spacing={1.2} sx={{ width: '100%' }}>

                    {activeStep === stepsCount ? (
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

                        <Link href="/account">
                          <Button
                            size="large"
                            sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                            variant="contained"
                            fullWidth={true}
                          >
                            manage account
                          </Button>
                        </Link>

                        <Button
                          style={FormButton}
                          disabled
                          color="secondary"
                          sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                        >
                          updated
                        </Button>

                      </Stack>
                    ) : (
                      <>
                        <form>
                        <Stack spacing={1.2} sx={{ width: '100%' }}>
                          <Tooltip title={stepContent.title} placement="top">
                            <TextField
                              sx={{ input: { textAlign: "center", textTransform: "lowercase" } }}
                              required={stepContent.required}
                              placeholder={stepContent.placeholder}
                              onChange={({ target }) => setInputValue(target.value)}
                              value={inputValue}
                            />
                          </Tooltip>
                        </Stack>
                        </form>
                        <Button
                          size="large"
                          sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                          variant="contained"
                          fullWidth={true}
                          onClick={handleNext}
                        >
                          {activeStep === stepsCount.length - 1 ? "Save" : "Next"}
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
                    By clicking on the Save BUTTON or otherwise submitting this FORM, I do hereby agree with the Service Terms and Privacy Policies of the Qarrington website.
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
                      <TabLabel label="Underwriter" value="2" />
                      <TabLabel label="Founder" value="3" />
                    </TabsWrapper>
                  </Box>

                  <Box style={{ marginBottom: '0px', marginTop: '16px' }}>

                    {/* customer tab starts */}

                    <TabPanel sx={{ padding: 0 }} value="1">

                      <Box textAlign="center" mb={2}>
                        {stories && Array.isArray(stories) && stories?.map(({ _id, storyByCustomer }) => (
                          <>
                            <Carousel>
                              {storyByCustomer && Array.isArray(storyByCustomer) && storyByCustomer?.map(({ _id, storyByCustomerName, storyByCustomerTitle, storyByCustomerAvatar, storyByCustomerContent, storyByCustomerIsActive }) => (
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

                    </TabPanel>

                    {/* customer tab ends */}

                    {/* underwriter tab starts */}

                    <TabPanel sx={{ padding: 0 }} value="2">

                      <Box textAlign="center" mb={2}>
                        {stories && Array.isArray(stories) && stories?.map(({ _id, storyByUnderwriter }) => (
                          <>
                            <Carousel>
                              {storyByUnderwriter && Array.isArray(storyByUnderwriter) && storyByUnderwriter?.map(({ _id, storyByUnderwriterName, storyByUnderwriterTitle, storyByUnderwriterAvatar, storyByUnderwriterContent, storyByUnderwriterIsActive }) => (
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
                                      variant={storyByUnderwriterIsActive}
                                    >
                                      <Avatar
                                        style={{ width: 80, height: 80 }}
                                        alt={storyByUnderwriterName}
                                        src={storyByUnderwriterAvatar}
                                      />
                                    </StyledBadge>
                                  </Box>
                                  <Box marginTop="16px">
                                    <Typography variant="h5" component="div" fontWeight="600" gutterBottom>{storyByUnderwriterName}</Typography>
                                    <Typography variant="body" component="div" gutterBottom>{storyByUnderwriterTitle}</Typography>
                                    <Typography variant="h5" component="div" fontWeight="600">{storyByUnderwriterContent}</Typography>
                                  </Box>
                                </Box>
                              ))}
                            </Carousel>
                          </>
                        ))}
                      </Box>

                      <Grid item xs={12} mt={2}>
                        <Grid container spacing={1}>
                          {guides && Array.isArray(guides) && guides?.map(({ _id, guideForFounder }) => (
                            <>
                              {guideForFounder && Array.isArray(guideForFounder) && guideForFounder?.map(({ _id, guideForFounderIcon, guideForFounderTitle, guideForFounderContent, guideForFounderTooltip }) => (
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

                    {/* underwriter tab ends */}

                    {/* founder tab starts */}

                    <TabPanel sx={{ padding: 0 }} value="3">

                      <Box textAlign="center" mb={2}>
                        {stories && Array.isArray(stories) && stories?.map(({ _id, storyByFounder }) => (
                          <>
                            <Carousel>
                              {storyByFounder && Array.isArray(storyByFounder) && storyByFounder?.map(({ _id, storyByFounderName, storyByFounderTitle, storyByFounderAvatar, storyByFounderContent, storyByFounderIsActive }) => (
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
                          {guides && Array.isArray(guides) && guides?.map(({ _id, guideForFounder }) => (
                            <>
                              {guideForFounder && Array.isArray(guideForFounder) && guideForFounder?.map(({ _id, guideForFounderIcon, guideForFounderTitle, guideForFounderContent, guideForFounderTooltip }) => (
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