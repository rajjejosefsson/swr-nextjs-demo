import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import styles from "../../styles/Home.module.css";
import { fetcher, base_url } from "../../utils/fetch";

export default function Flight(props) {
  const { launch } = props;
  // const { launch, error, loading } = useLaunch();
  // if (loading) return "loading..";
  // if (error) return "oops";

  return (
    <>
      <Head>
        <title>{launch.name}</title>
      </Head>

      <Link href="/">
        <a style={{ color: "blue", fontSize: "40px" }}> {"<-"} Back</a>
      </Link>

      <div className={styles.detailWrapper}>
        <h2>{launch.name}</h2>
        <img className={styles.patchImage} src={launch.links.patch.small} />
      </div>
    </>
  );
}

/**
 * Fetch the data on client side and cache it with SWR
 */
// const useLaunch = () => {
//   const { query } = useRouter();
//   const { data: launch, error } = useSWR(
//     `${base_url}/launches/${query.id}`,
//     fetcher
//   );
//   return { launch, error, loading: !error && !launch };
// };

// ------------------------------------------------------------------------------------------

/**
 * Its preferable to do getStaticProps + getStaticPaths
 */
export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`${base_url}/launches/${params.id}`);
  const launch = await res.json();
  return {
    props: { launch },
  };
};

/**
 * but this approach currently requires two request...
 * https://github.com/vercel/next.js/discussions/11272#discussioncomment-1769s
 */
// ------------------------------------------------------------------------------------------
// export async function getStaticProps({ params }) {
//   const res = await fetch(`${base_url}/launches/${params.id}`);
//   const launch = await res.json();
//   return {
//     props: {
//       launch,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const res = await fetch(`${base_url}/launches`);
//   const launches = await res.json();
//   const paths = launches.map((launch) => ({
//     params: { id: String(launch.id) },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }
// ------------------------------------------------------------------------------------------

/**
 * and this is a old (deprecated) way of using above, but... a single request
 */
// Flight.getInitialProps = async (router) => {
//   const res = await fetch(
//     `https://api.spacexdata.com/v4/launches/${router.query.id}`
//   );
//   const json = await res.json();
//   return { launch: json };
// };
