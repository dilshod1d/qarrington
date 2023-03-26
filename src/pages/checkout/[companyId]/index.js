import { useState } from "react";
import Link from 'next/link';
import Head from 'next/head';
import Carousel from 'react-material-ui-carousel';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Badge, Box, Button, Card, Container, Grid, Hidden, Stack, styled, TextField, Tooltip, Typography, Snackbar } from '@mui/material';
import useSWR from 'swr';
import Company from "@models/company/Company";
import dbConnect from "@lib/dbConnect";
import { useEffect } from "react";
import { parseToObj } from "@helpers/checkout-helpers";
import { useCardList } from "@hooks/useCardList";
import { checkoutCardPayment } from "@services/checkout-services";
import { useRouter } from "next/router";

const Page = ({ companySlug, companyName, companyDescription, companyLogo }) => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data: stories } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/stories`, fetcher);
  const { data: guides } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/guides`, fetcher);
  const router = useRouter()


  const { contentData, currentContentData, goNext, goBack, error, errorMsg, cleanError, cleanErrorMsg, finish, lastInput } = useCardList()
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    const newInput = e.target.value
    cleanError()
    setInputValue(currentContentData.inputConstraints(inputValue, newInput))
  }

  const handleNext = (e) => {
    e.preventDefault()
    goNext({ inputValue, setInputValue }) 
  };

  const handleBack = () => {
    goBack({ inputValue, setInputValue })
  };

  
  useEffect(() => {
    if(currentContentData) {
      setInputValue(currentContentData.savedValue)
    }
  }, [currentContentData])

  useEffect(() => {
    const listCompany = async () => {
      try {
        const toSend = parseToObj(contentData)
        const response = await checkoutCardPayment({
          ...toSend,
          type: router.query.type,
          pickUnits: router.query.units,
          pickTicker: companySlug
        })
        if(response) {
          console.log(response)
          return
        }
        console.log("Something went wrong!")
      } catch (error) {
        console.log(error)
      }
    }
    if (finish) listCompany()
  }, [finish])

  return (

    <>

      <Head>
        <title>Hi {companySlug} • Qarrington</title>
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
                      alt={companyName}
                      src={companyLogo}
                    />
                  </Link>
                </Box>

                <Typography fontSize="42px" fontWeight="700" lineHeight="50px" component="div" sx={{ my: 1 }}>
                  Buy {companySlug} either with your credit or debit card
                  <Tooltip title="As a customer, subscriptions give you access to a company's products, they don't represent investments in the firm." placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  When you buy {companySlug} subscriptions, you will be able to access {companySlug}'s products and services with your subscription units. Kindly note that each unit represents a month of access.
                </Typography>

              </Box>

              <form noValidate autoComplete="on" onSubmit={handleNext}>

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>

                  <Stack spacing={1.2} sx={{ width: '100%' }}>

                    {finish || !currentContentData ? (
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
    
                        <Link href={`/subscriptions/${companySlug}`}>
                          <Button
                            size="large"
                            sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                            variant="contained"
                            fullWidth={true}
                          >
                            track portfolio
                          </Button>
                        </Link>

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
                        <Stack spacing={1.2} sx={{ width: '100%' }}>
                          <Tooltip title={currentContentData.title} placement="top">
                            <TextField
                              sx={{ input: { textAlign: "center", textTransform: "uppercase" }, 'input::placeholder': { textTransform: "capitalize"} }}
                              placeholder={currentContentData.placeholder}
                              onChange={handleInputChange}
                              value={inputValue}
                              error={error}
                            />
                          </Tooltip>
                        </Stack>
                        <Snackbar
                          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                          open={errorMsg !== ''}
                          message={errorMsg}
                          autoHideDuration={3000}
                          onClose={cleanErrorMsg}
                          sx={{ '&>div':{ textAlign:"center", width:"inherit", display: "flex", justifyContent: "center" } }}
                        />
                        <Button
                          size="large"
                          sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                          variant="contained"
                          color="secondary"
                          fullWidth={true}
                          onClick={handleNext}
                        >
                          {lastInput ? "Pay" : "Next"}
                        </Button>
                        <Button
                          style={FormButton}
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
    await dbConnect();
    const { companyId } = params;
    const company = await Company.findOne({ companySlug: companyId.toLowerCase() });
    const parsedCompany = JSON.parse(JSON.stringify(company));
    
    const { companyListing, companySlug } = parsedCompany;
    const { companyName, companyDescription, companyLogo } = companyListing;

    return {
      props: {
        companySlug,
        companyName,
        companyDescription,
        companyLogo
      }
    }
  } catch (error) {
    return {
      notFound: true
    };
  }
}