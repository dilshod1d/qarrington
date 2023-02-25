import axios from 'axios';
import { getServerSideSitemap } from 'next-sitemap';
import Expense from '../../../../../models/expense/Expense';
import Location from '../../../../../models/location/Location';
import {
  expenses_childSitemapSize,
  expenses_pageUrlSize
} from '../../../../config';

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
      // Extract route params
      let pageParam = Number(child);
      let offsetParam = Number(subchild.slice(0, subchild.indexOf('.xml')));

      try {
      } catch (err) {
        console.error('An Error Occured : ', err);
        return {
          props: {
            serverErrors: JSON.stringify(err, Object.getOwnPropertyNames(err))
          }
        };
      }
      const {data:{count: expCount}} = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}api/expenses?query=expense-count`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      let locCount = await Location.count();
      const totalRoutes = expCount * locCount;
      const nbrLocPages = Math.ceil(locCount / expenses_pageUrlSize);

      // Define offset & page size
      // let totalOffset =
      //   offsetParam * expenses_pageUrlSize +
      //   pageParam * expenses_childSitemapSize * expenses_pageUrlSize;
      let totalOffset =
        offsetParam * locCount +
        pageParam * expenses_childSitemapSize * locCount;

      // let pageOffset = Math.floor(totalOffset / nbrLocPages);
      let pageOffset = Math.floor(
        (expCount / expenses_childSitemapSize) * pageParam + offsetParam
      );

      // Get the expenses
      const {
        data: { expenses }
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}api/expenses?query=expense-sitemap&offset=${pageOffset}`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      // Get the locations
      const locations = await Location.find()
        .select({ locationUrl: 1 })
        .limit(expenses_pageUrlSize)
        .skip(offsetParam);
      expenses.forEach((expense) => {
        const expenseUrl = expense.expenseUrl
          .replace(/\s+/g, '-')
          .replace(/&(?!#?[a-z0-9]+;)/, '&amp;')
          .replace(regex, '')
          .toLowerCase();
        // Add the expense alone
        fields.push({
          loc: `${siteUrl}expense/${expenseUrl}`,
          lastmod: new Date().toISOString()
        });
        // Add all the locations to that specific expense
        locations.forEach((location) => {
          fields.push({
            loc: `${siteUrl}expense/${expenseUrl}/${location.locationUrl
              .replace(/\s+/g, '-')
              .toLowerCase()
              .replace(/&(?!#?[a-z0-9]+;)/, '&amp;')}`,
            lastmod: new Date().toISOString()
          });
        });
      });
    }
  }
  if (fields.length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: '/404'
      },
      props: {}
    };
  }

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap(props) {
  console.log(props);
  return <></>;
}
