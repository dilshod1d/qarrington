import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Box, Breadcrumbs, Button, Container, Grid, Stack, styled, TextField, Tooltip, Typography, Snackbar } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useAccount } from '@hooks/useAccount';
import { useEffect } from 'react';
import { useValidation } from '@hooks/useValidation';
import MainStoryGuideSlide from '../../../components/slide/MainStoryGuideSlide';
import crypto from 'crypto';

const Page = () => {
  const { logged } = useAccount();
  const [accessKey, setAccessKey, { error, errorMsg }, cleanErrorMsg, throwError] = useValidation({
    errorMsg: "Access key doesn't exist",
    allowSpaces: false,
    limitCharacters: 12
  });
  const router = useRouter();

  useEffect(() => {
    if (logged) router.push('/account');
  }, [logged]);
  const hashKey = (accessKey) => {
    const hashedKey = crypto.createHash('md5').update(accessKey).digest('hex');
    return hashedKey;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hashedAccessKey = hashKey(accessKey);
    const options = { redirect: false, accessKey: hashedAccessKey };
    const res = await signIn('credentials', options);
    if (res?.error) {
      throwError();

      return;
    }
    router.push('/account');
  };

  const handleInputChange = (e) => {
    setAccessKey(e.target.value);
  };

  return logged === undefined || logged ? null : (
    <>
      <Head>
        <title>Access Account • Qarrington</title>
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
                  Access your account without personal data
                  <Tooltip
                    title="Subscriptions only give you access to a company's products and services, they don't represent investments in the firm."
                    placement="top"
                  >
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  If in any circumstances you can't remember your accessKey, just navigate to{' '}
                  <Link href="/account/recover">
                    <Typography
                      component="span"
                      color="primary"
                      variant="h6"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#000'
                        }
                      }}
                    >
                      account recovery
                    </Typography>
                  </Link>{' '}
                  and enter your secretKey. You'd need a new account if you can't remember your secretKey.
                </Typography>
              </Box>

              <form noValidate autoComplete="on" onSubmit={handleSubmit}>
                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>
                  <Stack spacing={1.2} sx={{ width: '100%' }}>
                    <Tooltip
                      title="Kindly provide your accessKey to quickly log in to your Qarrington account without your personal data i.e. an email."
                      placement="top"
                    >
                      <TextField
                        sx={{ input: { textAlign: 'center' } }}
                        required
                        placeholder="access key"
                        error={error}
                        onChange={handleInputChange}
                        value={accessKey}
                        disabled={logged === undefined}
                      />
                    </Tooltip>
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
                      fullWidth={true}
                      type="submit"
                      disabled={logged === undefined}
                    >
                      Login
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
                  <Link href="/account/open">
                    <Typography variant="body2" color="secondary" sx={Breadcrumb}>
                      open account
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
                    In order to sell subscriptions and receive payouts, you're required to provide verifiable personal, business, bank, and contact
                    details from within your account.
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
