import Modal from 'ract-modal';
import React from 'react';
import logo from './logo.svg';
/* import './bootstrap.css';
import './bootstrap-theme.css'; */
import {SplitButton,Navbar,Nav,NavDropdown,Form,FormControl, Tabs,Tab, ButtonGroup} from'react-bootstrap';
import { Button } from 'react-bootstrap';

Modal.setAppElement('#root')
/* function CustomerModal(){
    
        
} */

export default class CustomerModal extends React.Component{
    render(){
        const [modalIsOpen,setIsOpen] = React.useState(false);
        function openModal() {
        setIsOpen(true);
        }
    
        function afterOpenModal() {
        // references are now sync'd and can be accessed.
        /*  subtitle.style.color = '#f00'; */
        }
    
        function closeModal(){
        setIsOpen(false);
        }
        return(
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
            <label for="CustomerName">
                Customer Name: <input type='text' id="CustomerName"/>
            </label>
            
            </Modal>
        );
    }
    
}