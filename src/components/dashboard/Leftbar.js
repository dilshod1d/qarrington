import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarGroup, Badge, Card, Grid, styled, Tooltip, Typography } from '@mui/material';
import InsightsTwoToneIcon from '@mui/icons-material/InsightsTwoTone';
import KeyboardCommandKeyTwoToneIcon from '@mui/icons-material/KeyboardCommandKeyTwoTone';
import TagTwoToneIcon from '@mui/icons-material/TagTwoTone';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const Component = () => {

  // nested
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  // selected
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (

    <div style={{ position: 'sticky', top: '100px' }}>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card style={{ padding: '40px' }}>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <nav aria-label="main mailbox folders">
                <List>
                  <ListItem disablePadding>
                    <Link href={`/dashboard`}>
                      <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}>
                        <ListItemText primary="Dashboard" />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                </List>
              </nav>
              <Divider />
              <nav aria-label="main mailbox folders">
                <List>
                  <ListItem disablePadding>
                    <Link href={`/dashboard/briefs`}>
                      <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}>
                        <ListItemText primary="Briefs" />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link href={`dashboard/topics`}>
                      <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}>
                        <ListItemText primary="Topics" />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                </List>
              </nav>
              <Divider />
              <nav aria-label="secondary mailbox folders">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedIndex === 3}
                      onClick={(event) => handleListItemClick(event, 3)}>
                      <ListItemText primary="Trash" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Box>

          </Card>

        </Grid>
      </Grid>

    </div>

  )

}

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