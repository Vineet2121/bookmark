import React, { useEffect, useState, memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookmarks } from './bookmarkSlice';
import { Row } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import * as axios from 'axios';

const BookmarkList = ({ catID }) => {
  const [bookmarks, setBookmarks] = useState([]);

  // const { loading } = useSelector((state) => state.async);

  // const dispatch = useDispatch();

  // const bookmarkList = useSelector((state) => state.bookmark.bookmarks);
  // const { loading, error, data } = bookmarkList;

  // console.log(bookmarkList);

  useEffect(() => {
    const fetchBookmarksData = async () => {
      const { data } = await axios(
        `https://localhost:44339/api/bookmark/bookmarklist/${catID}`
      );
      setBookmarks(data);
    };
    fetchBookmarksData();
  }, []);

  let url = 'https://www.google.com/s2/favicons?domain=';

  if (bookmarks.length <= 0) return <p> No data..</p>;

  return (
    <>
      {bookmarks.map((bookmark) => (
        <Row key={bookmark.bookmarkId}>
          <img
            src={url + bookmark.url}
            alt='bookmark.title'
            className='favicon'
          />
          <a target='_blank' rel='noreferrer' href={bookmark.url}>
            {bookmark.title}
          </a>
        </Row>
      ))}
    </>
  );
};

export default BookmarkList;
