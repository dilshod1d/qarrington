import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Box, Button, Container, Grid, Stack, styled, TextField, Tooltip, Typography, Snackbar } from '@mui/material';
import Company from '@models/company/Company';
import dbConnect from '@lib/dbConnect';
import { useEffect } from 'react';
import { parseToObj } from '@helpers/checkout-helpers';
import { useCardList } from '@hooks/useCardList';
import { checkoutCardPayment } from '@services/checkout-services';
import { useRouter } from 'next/router';
import MainStoryGuideSlide from '../../../components/slide/MainStoryGuideSlide';

const Page = ({ companySlug, companyName, companyDescription, companyLogo }) => {
  const router = useRouter();

  const { contentData, currentContentData, goNext, goBack, error, errorMsg, cleanError, cleanErrorMsg, finish, lastInput } = useCardList();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const newInput = e.target.value;
    cleanError();
    setInputValue(currentContentData.inputConstraints(inputValue, newInput));
  };

  const handleNext = (e) => {
    e.preventDefault();
    goNext({ inputValue, setInputValue });
  };

  const handleBack = () => {
    goBack({ inputValue, setInputValue });
  };

  useEffect(() => {
    if (currentContentData) {
      setInputValue(currentContentData.savedValue);
    }
  }, [currentContentData]);

  useEffect(() => {
    const listCompany = async () => {
      try {
        const toSend = parseToObj(contentData);

        let response
        if (router.query.type === "pick") {
          response = await checkoutCardPayment({
            ...toSend,
            type: router.query.type,
            pickUnits: router.query.units,
            pickTicker: companySlug,
          });
        } else if (router.query.type === "pull") {
          response = await checkoutCardPayment({
            ...toSend,
            type: router.query.type,
            pullUnits: router.query.units,
            pullTicker: companySlug,
            pullPrice: router.query.price
          });
        } else if (router.query.type === "push") {
          response = await checkoutCardPayment({
            ...toSend,
            type: router.query.type,
            pushUnits: router.query.units,
            pushTicker: companySlug,
            pushPrice: router.query.price
          });
        } else {
          return router.push('/portfolio')
        }
        if (!response || response.success === false) console.log('Something went wrong!', response?.message);

      } catch (error) {
        console.log(error);
      }
    };
    if (finish) listCompany();
  }, [finish]);

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

        <Grid container sx={{ height: '100%' }} alignItems="stretch" spacing={0}>

          {/* left container starts */}

          <Grid xs={12} md={6} alignItems="center" display="flex" justifyContent="center" item>
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
                    <Avatar style={{ width: 40, height: 40 }} alt={companyName} src={companyLogo} />
                  </Link>
                </Box>

                <Typography fontSize="42px" fontWeight="700" lineHeight="50px" component="div" sx={{ my: 1 }}>
                  Buy {companySlug} either with your credit or debit card
                  <Tooltip
                    title="As a customer, subscriptions give you access to a company's products, they don't represent investments in the firm."
                    placement="top"
                  >
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  When you buy {companySlug} subscriptions, you will be able to access {companySlug}'s products and services with your subscription
                  units. Kindly note that each unit represents a month of access.
                </Typography>
              </Box>

              <form noValidate autoComplete="on" onSubmit={handleNext}>

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>
                  <Stack spacing={1.2} sx={{ width: '100%' }}>
                    {finish || !currentContentData ? (
                      <Stack spacing={1.2} sx={{ width: '100%', mb: 0 }}>
                        <Link href="/help">
                          <Button size="large" sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }} variant="outlined" fullWidth={true}>
                            get some help
                          </Button>
                        </Link>

                        <Link href={`/portfolio/${companySlug}`}>
                          <Button
                            size="large"
                            sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                            variant="contained"
                            fullWidth={true}
                          >
                            track portfolio
                          </Button>
                        </Link>

                        <Button style={FormButton} disabled color="secondary" sx={{ fontSize: '12px', textTransform: 'uppercase' }}>
                          done
                        </Button>
                      </Stack>
                    ) : (
                      <>
                        <Stack spacing={1.2} sx={{ width: '100%' }}>
                          <Tooltip title={currentContentData.title} placement="top">
                            <TextField
                              sx={{
                                input: { textAlign: 'center', textTransform: 'uppercase' },
                                'input::placeholder': { textTransform: 'capitalize' }
                              }}
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
                          sx={{ '&>div': { textAlign: 'center', width: 'inherit', display: 'flex', justifyContent: 'center' } }}
                        />
                        <Button
                          size="large"
                          sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                          variant="contained"
                          color="secondary"
                          fullWidth={true}
                          onClick={handleNext}
                        >
                          {lastInput ? 'Pay' : 'Next'}
                        </Button>
                        <Button style={FormButton} onClick={handleBack} color="secondary" sx={{ fontSize: '12px', textTransform: 'uppercase' }}>
                          Back
                        </Button>
                      </>
                    )}
                  </Stack>
                </Box>

                <Box textAlign="center">
                  <Typography variant="body2" mt={1} component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                    * An Initial Subscription Offering (ISO) is the process of listing a SaaS company on a subscription exchange so the company can
                    advance its subscriptions to customers.
                  </Typography>
                </Box>

              </form>

            </Container>
          </Grid>

          {/* left container ends */}

          {/* right container starts */}

          <MainStoryGuideSlide />

          {/* right container ends */}

        </Grid>

      </MainContent>

    </>

  )

}

export default Page;

const FormButton = {
  '&:hover': {
    color: 'white',
    backgroundColor: '#f5f5f5'
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

const Body = {
  backgroundColor: '#ffffff'
};

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
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}
