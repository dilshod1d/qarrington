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

    const [value, setValue] = useState('1');

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
                                    <TabLabel label="StartUp" value="1" />
                                    <TabLabel label="Property" value="2" />
                                </TabsWrapper>
                            </Box>

                            <Box style={{ marginBottom: '0px', marginTop: '16px' }}>

                                {/* subscriber tab starts */}

                                <TabPanel sx={{ padding: 0 }} value="1">

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

                                {/* investor tab starts */}

                                <TabPanel sx={{ padding: 0 }} value="2">

                                    <Box textAlign="center" mb={2}>
                                        {stories && Array.isArray(stories) && stories?.map(({ storyByInvestor }) => (
                                            <>
                                                <Carousel>
                                                    {storyByInvestor && Array.isArray(storyByInvestor) && storyByInvestor?.map(({ _id, storyByInvestorName, storyByInvestorTitle, storyByInvestorAvatar, storyByInvestorContent, storyByInvestorIsActive }) => (
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
                                                                    variant={storyByInvestorIsActive}
                                                                >
                                                                    <Avatar
                                                                        style={{ width: 80, height: 80 }}
                                                                        alt={storyByInvestorName}
                                                                        src={storyByInvestorAvatar}
                                                                    />
                                                                </StyledBadge>
                                                            </Box>
                                                            <Box marginTop="16px">
                                                                <Typography variant="h5" component="div" fontWeight="600" gutterBottom>{storyByInvestorName}</Typography>
                                                                <Typography variant="body" component="div" gutterBottom>{storyByInvestorTitle}</Typography>
                                                                <Typography variant="h5" component="div" fontWeight="600">{storyByInvestorContent}</Typography>
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                </Carousel>
                                            </>
                                        ))}
                                    </Box>

                                    <Grid item xs={12} mt={2}>
                                        <Grid container spacing={1}>
                                            {guides && Array.isArray(guides) && guides?.map(({ guideForInvestor }) => (
                                                <>
                                                    {guideForInvestor && Array.isArray(guideForInvestor) && guideForInvestor?.map(({ _id, guideForInvestorIcon, guideForInvestorTitle, guideForInvestorContent, guideForInvestorTooltip }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                            <Tooltip title={guideForInvestorTooltip} placement="top">
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
                                                                                alt={guideForInvestorTitle}
                                                                                src={guideForInvestorIcon}
                                                                            />
                                                                        </Badge>
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box mt={1.2}>
                                                                            <Typography variant="h6" fontWeight={700} color="black" textTransform="uppercase">
                                                                                {guideForInvestorTitle}
                                                                            </Typography>
                                                                            <Typography mt={0.2} variant="body2" fontWeight={600} color="secondary">
                                                                                {guideForInvestorContent}
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

                                {/* investor tab ends */}

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
    background: ${theme.colors.gradients.black2};
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