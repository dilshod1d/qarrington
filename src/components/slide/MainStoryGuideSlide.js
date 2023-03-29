import React, { useState } from "react";
import Carousel from 'react-material-ui-carousel';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { Avatar, Badge, Box, Card, Container, Grid, Hidden, styled, Tab, Tooltip, Typography } from '@mui/material';
import useSWR from 'swr';

const Component = () => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: stories } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/stories`, fetcher);
    const { data: guides } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/guides`, fetcher);

    const [value, setValue] = useState('2');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <>

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
                                    <TabLabel label="Underwriters" value="1" />
                                    <TabLabel label="Founders" value="2" />
                                    <TabLabel label="Subscribers" value="3" />
                                    <TabLabel label="Publishers" value="4" />
                                </TabsWrapper>
                            </Box>

                            <Box style={{ marginBottom: '0px', marginTop: '16px' }}>

                                {/* underwriter tab starts */}

                                <TabPanel sx={{ padding: 0 }} value="1">

                                    <Box textAlign="center" mb={2}>
                                        {stories && Array.isArray(stories) && stories?.map(({ storyByUnderwriter }) => (
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
                                            {guides && Array.isArray(guides) && guides?.map(({ guideForUnderwriter }) => (
                                                <>
                                                    {guideForUnderwriter && Array.isArray(guideForUnderwriter) && guideForUnderwriter?.map(({ _id, guideForUnderwriterIcon, guideForUnderwriterTitle, guideForUnderwriterContent, guideForUnderwriterTooltip }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                            <Tooltip title={guideForUnderwriterTooltip} placement="top">
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
                                                                                alt={guideForUnderwriterTitle}
                                                                                src={guideForUnderwriterIcon}
                                                                            />
                                                                        </Badge>
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box mt={1.2}>
                                                                            <Typography variant="h6" fontWeight={700} color="black" textTransform="uppercase">
                                                                                {guideForUnderwriterTitle}
                                                                            </Typography>
                                                                            <Typography mt={0.2} variant="body2" fontWeight={600} color="secondary">
                                                                                {guideForUnderwriterContent}
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

                                <TabPanel sx={{ padding: 0 }} value="2">

                                    <Box textAlign="center" mb={2}>
                                        {stories && Array.isArray(stories) && stories?.map(({ storyByFounder }) => (
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
                                            {guides && Array.isArray(guides) && guides?.map(({ guideForFounder }) => (
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

                                {/* subscriber tab starts */}

                                <TabPanel sx={{ padding: 0 }} value="3">

                                    <Box textAlign="center" mb={2}>
                                        {stories && Array.isArray(stories) && stories?.map(({ storyBySubscriber }) => (
                                            <>
                                                <Carousel>
                                                    {storyBySubscriber && Array.isArray(storyBySubscriber) && storyBySubscriber?.map(({ _id, storyBySubscriberName, storyBySubscriberTitle, storyBySubscriberAvatar, storyBySubscriberContent, storyBySubscriberIsActive }) => (
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
                                                                    <Avatar
                                                                        style={{ width: 80, height: 80 }}
                                                                        alt={storyBySubscriberName}
                                                                        src={storyBySubscriberAvatar}
                                                                    />
                                                                </StyledBadge>
                                                            </Box>
                                                            <Box marginTop="16px">
                                                                <Typography variant="h5" component="div" fontWeight="600" gutterBottom>{storyBySubscriberName}</Typography>
                                                                <Typography variant="body" component="div" gutterBottom>{storyBySubscriberTitle}</Typography>
                                                                <Typography variant="h5" component="div" fontWeight="600">{storyBySubscriberContent}</Typography>
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                </Carousel>
                                            </>
                                        ))}
                                    </Box>

                                    <Grid item xs={12} mt={2}>
                                        <Grid container spacing={1}>
                                            {guides && Array.isArray(guides) && guides?.map(({ guideForSubscriber }) => (
                                                <>
                                                    {guideForSubscriber && Array.isArray(guideForSubscriber) && guideForSubscriber?.map(({ _id, guideForSubscriberIcon, guideForSubscriberTitle, guideForSubscriberContent, guideForSubscriberTooltip }) => (
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
                                                                            badgeContent={
                                                                                <InfoRoundedIcon fontSize="small" color="primary" />
                                                                            }
                                                                        >
                                                                            <Avatar
                                                                                style={{ width: 50, height: 50 }}
                                                                                alt={guideForSubscriberTitle}
                                                                                src={guideForSubscriberIcon}
                                                                            />
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
                                                    ))}
                                                </>
                                            ))}
                                        </Grid>
                                    </Grid>

                                </TabPanel>

                                {/* subscriber tab ends */}

                                {/* publisher tab starts */}

                                <TabPanel sx={{ padding: 0 }} value="4">

                                    <Box textAlign="center" mb={2}>
                                        {stories && Array.isArray(stories) && stories?.map(({ storyByPublisher }) => (
                                            <>
                                                <Carousel>
                                                    {storyByPublisher && Array.isArray(storyByPublisher) && storyByPublisher?.map(({ _id, storyByPublisherName, storyByPublisherTitle, storyByPublisherAvatar, storyByPublisherContent, storyByPublisherIsActive }) => (
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
                                                                    variant={storyByPublisherIsActive}
                                                                >
                                                                    <Avatar
                                                                        style={{ width: 80, height: 80 }}
                                                                        alt={storyByPublisherName}
                                                                        src={storyByPublisherAvatar}
                                                                    />
                                                                </StyledBadge>
                                                            </Box>
                                                            <Box marginTop="16px">
                                                                <Typography variant="h5" component="div" fontWeight="600" gutterBottom>{storyByPublisherName}</Typography>
                                                                <Typography variant="body" component="div" gutterBottom>{storyByPublisherTitle}</Typography>
                                                                <Typography variant="h5" component="div" fontWeight="600">{storyByPublisherContent}</Typography>
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                </Carousel>
                                            </>
                                        ))}
                                    </Box>

                                    <Grid item xs={12} mt={2}>
                                        <Grid container spacing={1}>
                                            {guides && Array.isArray(guides) && guides?.map(({ guideForPublisher }) => (
                                                <>
                                                    {guideForPublisher && Array.isArray(guideForPublisher) && guideForPublisher?.map(({ _id, guideForPublisherIcon, guideForPublisherTitle, guideForPublisherContent, guideForPublisherTooltip }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                            <Tooltip title={guideForPublisherTooltip} placement="top">
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
                                                                                alt={guideForPublisherTitle}
                                                                                src={guideForPublisherIcon}
                                                                            />
                                                                        </Badge>
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box mt={1.2}>
                                                                            <Typography variant="h6" fontWeight={700} color="black" textTransform="uppercase">
                                                                                {guideForPublisherTitle}
                                                                            </Typography>
                                                                            <Typography mt={0.2} variant="body2" fontWeight={600} color="secondary">
                                                                                {guideForPublisherContent}
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

                                {/* publisher tab ends */}

                            </Box>

                        </TabContext>

                        {/* tab stops */}

                    </Container>

                </GridWrapper>

            </Hidden>

        </>

    );

}

export default Component;

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

const GridWrapper = styled(Grid)(
    ({ theme }) => `
    background: ${theme.colors.gradients.green2};
`
);

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