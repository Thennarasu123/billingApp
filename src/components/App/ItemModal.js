import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {Component} from 'react';
import './App.css';
/* import './bootstrap.css';
import './bootstrap-theme.css'; */
/* import {SplitButton,Navbar,Nav,NavDropdown,Form,FormControl, Tabs,Tab, ButtonGroup} from'react-bootstrap'; */
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {SplitButton,Navbar,Nav,NavDropdown,Form,FormControl, Tabs,Tab, ButtonGroup,Popover,PopoverContent,PopoverTitle,PopoverProps,OverlayTrigger} from'react-bootstrap';
/* import { Component} from 'react'; */
import { Dropdown as FDropdown, IDropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
/* import { Button } from 'react-bootstrap'; */
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown as NDropdown, FocusZoneUtilities } from '@fluentui/react-northstar'
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import $ from "jquery";
import { DatePicker, DayOfWeek, IDatePickerStrings, mergeStyleSets , CommandBarButton, IContextualMenuProps, IIconProps, DefaultButton, Pivot, PivotItem, Dialog, DialogFooter, DialogType,   ContextualMenu, SpinButton, Toggle, ComboBox, IComboBoxOption, SelectableOptionMenuItemType, Fabric, initializeIcons, IOverflowSetItemProps, OverflowSet,Checkbox} from 'office-ui-fabric-react';

Modal.setAppElement('#root')
const DayPickerStrings: IDatePickerStrings = {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  
    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  
    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year',
    closeButtonAriaLabel: 'Close date picker',
  };
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
  const stackTokens = { childrenGap: 50 };
  const stackStyles: Partial<IStackStyles> = { root: { width: 200 } };
  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 600 } },
  };
  
const controlClass = mergeStyleSets({
control: {
    margin: '0 0 15px 0',
    maxWidth: '300px',
},
});
const controlCustomerClass = mergeStyleSets({
control: {
    margin: '0 0 15px 0'
},
});
const dialogContentProps = {
    type: DialogType.normal,
    title: 'Quotation',
    closeButtonAriaLabel: 'Close',
  };
class ItemModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {displayCustomerModal:false,modalIsOpen:true}
        this.saveItemModal  = this.saveItemModal.bind(this);
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
    saveItemModal = () => {
        var custno = $("input[name*='custno']").val();
        var faxno = $("input[name*='faxno']").val();
        var billToInfo = $("input[name*='billToInfo']").val();
        var payterm = $("input[name*='payterm']").val();
        var emailno = $("input[name*='emailno']").val();
        var discount = $("input[name*='discount']").val();
        axios.post('http://localhost:9000/testAPI/items',{custno:custno, faxno:faxno,billToInfo:billToInfo,payterm:payterm,emailno:emailno,disount:discount}).then((response) => {})
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
                    <h3 style={{borderBottomWidth:'2px',borderBottomColor:'#000'}}>Add Item</h3>
                    <div>
                <form>
                {/* <Modal.Header closeButton>
    <Modal.Title>Modal title</Modal.Title>
  </Modal.Header> */}
              <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}>
                  {/* <label for='qouteno'>Quote No</label> */}
                  <TextField className={controlClass.control} placeholder="Customer No:"  label="Customer No:"   name="custno" onChange={this.handleQouteNoChange}></TextField>
                  <TextField className={controlClass.control} placeholder="Fax:"  label="Fax:"   name="faxno" onChange={this.handleQouteNoChange}></TextField>
                  <TextField className={controlClass.control} placeholder="Email:"  label="Email:"   name="emailno" onChange={this.handleQouteNoChange}></TextField>
                  <TextField className={controlClass.control} placeholder="Prefered Payment Term:"  label="Prefered Payment Term:"   name="payterm" onChange={this.handleQouteNoChange}></TextField>
                  <TextField className={controlClass.control} placeholder="Sales Discount:"  label="Sales Discount:"   name="discount" onChange={this.handleQouteNoChange}></TextField>
                  <TextField className={controlClass.control} placeholder="Bill To Information:"  label="Bill To Informationt:"   name="billToInfo" onChange={this.handleQouteNoChange}></TextField>
                  {/* <FDropdown
                    placeholder="Select an option"
                    label="Currency"
                    className={controlClass.control}
                    required
                    onChanged={this.handleCurrencyChange}
                  />
                  <FDropdown
                    placeholder="Select an option"
                    label="Sales Rep."
                    className={controlClass.control}
                    options={[
                      { key: 'A', text: 'FOO', title: 'I am option a.' },
                      { key: 'B', text: 'BAR' },
                      { key: 'D', text: 'JOHN' }
                    ]}
                    required
                    onChanged={this.handleSalesRepChange}
                  />
                  <DatePicker
                    className={controlClass.control}
                    strings={DayPickerStrings}
                    placeholder="Select a date..."
                    ariaLabel="Select a date"
                    firstDayOfWeek={this.state.firstDayOfWeek}
                    showWeekNumbers={true}
                    firstWeekOfYear={1}
                    label="Quotation Date"
                    showMonthPickerAsOverlay={true}
                    onBlur={this.handleQouteDateChange}
                  />
                  <Stack horizontal tokens={stackTokens}>
                    <DatePicker
                        className={controlClass.control}
                        strings={DayPickerStrings}
                        placeholder="Select Shipping date..."
                        ariaLabel="Shipping date"
                        label="Shipping date"
                        onBlur={this.handleShippingDateChange}
                    /> 
                    <FDropdown
                        placeholder="Select an option"
                        className={controlClass.control}
                        label="Shipping Term."
                        options={[
                        { key: 'A', text: 'CIF', title: 'I am option a.' },
                        { key: 'B', text: 'FOB' }
                        ]}
                        value={this.state.shipTerm}
                        required
                        onChanged={this.handleShippingTermChange}
                    />
                  </Stack>
                  
                  <FDropdown
                    placeholder="Select an option"
                    label="Payment Term."
                    className={controlClass.control}
                    options={[
                      { key: 'A', text: 'COD', title: 'I am option a.' },
                      { key: 'B', text: 'D/A' },
                      { key: 'C', text: 'D/P'},
                      { key: 'D', text: 'T/T' }
                    ]}
                    required
                    onChanged={this.handlePaymentTermChange}
                  /> */}
                  {/* <TextField className={controlCustomerClass.control} placeholder="Quotation To Address:" name="Qaddress1" onBlur={(e) => {var val  = document.getElementsByName('Qaddress1')[0].value;this.setState({Qaddress1:val})}} underlined onChange={this.handleQouteToChange}/>
                  <TextField className={controlCustomerClass.control} underlined onBlur={(e) => {var val  = document.getElementsByName('Qaddress2')[0].value;this.setState({Qaddress2:val})}} name="Qaddress2" onChange={this.handleQouteAddressChange}/>
                  <TextField className={controlCustomerClass.control} onBlur={(e) => {var val  = document.getElementsByName('Qaddress3')[0].value;this.setState({Qaddress3:val})}} underlined name="Qaddress3" />
                  <TextField  className={controlCustomerClass.control} underlined name="Qaddress4"  onBlur={(e) => {var val  = document.getElementsByName('Qaddress4')[0].value;this.setState({Qaddress4:val})}}/>
                  <TextField className={controlCustomerClass.control} underlined name="Qaddress5" onBlur={(e) => {var val  = document.getElementsByName('Qaddress5')[0].value;this.setState({Qaddress5:val})}}/>
                  <TextField  className={controlCustomerClass.control}placeholder='Tel' name="QaddressTel" onBlur={(e) => {var val  = document.getElementsByName('QaddressTel')[0].value;this.setState({QaddressTel:val})}} underlined />
                  <TextField  className={controlCustomerClass.control} placeholder='VAT No.' onBlur={(e) => {var val  = document.getElementsByName('QaddressVAT')[0].value;this.setState({QaddressVAT:val})}} name="QaddressVAT"  underlined /> */}
                   
                  <Stack horizontal tokens={stackTokens}>
                    <PrimaryButton text="Save" id="QuoteSave" allowDisabledFocus onClick={() => { this.saveItemModal() }}/>
                    {/* <PrimaryButton text="Preview"  allowDisabledFocus/> */}
                    <PrimaryButton text="Cancel"  allowDisabledFocus onClick={this.closeModal}/>
                  </Stack>
                </Stack>
              </Stack>
            </form>
            </div>
         </Modal>
            
        );
    }
    
}

export default ItemModal;