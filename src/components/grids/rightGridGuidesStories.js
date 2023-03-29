import Carousel from 'react-material-ui-carousel';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import { Avatar, Badge, Box, Card, Grid, styled, Tab, TextField, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

const RightGridGuidesStories = ({ stories, guides }) => {
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <TabsWrapper
            onChange={handleChange}
            indicatorColor="secondary"
            TabIndicatorProps={{
              sx: { backgroundColor: 'transparent', height: 4 }
            }}
            sx={{
              '& button:hover': { backgroundColor: '#ffffff' },
              '& button:active': { backgroundColor: '#b6b6b6' },
              '& button.Mui-selected': { backgroundColor: '#000000' },
              '& div.MuiTabs-scroller': { overflowY: 'auto' }
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
              {stories.length > 0 &&
                stories.map(({ _id, storyBySubscriber }) => (
                  <Carousel key={_id}>
                    {storyBySubscriber.length > 0 &&
                      storyBySubscriber.map(
                        ({
                          _id,
                          storyBySubscriberName,
                          storyBySubscriberTitle,
                          storyBySubscriberAvatar,
                          storyBySubscriberContent,
                          storyBySubscriberIsActive
                        }) => (
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
                                variant={storyBySubscriberIsActive}
                              >
                                <Avatar style={{ width: 80, height: 80 }} alt={storyBySubscriberName} src={storyBySubscriberAvatar} />
                              </StyledBadge>
                            </Box>
                            <Box marginTop="16px">
                              <Typography variant="h5" component="div" fontWeight="600" gutterBottom>
                                {storyBySubscriberName}
                              </Typography>
                              <Typography variant="body" component="div" gutterBottom>
                                {storyBySubscriberTitle}
                              </Typography>
                              <Typography variant="h5" component="div" fontWeight="600">
                                {storyBySubscriberContent}
                              </Typography>
                            </Box>
                          </Box>
                        )
                      )}
                  </Carousel>
                ))}
            </Box>

            <Grid item xs={12} mt={2}>
              <Grid container spacing={1}>
                {guides.length > 0 && guides.map(({ _id, guideForSubscriber }) => (
                    <div key={_id}>
                      {guideForSubscriber &&
                        Array.isArray(guideForSubscriber) &&
                        guideForSubscriber?.map(
                          ({ _id, guideForSubscriberIcon, guideForSubscriberTitle, guideForSubscriberContent, guideForSubscriberTooltip }) => (
                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                              <Tooltip title={guideForSubscriberTooltip} placement="top">
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
                                      badgeContent={<InfoRoundedIcon fontSize="small" color="primary" />}
                                    >
                                      <Avatar style={{ width: 50, height: 50 }} alt={guideForSubscriberTitle} src={guideForSubscriberIcon} />
                                    </Badge>
                                  </Box>
                                  <Box style={{ textAlign: 'center' }}>
                                    <Box mt={1.2}>
                                      <Typography variant="h6" fontWeight={700} color="black" textTransform="uppercase">
                                        {guideForSubscriberTitle}
                                      </Typography>
                                      <Typography mt={0.2} variant="body2" fontWeight={600} color="secondary">
                                        {guideForSubscriberContent}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Card>
                              </Tooltip>
                            </Grid>
                          )
                        )}
                    </div>
                  ))}
              </Grid>
            </Grid>
          </TabPanel>

          {/* customer tab ends */}

          {/* underwriter tab starts */}

          <TabPanel sx={{ padding: 0 }} value="2">
            <Box textAlign="center" mb={2}>
              {stories.length > 0 && stories.map(({ _id, storyByUnderwriter }) => (
                  <Carousel key={_id}>
                    {storyByUnderwriter &&
                      Array.isArray(storyByUnderwriter) &&
                      storyByUnderwriter?.map(
                        ({
                          _id,
                          storyByUnderwriterName,
                          storyByUnderwriterTitle,
                          storyByUnderwriterAvatar,
                          storyByUnderwriterContent,
                          storyByUnderwriterIsActive
                        }) => (
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
                                <Avatar style={{ width: 80, height: 80 }} alt={storyByUnderwriterName} src={storyByUnderwriterAvatar} />
                              </StyledBadge>
                            </Box>
                            <Box marginTop="16px">
                              <Typography variant="h5" component="div" fontWeight="600" gutterBottom>
                                {storyByUnderwriterName}
                              </Typography>
                              <Typography variant="body" component="div" gutterBottom>
                                {storyByUnderwriterTitle}
                              </Typography>
                              <Typography variant="h5" component="div" fontWeight="600">
                                {storyByUnderwriterContent}
                              </Typography>
                            </Box>
                          </Box>
                        )
                      )}
                  </Carousel>
                ))}
            </Box>

            <Grid item xs={12} mt={2}>
              <Grid container spacing={1}>
                {guides.length > 0 && guides.map(({ _id, guideForFounder }) => (
                    <div key={_id}>
                      {guideForFounder &&
                        Array.isArray(guideForFounder) &&
                        guideForFounder?.map(({ _id, guideForFounderIcon, guideForFounderTitle, guideForFounderContent, guideForFounderTooltip }) => (
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
                                    badgeContent={<InfoRoundedIcon fontSize="small" color="primary" />}
                                  >
                                    <Avatar style={{ width: 50, height: 50 }} alt={guideForFounderTitle} src={guideForFounderIcon} />
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
                    </div>
                  ))}
              </Grid>
            </Grid>
          </TabPanel>

          {/* underwriter tab ends */}

          {/* founder tab starts */}

          <TabPanel sx={{ padding: 0 }} value="3">
            <Box textAlign="center" mb={2}>
              {stories.length > 0 && stories.map(({ _id, storyByFounder }) => (
                  <Carousel key={_id}>
                    {storyByFounder &&
                      Array.isArray(storyByFounder) &&
                      storyByFounder?.map(
                        ({ _id, storyByFounderName, storyByFounderTitle, storyByFounderAvatar, storyByFounderContent, storyByFounderIsActive }) => (
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
                                <Avatar style={{ width: 80, height: 80 }} alt={storyByFounderName} src={storyByFounderAvatar} />
                              </StyledBadge>
                            </Box>
                            <Box marginTop="16px">
                              <Typography variant="h5" component="div" fontWeight="600" gutterBottom>
                                {storyByFounderName}
                              </Typography>
                              <Typography variant="body" component="div" gutterBottom>
                                {storyByFounderTitle}
                              </Typography>
                              <Typography variant="h5" component="div" fontWeight="600">
                                {storyByFounderContent}
                              </Typography>
                            </Box>
                          </Box>
                        )
                      )}
                  </Carousel>
                ))}
            </Box>

            <Grid item xs={12} mt={2}>
              <Grid container spacing={1}>
                {guides.length > 0 && guides.map(({ _id, guideForFounder }) => (
                    <div key={_id}>
                      {guideForFounder &&
                        Array.isArray(guideForFounder) &&
                        guideForFounder?.map(({ _id, guideForFounderIcon, guideForFounderTitle, guideForFounderContent, guideForFounderTooltip }) => (
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
                                    badgeContent={<InfoRoundedIcon fontSize="small" color="primary" />}
                                  >
                                    <Avatar style={{ width: 50, height: 50 }} alt={guideForFounderTitle} src={guideForFounderIcon} />
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
                    </div>
                  ))}
              </Grid>
            </Grid>
          </TabPanel>

          {/* founder tab ends */}
        </Box>
      </TabContext>
    </>
  );
};

export default RightGridGuidesStories;

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

const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors.gradients.green2};
`
);

const Body = {
  backgroundColor: '#ffffff'
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
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}));
