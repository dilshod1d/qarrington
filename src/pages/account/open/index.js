import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Box, Breadcrumbs, Button, Container, Grid, Stack, styled, TextField, Tooltip, Typography, Snackbar } from '@mui/material';
import { createAccount } from '@services/accounts-services';
import { useRouter } from 'next/router';
import { useValidation } from '@hooks/useValidation';
import { subscribeToCompany } from '@services/companies-services';
import MainStoryGuideSlide from '../../../components/slide/MainStoryGuideSlide';
import { useSession } from 'next-auth/react';
import AuthGuard from '@components/isauth';

const Page = () => {
  const [accessKey, setAccessKey, { error, errorMsg }, cleanErrorMsg, throwError] = useValidation({
    errorMsg: 'Access needs to be 12 characters long',
    allowSpaces: false,
    limitCharacters: 12
  });
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSubmit = async (e) => {
    console.log('handle submit fired', e);
    e.preventDefault();
    try {
      const res = await createAccount({ accessKey });
      if (res?.success) {
        const { companySlug } = router.query;
        if (companySlug) await subscribeToCompany({ accountId: res.data.id, companySlug });
        router.push('/account/access');
      } else {
        throwError();
      }
    } catch (error) {
      console.log(error);
      throwError();
    }
  };

  const handleInputChange = (e) => {
    setAccessKey(e.target.value);
  };
  if (status == 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <AuthGuard status={status}>
      <>
        <Head>
          <title>Open Account • Qarrington</title>
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
                      <Avatar style={{ width: 40, height: 40 }} alt="Qarrington Logo" src="/assets/media/companies/qarrington.png" />
                    </Link>
                  </Box>

                  <Typography fontSize="42px" fontWeight="700" lineHeight="50px" component="div" sx={{ my: 1 }}>
                    Viola! You're about to become a Qarrington
                    <Tooltip
                      title="Subscriptions only give you access to a company's products and services, they don't represent investments in the firm."
                      placement="top"
                    >
                      <InfoRoundedIcon fontSize="small" color="primary" />
                    </Tooltip>
                  </Typography>

                  <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                    Qarrington is a subscription exchange, where you participate in the Initial Subscription Offering (ISO) & buy/sell the
                    subscriptions of SaaS companies. It's like stocks but backed by SaaS products.
                  </Typography>
                </Box>

                <form noValidate autoComplete="on" onSubmit={handleSubmit}>
                  <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>
                    <Stack spacing={1.2} sx={{ width: '100%' }}>
                      <Tooltip
                        title="Kindly create an accessKey to quickly access your Qarrington account without your personal data such as an email."
                        placement="top"
                      >
                        <TextField
                          sx={{ input: { textAlign: 'center' } }}
                          required
                          placeholder="access key"
                          error={error}
                          onChange={handleInputChange}
                          value={accessKey}
                        />
                      </Tooltip>
                      <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={errorMsg !== ''}
                        message={errorMsg}
                        onClose={cleanErrorMsg}
                        sx={{ '&>div': { textAlign: 'center', width: 'inherit', display: 'flex', justifyContent: 'center' } }}
                        action={
                          <Button color="inherit" size="small" onClick={cleanErrorMsg}>
                            Close
                          </Button>
                        }
                      />
                      <Button
                        size="large"
                        sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                        variant="contained"
                        fullWidth={true}
                        type="submit"
                        disabled={error}
                      >
                        register
                      </Button>
                    </Stack>
                  </Box>

                  <Breadcrumbs
                    separator="/"
                    aria-label="breadcrumb"
                    sx={{
                      '& ol': {
                        justifyContent: 'center',
                        margin: 'auto',
                        mt: '20px'
                      }
                    }}
                  >
                    <Link href="/account/access">
                      <Typography variant="body2" color="secondary" sx={Breadcrumb}>
                        access account
                      </Typography>
                    </Link>

                    <Link href="/account/recover">
                      <Typography variant="body2" color="secondary" sx={Breadcrumb}>
                        recover account
                      </Typography>
                    </Link>
                  </Breadcrumbs>

                  <Box textAlign="center">
                    <Typography variant="body2" mt={1} component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                      By clicking on the Register BUTTON or otherwise submitting this FORM, I do hereby agree with the Service Terms and Privacy
                      Policies of the Qarrington website.
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
    </AuthGuard>
  );
};

export default Page;

const Breadcrumb = {
  cursor: 'pointer',
  fontWeight: '500',
  '&:hover': {
    color: '#000'
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
