import {SplitButton,Navbar,Nav,NavDropdown,Form,FormControl, Tabs,Tab, ButtonGroup,Popover,PopoverContent,PopoverTitle,PopoverProps,OverlayTrigger} from'react-bootstrap';
import { Component} from 'react'
import { Table, Pagination, ModalContent, Label } from 'semantic-ui-react';
import React from 'react';
import { FaHeart, FaBars, FaSave, FaLessThanEqual, FaPencilAlt , FaPrint, FaTrash} from 'react-icons/fa';
import './App.css';
class NavHeader extends React.Component{
    render(){
        return(
            <Navbar bg="light" expand="lg" class="NavHeader" style={{width:'100vw !important;'}}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Brand href="#home">Quotation</Navbar.Brand>
            {/* <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">
                    <Label icon={<FaPencilAlt />} onClick={this.handleEditClick()}/>
                </Nav.Link>
                    <Nav.Link href="#link1"><Label icon={<FaSave />}  value="Save"onClick={this.handleSaveClick()}/></Nav.Link>
                    <Nav.Link href="#link"><Label icon={<FaPrint />}  onClick={this.handlePrintClick()} /></Nav.Link>
                    <Nav.Link href="#link2"><Label icon={<FaTrash/>}  onClick={this.handleDeleteClick()} /></Nav.Link>
                </Nav>
            </Navbar.Collapse> */}
            </Navbar>
        );
    }
}

export default NavHeader;