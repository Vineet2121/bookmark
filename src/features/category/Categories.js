import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { DragDropContext } from 'react-beautiful-dnd';

import './Category.scss';

import { getCategories } from './categorySlice';
import { moveBookmark } from '../bookmark/bookmarkSlice';
import AccordionComponent from '../../components/AccordionComponent';
import Loader from 'react-loader-spinner';

const Categories = memo(() => {
  const { categories, loading, error } = useSelector((state) => state.category);
  const selectedTab = useSelector((state) => state.home.selectedTab);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTab) {
      dispatch(getCategories(selectedTab.userTabID));
    }
  }, [dispatch, selectedTab]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let moveBoomark = {
      srcCatId: +source.droppableId,
      srcBookmarkIndex: +source.index,
      srcBookmarkId: +draggableId,
      destCatId: +destination.droppableId,
      destBookmarkId: +destination.index,
    };

    dispatch(moveBookmark(moveBoomark));
  };

  return (
    <>
      {!loading && (
        <Card>
          <Card.Body className='mt-n2'>
            <Row>
              <DragDropContext onDragEnd={onDragEnd}>
                {categories.map((cat, index) => (
                  <Col key={cat.catID} md={4}>
                    <AccordionComponent cat={cat} idx={index} />
                  </Col>
                ))}
              </DragDropContext>
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
});

export default Categories;
