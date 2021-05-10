/* eslint-disable react/jsx-no-undef */
import React from 'react';
import BookmarkTabs from '../../components/BookmarkTabs';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Categories from '../category/Categories';

const HomeScreen = () => {
  return (
    <>
      <Header />
      <main>
        <BookmarkTabs />

        <Categories />
        {/* <Sandbox /> */}
      </main>
      <Footer />
    </>
  );
};

export default HomeScreen;
