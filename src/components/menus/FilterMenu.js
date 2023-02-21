import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Tab
} from '@mui/material';
import {
  TabContext,
  TabList,
} from '@mui/lab';
import Link from 'next/link';
import useSWR from 'swr';

const Component = () => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/expenses`, fetcher)

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(data);
  return (

    <Container>
      <Box sx={{ marginTop: "108px", marginBottom: 2 }}>
        <Box display="flex" justifyContent="center">
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              indicatorColor="transparent"
              TabIndicatorProps={{
                sx: { backgroundColor: 'transparent', height: 4 }
              }}
              sx={{
                "& button:hover": { backgroundColor: "#c7c7c7" },
                "& button:active": { backgroundColor: "#b6b6b6" },
                "& button.Mui-selected": { backgroundColor: "#a7a7a7" },
                "& div.MuiTabs-scroller": { overflowY: "auto" },
              }}
              scrollButtons="auto"
              variant="scrollable"
              aria-label="scrollable auto tabs example"
            >
              {data && Array.isArray(data) && data?.map(({ _id, lower, proper, picture }) =>
                <Link key={_id} href={`/expenses/${lower}`}>
                  <Tab
                    sx={{
                      padding: "40px",
                      fontSize: "12px",
                      fontWeight: 500
                    }}
                    icon={<Avatar
                      sx={{
                        height: 24,
                        width: 24
                      }}
                      alt={proper}
                      src={picture}
                    />}
                    label={proper}
                  />
                </Link>
              )}
            </TabList>
          </TabContext>
        </Box>
      </Box>
    </Container>

  )

}

export default Component;