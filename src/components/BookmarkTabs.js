import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab, Card, Tabs } from 'react-bootstrap';
import BookmarkTabContent from './BookmarkTabContent';
import {
  getSelectedTab,
  getUserBookmarkTabs,
} from '../features/home/homeSlice';

const BookmarkTabs = () => {
  const result = useSelector((state) => state.home.tabs);
  const dispatch = useDispatch();

  let { userTabID } = { ...result[0] };

  const [key, setKey] = useState(userTabID);

  useEffect(() => {
    if (userTabID) {
      setKey(userTabID);
    }
  }, [userTabID]);

  useEffect(() => {
    dispatch(getUserBookmarkTabs());
  }, [dispatch]);

  return (
    <>
      <Card>
        <Card.Body>
          <Tabs
            id='bookmark-tabs'
            defaultActiveKey={key}
            onSelect={(k) => {
              //console.log(k);
              setKey(k);
              dispatch(getSelectedTab(k));
            }}
          >
            {result.map((tab) => (
              <Tab
                key={tab.userTabID}
                eventKey={tab.userTabID}
                title={tab.tabName}
                className='mt-3'
              >
                <BookmarkTabContent />
              </Tab>
            ))}
          </Tabs>
        </Card.Body>
      </Card>
    </>
  );
};

export default BookmarkTabs;
