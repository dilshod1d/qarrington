import { parseCookies } from "nookies";
export async function getServerSideProps(ctx) {
    const { ['token.Qarrington.bearer']: token } = parseCookies(ctx);
   if (!token) {
      return {
        redirect: {
          destination: '/account/access',
          permanent: false,
        }
      };
   }
    return {
      props: {
      }
    };
  }