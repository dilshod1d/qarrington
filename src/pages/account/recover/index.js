import React from "react";
import Link from 'next/link';
import Head from 'next/head';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Box, Breadcrumbs, Button, Container, Grid, Stack, styled, TextField, Tooltip, Typography, Snackbar } from '@mui/material';
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useValidation } from "@hooks/useValidation";
import MainStoryGuideSlide from '../../../components/slide/MainStoryGuideSlide';

const Page = () => {

  const [secretKey, setSecretKey, { error, errorMsg }, cleanErrorMsg, throwError] = useValidation({ errorMsg: "Secret key doesn't match any account", allowSpaces: false, limitCharacters: 12 })
  const isPrevAuthenticate = useRef(null)
  const session = useSession()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const options = { redirect: false, secretKey }
    const res = await signIn("credentials", options)
    if (res?.error) {
      throwError()
      return
    }
  }

  useEffect(() => {
    if (session.status === "unauthenticated") isPrevAuthenticate.current = true

    if (session.status === "authenticated" && !isPrevAuthenticate.current) {
      router.push(`/account`)
    } else if (session.status === "authenticated" && isPrevAuthenticate.current) {
      router.push(`/account/open/${session.data.user.id}`)
    }
  }, [session])

  const handleInputChange = (e) => {
    setSecretKey(e.target.value)
  }

  return session?.status === "loading" || session?.status === "authenticated" ? null : (

    <>

      <Head>
        <title>Recover Account • Qarrington</title>
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
                  If you have lost your accessKey, no worries
                  <Tooltip title="Subscriptions only give you access to a company's products and services, they don't represent investments in the firm." placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  It's ok to forget or misplace your accessKey, if that's your case, kindly enter your secretKey below to recover it. If you can't remember your secretKey either, you'd need a new account.
                </Typography>

              </Box>

              <form noValidate autoComplete="on" onSubmit={handleSubmit}>

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>

                  <Stack spacing={1.2} sx={{ width: '100%' }}>

                    <Tooltip title="Kindly provide your secretKey below to quickly reset or recover your Qarrington account without your email address." placement="top">
                      <TextField
                        sx={{ input: { textAlign: "center" } }}
                        required
                        placeholder="secret key"
                        error={error}
                        onChange={handleInputChange}
                        value={secretKey}
                      />
                    </Tooltip>
                    <Snackbar
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                      open={errorMsg !== ''}
                      message={errorMsg}
                      autoHideDuration={3000}
                      onClose={cleanErrorMsg}
                      sx={{ '&>div': { textAlign: "center", width: "inherit", display: "flex", justifyContent: "center" } }}
                    />
                    <Button
                      size="large"
                      sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                      variant="contained"
                      fullWidth={true}
                      type="submit"
                    >
                      continue
                    </Button>

                  </Stack>

                </Box>

                <Breadcrumbs separator="/" aria-label="breadcrumb"
                  sx={{
                    "& ol": {
                      justifyContent: "center",
                      margin: "auto",
                      mt: "20px"
                    }
                  }}>
                  <Link href="/account/open">
                    <Typography variant="body2" color="secondary" sx={Breadcrumb}>
                      open account
                    </Typography>
                  </Link>

                  <Link href="/account/access">
                    <Typography variant="body2" color="secondary" sx={Breadcrumb}>
                      access account
                    </Typography>
                  </Link>

                </Breadcrumbs>

                <Box textAlign="center">
                  <Typography variant="body2" mt={1} component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                    In order to sell subscriptions and receive payouts, you're required to provide verifiable personal, business, bank, and contact details from within your account.
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

}

export default Page;

const Breadcrumb = {
  cursor: "pointer",
  fontWeight: "500",
  "&:hover": {
    color: '#000'
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

const Body = {
  backgroundColor: "#ffffff"
};