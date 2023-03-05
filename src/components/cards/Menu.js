import Link from 'next/link';
import React from 'react';

import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Grid,
  IconButton,
  styled,
  Tooltip,
  Typography
} from '@mui/material';

import InsightsTwoToneIcon from '@mui/icons-material/InsightsTwoTone';
import KeyboardCommandKeyTwoToneIcon from '@mui/icons-material/KeyboardCommandKeyTwoTone';
import TagTwoToneIcon from '@mui/icons-material/TagTwoTone';
import useSWR from 'swr';

const Component = () => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data: accounts } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/accounts`, fetcher);
  const { data: companies } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies`, fetcher);

  return (
    <div style={{ position: 'sticky', top: '100px' }}>
      {/* RightGrid Starts Here */}

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card style={{ padding: '40px' }}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <AvatarGroup max={3}>
                <Avatar style={{ width: 30, height: 30 }}
                  alt="Qarrington Team" src="/assets/media/team/jenn.webp" />
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <SmallAvatar alt="Qarrington Logo" src="/assets/media/subscriptions/qarrington.png" />
                  }
                >
                  {accounts && accounts.slice(0, 1).map(({ _id, accountProfile }) => (
                    <Avatar key={_id} style={{ width: 60, height: 60 }}
                      alt={accountProfile.accountFirstName}
                      src={accountProfile.accountAvatarUrl} />
                  ))}
                </Badge>
                <Avatar style={{ width: 30, height: 30 }}
                  alt="Qarrington Team" src="/assets/media/team/esra.webp" />
              </AvatarGroup>
            </Box>
            <Box style={{ padding: '15px 0px 15px 0px', display: 'flex', justifyContent: 'center' }}>
              <Typography
                component="span"
                variant="body"
                fontSize="13px"
                textAlign="center"
                fontWeight={500}
                color="secondary"
              >
                On Qarrington, our mission is to become the <Typography component="span" color="primary" fontWeight={600}>Nasdaq for SaaS</Typography> so everyone can buy and sell subscriptions with lower fees.
              </Typography>
            </Box>

            <Grid>
              <Box display="flex" justifyContent="center">

                <Tooltip title="My Company" placement="top">
                  <IconButtonWrapper>
                    {companies && companies.slice(0, 1).map(({ _id, companyTicker }) => (
                      <Link key={_id} href={`/companies/${companyTicker}`}>
                        <InsightsTwoToneIcon />
                      </Link>
                    ))}
                  </IconButtonWrapper>
                </Tooltip>

                <Tooltip title="My Portfolio" placement="top">
                  <IconButtonWrapper>
                    <Link href="/dashboard">
                      <KeyboardCommandKeyTwoToneIcon />
                    </Link>
                  </IconButtonWrapper>
                </Tooltip>

                <Tooltip title="My Plans" placement="top">
                  <IconButtonWrapper>
                    <Link href="/plans">
                      <TagTwoToneIcon />
                    </Link>
                  </IconButtonWrapper>
                </Tooltip>

              </Box>
            </Grid>

          </Card>

          {/* RightGrid Ends Here */}

        </Grid>
      </Grid>
    </div>
  );
};

export default Component;

const IconButtonWrapper = styled(Box)(
  ({ theme }) => `
            padding-left: ${theme.spacing(0.8)};
            padding-right: ${theme.spacing(0.8)};
            cursor: pointer;
    `
);

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));