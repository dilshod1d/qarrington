import React, { useState } from "react";
import Link from 'next/link';
import Head from 'next/head';
import Carousel from 'react-material-ui-carousel';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { Avatar, Badge, Box, Breadcrumbs, Button, Card, Container, Grid, Hidden, Stack, styled, Tab, TextField, Tooltip, Typography } from '@mui/material';
import useSWR from 'swr';
import { createAccount } from "@services/accounts-services";
import { useRouter } from "next/router";

const Page = () => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data: stories } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/stories`, fetcher);
  const { data: guides } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/guides`, fetcher);

  const router = useRouter()

  const [value, setValue] = useState('2');
  const [accessKey, setAccessKey] = useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await createAccount({ accessKey })
      if(!res?.error) {
        router.push('/account/access')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (

    <>

      <Head>
        <title>Open Account • Qarrington</title>
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
                  Qarrington is a subscription exchange, where you participate in the Initial Subscription Offering (ISO) & buy/sell the subscriptions of SaaS companies. It's like stocks but backed by SaaS products.
                </Typography>

              </Box>

              <form noValidate autoComplete="on" onSubmit={handleSubmit}>

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>

                  <Stack spacing={1.2} sx={{ width: '100%' }}>

                    <Tooltip title="Kindly create an accessKey to quickly access your Qarrington account without your personal data such as an email." placement="top">
                      <TextField
                        sx={{ input: { textAlign: "center" } }}
                        required
                        placeholder="access key"
                        onChange={({ target }) => setAccessKey(target.value)}
                        value={accessKey}
                      />
                    </Tooltip>

                    <Button
                      size="large"
                      sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                      variant="contained"
                      fullWidth={true}
                      type="submit"
                    >
                      register
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