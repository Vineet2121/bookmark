import React, { useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Accordion, Card, Button, NavDropdown } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { openModal } from '../app/common/modals/modalReducer';
import {
  setBookmarkFormType,
  updateBookmarkOrderState,
} from '../features/bookmark/bookmarkSlice';
import {
  setCurrentCategory,
  updateAccordionState,
} from '../features/category/categorySlice';
import BookmarkList from '../features/bookmark/BookmarkList';
import { Droppable } from 'react-beautiful-dnd';

const AccordionComponent = memo(({ cat, idx }) => {
  const [open, setOpen] = useState(false);

  let cID = cat.catID.toString();

  let collapseClass = cat.isAccordionOpen ? 'collapse show' : 'collapse';

  const dispatch = useDispatch();

  const handleOpenTabModal = (modalType) => {
    dispatch(openModal({ modalType, showModal: true }));
  };

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'white',
  });

  const handleAccordionClick = () => {
    setOpen(!open);
    dispatch(updateAccordionState(+cID, !cat.isAccordionOpen, cat.userTabID));
  };

  return (
    <>
      <NavDropdown id='accordion-nav-dropdown' className='accordion_dropdown'>
        <NavDropdown.Item href='#'>Rename Category</NavDropdown.Item>
        <NavDropdown.Item href='#'>Move to another Tab</NavDropdown.Item>
        <NavDropdown.Item
          href='#'
          onClick={() => {
            dispatch(updateBookmarkOrderState(cat.catID, 'AtoZ'));
          }}
        >
          Sort A-Z
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#'
          onClick={() => {
            dispatch(updateBookmarkOrderState(cat.catID, 'ZtoA'));
          }}
        >
          Sort Z-A
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#'
          onClick={() => {
            dispatch(setCurrentCategory(cat.catID));
            dispatch(setBookmarkFormType('New'));
            handleOpenTabModal('BookmarkForm');
          }}
        >
          Add Bookmark
        </NavDropdown.Item>
        <NavDropdown.Item href='#'>Open all in Browser</NavDropdown.Item>
        <NavDropdown.Item href='#'>Duplicate Category</NavDropdown.Item>
        <NavDropdown.Item href='#'>Delete Category</NavDropdown.Item>
      </NavDropdown>

      <Accordion className='mb-2'>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant='link'
              eventKey={cat.catID}
              onClick={handleAccordionClick}
            >
              {cat.isAccordionOpen ? <FaChevronDown /> : <FaChevronUp />}
              {cat.catName}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={cat.catID} className={collapseClass}>
            <Droppable droppableId={cID} index={idx}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  <Card.Body className='p-2'>
                    <BookmarkList catID={cat.catID} />
                    {provided.placeholder}
                  </Card.Body>
                </div>
              )}
            </Droppable>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
});

export default AccordionComponent;
