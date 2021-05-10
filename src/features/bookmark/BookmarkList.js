import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import ReactLoading from 'react-loading';
import * as axios from 'axios';

import BookmarkItem from '../../components/BookmarkItem';
const { REACT_APP_BASE_URL } = process.env;

const BookmarkList = ({ catID }) => {
  const [bookmarks, setBookmarks] = useState([]);

  // const { loading } = useSelector((state) => state.async);

  // const dispatch = useDispatch();

  // const bookmarkList = useSelector((state) => state.bookmark.bookmarks);
  // const { loading, error, data } = bookmarkList;

  // console.log(bookmarkList);

  useEffect(() => {
    let ignore = false;
    const fetchBookmarksData = async () => {
      const { data } = await axios(
        `${REACT_APP_BASE_URL}bookmark/bookmarklist/${catID}`
      );
      if (!ignore) setBookmarks(data);
    };
    fetchBookmarksData();
    return () => {
      ignore = true;
    };
  }, [catID]);

  if (bookmarks.length <= 0) return <p> No data..</p>;

  return (
    <>
      {bookmarks.map((bookmark, index) => (
        <BookmarkItem
          key={bookmark.bookmarkId}
          bookmark={bookmark}
          idx={index}
        />
      ))}
    </>
  );
};

export default BookmarkList;
