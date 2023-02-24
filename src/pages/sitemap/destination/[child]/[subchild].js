import axios from 'axios';
import { getServerSideSitemap } from 'next-sitemap';
import { childSitemapSize, pageUrlSize } from '../../../../config';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL;
const regex =
  /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;

const extract_attr = (obj, ...args) => {
  let res = {};
  if (Array.isArray(args)) {
    args.forEach((arg) => (res[arg] = obj?.data[arg]));
  }

  return res;
};

export const getServerSideProps = async (ctx) => {
  const { child, subchild } = ctx.params;
  let fields = [];
  if (child && subchild) {
    if (/^[0-9]+$/g.test(child) && /^[0-9]+.xml$/g.test(subchild)) {
      let page = Number(child);
      let offset = Number(subchild.slice(0, subchild.indexOf('.xml')));

      try {
        const { count } = await extract_attr(
          await axios.get(
            `${process.env.NEXT_PUBLIC_APP_URL}api/destinations?query=destination-count`,
            { headers: { 'Content-Type': 'application/json' } }
          ),
          'count'
        );
        let totalOffset = Math.floor(
          (count / childSitemapSize) * page + offset
        );
        // let totalOffset =
        //   page * childSitemapSize * pageUrlSize + offset * pageUrlSize;

        let iterations = Math.ceil(pageUrlSize / (count * 4));

        const { destinations: destA } = extract_attr(
          await axios.get(
            `${process.env.NEXT_PUBLIC_APP_URL}api/destinations?query=destination-sitemap&iterations=${iterations}&offset=${totalOffset}`,
            { headers: { 'Content-Type': 'application/json' } }
          ),
          'destinations'
        );
        const { destinations } = extract_attr(
          await axios.get(
            `${process.env.NEXT_PUBLIC_APP_URL}api/destinations?query=destination-distinct`,
            { headers: { 'Content-Type': 'application/json' } }
          ),
          'destinations'
        );

        let i = 0;
        destA.forEach((dA) => {
          destinations.forEach((destination) => {
            if (i >= pageUrlSize || dA.destinationFromUrl === destination)
              return;

            let To = destination
                .replace(/\s+/g, '-')
                .replace(/&(?!#?[a-z0-9]+;)/, '&amp;')
                .replace(regex, '')
                .toLowerCase(),
              From = dA.destinationFromUrl
                .replace(/\s+/g, '-')
                .replace(/&(?!#?[a-z0-9]+;)/, '&amp;')
                .replace(regex, '')
                .toLowerCase();
            fields.push({
              loc: `${siteUrl}destination/${From}-to-${To}`,
              lastmod: new Date().toISOString()
            });
            fields.push({
              loc: `${siteUrl}destination/${To}-to-${From}`,
              lastmod: new Date().toISOString()
            });
            fields.push({
              loc: `${siteUrl}destination/${From}-from-${To}`,
              lastmod: new Date().toISOString()
            });
            fields.push({
              loc: `${siteUrl}destination/${To}-from-${From}`,
              lastmod: new Date().toISOString()
            });
            i += 4;
          });
        });
        // const destinations = await Destination.find()
        // .select('destinationFromUrl destinationToUrl')
        // .limit(pageUrlSize)
        // .skip(totalOffset);
      } catch (err) {
        console.error('An Error Occured : ', err);
        return {
          // redirect: {
          //   permanent: false,
          //   destination: '/500'
          // },
          props: {
            serverErrors: JSON.stringify(err, Object.getOwnPropertyNames(err))
          }
        };
      }
    }
  }
  // if (fields.length === 0) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/404'
  //     },
  //     props: {}
  //   };
  // }
  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap(props) {
  console.log(props);

  return <></>;
}

/*

add 50 parent sitemaps to robots.txt

app.com/destination/01.xml
...
app.com/destination/50.xml

***** ***** *****

add 50000 child sitemaps to each parent sitemap

app.com/destination/01/00001.xml
...
app.com/destination/01/50000.xml

***** ***** *****

add 50k dynamic urls to each child sitemap

app.com/destination/01/00001.xml
...
app.com/destination/dallas-to-london
app.com/destination/dallas-from-london
app.com/destination/london-to-dallas
app.com/destination/london-from-dallas

*/
