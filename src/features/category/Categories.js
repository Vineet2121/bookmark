import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactLoading from 'react-loading';
import { Row, Col, Card } from 'react-bootstrap';

import './Category.scss';

import { getCategories } from './categorySlice';
import AccordionComponent from '../../components/AccordionComponent';

const Categories = () => {
  const result = useSelector((state) => state.category.categories);

  const selectedTab = useSelector((state) => state.home.selectedTab);

  const { loading } = useSelector((state) => state.async);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTab) {
      dispatch(getCategories(selectedTab.userTabID));
    }
  }, [dispatch, selectedTab]);

  return (
    <>
      {loading ? (
        <div>
          <ReactLoading type={'bars'} color={'grey'} />
        </div>
      ) : (
        <Card>
          <Card.Body>
            <Row>
              {result.map((cat) => (
                <Col key={cat.catID} md={4}>
                  <AccordionComponent cat={cat} />
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Categories;
