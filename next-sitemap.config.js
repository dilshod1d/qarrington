const { parentSitemapSize, expenses_parentSitemapSize } = require("./src/config");

const siteUrl = process.env.NEXT_PUBLIC_APP_URL;

const destRootSitemaps=Array.from(Array(parentSitemapSize).keys()).map(el=> `${siteUrl}sitemap/destination/${String(el).padStart(5, '0')}.xml`)
const expenseRootSitemaps=Array.from(Array(expenses_parentSitemapSize).keys()).map(el=> `${siteUrl}sitemap/expense/${String(el).padStart(5, '0')}.xml`)

module.exports = {
  siteUrl,
  sitemapSize: 50000,
  exclude: ['/404', '/api', '/account', '/dashboard', '/subscription'],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ['/404', '/api/*', 'account/*', '/dashboard/*', '/subscription/*'],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      ...destRootSitemaps,
      ...expenseRootSitemaps
      // `${siteUrl}destination/01.xml`,
      // `${siteUrl}expense/01.xml`,
    ],
  },
}