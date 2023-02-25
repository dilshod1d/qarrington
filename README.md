# QARRINGTON Web App

A Next.js Web application for exchanges


# Table of content :

1. [Usage](#usage)
2. [Features](#features)
2. [API](#api)
3. [SEO](#seo)

# Usage :

1. Clone the repo or download it.

2. First install all dependencies:

     ```bash
     # with npm
     npm install

     # or with yarn
     yarn
     ```

3. Create a `.env` & fill-in environement variables

     ```javascript
     "This will be provided soon";
     ```

4. Start the server
     ```javascript
     npm run dev
     ```
5. To build the app and generate the sitemaps
     ```javacript
     npm run build
     ```

# Features :


-    [x] Use MaterialUI-React
-    [x] Fully-responsive
-    [x] Search for flights/Exchanges
-    [x] Use SSR for better performance & SEO
-    [x] Generate dynamic Sitemaps according to DB


# API :

The API is embedded with the frontend of this application in the ```pages/api/```  folder based on Next.js template for serving pages.

All the API's fetchs are redirected to this folder according to the endpoint. For example: fetching ```api/destination``` will be handled by the ***Handler*** function inside the ```pages/api/destination.index.js```  file.



# SEO :

### Sitemaps:

In order to optimize SEO & better index all website's routes in Google & search engines crawlers, sitemaps are generated dynamically, and the architecture consists of ```parent/index``` sitemaps that refer to ```child``` sitemaps, which index all the dynamic routes of the application. You can tweak route & children sitemap limits according to your server's capability.

Here's the files responsible for this task:
```
.
├── pages
│    ├── sitemap
│        ├── destination
│        │    └── [child]
│        │        ├── index.js Generates the children sitemaps
│        │        └── [subchild].js Generate a sitemaps with dynamic routes to all the destinations
│        │    
│        └── expense
│            └── [child]
│                ├── index.js Generates the children sitemaps
│                └── [subchild].js Generate a sitemaps with dynamic routes to all the expense with all the locations 

├── config.js A config file to limit number of Parents/Children sitemaps and number of routes for each
```

