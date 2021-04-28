import React, { useState } from 'react';
import { Accordion, Card, Button, NavDropdown } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AccordionComponent = ({ cat }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavDropdown id='accordion-nav-dropdown' className='accordion_dropdown'>
        <NavDropdown.Item href='#action/3.1'>Rename Category</NavDropdown.Item>
        <NavDropdown.Item href='#action/3.2'>
          Move to another Tab
        </NavDropdown.Item>
        <NavDropdown.Item href='#action/3.2'>Sort A-Z</NavDropdown.Item>
        <NavDropdown.Item href='#action/3.2'>Sort Z-A</NavDropdown.Item>
        <NavDropdown.Item href='#action/3.2'>Add Bookmark</NavDropdown.Item>
        <NavDropdown.Item href='#action/3.2'>
          Open all in Browser
        </NavDropdown.Item>
        <NavDropdown.Item href='#action/3.2'>
          Duplicate Category
        </NavDropdown.Item>
        <NavDropdown.Item href='#action/3.2'>Delete Category</NavDropdown.Item>
      </NavDropdown>
      <Accordion className='mb-2' defaultActiveKey='3'>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant='link'
              eventKey={cat.catID}
              onClick={() => setOpen(!open)}
            >
              {open ? <FaChevronDown /> : <FaChevronUp />}
              {cat.catName}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={cat.catID}>
            <Card.Body>{cat.catName}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

export default AccordionComponent;
