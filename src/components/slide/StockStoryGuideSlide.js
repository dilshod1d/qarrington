import React from "react";
import Carousel from 'react-material-ui-carousel';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Badge, Box, Card, Container, Grid, Hidden, styled, Tooltip, Typography } from '@mui/material';
import useSWR from 'swr';

const Component = () => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: stories } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/stories`, fetcher);
    const { data: guides } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/guides`, fetcher);

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

                        <Box style={{ marginBottom: '0px', marginTop: '16px' }}>

                            {/* trader tab starts */}

                            <Box textAlign="center" mb={2}>
                                {stories && Array.isArray(stories) && stories?.map(({ storyByTrader }) => (
                                    <>
                                        <Carousel>
                                            {storyByTrader && Array.isArray(storyByTrader) && storyByTrader?.map(({ _id, storyByTraderName, storyByTraderTitle, storyByTraderAvatar, storyByTraderContent, storyByTraderIsActive }) => (
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
                                                            variant={storyByTraderIsActive}
                                                        >
                                                            <Avatar
                                                                style={{ width: 80, height: 80 }}
                                                                alt={storyByTraderName}
                                                                src={storyByTraderAvatar}
                                                            />
                                                        </StyledBadge>
                                                    </Box>
                                                    <Box marginTop="16px">
                                                        <Typography variant="h5" component="div" fontWeight="600" gutterBottom>{storyByTraderName}</Typography>
                                                        <Typography variant="body" component="div" gutterBottom>{storyByTraderTitle}</Typography>
                                                        <Typography variant="h5" component="div" fontWeight="600">{storyByTraderContent}</Typography>
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

                            {/* trader tab ends */}

                        </Box>

                        <Box textAlign="center" mt={2}>
                            <Typography component="span" variant="body2" fontWeight={600} color="black">
                                An Initial Subscription Offering or ISO allows you to buy the subscriptions of innovative early-stage startup companies before they're listed on a subscription exchange.
                            </Typography>
                        </Box>

                        {/* tab stops */}

                    </Container>

                </GridWrapper>

            </Hidden>

        </>

    );

}

export default Component;

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