import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/dashboard/Navbar';
import Admin from '../../../../components/dashboard/Admin';
import Company from '../../../../components/dashboard/Company';
import Footer from '../../../../components/dashboard/Footer';
import { Button, Card, Container, Grid, Stack, TextField } from '@mui/material';
import slugify from '../../../../helpers/slugify';
import AdminGuard from '../../../../components/isadmin';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { briefId } = router.query;
  const [formData, setFormData] = useState({
    briefTitle: '',
    briefDetail: '',
    briefSummary: '',
    briefTopic: '',
    briefSlug: ''
  });
  const [brief, setBrief] = useState(null);
  useEffect(() => {
    if (!briefId) return;

    const fetchBrief = async () => {
      const response = await axios.get(`/api/briefs/${briefId}`);
      setBrief(response.data);
    };

    fetchBrief();
  }, [briefId]);

  useEffect(() => {
    if (brief) {
      setFormData({
        briefTitle: brief.briefTitle,
        briefDetail: brief.briefDetail,
        briefSummary: brief.briefSummary,
        briefTopic: brief.briefTopic,
        briefSlug: brief.briefSlug
      });
    }
  }, [brief]);

  const handleChange = (e, name) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  if (status == 'loading') {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e) => {
    console.log('formdata', formData);
    e.preventDefault();
    const briefSlug = slugify(formData.briefSlug);

    try {
      if (!briefId) {
        // Create a new brief
        await axios.post('/api/briefs', { ...formData, briefSlug });
        alert('Brief created successfully');
      } else if (brief && brief._id === briefId) {
        // Update the brief
        await axios.put(`/api/briefs/${briefId}`, { ...formData, briefSlug });
        alert('Brief updated successfully');
      } else {
        // Duplicate the brief
        await axios.post('/api/briefs', { ...formData, briefSlug });
        alert('Brief duplicated successfully');
      }
      router.push('/dashboard/briefs');
    } catch (error) {
      console.error('Error submitting the brief', error);
      alert('Error submitting the brief');
    }
  };

  const handleDelete = async () => {
    if (!briefId) return;

    try {
      await axios.delete(`/api/briefs/${briefId}`);
      alert('Brief deleted successfully');
      router.push('/dashboard/briefs');
    } catch (error) {
      console.error('Error deleting the brief', error);
      alert('Error deleting the brief');
    }
  };

  return (
    <AdminGuard isAdmin={session?.user.isAdmin}>
      <div>
        <Head>
          <title>Manage Brief • Qarrington</title>
          <meta
            name="description"
            content="Help users find topical answers to all types of questions about using Qarrington. Alternatively, users can contact our account managers for 24/7 support."
          />
        </Head>

        <Navbar />

        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <Admin />
            </Grid>

            <Grid item xs={12} md={6} lg={6} mt={12} mb={4}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Card style={{ padding: '60px', marginBottom: '10px' }}>
                    <Stack spacing={1} sx={{ width: '100%' }} direction="row">
                      <Button
                        size="large"
                        sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                        variant="outlined"
                        color="secondary"
                        fullWidth={true}
                      >
                        copy
                      </Button>
                      <Button
                        onClick={handleDelete}
                        size="large"
                        sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                        variant="outlined"
                        color="error"
                        fullWidth={true}
                      >
                        remove
                      </Button>
                      <Button
                        size="large"
                        sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                        variant="outlined"
                        color="primary"
                        fullWidth={true}
                      >
                        view
                      </Button>
                    </Stack>
                  </Card>

                  {/*  */}

                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                      <Stack spacing={2} sx={{ width: '100%' }}>
                        <TextField
                          required
                          id="outlined-required"
                          name="briefTitle"
                          value={formData.briefTitle}
                          onChange={(e) => handleChange(e, 'briefTitle')}
                          placeholder="briefTitle"
                          inputProps={{ style: { textAlign: 'center' } }}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          name="briefSlug"
                          value={formData.briefSlug}
                          onChange={(e) => handleChange(e, 'briefSlug')}
                          placeholder="briefSlug"
                          inputProps={{ style: { textAlign: 'center' } }}
                        />
                      </Stack>
                    </Card>

                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                      <Stack spacing={2} sx={{ width: '100%' }}>
                        <TextField
                          required
                          id="outlined-required"
                          name="briefTopic"
                          value={formData.briefTopic}
                          onChange={(e) => handleChange(e, 'briefTopic')}
                          placeholder="briefTopic"
                          inputProps={{ style: { textAlign: 'center' } }}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          name="briefSummary"
                          value={formData.briefSummary}
                          onChange={(e) => handleChange(e, 'briefSummary')}
                          placeholder="briefSummary"
                          inputProps={{ style: { textAlign: 'center' } }}
                        />
                      </Stack>
                    </Card>

                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                      <Stack spacing={2} sx={{ width: '100%' }}>
                        {/* <TextField
                          required
                          id="outlined-required"
                          name="briefDetail"
                          value={formData.briefDetail}
                          onChange={handleChange}
                          placeholder="briefDetail"
                          inputProps={{ style: { textAlign: 'center' } }}
                        /> */}

                        <SimpleMDE
                          value={formData.briefDetail}
                          onChange={(value) => setFormData({ ...formData, briefDetail: value })}
                          options={{
                            placeholder: 'briefDetai'
                          }}
                          inputProps={{ style: { textAlign: 'center' } }}
                          sx={{
                            '& .CodeMirror': {
                              fontSize: '16px',
                              fontFamily: 'monospace',
                              border: '1px solid #ccc',
                              borderRadius: '5px',
                              minHeight: '200px'
                            },
                            '& .editor-toolbar': {
                              backgroundColor: '#f7f7f7',
                              border: '1px solid #ccc',
                              borderRadius: '5px 5px 0 0'
                            },
                            '& .editor-toolbar .fa': {
                              color: '#555'
                            },
                            '& .editor-toolbar .fa-header': {
                              fontSize: '20px'
                            },
                            '& .editor-preview-side': {
                              backgroundColor: '#fff',
                              border: '1px solid #ccc',
                              borderRadius: '0 0 5px 5px',
                              minHeight: '200px'
                            }
                          }}
                        />
                      </Stack>
                    </Card>

                    <Card style={{ padding: '60px', marginBottom: '0px' }}>
                      <Button
                        size="large"
                        sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                        variant="contained"
                        fullWidth={true}
                        type="submit"
                      >
                        save
                      </Button>
                    </Card>
                  </form>

                  {/*  */}

                  <Footer />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Company />
            </Grid>
          </Grid>
        </Container>
      </div>
    </AdminGuard>
  );
};

export default Page;
