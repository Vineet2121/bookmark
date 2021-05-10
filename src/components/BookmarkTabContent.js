import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  DropdownButton,
  Dropdown,
  Row,
  Col,
  Form,
} from 'react-bootstrap';
import { openModal } from '../app/common/modals/modalReducer';
import { setFromType, updateTabsIndex } from '../features/home/homeSlice';
import {
  setCategoryFormType,
  updateAllAccordionState,
  updateCategoriesIndex,
} from '../features/category/categorySlice';

const BookmarkTabContent = ({ tabID }) => {
  const dispatch = useDispatch();

  const handleOpenTabModal = (modalType) => {
    dispatch(openModal({ modalType, showModal: true }));
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <div style={{ marginTop: '1rem' }}>
            <Button
              variant='link'
              size='sm'
              onClick={() => {
                handleOpenTabModal('CategoryForm');
                dispatch(setCategoryFormType('New'));
              }}
            >
              Add Category
            </Button>{' '}
            <Button
              variant='link'
              size='sm'
              onClick={() => {
                handleOpenTabModal('TabForm');
                dispatch(setFromType('New'));
              }}
            >
              Add Tab
            </Button>
            <div style={{ display: 'inline-block' }}>
              <DropdownButton
                size='sm'
                id='dropdown-item-button'
                title='Categories'
                className='drop-button'
              >
                <Dropdown.Item
                  as='button'
                  onClick={() => {
                    dispatch(updateCategoriesIndex(tabID, 'AtoZ'));
                  }}
                >
                  Sort A-Z
                </Dropdown.Item>
                <Dropdown.Item
                  as='button'
                  onClick={() => {
                    dispatch(updateCategoriesIndex(tabID, 'ZtoA'));
                  }}
                >
                  Sort Z-A
                </Dropdown.Item>
                <Dropdown.Item
                  as='button'
                  onClick={() => {
                    dispatch(updateAllAccordionState(+tabID, 'collapse'));
                  }}
                >
                  Collapse all
                </Dropdown.Item>
                <Dropdown.Item
                  as='button'
                  onClick={() => {
                    dispatch(updateAllAccordionState(tabID, 'expand'));
                  }}
                >
                  Expand all
                </Dropdown.Item>
              </DropdownButton>
            </div>
            <div style={{ display: 'inline-block' }}>
              <DropdownButton
                size='sm'
                id='dropdown-item-button'
                title='Tabs'
                className='drop-button'
              >
                <Dropdown.Item
                  as='button'
                  onClick={() => {
                    handleOpenTabModal('TabForm');
                    dispatch(setFromType('Edit'));
                  }}
                >
                  Rename Tab
                </Dropdown.Item>
                <Dropdown.Item as='button'>Change color</Dropdown.Item>
                {/* <Dropdown.Item as='button'>Change Tab order</Dropdown.Item> */}
                <Dropdown.Item
                  as='button'
                  onClick={() => {
                    dispatch(updateTabsIndex(tabID, 'AtoZ'));
                  }}
                >
                  Sort A-Z
                </Dropdown.Item>
                <Dropdown.Item
                  as='button'
                  onClick={() => {
                    dispatch(updateTabsIndex(tabID, 'ZtoA'));
                  }}
                >
                  Sort Z-A
                </Dropdown.Item>
                <Dropdown.Item as='button'>Share Tab</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <Row className='mt-3'>
            <Col>
              <Form.Control
                type='text'
                name='category'
                placeholder='Find Category'
              />
            </Col>
            <Col>
              <Form.Control
                type='text'
                name='bookmarks'
                placeholder='Search Bookmarks'
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default BookmarkTabContent;
