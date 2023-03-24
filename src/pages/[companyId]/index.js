import { useState, useRef, useEffect } from "react"
import Head from 'next/head'
import Carousel from 'react-material-ui-carousel'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import TabList from '@mui/lab/TabList'
import { Avatar, Badge, Box, Breadcrumbs, Button, Card, Container, Grid, Hidden, Stack, styled, Tab, TextField, Tooltip, Typography } from '@mui/material'
import useSWR from 'swr';
import Company from "@models/company/Company"
import dbConnect from "@lib/dbConnect"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { subscribeToCompany } from "@services/companies-services"

const Page = ({ name, ticker, description, logo, secondsLeft }) => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data: stories } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/stories`, fetcher);
  const { data: guides } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/guides`, fetcher);
  const { data: companies } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies`, fetcher);
  const seconds = useRef()
  const currTime = useRef(Date.now())
  const session = useSession()
  const router = useRouter()

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    seconds.current = Number(secondsLeft)

    const timer = () => {
      const days = Math.floor(seconds.current/24/60/60);
      const hoursLeft = Math.floor((seconds.current) - (days*86400));
      const hours = Math.floor(hoursLeft/3600);
      const minutesLeft = Math.floor((hoursLeft) - (hours*3600));
      const minutes = Math.floor(minutesLeft/60);
      const remainingSeconds = seconds.current % 60;
  
      function pad(n) {
        return (n < 10 ? "0" + n : n);
      }

      if (seconds.current === 0) {
        clearInterval(countdownTimer)
      } else {
        seconds.current -= 1;
      }
  
      setTime({
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(remainingSeconds)
      })
    }

    timer()
    const countdownTimer = setInterval(timer, 1000)

    return () => clearInterval(countdownTimer)
  }, [secondsLeft])

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    if(session.status === "loading") return

    if(session.status === "authenticated") {
      const response = await subscribeToCompany({ accountId: session.data.user.id, companySlug: ticker.toLowerCase() })
      if(response?.error) {
        console.log("Something went wrong!")
        return null
      }
      return router.push('/account')
    } else {
      return router.push('/account/open?companySlug=' + ticker.toLowerCase())
    }
  }

  return (

    <>

      <Head>
        <title>
          Join the {name} ({ticker}) ISO; Initial Subscription Offering • Qarrington
        </title>
        <meta
          name="description"
          content={`When you join the whitelist for the ${name} subscription launch, you must add your phone number to your account to receive SMS 24hrs before the launch.`}
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
                    marginBottom: '10px',
                    justifyContent: 'center'
                  }}
                >
                  <Avatar
                    style={{ width: 40, height: 40 }}
                    alt={name}
                    src={logo}
                  />
                </Box>

                <Typography textTransform="uppercase" variant="body2" fontWeight={700} color="secondary">
                  {name}
                </Typography>

                {/* countdown starts */}

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px', marginTop: '20px' }}>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Card style={{ padding: '10px 0px 20px 0px' }}>
                          <Box style={{ textAlign: 'center' }}>
                            <Box mt={1.2}>
                              <Typography variant="h3" fontWeight={700} color="black">
                                {time.days}
                              </Typography>
                              <Typography mt={0.2} textTransform="uppercase" fontSize="10px" fontWeight={700} color="secondary">
                                days
                              </Typography>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Card style={{ padding: '10px 0px 20px 0px' }}>
                          <Box style={{ textAlign: 'center' }}>
                            <Box mt={1.2}>
                              <Typography variant="h3" fontWeight={700} color="black">
                              {time.hours}
                              </Typography>
                              <Typography mt={0.2} textTransform="uppercase" fontSize="10px" fontWeight={700} color="secondary">
                                hours
                              </Typography>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Card style={{ padding: '10px 0px 20px 0px' }}>
                          <Box style={{ textAlign: 'center' }}>
                            <Box mt={1.2}>
                              <Typography variant="h3" fontWeight={700} color="black">
                                {time.minutes}
                              </Typography>
                              <Typography mt={0.2} textTransform="uppercase" fontSize="10px" fontWeight={700} color="secondary">
                                minutes
                              </Typography>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Card style={{ padding: '10px 0px 20px 0px' }}>
                          <Box style={{ textAlign: 'center' }}>
                            <Box mt={1.2}>
                              <Typography variant="h3" fontWeight={700} color="black">
                                {time.seconds}
                              </Typography>
                              <Typography mt={0.2} textTransform="uppercase" fontSize="10px" fontWeight={700} color="secondary">
                                seconds
                              </Typography>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>

                {/* countdown ends */}

                <Box my={1}>
                  <Tooltip title={`The ${name} (${ticker}) ISO starts on ${new Date(currTime.current + (secondsLeft * 1000))} and ends on ${new Date(currTime.current + (secondsLeft * 1000) + (7*24*60*60*1000))}`} placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Box>

              </Box>

              <form noValidate autoComplete="on" onSubmit={handleSubmit}>

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px', marginTop: '-20px' }}>

                  <Stack spacing={1.2} sx={{ width: '100%' }}>

                    <TextField
                      sx={{ input: { textAlign: "center" } }}
                      required
                      placeholder="email address"
                    />

                    <Button
                      size="large"
                      sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                      variant="contained"
                      fullWidth={true}
                      color="secondary"
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
                  <Typography variant="body2" fontWeight={700} color="black">
                    lower fees
                  </Typography>
                  <Typography variant="body2" fontWeight={700} color="black">
                    global coverage
                  </Typography>
                  <Typography variant="body2" fontWeight={700} color="black">
                    fewer risks
                  </Typography>

                </Breadcrumbs>

                <Box textAlign="center">
                  <Typography variant="body2" mt={1} component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                    By clicking on the Continue BUTTON or otherwise submitting this FORM, I do hereby agree with the Service Terms and Privacy Policies of the Qarrington website.
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
                    An Initial Subscription Offering (ISO) allows you to buy the subscriptions of technology companies like {name} before they're listed on a subscription exchange.
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


export async function getServerSideProps({ params }) {
  try {
      await dbConnect()
      const company = await Company.findOne({ companySlug: params.companyId })
      const parsedCompany = JSON.parse(JSON.stringify(company))

      const hour = parsedCompany.companyIso.companyIsoTime
      const isoTime = new Date(parsedCompany.companyIso.companyIsoDate.split('T')[0] + "T" + (hour.split(':')[0].length === 1 ? ('0' + hour) : hour) + ":00.000+00:00")
      const now = new Date(Date.now())

      const secondsLeft = Math.floor((isoTime - now)/1000)

      return {
          props: {
              name: parsedCompany.companyListing.companyName,
              slug: parsedCompany.companySlug,
              ticker: parsedCompany.companyListing.companyTicker,
              description: parsedCompany.companyListing.companyDescription,
              logo: parsedCompany.companyListing.companyLogo,
              secondsLeft
          }
      }
  } catch (error) {
      return {
          notFound: true
      }
  }
}