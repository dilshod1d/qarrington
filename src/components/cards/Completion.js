import { Box, Button, Card, Grid, styled, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import FooterMenu from '../menus/FooterMenu';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#130f40' : '#308fe8',
  },
}));

const Component = ({ account }) => {

  return (

    <div style={{ position: 'sticky', top: '100px' }}>

      {/* RightGrid Starts Here */}

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card style={{ padding: '40px' }}>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <CircularProgress variant='determinate' size={80} thickness={6} value={account?.accountStatus?.accountCompletionRate} />
                <Typography variant='body2' fontWeight={600} position='absolute'>{account?.accountStatus?.accountCompletionRate}%</Typography>
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
                Dear {account?.accountPersonal?.accountFirstName}, you must provide verifiable <Typography component="span" color="primary" fontWeight={600}>personal</Typography>, <Typography component="span" color="primary" fontWeight={600}>business</Typography>, <Typography component="span" color="primary" fontWeight={600}>bank</Typography>, and <Typography component="span" color="primary" fontWeight={600}>contact</Typography> details to receive payouts.
              </Typography>
            </Box>
            <Box>
              <Link href="/account/update">
                <Button
                  size="large"
                  style={{ textTransform: 'uppercase', fontSize: '12px' }}
                  variant="outlined"
                  fullWidth={true}
                >
                  update
                </Button>
              </Link>
            </Box>
          </Card>

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