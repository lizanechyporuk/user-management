import Layout from "../../modules/Layout/Layout";
import UserTable from "../../components/UserTable/UserTable";

function HomePage(): JSX.Element {
  return (
    <Layout>
      <UserTable />
    </Layout>
  );
}

export default HomePage;
