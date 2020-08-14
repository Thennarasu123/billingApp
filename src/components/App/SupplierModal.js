import Modal from 'react-modal';
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
/* import './bootstrap.css';
import './bootstrap-theme.css'; */
import {SplitButton,Navbar,Nav,NavDropdown,Form,FormControl, Tabs,Tab, ButtonGroup} from'react-bootstrap';
import { Button } from 'react-bootstrap';

Modal.setAppElement('#root')
/* function CustomerModal(){
    
        

} */

const customStyles = {
    content : {
        zIndex                : 99999,
        width                 : 400,
        height                : 500,
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
    }
  };

class SupplierModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {displayCustomerModal:false,modalIsOpen:true,modal:"supplier"}
        this.handleSupplierSave = this.handleSupplierSave.bind(this);
    }
    
    openModal = () => {
        this.setState({
            modalIsOpen : !this.state.modalIsOpen
        })
    }
    closeModal = () => {
        this.setState({
            modalIsOpen:!this.state.modalIsOpen
        })
    }
    handleSupplierSave = () => {
    }
    render(){
        /* const [modalIsOpen,setIsOpen] = React.useState(false);
        function openModal() {
        setIsOpen(true);
        }
    
        function afterOpenModal() {
        // references are now sync'd and can be accessed.
         subtitle.style.color = '#f00';
        }
    
        function closeModal(){
        setIsOpen(false);
        } */
        return(
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
                style={customStyles}>
            {/* <label for="CustomerName">
                Customer Name: <input type='text' id="CustomerName"/>
            </label> */}
            <Navbar.Brand href="#home">New Supplier</Navbar.Brand>
            <ButtonGroup size="lg" className="mb-2 " vertical>
                <form>
                <div class="container newCustSection">
                    {/* <span  class="newcust-checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span> */}
                    <span class="newcust-label-holder"><label for="url">Supplier</label></span>
                    <span class="newcust-input-holder"><input type="text" id="supplierName" name="url" /></span>
                    {/* <span  class="newcust-checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span> */}
                    <span class="newcust-label-holder"><label for="code-base">Tel</label></span>
                    <span class="newcust-input-holder"><input type="text" id="supplierTel" name="Code-Base"  /></span>
                    {/* <span  class="newcust-checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span> */}
                    <span class="newcust-label-holder"><label for="from">Fax</label></span>
                    <span class="newcust-input-holder"><input type="text" id="supplierFax" name="fax"  /></span>
                    {/* <span  class="newcust-checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span> */}
                    <span class="newcust-label-holder"><label for="to">Email</label></span>
                    <span class="newcust-input-holder"><input type="text" id="supplierEmail" name="to"  /></span>
                    {/* <span  class="newcust-checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span> */}
                    <span class="newcust-label-holder"><label for="email">Prefered Payment Term</label></span>
                    <span class="newcust-input-holder"><input type="text" id="supplierPayTerm" name="email"  /></span>
                    {/* <span  class="newcust-checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span> */}
                    <span class="newcust-label-holder"><label for="email">Sales Discount</label></span>
                    <span class="newcust-input-holder"><input type="text" id="supplierDiscount" name="email" /></span>
                    {/* <span  class="newcust-checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span> */}
                    <span class="newcust-label-holder"><label for="Addr1">Bill To Information</label></span>
                    <span class="newcust-input-holder"><textarea id="supplierBillToInfo"/></span>
                    </div>
                    <Button variant="outline-primary" onClick={this.handleSupplierSave}>Save</Button>
                    <Button variant="outline-primary" onClick={this.closeModal}>Cancel</Button>
                </form>
            </ButtonGroup>
            
            
            </Modal>
        );
    }
    
}

export default SupplierModal;