import React, { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

const BookmarkItem = memo(({ bookmark, idx }) => {
  let url = 'https://www.google.com/s2/favicons?domain=';

  const { loading } = useSelector((state) => state.async);

  let { bookmarkId } = bookmark;

  let id = bookmarkId.toString();

  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'none',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return (
    <Draggable draggableId={id} index={idx}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <a target='_blank' rel='noreferrer' href={bookmark.url}>
            <img
              src={url + bookmark.url}
              alt='bookmark.title'
              className='favicon'
            />
            {bookmark.title}
          </a>
        </div>
      )}
    </Draggable>
  );
});

export default BookmarkItem;
