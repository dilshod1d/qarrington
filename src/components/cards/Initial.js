import React from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Grid,
  styled,
  Tooltip,
  Typography
} from '@mui/material';
import Link from 'next/link';
import FooterMenu from '../menus/FooterMenu';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import useSWR from 'swr';

const Component = () => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data: companies } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies`, fetcher);

  return (
    <div style={{ position: 'sticky', top: '100px' }}>
      {/* RightGrid Starts Here */}

      <Grid container spacing={1}>
        <Grid item xs={12}>
          {companies && Array.isArray(companies) && companies?.slice(0, 1).map(({ _id, companyTicker, companyListing }) => (
            <Card style={{ padding: '40px' }}>
              <Box style={{ padding: '0px', textAlign: 'center' }}>
                <Tooltip title="An Initial Subscription Offering or ISO allows you to utilize and monetize your subscriptions with SaaS companies." placement="top">
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
                        alt={companyListing.companyName}
                        src={companyListing.companyLogo}
                      />
                    </Badge>
                  </Box>
                </Tooltip>
                <Typography component="div" variant="h1" fontWeight="700" color="black">
                  000
                </Typography>
                <Typography mb={1} variant="body2" fontWeight="500" color="secondary">
                  The <b>Initial Subscription Offering</b> or <b>ISO</b> of {companyTicker} starts in X days and will last for no more than 7 days.
                </Typography>
              </Box>
              <Box>
                <Link href={`/dashboard/${companyTicker}`}>
                  <Button
                    size="large"
                    style={{ color: 'white', textTransform: 'uppercase', fontSize: '12px' }}
                    variant="contained"
                    fullWidth={true}
                  >
                    buy {companyTicker}
                  </Button>
                </Link>
              </Box>
            </Card>
          ))}

          <FooterMenu />

          {/* RightGrid Ends Here */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Component;

const IconButtonWrapper = styled(Box)(
  ({ theme }) => `
          padding-left: ${theme.spacing(0.5)};
          padding-right: ${theme.spacing(0.5)};
          cursor: pointer;
  `
);

const BreadcrumbItem = {
  cursor: 'pointer',
  fontWeight: '500',
  '&:hover': {
    color: '#000'
  }
};

const footer = {
  display: 'flex',
  justifyContent: 'center',
  padding: '20px 20px 10px 20px'
};

const footerBrand = {
  textAlign: 'center'
};