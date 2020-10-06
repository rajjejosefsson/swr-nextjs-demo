import styles from "../../styles/Home.module.css";
import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";

import { fetcher, base_url } from "../../utils/fetch";

// export const getServerSideProps = async ({ params }) => {
//   const result = await fetch(`${base_url}/launches}/${params.id}`);
//   const launch = await result.json();
//   return {
//     props: { launch },
//   };
// };

// export async function getStaticProps({ params }) {
//   const res = await fetch(
//     `https://api.spacexdata.com/v4/launches/${params.id}`
//   );
//   const launch = await res.json();
//   return {
//     props: {
//       launch,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const res = await fetch("https://api.spacexdata.com/v4/launches");
//   const launches = await res.json();

//   const paths = launches.map((launch) => ({
//     params: { id: String(launch.id) },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

const useLaunch = () => {
  const { query } = useRouter();
  const { data: launch, error } = useSWR(
    `${base_url}/launches/${query.id}`,
    fetcher
  );
  return { launch, loading: !error && !launch };
};

export default function Flight() {
  const { launch, loading } = useLaunch();

  if (loading) {
    return "loading..";
  }

  return (
    <>
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

// Flight.getInitialProps = async (router) => {
//   const res = await fetch(
//     `https://api.spacexdata.com/v4/launches/${router.query.id}`
//   );
//   const json = await res.json();
//   return { launch: json };
// };
