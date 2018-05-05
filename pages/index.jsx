import React from 'react';
import Layout from '../components/Layout';
import NavBar from '../components/Navbar';
import Map from '../components/Map';

export default class IndexPage extends React.Component {
  render() {
    return (
      <Layout title="Vision Zero Boston">
        <div>
          <NavBar />
        </div>
      </Layout>
    );
  }
}
