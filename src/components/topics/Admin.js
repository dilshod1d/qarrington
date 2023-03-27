import React from 'react';
import { Avatar, Badge, Box, Card, Grid, styled, Typography } from '@mui/material';

const Component = () => {

  return (

    <Grid style={{ position: 'sticky', top: '100px' }}>
      <Grid container spacing={1}>

        {accounts && Array.isArray(accounts) && accounts?.slice(0, 1).map(({ _id, accountPersonal, accountProfile, accountStatus }) => (
          <Grid key={_id} item xs={12}>
            <Card style={{ padding: '40px' }}>
              <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  variant={accountStatus.accountIsActive}
                >
                  <Avatar
                    style={{ width: 65, height: 65 }}
                    alt={accountPersonal.accountFirstName}
                    src={accountProfile.accountAvatarUrl}
                  />
                </StyledBadge>
              </Box>
              <Box mt={0} style={{ textAlign: 'center' }}>
                <Box mt={1.5} mb={0.5}>
                  <Typography gutterBottom variant="h4" fontWeight={700} color="black">
                    {accountPersonal.accountFirstName}
                  </Typography>
                  <Typography variant="body" fontWeight={400} color="secondary">
                    {accountProfile.accountCurrentTitle}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={600} color="secondary">
                    {accountProfile.accountPrimaryGoal}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}

      </Grid>
    </Grid>

  )
}

export default Component

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

const accounts = [
  {
    _id: 1,
    accountPersonal: {
      accountFirstName: "Maria"
    },
    accountProfile: {
      accountAvatarUrl: "/assets/media/team/maria.webp",
      accountCurrentTitle: "Account Manager",
      accountPrimaryGoal: "I joined Qarrington to help startup companies raise capital that is equity and debt free."
    },
    accountStatus: {
      accountIsActive: "dot"
    }
  }
]