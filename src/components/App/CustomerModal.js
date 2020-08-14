import Modal from 'react-modal';
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
/* import './bootstrap.css';
import './bootstrap-theme.css'; */
import {SplitButton,Navbar,Nav,NavDropdown,Form,FormControl, Tabs,Tab, ButtonGroup} from'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import listReactFiles from 'list-react-files';
/* var find = require('list-files');


find(function(result) {
    console.log(result);
}, {
    dir: 'dir',
    name: 'pdf'
}); */
//listReactFiles(process.cwd()).then(files => console.log(files))
Modal.setAppElement('#root')
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common["X-CSRF-TOKEN"] = "fetch";
/* var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors()) */
/* function CustomerModal(){
    
        

} */
console.log('process '+process.cwd()+'  sss ' +__dirname)
/* axios.get('C:/wamp64/www/billing/src/api.php')
  .then(function (response) {
    // handle success
    console.log(' data '+JSON.stringify(response));
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  fetch('http://localhost:3000/static/js/C:/wamp64/www/billing/src/api.php', { 
    cache: 'no-cache',
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
})
.then(function(response) {
    // manipulate response object
    // check status @ response.status etc.
    console.log('response '+JSON.stringify(response));
    //return response.json(); // parses json
})
.then(function(myJson) {
    // use parseed result
    console.log(myJson);
}); */
/* axios.get('http://localhost/api.php')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  }); */
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

class CustomerModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {displayCustomerModal:false,modalIsOpen:true}
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
            <Navbar.Brand href="#home">New Customer</Navbar.Brand>
            <ButtonGroup size="lg" className="mb-2 " vertical>
                <form>
                <div class="container newCustSection">
                    {/* <span  class="newcust-checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span> */}
                    <span class="newcust-label-holder"><label for="url">Customer</label></span>
                    <span class="newcust-input-holder"><input type="text" id="url" name="url"  /></span>
                    {/* <span  class="newcust-checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span> */}
                    <span class="newcust-label-holder"><label for="code-base">Tel</label></span>
                    <span class="newcust-input-holder"><input type="text" id="code-base" name="Code-Base"  /></span>
                    {/* <span  class="newcust-checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span> */}
                    <span class="newcust-label-holder"><label for="from">Fax</label></span>
                    <span class="newcust-input-holder"><input type="text" id="from" name="from"  /></span>
                    {/* <span  class="newcust-checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span> */}
                    <span class="newcust-label-holder"><label for="to">Email</label></span>
                    <span class="newcust-input-holder"><input type="text" id="to" name="to"  /></span>
                    {/* <span  class="newcust-checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span> */}
                    <span class="newcust-label-holder"><label for="email">Prefered Payment Term</label></span>
                    <span class="newcust-input-holder"><input type="text" id="email" name="email"  /></span>
                    {/* <span  class="newcust-checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span> */}
                    <span class="newcust-label-holder"><label for="email">Sales Discount</label></span>
                    <span class="newcust-input-holder"><input type="text" id="email" name="email" /></span>
                    {/* <span  class="newcust-checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span> */}
                    <span class="newcust-label-holder"><label for="Addr1">Bill To Information</label></span>
                    <span class="newcust-input-holder"><textarea id="BillToInfo"/></span>
                    </div>
                    <Button variant="outline-primary" type='submit'>Save</Button>{' '}
                    <Button variant="outline-primary" onClick={this.closeModal}>Cancel</Button>{' '}  
                </form>
            </ButtonGroup>
            </Modal>
        );
    }
    
}

export default CustomerModal;