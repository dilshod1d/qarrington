import { useState } from "react";
import Link from 'next/link';
import Head from 'next/head';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Box, Button, Container, Grid, Stack, styled, TextField, Tooltip, Typography, Snackbar, Autocomplete, createFilterOptions } from '@mui/material';
import { useEffect } from "react";
import { updateAccount } from "@services/accounts-services";
import { useAccount } from "@hooks/useAccount";
import { useUpdateAccount } from "@hooks/useUpdateAccount";
import { parseToObj } from "@helpers/accounts-update-helpers";
import MainStoryGuideSlide from '../../../components/slide/MainStoryGuideSlide';
import AdminGuard from '../../../../components/isadmin';
import { useSession } from 'next-auth/react';

const Page = () => {
  const { data: session, status } = useSession();

  const OPTIONS_LIMIT = 3
  const { account } = useAccount()
  const { contentData, currentContentData, goNext, goBack, error, errorMsg, cleanError, cleanErrorMsg, finish, lastInput } = useUpdateAccount({ account })
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    const newInput = typeof e === "string" ? e : e.target.value
    cleanError()
    if (currentContentData.canModify) {
      setInputValue(currentContentData.inputConstraints(inputValue, newInput))
    }
  }

  const handleNext = (e) => {
    e.preventDefault()
    goNext({ inputValue, setInputValue })
  }

  const handleBack = () => {
    goBack({ inputValue, setInputValue })
  }

  const filterOptions = createFilterOptions({
    limit: OPTIONS_LIMIT
  });


  useEffect(() => {
    if (currentContentData) {
      setInputValue(currentContentData.defaultValue)
    }
  }, [currentContentData])

  useEffect(() => {
    const update = async () => {
      try {
        const toSend = parseToObj(contentData)
        const res = await updateAccount(toSend)
        if (res.status >= 200 && res.status < 300) return

        console.log("Something went wrong!")
      } catch {
        console.log(error)
      }
    }
    if (finish) update()
  }, [finish])

  return !account ? null : (

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
                  Dear {account?.accountPersonal?.accountFirstName ? account?.accountPersonal?.accountFirstName : "guest"}, in order to sell subscriptions on Qarrington and receive payouts to your bank account, you're required to provide verifiable <b>personal</b>, <b>business</b>, <b>bank</b>, and <b>contact</b> details.
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
                        <Stack spacing={1.2} sx={{ width: '100%' }}>
                          <Tooltip title={currentContentData.title} placement="top">
                            {
                              currentContentData?.options?.length > 0
                                ? (<Autocomplete
                                  filterOptions={filterOptions}
                                  options={currentContentData.options}
                                  onInputChange={(e, value) => handleInputChange(value)}
                                  value={inputValue}
                                  isOptionEqualToValue={() => true}
                                  sx={{ button: { textAlign: "center" }, '& .MuiAutocomplete-inputRoot': { padding: "9px !important" }, svg: { display: "none" }, button: { display: "none" } }}
                                  renderInput={(params) =>
                                    <TextField
                                      {...params}
                                      sx={{ input: { textAlign: "center" } }}
                                      placeholder={currentContentData.placeholder}
                                    />}
                                />) : (
                                  <TextField
                                    sx={{ input: { textAlign: "center" } }}
                                    readOnly={!currentContentData.canModify}
                                    placeholder={currentContentData.placeholder}
                                    onChange={handleInputChange}
                                    value={inputValue}
                                    error={error}
                                  />
                                )
                            }
                          </Tooltip>
                        </Stack>
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
                          onClick={handleNext}
                        >
                          {lastInput ? "Save" : "Next"}
                        </Button>
                        <Button
                          style={FormButton}
                          disabled={finish}
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

          <MainStoryGuideSlide />

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