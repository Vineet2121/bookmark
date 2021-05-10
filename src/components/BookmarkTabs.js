import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab, Card, Tabs } from 'react-bootstrap';
import BookmarkTabContent from './BookmarkTabContent';
import {
  getSelectedTab,
  getUserBookmarkTabs,
  updateTabSelection,
} from '../features/home/homeSlice';
import Loader from 'react-loader-spinner';

const BookmarkTabs = () => {
  const result = useSelector((state) => state.home.tabs);
  const selectedTab = useSelector((state) => state.home.selectedTab);

  const dispatch = useDispatch();

  let { userTabID } = { ...result[0] };

  const [defaultActiveKey, setDefaultActiveKey] = useState();

  useEffect(() => {
    if (userTabID) {
      dispatch(updateTabSelection(userTabID));
      setDefaultActiveKey(userTabID);
    }
    // } else {
    //   setDefaultActiveKey(userTabID);
    // }
  }, [userTabID, dispatch]);

  useEffect(() => {
    dispatch(getUserBookmarkTabs());
  }, [dispatch]);

  const onSelectHandler = (k) => {
    //setDefaultActiveKey(k);
    dispatch(updateTabSelection(k));
  };

  if (!selectedTab)
    return (
      <div className='text-center'>
        <Loader
          type='ThreeDots'
          color='#00BFFF'
          height={80}
          width={80}
          secondaryColor='Grey'
        />
      </div>
    );

  return (
    <>
      <Card>
        <Card.Body>
          <Tabs
            id='bookmark-tabs'
            defaultActiveKey={selectedTab.userTabID}
            onSelect={(k) => onSelectHandler(k)}
          >
            {result.map((tab) => (
              <Tab
                key={tab.userTabID}
                eventKey={tab.userTabID}
                title={tab.tabName}
                className='mt-3'
              >
                <BookmarkTabContent tabID={tab.userTabID} />
              </Tab>
            ))}
          </Tabs>
        </Card.Body>
      </Card>
    </>
  );
};

export default BookmarkTabs;
