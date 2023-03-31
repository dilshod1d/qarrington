import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarGroup, Box, Button, Card, Grid, Typography } from '@mui/material';
import RightbarFooter from '../footer/RightbarFooter';

const Component = () => {

  return (

    <div style={{ position: 'sticky', top: '100px' }}>

      <Grid container spacing={1}>
        <Grid item xs={12}>

          <Card style={{ padding: '40px' }}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <AvatarGroup max={3}>
                <Avatar style={{ width: 30, height: 30 }}
                  alt="Qarringtons" src="/assets/media/accounts/male/065.webp" />
                <Avatar style={{ width: 60, height: 60 }}
                  alt="Qarringtons" src="/assets/media/accounts/female/090.webp" />
                <Avatar style={{ width: 30, height: 30 }}
                  alt="Qarringtons" src="/assets/media/accounts/male/076.webp" />
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
                It's impossible to imagine a world, where Qarringtons say they don't want <Typography component="span" color="primary" fontWeight={600}>low prices</Typography> and <Typography component="span" color="primary" fontWeight={600}>high purchasing power</Typography>.
              </Typography>
            </Box>
            <Box>
              <Link href="/challenges">
                <Button
                  size="medium"
                  style={{ textTransform: 'uppercase', fontSize: '12px' }}
                  variant="outlined"
                  fullWidth={true}
                >
                  here's why
                </Button>
              </Link>
            </Box>
          </Card>

          <RightbarFooter />

        </Grid>
      </Grid>

    </div>

  )

}

export default Component;