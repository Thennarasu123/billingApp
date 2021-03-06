import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import _, { throttle, result } from 'lodash';
/* import './bootstrap.css';
import './bootstrap-theme.css'; */
import CustomerModal from './CustomerModal';
import SupplierModal from './SupplierModal';
import DialogBlockingExampleWrapper from './DialogBlockingExampleWrapper';
import ItemModal from './ItemModal';
import CompanyInfoDialog from './CompanyInfoDialog';
import NewTemplate from './NewTemplate';
import {Connection,Request} from 'tedious';
//import './fonts/SF_Chromium_24_Bold.ttf'
//import {CustomerModal} from './CustomerModal';
import {SplitButton,Navbar,Nav,NavDropdown,Form,FormControl, Tabs,Tab, ButtonGroup,Popover,PopoverContent,PopoverTitle,PopoverProps,OverlayTrigger} from'react-bootstrap';
import { Component} from 'react';
import { Dropdown as FDropdown, IDropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Button } from 'react-bootstrap';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown as NDropdown, FocusZoneUtilities } from '@fluentui/react-northstar'
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { DatePicker, DayOfWeek, IDatePickerStrings, mergeStyleSets , CommandBarButton, IContextualMenuProps, IIconProps, DefaultButton, Pivot, PivotItem, Dialog, DialogFooter, DialogType,   ContextualMenu, SpinButton, Toggle, ComboBox, IComboBoxOption, SelectableOptionMenuItemType, Fabric, initializeIcons, IOverflowSetItemProps, OverflowSet,Checkbox} from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
import 'office-ui-fabric-react/dist/css/fabric.css';
import 'office-ui-fabric-react/dist/css/fabric.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
/* import Button from 'react-bootstrap/Button'; */
import './App.css';
import { Sidenav,Dropdown,Icon,expanded } from 'rsuite/lib';
import { ProSidebar, Menu, MenuItem, SubMenu,SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Table, Pagination, ModalContent, Label } from 'semantic-ui-react';
import NavHeader from './NavHeader';
import 'rsuite';
import { FaHeart, FaBars, FaSave, FaLessThanEqual, FaLayerGroup, FaPencilAlt , FaPrint, FaTrash, FaVoteYea, FaEdit, FaRegEnvelope, FaUserTie, FaTemperatureLow} from 'react-icons/fa';
import QuotationPopup from './QuotationPopup.js';
import { render } from '@testing-library/react';
import Popup from 'react-popup';
import Modal from 'react-modal';
import { IndentStyle } from 'typescript';
import { FilePicker } from 'react-file-picker-preview';
import axios from 'axios';
import $ from "jquery";
import jsPDF from 'jspdf';
import multer from 'multer';
import uuid from 'uuid';
/* import 'jspdf-autotable'; */
import autoTable from 'jspdf-autotable';
//import base64 from 'base-64';
import * as util from 'util' // has no default export
//import { start } from 'repl';
///import { inspect } from 'util' // or directly
/* import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType'; */
// or 
/* var util = require('util') */
/* import LineItems from './LineItems';
import { SandboxApp } from "@fluentui/code-sandbox"; */
//import phpServer from 'php-server';
//import Button from '@material-ui/core';
/* import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'; */
//
Modal.setAppElement('#root');
//const phpServer = require('php-server');


/* (async () => {
    const server = await phpServer();
    alert(`PHP server running at ${server.url}`)
})(); */
const menuProps: IContextualMenuProps = {
  items: [
    {
      key: 'loadCustomer',
      text: 'Load from Customer List',
      iconProps: { iconName: 'Mail' },
    },
    {
      key: 'addCustomer',
      text: 'Add to Customer List',
      iconProps: { iconName: 'Calendar' },
    },
  ],
};
const addIcon: IIconProps = { iconName: 'Add' };
const mailIcon: IIconProps = { iconName: 'Mail' };
//const stackStyles: Partial<IStackStyles> = { root: { height: 44 } };
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : '90%',
    width                :'50%',
    zIndex                :99999
  }
};

const popoverStyle = {
  content : {
    display: 'flex',
    flexDirection:'row'
  }
}

const thead  ={
  textAlign : 'center'
}
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Quotation',
  closeButtonAriaLabel: 'Close',
};
let quotationFormData = {qoutationNo:"",stamp:"",date:"",shipDate:"",shipTerm:"",paymentTerm:"",qoutTo:"",qouteAddress:"",qouteTel:"",qouteVat:""}, 
supplierFormData = {category:"",supplier:"",tel:"",fax:"",email:"",preferredPayment:"",supplierName:"",supplierAddress:"",supplierTel:"",supplierVat:""}, customerFormData = {category:"",customer:"",tel:"",fax:"",email:"",preferredPayment:"",billToName:"",billToAddress:"",billToTel:"",billToVat:"",SalesDiscount:""}, itemFormData = {category:"",supplier:"",ID:"",description:"",spec:"",weight:"",unit:"",cost:"",price:"",discount:"",taxable:"",photo:""};
let _QuotationNotesObj = {};
let openCustomerModal = false, openSupplierModal = false, openItemsModal = false;
let lineItemsSubTotal = 0,discount = 0,tax = 0;
let stateVar = {};
const dialogStyles = { main: { minWidth: 600, border:'5px solid #000' } };
/* const config = {
  server: 'localhost',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa', // update me
      password: 'services' // update me
    }
  }
}
const connection = new Connection(config);
connection.on('connect', function (err) {
  if (err) {
    alert('error '+err);
  } else {
    alert('connected');
  }
}); */
/* const state = {
  file: {},
  reset: {},
}
const { file } = this.state; */
let newCustomer = null;
/* axios.post(
  './billingServer.php',{
    data: {
      name: 'jessie',
      time: '12:00',
      food: 'milk',
      nutrition: 'vitaminA'
    }
  }) */
  const modelProps = {
    isBlocking: true,
    topOffsetFixed: true
  };
  
let tableData = [];
const tableSupplierData = [
  {Category:'Category 1',Customer:'John',Tel:'123456',Fax:'123-456', Email:'thens123@gmail.com',BillTo:'Sample BillTo Address', BillingAddress:'Billing Address Sample', BillingTel:'54321',VatNo:'99999',ShipTo:'Krishnan',ShippingAddress:'Shipping Address',ShippingTel:'223-998-112',ShippingVat:'3221223',PreferedPayment:'COD'},
  {Category:'Category 1',Customer:'John',Tel:'123456',Fax:'123-456', Email:'thens123@gmail.com',BillTo:'Sample BillTo Address', BillingAddress:'Billing Address Sample', BillingTel:'54321',VatNo:'99999',ShipTo:'Krishnan',ShippingAddress:'Shipping Address',ShippingTel:'223-998-112',ShippingVat:'3221223',PreferedPayment:'COD'},
  {Category:'Category 1',Customer:'John',Tel:'123456',Fax:'123-456', Email:'thens123@gmail.com',BillTo:'Sample BillTo Address', BillingAddress:'Billing Address Sample', BillingTel:'54321',VatNo:'99999',ShipTo:'Krishnan',ShippingAddress:'Shipping Address',ShippingTel:'223-998-112',ShippingVat:'3221223',PreferedPayment:'COD'},
  {Category:'Category 1',Customer:'John',Tel:'123456',Fax:'123-456', Email:'thens123@gmail.com',BillTo:'Sample BillTo Address', BillingAddress:'Billing Address Sample', BillingTel:'54321',VatNo:'99999',ShipTo:'Krishnan',ShippingAddress:'Shipping Address',ShippingTel:'223-998-112',ShippingVat:'3221223',PreferedPayment:'COD'},
  {Category:'Category 1',Customer:'John',Tel:'123456',Fax:'123-456', Email:'thens123@gmail.com',BillTo:'Sample BillTo Address', BillingAddress:'Billing Address Sample', BillingTel:'54321',VatNo:'99999',ShipTo:'Krishnan',ShippingAddress:'Shipping Address',ShippingTel:'223-998-112',ShippingVat:'3221223',PreferedPayment:'COD'},
  {Category:'Category 1',Customer:'John',Tel:'123456',Fax:'123-456', Email:'thens123@gmail.com',BillTo:'Sample BillTo Address', BillingAddress:'Billing Address Sample', BillingTel:'54321',VatNo:'99999',ShipTo:'Krishnan',ShippingAddress:'Shipping Address',ShippingTel:'223-998-112',ShippingVat:'3221223',PreferedPayment:'COD'},
]
/* const tableItemsData = [
	{Category:'Category 1',Supplier:'John',ID:'123456',Description:'123-456', Spec:'thens123@gmail.com',Weight:'Sample BillTo Address', Unit:'Billing Address Sample', Cost:'54321',Price:'99999',Discount:'Krishnan',AdditionalInfo1:'Shipping Address',AdditionalInfo2:'223-998-112'},
	{Category:'Category 1',Supplier:'John',ID:'123456',Description:'123-456', Spec:'thens123@gmail.com',Weight:'Sample BillTo Address', Unit:'Billing Address Sample', Cost:'54321',Price:'99999',Discount:'Krishnan',AdditionalInfo1:'Shipping Address',AdditionalInfo2:'223-998-112'},
	{Category:'Category 1',Supplier:'John',ID:'123456',Description:'123-456', Spec:'thens123@gmail.com',Weight:'Sample BillTo Address', Unit:'Billing Address Sample', Cost:'54321',Price:'99999',Discount:'Krishnan',AdditionalInfo1:'Shipping Address',AdditionalInfo2:'223-998-112'},
	{Category:'Category 1',Supplier:'John',ID:'123456',Description:'123-456', Spec:'thens123@gmail.com',Weight:'Sample BillTo Address', Unit:'Billing Address Sample', Cost:'54321',Price:'99999',Discount:'Krishnan',AdditionalInfo1:'Shipping Address',AdditionalInfo2:'223-998-112'},
	{Category:'Category 1',Supplier:'John',ID:'123456',Description:'123-456', Spec:'thens123@gmail.com',Weight:'Sample BillTo Address', Unit:'Billing Address Sample', Cost:'54321',Price:'99999',Discount:'Krishnan',AdditionalInfo1:'Shipping Address',AdditionalInfo2:'223-998-112'},
] */

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 200 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 600 } },
};
let lineItemsArray = [{id:['','','','','']},{desc:['','','','','']},{unit:['','','','','']},{unitPrice:['','','','','']},{Qty:['','','','','']},{total:['','','','','','']}];
var id1 = '',id2='',id3='',id4='',id5='',id6='',id7='',id8='',id9='',id10='';
var desc1 = '',desc2='',desc3='',desc4='',desc5='',desc6='',desc7='',desc8='',desc8='',desc9='',desc10='';
var unit1 = '',unit2='',unit3='',unit4='',unit5='',unit6='',unit7='',unit8='',unit9='',unit10='';
var unitPrice1 = '',unitPrice2 = '', unitPrice3 = '', unitPrice4 = '',unitPrice5 = '',unitPrice6 = '',unitPrice7 = '',unitPrice8 = '',unitPrice9 = '',unitPrice10 = '';
var Qty1 = '',Qty2 = '',Qty3 = '',Qty4 = '',Qty5 = '',Qty6 = '',Qty7 = '',Qty8 = '',Qty9 = '',Qty10 = '';
var total1 = '',total2 = '',total3 = '',total4 = '',total5 = '',total6 = '',total7 = '',total8 = '',total9 = '',total10 = '';
const initialLineItemRow = [{id:'',desc:'',unit:'',unitPrice:'',qty:'',total:''},{id:'',desc:'',unit:'',unitPrice:'',qty:'',total:''},{id:'',desc:'',unit:'',unitPrice:'',qty:'',total:''},{id:'',desc:'',unit:'',unitPrice:'',qty:'',total:''},{id:'',desc:'',unit:'',unitPrice:'',qty:'',total:''}];
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
let popover = {},trashPopover = {},OverflowSet123 = {};
let RowIndex = 0, RowData= {};
var tableTrashData = [];

/* const DialogmodalProps = React.useMemo(
  () => ({
    isBlocking: false,
    styles: dialogStyles
  })
); */
const API_PATH = 'http://localhost:3000/server/api.php';

const customerList = [];

const checkboxStyles = {
  root: {
    marginRight: 5,
  },
};
const noOp = () => {
  alert('noOp');
}
const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
  if (item.onRender) {
    return item.onRender(item);
  }
  return (
    <CommandBarButton
      role="menuitem"
      iconProps={{ iconName: item.icon }}
      menuProps={item.subMenuProps}
      text={item.name}
    />
  );
};

const onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
  const buttonStyles: Partial<IButtonStyles> = {
    root: {
      minWidth: 0,
      padding: '0 4px',
      alignSelf: 'stretch',
      height: 'auto',
    },
  };
  return (
    <CommandBarButton
      ariaLabel="More items"
      role="menuitem"
      styles={buttonStyles}
      menuIconProps={{ iconName: 'More' }}
    />
  );
};

class App extends Component {
    constructor(props){  
      super(props);  
      var self = this;
      this.state = { showPopup: false,displayModal:false,displayQuestions: false, key:'',displayCustomerModal:false,displayItemModal:false,sidebarCollapsed:true,handleQuotationSection:false,column: null,
      isActive:0,
      handleCustomerReportSection:false,
      handleProductReportSection:false,
      handleMonthlyReportSection:false,
     /*  itemsData:tableItemsData, */
      /* supplierData:tableSupplierData, */
      direction: null,
      handleSupplierSection:false,
      handleCustomerSection:false,
      handleItemsSection:false,
      handleCustomerReport: false,
      handleMonthlyReport:false,
      handleProductReport:false,
      showPopOver:false,
      displayCustomerInfoDialog:false,
      apiResponse:"",
      qouteNo:"QUO-0001",
      uploadedFile : '',
      qouteDate:"",
      saleRep:"",
      shipDate:"",
      Currency:"INR",
      shipTerm:"",
      payTerm:"",
      qouteTo:"",
      stamp:"",
      cgst:"",
      igst:"",
      sgst:"",
      qouteAddress:"",
      handleCustomerTrash:false,
      handleItemsTrash:false,
      handleQuotationTrashModal:false,
      handleSupplierTrash:false,
      lineItemsArray:lineItemsArray,
      currentStep:'Line Items',
      firstDayOfWeek:DayOfWeek.Sunday,
      showLoadTemplateDialog:false,
      showAddTemplateDialog:false,
      lineItemRows : [{id:'',desc:'',unit:'',unitPrice:'',qty:'',total:''},{id:'',desc:'',unit:'',unitPrice:'',qty:'',total:''},{id:'',desc:'',unit:'',unitPrice:'',qty:'',total:''},{id:'',desc:'',unit:'',unitPrice:'',qty:'',total:''},{id:'',desc:'',unit:'',unitPrice:'',qty:'',total:''}/* ,{id:'',desc:'',unit:'',unitPrice:'',qty:'',total:''},{id:'',desc:'',unit:'',unitPrice:'',qty:'',total:''} */],
      id1 : '',id2:'',id3:'',id4:'',id5:'',id6:'',id7:'',id8:'',id9:'',id10:'',
      desc1 : '',desc2:'',desc3:'',desc4:'',desc5:'',desc6:'',desc7:'',desc8:'',desc8:'',desc9:'',desc10:'',
      unit1 : '',unit2:'',unit3:'',unit4:'',unit5:'',unit6:'',unit7:'',unit8:'',unit9:'',unit10:'',
      unitPrice1 : '',unitPrice2 : '', unitPrice3 : '', unitPrice4 : '',unitPrice5 : '',unitPrice6 : '',unitPrice7 : '',unitPrice8 : '',unitPrice9 : '',unitPrice10 : '',
      Qty1 : '',Qty2 : '',Qty3 : '',Qty4 : '',Qty5 : '',Qty6 : '',Qty7 : '',Qty8 : '',Qty9 : '',Qty10 : '',
      total1 : '',total2 : '',total3 : '',total4 : '',total5 : '',total6 : '',total7 : '',total8 : '',total9 : '',total10 : '',RowIndex:'',RowData:'',
      QuotationNotes:'',
      subTotal:'',
      discount:'',
      tax:'1000',
      total:'',
      Qaddress1:'',
      customerList:[],
      addEsign:true,
      printinA4:true,
      PhotosPerPage:'',
	  selectedFile: null,
      Qaddress2:'',Qaddress3:'',Qaddress4:'',Qaddress5:'',QaddressTel:'',QaddressTel:'',QaddressVAT:'',addNewRow:true};  
      this.modalRef = React.createRef();
      this.handleCustomerClick = this.handleCustomerClick.bind(this);
      this.handleSupplierClick = this.handleSupplierClick.bind(this);
      this.handleItemClick = this.handleItemClick.bind(this);
      this.handleSupplierRowClick = this.handleSupplierRowClick.bind(this);
      this.handleCustomerRowClick = this.handleCustomerRowClick.bind(this);
      this.handleQoutationRowClick = this.handleQoutationRowClick.bind(this);
      this.handleItemRowClick = this.handleItemRowClick.bind(this);
      this.handleEditClick = this.handleEditClick.bind(this);
      this.handleSaveClick = this.handleSaveClick.bind(this);
      this.handlePrintClick = this.handlePrintClick.bind(this);
      this.handleDeleteClick = this.handleDeleteClick.bind(this);
      this.popoverClick = this.popoverClick.bind(this);
      this.handleQuotationSave = this.handleQuotationSave.bind(this);
      this.handlePDFPreview = this.handlePDFPreview.bind(this);
      this.fetchData = this.fetchData.bind(this);
      this.rowItemEdit = this.rowItemEdit.bind(this);
      this.itemTotalUpdate = this.itemTotalUpdate.bind(this);
      this.handleAddCompanyInfoClick = this.handleAddCompanyInfoClick.bind(this);
      this.handletotalDiscountChange = this.handletotalDiscountChange.bind(this);
      this._onLineItemsLinkClick = this._onLineItemsLinkClick.bind(this);
      this._onLinkClick = this._onLinkClick.bind(this);
      this.handlelineItemsArrUpdate= this.handlelineItemsArrUpdate.bind(this);
      this.onSupplierChange = this.onSupplierChange.bind(this);
      this.handleCustomerReport  = this.handleCustomerReport.bind(this);
      this.handleProductReport = this.handleProductReport.bind(this);
      this.handleMonthlyReport = this.handleMonthlyReport.bind(this);
      this.onLineItemChange = this.onLineItemChange.bind(this);
      this.deleteLineItemsRow = this.deleteLineItemsRow.bind(this);
      this.lineItemRowAdd = this.lineItemRowAdd.bind(this);
      this.loadFromTemplate  = this.loadFromTemplate.bind(this);
      this.loadCustomerList = this.loadCustomerList.bind(this);
      this.AddCustomerList = this.AddCustomerList.bind(this);
      this.noOp = this.noOp.bind(this);
      this.AddNewTemplate  = this.AddNewTemplate.bind(this);
      this.viewUploadedImage = this.viewUploadedImage.bind(this);
      this.removeUploadedImage= this.removeUploadedImage.bind(this);
      this.PhotosPerPage = this.PhotosPerPage.bind(this);
      this.handleCustomerReportSection = this.handleCustomerReportSection.bind(this);
      //this.handletotalTaxChange = this.handletotalTaxChange.bind(this);
      //console.log('axios');
      
      axios.get('http://localhost:9000/testAPI/customers').then((res) => {
            console.log('cust length '+res.data.length);
            tableData = [];
            tableTrashData = [];
            res.data.forEach(function(bar, index) {
              var tmp = {};
              tmp.category = bar.category;
              tmp.customer = bar.customer;
              customerList.push(bar.customer);
              tmp.tel = bar.tel;
              tmp.email = bar.email;
              tmp.PaymentTerm = bar.PaymentTerm;
              tmp.SalesDiscount = bar.SalesDiscount;
              tmp.BillToName = bar.BillToName;
              tmp.BillToAddress = bar.BillToAddress;
              tmp.BillToTel = bar.BillToTel;
              tmp.isActive  =bar.isActive;
              tableData.push(tmp);
            });
            alert(JSON.stringify(customerList));
            this.setState({data: tableData,trashData:tableTrashData, customerLength:tableData.length, })
      });
      /* $('#lineItemsRowAdd').on('click',function(e){
        alert('item add clicked');
      }); */
      axios.get('http://localhost:9000/testAPI/items').then((res) => {
            //alert('item length  '+res.data.length);
            tableData = [];
            tableTrashData = [];
            res.data.forEach(function(bar, index) {
              var tmp = {};
              tmp.category = bar.category;
              tmp.supplier = bar.supplier;
              tmp.ID = bar.ID;
              tmp.Description = bar.Description;
              tmp.Spec = bar.Spec;
              tmp.weight = bar.weight;
              tmp.Unit = bar.Unit;
              tmp.cost = bar.cost;
              tmp.price = bar.price;
              tmp.Discount = bar.Discount;
              tmp.isActive  =bar.isActive;
              if(tmp.isActive == 1 || tmp.isActive == '1'){
                tableData.push(tmp);
              }else if(tmp.isActive == 0 || tmp.isActive == '0'){
                tableTrashData.push(tmp);
              }
            });
            this.setState({itemsData: tableData,itemsTrashData:tableTrashData,itemsLength:tableData.length})
      });
      axios.get('http://localhost:9000/testAPI/qoutation').then((res) => {
            //console.log('qoutation length '+res.data.length);
            tableData = [];
            tableTrashData = [];
            res.data.forEach(function(bar, index) {
              console.log('quotation data '+JSON.stringify(bar));
              var tmp = {};
              tmp.type = bar.type;
              tmp.number = bar.Number;
              tmp.customer = bar.qoutTo;
              tmp.date = bar.date;
              tmp.saleRep = bar.saleRep;
              tmp.stamp = bar.stamp;
              tmp.qouteTo = bar.qoutTo;
              tmp.qouteAddress = bar.qouteAddress;
              tmp.shipDate = bar.shipDate;
              tmp.shipTerm = bar.shipTerm;
              tmp.payTerm = bar.payTerm;
              tmp.isActive  =bar.active;
              if(tmp.isActive == 1 || tmp.isActive == '1'){
                tableData.push(tmp);
              }else if(tmp.isActive == 0 || tmp.isActive == '0'){
                tableTrashData.push(tmp);
                console.log('tableTrashData '+JSON.stringify(tableTrashData));
              }
            });
            var date = new Date();
            var month = date.getMonth();
            month = (month>10)?month:"0"+month;
            var minutes = date.getMinutes();
            minutes = (minutes>10)?minutes:"0"+minutes;
            var seconds = date.getSeconds();
            seconds = (seconds>10)?seconds:"0"+seconds;
            var hours = date.getHours();
            hours = (hours>10)?hours:"0"+hours;
            var day = date.getDate();
            day = (day>10)?day:"0"+day;
            this.setState({
              qouteNo:'LDS-QUO'+(tableData.length+1)+'-'+day+month+date.getFullYear()//+hours+minutes+seconds
            });
            this.setState({quotationData: tableData,qouteLength:tableData.length,quotationTrashData: tableTrashData, qouteTrashLength:tableTrashData.length})
      });
      axios.get('http://localhost:9000/testAPI/supplier').then((res) => {
            //console.log('qoutation length '+res.data.length);
            tableData = [];
            res.data.forEach(function(bar, index) {
              var tmp = {};
              tmp.category = bar.category;
              tmp.supplier = bar.supplier;
              tmp.tel = bar.tel;
              tmp.fax = bar.fax;
              tmp.email = bar.email;
              tmp.supplierName = bar.supplierName;
              tmp.address = bar.address;
              tmp.supplierTel = bar.supplierTel;
              tmp.supplierVat = bar.supplierVat;
              tmp.preferredPayment = bar.preferredPayment;
              tmp.isActive  =bar.isActive;
              tableData.push(tmp);
              console.log('tmp 123 '+JSON.stringify(tmp))
            });
            this.setState({supplierData: tableData, supplierLength:tableData.length})
      });
      popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Options</Popover.Title>
          <Popover.Content>
              <div class="popoverStyle" /* style={popoverStyle} */>
              <Label class="popoverItemStyle" onClick={this.rowItemEdit()}>Edit <br></br><FaPencilAlt /></Label>
              <Label class="popoverItemStyle" onClick={this.rowItemDelete()}>Delete  <br></br><FaTrash /></Label>
              </div>              
          </Popover.Content>
        </Popover>
      );
      trashPopover  = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Options</Popover.Title>
          <Popover.Content>
              <div class="popoverStyle" /* style={popoverStyle} */>
              <Label class="popoverItemStyle" onClick={this.rowItemRestore()}>Restore <br></br><FaPencilAlt /></Label>
              <Label class="popoverItemStyle" onClick={this.rowItemDelete()}>Delete  <br></br><FaTrash /></Label>
              </div>              
          </Popover.Content>
        </Popover>
      )
      OverflowSet123 = (
          <OverflowSet
          aria-label="Custom Example"
          role="menubar"
          items={[
            {
              key: 'upload',
              name: 'Load from Customer List',
              icon: 'Search',
              onClick: noOp,
            },
            {
              key: 'share',
              name: 'Add to Customer List',
              icon: 'Search',
              onClick: noOp,
            }
          ]}
          onRenderOverflowButton={onRenderOverflowButton}
          onRenderItem={onRenderItem}
        />
      )
        
    } 

    //fetchData();
    fetchData(){
      axios.get('http://localhost:9000/testAPI/customers').then((res) => {console.log(res.data)});
   }
    callAPI() {
      //alert('callAPI');
      fetch("http://localhost:9000/testAPI")
          .then(res => { alert('resp1 '+JSON.stringify(res))  })
          .then(res => { alert('resp2 '+JSON.stringify(res))  });
    }
    toggleHover(){
      this.setState({
        sidebarCollapsed: !this.state.sidebarCollapsed,
      });
    }
    
    popoverClick = (el,item) => () => {
      console.log('clicke Row Item '+el);
      console.log('row Item '+item);
      this.setState({
        showPopOver: !this.state.showPopOver
      })
    }
    PhotosPerPage = event => {
      //alert('PHotosPerPage '+);
      console.log('PHotosPerPage  '+event.key);
      this.setState({
        PhotosPerPage: event.key
      })
      console.log(this.state.PhotosPerPage);
    }
    viewUploadedImage = event => {
      window.open(this.state.uploadedFile);
    }
    removeUploadedImage = event => {
      alert('removeUploadedImage ');
      axios.delete(this.state.uploadedFile)
    }
	// On file select (from the pop up) 
    onFileChange = event => { 
      // Update the state 
      this.setState({ selectedFile: event.target.files }); 
    }; 
    noOp = () => () => {
      alert('noOP');
    };
    loadCustomerList = event => {
      alert('loadcustomerlist');
    }

    AddCustomerList = event => {
      alert('addcustomerlist');
    }
	
	// On file upload (click the upload button) 
    onFileUpload = () => { 
      //alert('onFileUpload');
      // Create an object of formData 
      const formData = new FormData(); 
     
      // Update the formData object 
      var fileObj = this.state.selectedFile[0];
      console.log('this.state.selectedFile '+this.state.selectedFile.length);
      const myNewFile = new File([fileObj], 'QUO-0001.png', {type: fileObj.type});
      //fileObj.quoname = 'Quo-00001';
      var fileObjFinal = [];
      /* for(var fileData = 0; fileData<this.state.selectedFile.length; fileData++){
        var fileObj = this.state.selectedFile[fileData];
        const myNewFile = new File([fileObj], 'QUO-0001', {type: fileObj.type});
        fileObjFinal.push(myNewFile);
      }
 */
      formData.append( 
        "myFile", 
        myNewFile
      ); 
      var obj = 'QUO-00001';
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };
      axios.post("http://localhost:9000/testAPI/userProfile", formData, config).then(res => {
        alert('result.data '+res.data);
        this.setState({
          uploadedFile:'http://localhost:9000/'+res.data
        })
      }); 
    }; 
  
  AddNewTemplate = () => {
    //alert('Add New Template');
    this.setState({
      showAddTemplateDialog:true
    })
  }
    
  handleCustomerReportSection = () => {
    axios.post('http://localhost:9000/testAPI/customerReport',{customer: 'thennarasu'}).then((response) => {this.setState({apiRespnse:response.data})});
    this.setState({
      handleCustomerReportSection:true
    })
  }

  handleProductReportSection = () => {
    axios.get('http://localhost:9000/testAPI/productReport')
    this.setState({
      handleProductReportSection:true
    })
  }

  handleMonthlyReportSection = () => {
    axios.get('http://localhost:9000/testAPI/monthlyReport')
    this.setState({
      handleMonthlyReportSection:true
    })
  }

	loadFromTemplate = () => {
		/* axios.get('http://localhost:9000/testAPI/templates').then((res) => {
			initializeIcons();

			const options: IComboBoxOption[] = [
			  { key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
			  { key: 'A', text: 'Option A' },
			  { key: 'B', text: 'Option B' },
			  { key: 'C', text: 'Option C' },
			  { key: 'D', text: 'Option D' },
			  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
			  { key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
			  { key: 'E', text: 'Option E' },
			  { key: 'F', text: 'Option F', disabled: true },
			  { key: 'G', text: 'Option G' },
			  { key: 'H', text: 'Option H' },
			  { key: 'I', text: 'Option I' },
			  { key: 'J', text: 'Option J' },
			];
			const dragOptions = {
			  moveMenuItemText: 'Move',
			  closeMenuItemText: 'Close',
			  menu: ContextualMenu,
			};
			const modalPropsStyles = { main: { maxWidth: 450 } };
			const iconProps = { iconName: 'IncreaseIndentLegacy' };
			const dialogContentProps = {
			  type: DialogType.normal,
			  title: 'Missing Subject',
			  subText: 'Do you want to send this message without a subject?',
			};
			const log = (text: string): (() => void) => {
			  return (): void => {
				console.log(text);
			  };
			};

			const DialogBlockingExample: React.FunctionComponent = () => {
			  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
			  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
			  const modalProps = React.useMemo(
				() => ({
				  isBlocking: true,
				  styles: modalPropsStyles,
				  dragOptions: isDraggable ? dragOptions : undefined,
				}),
				[isDraggable],
			  );
			return(
				<>
				  <Toggle label="Is draggable" onChange={toggleIsDraggable} checked={isDraggable} />
				  <DefaultButton secondaryText="Opens the Sample Dialog" onClick={toggleHideDialog} text="Open Dialog" />
				  <Dialog
					hidden={hideDialog}
					onDismiss={toggleHideDialog}
					dialogContentProps={dialogContentProps}
					modalProps={modalProps}
				  >
					<SpinButton
					  defaultValue="0"
					  label={'Number of subjects to add:'}
					  min={0}
					  max={100}
					  step={1}
					  iconProps={iconProps}
					  onFocus={log('onFocus called')}
					  onBlur={log('onBlur called')}
					  incrementButtonAriaLabel={'Increase value by 1'}
					  decrementButtonAriaLabel={'Decrease value by 1'}
					/>
					<ComboBox
					  label="Sample subject lines you could add instead"
					  placeholder="Select or type an option"
					  allowFreeform
					  autoComplete="on"
					  options={options}
					/>
					<DialogFooter>
					  <PrimaryButton onClick={toggleHideDialog} text="Send" />
					  <DefaultButton onClick={toggleHideDialog} text="Don't send" />
					</DialogFooter>
				  </Dialog>
				</>
			);};
			const DialogBlockingExampleWrapper = () => <Fabric><DialogBlockingExample /></Fabric>;
		}); */
		this.setState({
			
			showLoadTemplateDialog:true
		});
	}	
	
    rowItemEdit = () => () => {
      document.body.click()
      stateVar = this.state;
      if(openCustomerModal == true){
        this.setState({
          displayCustomerModal:!this.state.displayCustomerModal
        })
        openCustomerModal  = false;
      }else if(openSupplierModal == true){
        console.log('rowindex '+this.state.RowIndex);
        console.log('rowData '+JSON.stringify(this.state.RowData));
        this.setState({
          displaySupplierModal:!this.state.displaySupplierModal
        })
        openSupplierModal  = false;
        
        
      }else if(openItemsModal == true){
        this.setState({
          displayItemModal:!this.state.displayItemModal
        })
        openItemsModal = false;

       /*  setTimeout(function(){
          document.getElementById('supplierName').value = stateVar.RowData.supplier;// = this.state.RowData;//.supplier
          document.getElementById('supplierTel').value = stateVar.RowData.tel;
          document.getElementById('supplierFax').value = stateVar.RowData.fax;
          document.getElementById('supplierEmail').value = stateVar.RowData.email;
          document.getElementById('supplierPayTerm').value = stateVar.RowData.preferredPayment;
          document.getElementById('supplierDiscount').value = stateVar.RowData.supplierVat;
          document.getElementById('supplierBillToInfo').value = stateVar.RowData.address;
        },3000) */
      }else{
        this.handleModal();
      }
    }
    lineItemRowAdd = () => {
      var lastRow = $('table#QuotationItems > tbody > tr:last').index();
            const rows = [...this.state.lineItemRows];
            rows[lastRow+1] = {
              id:"",
              desc:"",
              unit:"",
              unitPrice:"",
              qty:"",
              total:""
            }
            //$("table#QuotationItems > tbody").html("");
            console.log('lineItemRows lineItemRowAdd '+lastRow+' '+JSON.stringify(rows));
            this.setState({
              lineItemRows:rows,
              addNewRow:true
            })
    }
    onLineItemChange = (index,value,el) => {
      //alert('index '+index+' value  '+value);
      ////console.log('id '+(index+1)+' value '+value+' el '+el);
      const rows = [...this.state.lineItemRows];
      ////console.log('itemid '+JSON.stringify(rows[index]));
      if(el == 'itemID'){
        var id = $('#itemID'+(index+1)).val();
        var unit = $('#itemUnit'+(index+1)).val();
        var desc = $('#itemDesc'+(index+1)).val();
        var unitPrice = $('#itemUnitPrice'+(index+1)).val();
        var qty = $('#itemQty'+(index+1)).val();
        var total = $('#itemTotal'+(index+1)).val();
        rows[index] = {
          id:value,
          qty:qty,
          unit:unit,
          unitPrice:unitPrice,
          total:total,
          desc:desc
        }
        console.log(rows[index].id+"  "+rows[index].qty+" "+rows[index].unitPrice+"  "+rows[index].total+" "+rows[index].desc);
      }else if(el == 'itemDesc'){
        var id = $('#itemID'+(index+1)).val();
        var unit = $('#itemUnit'+(index+1)).val();
        var unitPrice = $('#itemUnitPrice'+(index+1)).val();
        var qty = $('#itemQty'+(index+1)).val();
        var total = $('#itemTotal'+(index+1)).val();
        //alert('id 123456 '+id+" "+unit+" "+unitPrice+"  "+qty+" "+total);
        rows[index] = {
          id:id,
          desc:value,
          unit:unit,
          unitPrice:unitPrice,
          qty:qty,
          total:total
        }
          console.log(rows[index].id+"  "+rows[index].qty+" "+rows[index].unitPrice+"  "+rows[index].total+" "+rows[index].desc+' '+$('#itemID'+(index+1)).val());
      }else if(el == 'itemQty'){
        var id = $('#itemID'+(index+1)).val();
        var unit = $('#itemUnit'+(index+1)).val();
        var unitPrice = $('#itemUnitPrice'+(index+1)).val();
        var qty = $('#itemQty'+(index+1)).val();
        var total = $('#itemTotal'+(index+1)).val();
        var desc = $('#itemDesc'+(index+1)).val();
        rows[index] = {
          id:id,
          desc:desc,
          unit:unit,
          unitPrice:unitPrice,
          qty:value,
          total:parseFloat(unitPrice)*parseFloat(value)
        }
        console.log(rows[index].id+"  "+rows[index].qty+" "+rows[index].unitPrice+"  "+rows[index].total+" "+rows[index].desc);
        this.itemTotalUpdate(rows[index].qty);
      }else if(el == 'itemUnit'){
        var id = $('#itemID'+(index+1)).val();
        var unit = $('#itemUnit'+(index+1)).val();
        var unitPrice = $('#itemUnitPrice'+(index+1)).val();
        var qty = $('#itemQty'+(index+1)).val();
        var total = $('#itemTotal'+(index+1)).val();
        var desc = $('#itemDesc'+(index+1)).val();
        rows[index] = {
          id:id,
          desc:desc,
          unit:value,
          qty:qty,
          unitPrice:unitPrice,
          total:total
        }
        console.log(rows[index].id+"  "+rows[index].qty+" "+rows[index].unitPrice+"  "+rows[index].total+" "+rows[index].desc);
      }else if(el == 'itemUnitPrice'){
        var id = $('#itemID'+(index+1)).val();
        var unit = $('#itemUnit'+(index+1)).val();
        var unitPrice = $('#itemUnitPrice'+(index+1)).val();
        var qty = $('#itemQty'+(index+1)).val();
        var total = $('#itemTotal'+(index+1)).val();
        var desc = $('#itemDesc'+(index+1)).val();
        rows[index] = {
          id:id,
          desc:desc,
          unit:unit,
          unitPrice:value,
          qty:qty,
          total:total
        }
        console.log(rows[index].id+"  "+rows[index].qty+" "+rows[index].unitPrice+"  "+rows[index].total+" "+rows[index].desc);
      }else if(el == 'itemTotal'){
        var id = $('#itemID'+(index+1)).val();
        var unit = $('#itemUnit'+(index+1)).val();
        var unitPrice = $('#itemUnitPrice'+(index+1)).val();
        var qty = $('#itemQty'+(index+1)).val();
        var total = $('#itemTotal'+(index+1)).val();
        var desc = $('#itemDesc'+(index+1)).val();
        rows[index] = {
          id:id,
          desc:desc,
          unit:unit,
          unitPrice:unitPrice,
          qty:qty,
          total:value
        }
        console.log(rows[index].id+"  "+rows[index].qty+" "+rows[index].unitPrice+"  "+rows[index].total+" "+rows[index].desc);
      }
      this.setState({
        lineItemRows:rows,
        addNewRow:true
      });
      index = index+1;//+1;
      //alert('rows length '+this.state.lineItemRows.length);
      console.log('rows '+JSON.stringify(rows));
      var element = "#"+el+""+index;
      $("#"+el+""+index).focus();
    }
    rowItemDelete = () => () => {
      /* document.body.click()
      ////alert(this.state.RowIndex);
      var el = document.getElementsByClassName('mainTable')[0];
      ////console.log('rowItemDelete '+el);
      el.deleteRow(this.state.RowIndex+1); */
      //$('.mainTable').load(window.location.href + " .mainTable");
      //this.handleModal();
    }
    deleteLineItemsRow = (index) => {
      this.setState({
          addNewRow:true
      })
      var el = document.getElementById('QuotationItemsBody');
      el.deleteRow(index);
      this.subTotalUpdate()
      //alert('indeex '+el);
      //var table = document.getElementById("QuotationItemsBody");
      //table.removeChild(table.childNodes[index]);
    }
    rowItemRestore  = () => () => {
      document.body.click()
      this.handleModal();
    }
    onSupplierChange = (event) => {
        this.setState({ name: event.target.value });
    }
    handleMonthlyReport = () => {
      document.getElementsByClassName('navbar-brand')[0].innerHTML  = "Monthly Report";
      this.setState({
        handleItemsSection:false,
        handleQuotationSection:false,
        handleCustomerSection:false,
        handleSupplierSection:false,
        handleMonthlyReport:true,
        handleCustomerReport:false,
        handleProductReport:false
      })
    }
    handleProductReport = () => {
      document.getElementsByClassName('navbar-brand')[0].innerHTML  = "Product Wise Report";
      this.setState({
        handleItemsSection:false,
        handleQuotationSection:false,
        handleCustomerSection:false,
        handleSupplierSection:false,
        handleMonthlyReport:false,
        handleCustomerReport:false,
        handleProductReport:true
      })
    }
    handleCustomerReport = () => {
      document.getElementsByClassName('navbar-brand')[0].innerHTML  = "Customer Wise Report";
      this.setState({
        handleItemsSection:false,
        handleQuotationSection:false,
        handleCustomerSection:false,
        handleSupplierSection:false,
        handleMonthlyReport:false,
        handleCustomerReport:true,
        handleProductReport:false
      })
    }
    _onLineItemsLinkClick = (e) =>  {
      return false;
      console.log('onlineitemsclick '+e.props.itemKey);
      if(this.state.currentStep == 'Line Items'){
        for(var i=1;i<4;i++){
          setTimeout(function(){
            var element  = document.getElementById('itemID'+i);
            if(element != null || element != 'null'){
              console.log('element '+element.value+' '+element.name);
              element.value = element.name;
              element = null;
              element = document.getElementById('itemDesc'+i);
              element.value = element.name;
              element = null;
              element = document.getElementById('itemUnit'+i);
              element.value = element.name;
              element = null;
              element = document.getElementById('itemUnitPrice'+i);
              element.value = element.name;
              element = null;
              element = document.getElementById('itemQty'+i);
              element.value = element.name;
              element = null;
              element = document.getElementById('itemTotal'+i);
              element.value = element.name;
              element = null;
            }
         },3000);
            //alert('element '+element);
            
            
          /* for(var j=0;j<5;j++){  
            if(i==1){
              document.getElementById('itemID1').addEventListener('blur', function(e){/* this.handlelineItemsArrUpdate(e,i-1,j) *///});   
              /*document.getElementById('itemDesc'+i).addEventListener('blur', function(e,i=1,j=){console.log('e '+e+' '+i);});  
              document.getElementById('itemUnit'+i).addEventListener('blur', function(e){/* this.handlelineItemsArrUpdate(e,i-1,j) *///});   
            /*}else if(i==2){
              document.getElementById('itemDesc'+i).addEventListener('blur', function(e,i=2){console.log('e '+e+' '+i);});  
            }else if(i==3){
              document.getElementById('itemDesc'+i).addEventListener('blur', function(e,i=3){console.log('e '+e+' '+i);});  
            }else if(i==4){
              document.getElementById('itemDesc'+i).addEventListener('blur', function(e,i=4){console.log('e '+e+' '+i);});  
            }else if(i==5){
              document.getElementById('itemDesc'+i).addEventListener('blur', function(e,i=5){console.log('e '+e+' '+i);});  
            }   */              
            /* document.getElementById('itemID1').addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});   
            document.getElementById('itemDesc'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});  
            document.getElementById('itemUnit'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});    */
            /* document.getElementById('itemUnitPrice'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});  
            document.getElementById('itemQty'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});  
            document.getElementById('itemTotal'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});  */ 
          }
      }
      
      /* setTimeout(function(){ var element  = document.getElementsByClassName('itemID')[0];
      alert(element);
      
      } }, 3000);
      console.log('_onLineItemsLinkClick '+e);
      alert('_onLineItemsLinkClick'); */
      
    }
    handlelineItemsArrUpdate(e,i,j){
      var element  = document.getElementsByClassName('nav-bar')[0];
              alert('ok '+element);
              /* for(var i=1;i<5;i++){
                var element  = document.getElementById('itemDesc1');
                  alert(element);
                for(var j=0;j<5;j++){                  
                  document.getElementById('itemID1').addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});   
                  document.getElementById('itemDesc'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});  
                  document.getElementById('itemUnit'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});   
                  document.getElementById('itemUnitPrice'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});  
                  document.getElementById('itemQty'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});  
                  document.getElementById('itemTotal'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});  
                }
            } */
      //alert('i '+i+' '+j);
      //console.log('arrupdate '+e+' '+i+' ' +j);
      //let tmpArr = lineItemsArray;
      //tmpArr
    }
    handlelineItemsArrUpdate = (e,i,j) => {
      /* var element  = document.getElementsByClassName('nav-bar')[0];
              alert(element); */
              /* for(var i=1;i<5;i++){
                var element  = document.getElementById('itemDesc1');
                  alert(element);
                for(var j=0;j<5;j++){                  
                  document.getElementById('itemID1').addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});   
                  document.getElementById('itemDesc'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});  
                  document.getElementById('itemUnit'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});   
                  document.getElementById('itemUnitPrice'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});  
                  document.getElementById('itemQty'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});  
                  document.getElementById('itemTotal'+i).addEventListener('blur', function(e){this.handlelineItemsArrUpdate(e,i-1,j)});  
                }
            } */
      //alert('i '+i+' '+j);
      console.log('arrupdate '+e+' '+i+' ' +j);
      let tmpArr = lineItemsArray;
      //tmpArr
    }
        /* $(document).ready(function(){
          $('#lineItemsRowAdd').on('click',function(e){
            alert('item add clicked');
          })
        }); */
    handlePDFPreview = () => () => {
        const doc = new jsPDF()
        /* doc.addHTML("#my-table",function() {
          doc.save('html.pdf');
        }); */



       //// return false;
        // Because of security restrictions, getImageFromUrl will
        // not load images from other domains.  Chrome has added
        // security restrictions that prevent it from loading images
        // when running local files.  Run with: chromium --allow-file-access-from-files --allow-file-access
        // to temporarily get around this issue.
        
        stateVar = this.state;
        var startY = 0;
        var footStart = parseInt(doc.internal.pageSize.height)-25;
        //var getImageFromUrl = function(url, startY, callback) {
        async function getImageFromUrl(url, startY, callback) {
          var img = new Image();
          var Ypos = 0;
          img.onError = function() {
              alert('Cannot load image: "'+url+'"');
          };
          img.onload = function() {
             Ypos =  callback(startY, img);
             return Ypos;
          };
          img.src = url;
          
          
        }
        var addSeal = function(startY, imgData) {
          doc.addImage(imgData, 'PNG', 7, startY, 35, 20, 'seal'); // Cache the image using 
          setTimeout(function(){doc.save('table.pdf')},2000)
         //// getImageFromUrl('seal.png',startY,addSign);
        };
        var addSign = function(startY, imgData) {
          doc.addImage(imgData, 'PNG', 45, (startY-5), 35, 26, 'sign'); // Cache the image using 
          ////getImageFromUrl('letterhead.jpg',startY, createPDF);
        };
        /* var addImage = function(imgData){
          if(stateVar.printinA4){
            doc.addImage(imgData, 'JPEG', 4, 5, doc.internal.pageSize.width-2, 28, 'monkey');// Cache the image using the alias 'monkey'
          }
        } */
        // Since images are loaded asyncronously, we must wait to create
        // the pdf until we actually have the image.
        // If we already had the jpeg image binary data loaded into
        // a string, we create the pdf without delay.
        var addHeader = function(startY, imgData) {
          ///alert('addHeader '+startY);
          if(stateVar.printinA4){
            doc.addImage(imgData, 'JPEG', 4, 5, doc.internal.pageSize.width-2, 28, 'monkey');// Cache the image using the alias 'monkey'
          }
        }
        var addFooter = function(startY, imgData) {
          if(stateVar.printinA4){
            doc.addImage(imgData, 'JPEG', 4, 5, doc.internal.pageSize.width-2, 28, 'monkey');// Cache the image using the alias 'monkey'
          }
        }
        var createPDF = function(startY, imgData) {
          //var doc = new jsPDF();
          console.log('imgData '+imgData+' '+imgData.src);
          // This is a modified addImage example which requires jsPDF 1.0+
          // You can check the former one at examples/js/basic.js
          if(stateVar.printinA4){
            doc.addImage(imgData, 'JPEG', 4, 5, doc.internal.pageSize.width-2, 28, 'monkey');// Cache the image using the alias 'monkey'
          }
          
         // doc.addImage('sample', 70, 10, 100, 120); // use the cached 'monkey' image, JPEG is optional regardless
          // As you can guess, using the cached image reduces the generated PDF size by 50%!

          // Rotate Image - new feature as of 2014-09-20
          /* doc.addImage({
              imageData : imgData,
              angle     : -20,
              x         : 10,
              y         : 78,
              w         : 45,
              h         : 58
          }); */

          // Output as Data URI
          //doc.save('image.pdf');
          //console.log('datauri '+doc.output('datauri'));
        doc.setTextColor('#008000');
        doc.addFont('./fonts/SF_Chromium_24_Bold.ttf');
        doc.setFont('SF_Chromium_24_Bold.ttf');
        //alert(JSON.stringify(doc.getFontList()));
        ////var text = "Lakshmi Digipro Systemz\n11/1-V.G.Rao Nagar Phase 2, Ganapathy,\nCoimbatore - 641 006. Mobile : 98431 67775, 74488 02444";
        //doc.setLineDash([10, 10], 100);
        ////doc.line(0, 33, 260, 33);
        ////doc.text(text,33,15);
       // alert(doc.internal.pageSize.height);
        doc.setFontSize(12);
        var text = '';
        var qno = 'Quotation No : '+stateVar.qouteNo;
        var xOffset = doc.internal.pageSize.width - doc.getTextWidth(qno) - 5; 
        console.log('pageSize Height '+doc.internal.pageSize.height );
        if(stateVar.printinA4){
          text = "GSTIN:33AAHFL5571G1ZB";
          doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-25);
          text = "GATE WAY TO INDUSTRY 4.0 & DIGITAL FACTORY AUTOMATION";
          doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-12);
          text = "Website : www.lakshmidigipro.com";
          doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-6);
          doc.line(0,parseInt(doc.internal.pageSize.height)-20,260,parseInt(doc.internal.pageSize.height)-20);
        }

        text = "To,\n\n"+stateVar.Qaddress1+"\n"+stateVar.Qaddress2+" "+stateVar.Qaddress3+" "+stateVar.Qaddress4+"\n"+stateVar.Qaddress5+".\nCon : "+stateVar.QaddressTel;
        doc.setTextColor('#00000');
        doc.text(text,15,42);
        doc.setFontType('bold');
        text = "Kind Attention : "+stateVar.Qaddress1;
        doc.text(text,15,75);
        
        doc.setFontType('normal');
        text = "Dear Sir,\n  Please find our quote for Production Monitoring System with Reason Entry Device.";
        doc.text(text,15,85);
        //var Notes = document.createElement('P');
        //doc.setFontSize(10);
        //doc.text("Date : ",125,257)
        /* doc.setTextColor('#00000');
        doc.text(text,15,42); */
        ////doc.text('А ну чики брики и в дамки',xOffset,42)
        doc.text(qno,xOffset,42)
        doc.text("Date : "+new Date().toLocaleDateString(),xOffset , 50)
        doc.setTextColor('#00000');
        //xOffset = (doc.internal.pageSize.width / 2) - (doc.getTextWidth(text)/ 2); 
        //doc.text(text,30,30);
        var itemQtyCls = document.querySelectorAll('.itemTotal');
        //var thead = '<table><thead><tr><th>ID</th><th>Description</th><th>Unit</th><th>Unit Price</th><th>Qty</th><th>Total</th></tr></thead><tbody><tr><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td></tr><tbody/></table>';
        //var doc1 = new DOMParser().parseFromString(thead, "text/xml");
        /* for(totalRow = 0; totalRow < itemQtyCls.length; totalRow++){
          
        } */
        //console.log('doc1 '+JSON.stringify(doc1));
        //autoTable(doc, { html: doc1 })
        //autoTable(doc, { html: '#QuotationItems' })
        /* autoTable(doc, {
          columnStyles: { 0: { halign: 'center', fillColor: [211, 211,  211]}, 2: { halign: 'center', fillColor: [211, 211,  211] }, 4: { halign: 'center', fillColor: [211, 211,  211] }},
          margin: { top: 10 },startY:50,
          body: [
            ['Date', '06-08-2020', 'Status', 'Approved', 'Customer Ref No.','C0001'],
            ['Shipping Date', '10-08-2020', 'Shipping Term', 'T/T', 'Payment Term','COD']
          ],
        }) */
        var table = document.getElementById("my-table");
        var tableNotes = document.getElementById("myTable-Notes-hidden");
        var cloneTable = table.cloneNode(true);
        var bodyLen = document.querySelector('#my-table').children[1].rows.length
        var deleteVal = 0, delArray = [];
        /* for(var totalRow = 0; totalRow < bodyLen; totalRow++){
          var totalValue = document.getElementsByClassName('itemTotal')[totalRow].innerHTML;
          if(totalValue == "" || totalValue == null || totalValue == undefined){
            console.log('totalValue removing '+totalValue);
            ///cloneTable.removeChild(cloneTable.childNodes[totalRow]);
            ////table.removeChild(table.childNodes[totalRow]);
            //cloneTable.deleteRow(totalRow);
            deleteVal  = totalValue - 1;
            //table.deleteRow(deleteVal);
          }
        } */
        document.querySelector('#my-table').style.coloolor = '2px solid #000';
        for(var totalRow = bodyLen; totalRow > 0; totalRow--){
            document.querySelector('#my-table').style.backgroundColor = '2px solid #000';
            console.log('totalValue length '+bodyLen+' '+totalRow);
            //document.querySelector('#my-table').children[2].rows[0].children[0].style.borderTop = '2px solid black';
            //document.querySelector('#my-table').children[2].rows[0].children[0].style.borderLeftColor  = 'white !important';
            try{
              var totalValue = document.getElementsByClassName('itemTotal')[totalRow-1].innerHTML;
              //console.log('totalValue '+totalValue+' '+totalRow+' '+document.getElementsByClassName('itemTotal')[5].innerHTML+'  ' +document.getElementsByClassName('itemTotal')[6].innerHTML);
              //if(totalRow == (bodyLen -1)){continue;}
              if(totalValue == "" || totalValue == null || totalValue == undefined){
                console.log('totalValue removing '+totalRow);
                ///cloneTable.removeChild(cloneTable.childNodes[totalRow]);
                ////table.removeChild(table.childNodes[totalRow]);
                //cloneTable.deleteRow(totalRow);
                //deleteVal  = totalValue - 1;
                //alert('totalRow '+totalRow);
                ////cloneTable.deleteRow(totalRow - (totalRow-1));
                //cloneTable.deleteRow(totalRow-1);
                /////cloneTable.deleteRow(totalRow - 1);
                table.deleteRow(totalRow);
              }
              console.log('body length '+document.querySelector('#my-table').children[1].rows.length);
            }catch(e){
              //alert(e);
            }
        }
        /*  footStyles: {columnStyles:{0:{},1:{lineColor:[0,0,0],lineWidth:2,textColor:[255,255,255]}},0:{cellWidth: 'wrap',
        fontSize: 10,
        lineWidth:0,
        lineColor: [0, 128, 255],
        textColor: [255, 255, 255],
        halign:'right',
        fillColor: [211,211,211]},1:{cellWidth: 'wrap',
        fontSize: 10,
        lineWidth:2,
        lineColor: [0, 0, 0],
        textColor: [255, 255, 255],
        halign:'right',
        fillColor: [211,211,211]}}, */
        
        /* autoTable(doc, { html: table, theme:'grid',startY:105,alternateRowStyles:true,headStyles:{lineWidth:0.3,lineColor:[0,0,0]},bodyStyles:{lineWidth:0.3,lineColor:[0,0,0]},footStyles: {cellWidth: 'wrap',lineWidth: 0.3,lineColor: [0, 0, 0],textColor: [0, 0, 0],halign:'right',fillColor: [255,255,255]},alternateRowStyles:true,styles: {overflow: 'linebreak', columnWidth: '100', font: 'Calibri', fontSize: 10, cellPadding: 1, overflowColumns: 'linebreak'}}) */
        //console.log(_QuotationNotesObj);
        startY = autoTable(doc, { html: table, theme:'grid',startY:105,alternateRowStyles:true,headStyles:{lineWidth:0.3,lineColor:[0,0,0]},bodyStyles:{lineWidth:0.3,lineColor:[0,0,0]},footStyles: {cellWidth: 'wrap',/* fontSize: 18, */lineWidth: 0.3,lineColor: [0, 0, 0],textColor: [0, 0, 0], halign:'right',fillColor: [255,255,255]},alternateRowStyles:true,styles: {overflow: 'linebreak', columnWidth: '100', /* font: 'Calibri', */ fontSize: 10, cellPadding: 1, overflowColumns: 'linebreak',border:'2px solid #000'}})
        //console.log(_QuotationNotesObj));
        //alert($(table).height());
        //alert('mainTable '+startY);
        if((startY+50) > footStart){
          doc.addPage();
          startY = 45;
          getImageFromUrl('letterhead.jpg',startY, addHeader);
          if(stateVar.printinA4){
            doc.setTextColor('#00800');
            text = "GSTIN:33AAHFL5571G1ZB";
            doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-25);
            text = "GATE WAY TO INDUSTRY 4.0 & DIGITAL FACTORY AUTOMATION";
            doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-12);
            text = "Website : www.lakshmidigipro.com";
            doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-6);
            doc.line(0,parseInt(doc.internal.pageSize.height)-20,260,parseInt(doc.internal.pageSize.height)-20);
            doc.setTextColor('#00000');
          }
        }
        startY = autoTable(doc, { html: tableNotes, theme:'grid',startY:(parseFloat(startY)+30) ,columnStyles: {1:{cellWidth: 'wrap',fontSize: 18,lineWidth: 2,lineColor: [120, 120, 120],textColor: [120, 120, 120],halign:'right',fillColor: [211,211,211]}},alternateRowStyles:true })
        
        if((startY+20) > footStart){
          doc.addPage();
          startY = 45;
          getImageFromUrl('letterhead.jpg',startY, addHeader);
          if(stateVar.printinA4){
            doc.setTextColor('#008000');
            text = "GSTIN:33AAHFL5571G1ZB";
            doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-25);
            text = "GATE WAY TO INDUSTRY 4.0 & DIGITAL FACTORY AUTOMATION";
            doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-12);
            text = "Website : www.lakshmidigipro.com";
            doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-6);
            doc.line(0,parseInt(doc.internal.pageSize.height)-20,260,parseInt(doc.internal.pageSize.height)-20);
            doc.setTextColor('#00000');
          }
        }
        var Notes = 'We hope the above are in line with your requirement and look forward to receiving your order for prompt\nexecution.\n\nThanking you and assuring you of our best services always';
        doc.setFontSize(12);
        //doc.text(Notes, 12, 220)
        startY = startY + 25;
        doc.text(Notes, 10, (startY))
        //alert('footstart 2 '+startY+'  '+footStart);
        if(startY > footStart){
          getImageFromUrl('letterhead.jpg',startY, addHeader);
          doc.addPage();
          if(stateVar.printinA4){
            doc.setTextColor("#008000")
            text = "GSTIN:33AAHFL5571G1ZB";
            doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-25);
            text = "GATE WAY TO INDUSTRY 4.0 & DIGITAL FACTORY AUTOMATION";
            doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-12);
            text = "Website : www.lakshmidigipro.com";
            doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-6);
            doc.line(0,parseInt(doc.internal.pageSize.height)-20,260,parseInt(doc.internal.pageSize.height)-20);
            doc.setTextColor("#00000")
          }
          startY = 45;
        }
        _QuotationNotesObj.value='Thanks for shopping'; 
        doc.setFontSize(14);
        doc.setFontSize(12); 
        if((startY+60) > footStart){
          getImageFromUrl('letterhead.jpg',startY, addHeader);
          doc.addPage();
          if(stateVar.printinA4){
            doc.setTextColor("#008000")
            text = "GSTIN:33AAHFL5571G1ZB";
            doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-25);
            text = "GATE WAY TO INDUSTRY 4.0 & DIGITAL FACTORY AUTOMATION";
            doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-12);
            text = "Website : www.lakshmidigipro.com";
            doc.text(text,parseInt((doc.internal.pageSize.width/2) - (doc.getTextWidth(text)/2)),parseInt(doc.internal.pageSize.height)-6);
            doc.line(0,parseInt(doc.internal.pageSize.height)-20,260,parseInt(doc.internal.pageSize.height)-20);
            doc.setTextColor("#00000")
          }
          startY = 45;
        }
        var addSignY = parseFloat(startY+8);
        doc.text("Yours Faithfully,",10,(startY+5))
        var to = "To";
        text = to+",\n\n "+stateVar.Qaddress1+",\n "+stateVar.Qaddress2+","+stateVar.Qaddress3+","+stateVar.Qaddress4+",\n "+stateVar.Qaddress5+".\n Con : "+stateVar.QaddressTel+"\n VAT : "+stateVar.QaddressVAT;
        doc.setFontSize(10);
        doc.setFontType('bolder');
        doc.text("M/s LAKSHMI DIGIPRO SYSTEMZ",10,(addSignY+30))
        
        doc.setFontSize(null);
        //doc.fromHTML(Notes,function(){})
        //autoTable(doc, { html: _QuotationNotesObj })
        doc.html(_QuotationNotesObj,{})
        doc.setCreationDate(new Date())
        /* doc.addPage();
        var y = 20;
        doc.addImage(imgData, 'PNG', 45, y, 35, 20, 'sign'); */

        table = document.getElementById("my-table");
        //doc.save('table.pdf')
        getImageFromUrl('seal.png',addSignY,addSign)
        getImageFromUrl('signature.png',addSignY,addSeal)
        return addSignY;
        }
        if(this.state.addEsign){
          getImageFromUrl('letterhead.jpg',startY,createPDF).then((response) => {});
          //alert('addsign 1 '+addSignY);
          /* setTimeout(function(){getImageFromUrl('seal.png',addSignY,addSign)},1000);
          setTimeout(function(){getImageFromUrl('signature.png',addSignY,addSeal)},2000); */
          /* setTimeout(function(){doc.save('table.pdf') }, 5000); */
        }
    }
    handletotalDiscountChange = () => {
      var cgst,igst,sgst,discount;
      discount = parseFloat(document.getElementById('discount').value);
      discount = discount == 'NaN' ? 0: discount;
      igst = parseFloat(document.getElementById('igst').value);
      igst = (igst == 'NaN') ? 0: igst;
      cgst = parseFloat(document.getElementById('cgst').value);
      cgst = (cgst == 'NaN') ? 0: cgst;
      sgst = parseFloat(document.getElementById('sgst').value);
      sgst = sgst == 'NaN' ? 0: sgst;
      var total = parseFloat(document.getElementsByName('subTotal')[0].innerHTML) + parseFloat(igst + cgst + sgst)- parseFloat(discount);
      //alert('igst '+igst+' cgst '+cgst+' sgst '+sgst+' subTotal '+parseFloat(document.getElementsByName('subTotal')[0].innerHTML)+' discount '+parseFloat(discount)+'  total '+total);
      /* document.getElementById('discount').value = discount.toFixed(2);
      document.getElementById('igst').value = igst.toFixed(2);
      document.getElementById('cgst').value = cgst.toFixed(2);
      document.getElementById('sgst').value = sgst.toFixed(2); */
      document.getElementsByName('total')[0].innerHTML = total.toFixed(2);
      this.setState({total:total.toFixed(2),discount:discount.toFixed(2),igst:igst.toFixed(2),cgst:cgst.toFixed(2),sgst:sgst.toFixed(2)})
    }
    handleIGSTChange = () => {
      discount = parseFloat(document.getElementsByName('discount')[0].value);
      discount = discount == 'NaN' ? 0: discount;
      tax = parseFloat(document.getElementsByName('tax')[0].value);
      console.log('handletotalDiscountChange '+discount+'  '+tax);
      tax = tax == 'NaN' ? 0: tax;
      var total = parseFloat(document.getElementsByName('subTotal')[0].innerHTML) + tax - discount;
      //alert(parseFloat(document.getElementsByName('total')[0].innerHTML) +'  '+document.getElementsByName('total')[0].innerHTML+' ' +tax+'  '+parseFloat(tax)+' '+discount+ ' ' +parseFloat(discount)+'  '+total);
      document.getElementsByName('discount')[0].value = discount.toFixed(2);
      document.getElementsByName('tax')[0].value = tax.toFixed(2);
      document.getElementsByName('total')[0].innerHTML = total.toFixed(2);
      this.setState({total:total.toFixed(2),discount:discount.toFixed(2),tax:tax.toFixed(2)})
    } 
    handleCGSTChange = () => {
      var cgst,igst,sgst;
      discount = parseFloat(document.getElementsByName('discount')[0].value);
      discount = discount == 'NaN' ? 0: discount;
      igst = parseFloat(document.getElementsByName('igst')[0].value);
      cgst = parseFloat(document.getElementsByName('cgst')[0].value);
      sgst = parseFloat(document.getElementsByName('sgst')[0].value);
      //console.log('handletotalDiscountChange '+discount+'  '+tax);
      igst = igst == 'NaN' ? 0: igst;
      cgst = cgst == 'NaN' ? 0: cgst;
      sgst = sgst == 'NaN' ? 0: sgst;
      var total = parseFloat(document.getElementsByName('subTotal')[0].innerHTML) + (igst + cgst + sgst)- discount;
      //alert(parseFloat(document.getElementsByName('total')[0].innerHTML) +'  '+document.getElementsByName('total')[0].innerHTML+' ' +tax+'  '+parseFloat(tax)+' '+discount+ ' ' +parseFloat(discount)+'  '+total);
      document.getElementsByName('discount')[0].value = discount.toFixed(2);
      document.getElementsByName('igst')[0].value = tax.toFixed(2);
      document.getElementsByName('cgst')[0].value = cgst.toFixed(2);
      document.getElementsByName('sgst')[0].value = sgst.toFixed(2);
      document.getElementsByName('total')[0].innerHTML = total.toFixed(2);
      this.setState({total:total.toFixed(2),discount:discount.toFixed(2),igst:igst.toFixed(2),cgst:cgst.toFixed(2),sgst:sgst.toFixed(2)})
    }
    /* handleSGSTChange = () => {
      discount = parseFloat(document.getElementsByName('discount')[0].value);
      discount = discount == 'NaN' ? 0: discount;
      tax = parseFloat(document.getElementsByName('tax')[0].value);
      console.log('handletotalDiscountChange '+discount+'  '+tax);
      tax = tax == 'NaN' ? 0: tax;
      var total = parseFloat(document.getElementsByName('subTotal')[0].innerHTML) + tax - discount;
      document.getElementsByName('discount')[0].value = discount.toFixed(2);
      document.getElementsByName('igst')[0].value = tax.toFixed(2);
      document.getElementsByName('cgst')[0].value = cgst.toFixed(2);
      document.getElementsByName('sgst')[0].value = sgst.toFixed(2);
      document.getElementsByName('total')[0].innerHTML = total.toFixed(2);
      this.setState({total:total.toFixed(2),discount:discount.toFixed(2),tax:tax.toFixed(2)})
    } */
    handleQuotationSave = (event) => () => {
      /* event.preventDefault()
      alert(event.target[0].value)
      console.log(event.target.elements.qouteno.value)
      console.log(event.target.qouteno.value) */
    /* console.log(this.inputNode.value) */
      //var customerData = {category:'new category',customer:'Thennarasu',tel:'Software Enginner',email:'Software Enginner',PaymentTerm:"COD",SalesDiscount:"5%",BillToName:"Thennarasu",BillToAddress:"BillToAddress",BillToTel:"543211"}
      alert('qouteDate '+this.state.qouteDate);
      var qouteData = {Number:this.state.qouteNo}
      axios.post("http://localhost:9000/testAPI/qoutation",{Number:this.state.qouteNo,stamp:this.state.stamp,date:this.state.qouteDate,saleRep:this.state.saleRep,shipDate:this.state.shipDate,shipTerm:this.state.shipTerm,payTerm:this.state.payTerm,qoutTo:this.state.qouteTo,qouteAddress:this.state.qouteAddress,isActive:this.state.isActive}).then((response) => {this.setState({apiRespnse:response.data});
      });
      //alert('Quotation Save1 '+"  "+process.env.PUBLIC_URL);
      /* axios({
        method: 'post',
        url: 'http://localhost/api.php',//`${API_PATH}`,
        headers: { 'content-type': 'application/json' },
      })
        .then(result => {
          alert('result '+result);
          this.setState({
            mailSent: result.data.sent
          })
        })
        .catch(error => {this.setState({ error: error.message });alert('axios error '+error);}); */
        /* const requestOptions = {
            method: 'POST',
            mode:'cors',
            headers: { 'Content-Type': 'application/json',"Access-Control-Allow-Origin":"*" },
            body: JSON.stringify({ title: 'React POST Request Example' }),
            crossDomain:true
        };
        fetch('http://localhost:3000/manifest.json', requestOptions)
            .then(response => { alert('resp '+JSON.stringify(response))  })
            .then(data => {alert(data)}); */
           /*  $.ajax({
              url: 'http://localhost/api.php',
              type: 'POST',
              Accepts: "json",
              datatype: "json",
              //contentType: "application/json",
              //dataType: "json",
              data: {data:'hello'} ,
              async: false,
              //contentType:"application/x-www-form-urlencoded; charset=UTF-8",
              success: function(result){
                alert('result 1 '+JSON.stringify(result));
              },error: function(error){
                //alert('error  '+JSON.stringify(error));
              }
            }); */
        }
    handleQoutationRowClick = (i,el) => () => {
      RowIndex = i;
      RowData = el;
      this.setState({
        RowIndex:i,
        RowData : el
      })
    }
    handleSupplierRowClick = (i,el) => () => {
      //alert('i '+i+' el '+el);
      RowIndex = i;
      RowData = el;
      openSupplierModal = true;
      this.setState({
        //displaySupplierModal: !this.state.displaySupplierModal,
        RowIndex:i,
        RowData : el
      })
    }
    handleCustomerRowClick = (i,el) => () => {
      /* console.log(' handleCustomerRowClick '+el);
      console.log(' handleCustomerRowClick '+JSON.stringify(el)); */
      openCustomerModal = true;
      this.setState({
        //displaySupplierModal: !this.state.displaySupplierModal,
        RowIndex:i,
        RowData : el
      })
      //alert('handleCustomerRowClick');
    }
    handleItemRowClick = (i,el) => () => {
      /* console.log(' handleItemRowClick '+el);
      console.log(' handleItemRowClick '+JSON.stringify(el)); */
      openItemsModal = true;
      this.setState({
        //displaySupplierModal: !this.state.displaySupplierModal,
        RowIndex:i,
        RowData : el
      })
      //alert('handleItemRowClick');
    }
    handleEditClick = (el) => () => {
      //alert('handleEditClick');
    }
    handleSaveClick = (el) => () => {
      //alert('handleSaveClick');
    }
    handlePrintClick = (el) => () => {
      //alert('handlePrintClick');
    }
    handleDeleteClick = (el) => () => {
      //alert('handlePrintClick');
    }
    handleSort = (clickedColumn) => () => {
      const { column, data, direction } = this.state
      //alert('handleSort');
      if (column !== clickedColumn) {
        //alert('handleSortq1 '+clickedColumn+' '+column+' '+data );
        this.setState({
          column: clickedColumn,
          data: _.sortBy(data, [clickedColumn]),
          direction: 'ascending',
        })
  
        return
      }
      //alert('handleSortq2');
      this.setState({
        data: data.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      })
    }
    handleSupplierSort = (clickedColumn) => () => {
      const { column, supplierData, direction } = this.state
      //alert('handleSort');
      if (column !== clickedColumn) {
        //alert('handleSortq1 '+clickedColumn+' '+column+' '+data );
        this.setState({
          column: clickedColumn,
          data: _.sortBy(supplierData, [clickedColumn]),
          direction: 'ascending',
        })
  
        return
      }
      //alert('handleSortq2');
      this.setState({
        data: supplierData.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      })
    }
	handleItemsSort = (clickedColumn) => () => {
      const { column, itemsData, direction } = this.state
      //alert('handleSort');
      if (column !== clickedColumn) {
        //alert('handleSortq1 '+clickedColumn+' '+column+' '+data );
        this.setState({
          column: clickedColumn,
          data: _.sortBy(itemsData, [clickedColumn]),
          direction: 'ascending',
        })
  
        return
      }
      //alert('handleSortq2');
      this.setState({
        data: itemsData.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      })
    }


    /* state = {
      displayQuestions: false,
      displayModal:true,
      key:''
    } */
      /* togglePopup() {  
        this.setState({  
            showPopup: !this.state.showPopup  
        });  
     }   */
     
     handleModal = () => {
      /* axios.get("http://localhost:9000/testAPI").then((response) => {this.setState({apiResponse:response.data});alert('response '+JSON.stringify(response.data));
      }); */
      //alert('handleModal '+this.state.displayModal);
      this.setState({
        displayModal:!this.state.displayModal
      })
    }
    _onLinkClick = (item) => {
      console.log('line items array '+JSON.stringify(this.state.lineItemRows));
      if(item.props.itemKey !== 'Line Items' && this.state.currentStep == 'Line Items'){
        ////alert(item.props.itemKey+'  '+this.state.currentStep);
        var lineItemsTbl = document.getElementById('QuotationItemsBody').innerHTML;
        document.getElementById('QuotationItemsBodyPDF').innerHTML = lineItemsTbl;
        //console.log(util.inspect(document.getElementById('QuotationItemsBodyPDF')));
      }
      console.log('onlineitemsclick '+item.props.itemKey+' '+this.state.displayModal);
      var state = this.state;
      if(item.props.itemKey == 'Line Items'){
        setTimeout(function(){
        /* for(var i=1;i<=5;i++){
            if(i==1){
              var element  = document.getElementById('itemID'+i);
              if(element == null || element == 'null'){
                break;
              }
              element.value = state.id1;
              element = null;
              element = document.getElementById('itemDesc'+i);
              element.value = state.desc1;
              element = null;
              element = document.getElementById('itemUnit'+i);
              element.value = state.unit1;
              element = null;
              element = document.getElementById('itemUnitPrice'+i);
              element.value = state.unitPrice1;
              element = null;
              element = document.getElementById('itemQty'+i);
              element.value = state.Qty1;
              element = null;
              element = document.getElementById('itemTotal'+i);
              element.value = state.total1;
              element = null;
            }else if(i==2){
              var element  = document.getElementById('itemID'+i);
              element.value = state.id2;
              element = null;
              element = document.getElementById('itemDesc'+i);
              element.value = state.desc2;
              element = null;
              element = document.getElementById('itemUnit'+i);
              element.value = state.unit2;
              element = null;
              element = document.getElementById('itemUnitPrice'+i);
              element.value = state.unitPrice2;
              element = null;
              element = document.getElementById('itemQty'+i);
              element.value = state.Qty2;
              element = null;
              element = document.getElementById('itemTotal'+i);
              element.value = state.total2;
              element = null;
            }else if(i==3){
              var element  = document.getElementById('itemID'+i);
              element.value = state.id3;
              element = null;
              element = document.getElementById('itemDesc'+i);
              element.value = state.desc3;
              element = null;
              element = document.getElementById('itemUnit'+i);
              element.value = state.unit3;
              element = null;
              element = document.getElementById('itemUnitPrice'+i);
              element.value = state.unitPrice3;
              element = null;
              element = document.getElementById('itemQty'+i);
              element.value = state.Qty3;
              element = null;
              element = document.getElementById('itemTotal'+i);
              element.value = state.total3;
              element = null;
            //}
            }else if(i==4){
              var element  = document.getElementById('itemID'+i);
              element.value = state.id4;
              element = null;
              element = document.getElementById('itemDesc'+i);
              element.value = state.desc4;
              element = null;
              element = document.getElementById('itemUnit'+i);
              element.value = state.unit4;
              element = null;
              element = document.getElementById('itemUnitPrice'+i);
              element.value = state.unitPrice4;
              element = null;
              element = document.getElementById('itemQty'+i);
              element.value = state.Qty4;
              element = null;
              element = document.getElementById('itemTotal'+i);
              element.value = state.total4;
              element = null;
            }else if(i==5){
              var element  = document.getElementById('itemID'+i);
              element.value = state.id5;
              element = null;
              element = document.getElementById('itemDesc'+i);
              element.value = state.desc5;
              element = null;
              element = document.getElementById('itemUnit'+i);
              element.value = state.unit5;
              element = null;
              element = document.getElementById('itemUnitPrice'+i);
              element.value = state.unitPrice5;
              element = null;
              element = document.getElementById('itemQty'+i);
              element.value = state.Qty5;
              element = null;
              element = document.getElementById('itemTotal'+i);
              element.value = state.total5;
              element = null;
            }
          } */
        },1000);
      }
      if(this.state.currentKey == 'Line Items'){
        /* this.setState({
          lineItemRows : 
        }) */
      }
      this.setState({
        currentStep : item.props.itemKey
      })
    }
    handleQuotationSection = () => {
      document.getElementsByClassName('navbar-brand')[0].innerHTML  = "Quotation";
      this.setState({
        handleQuotationSection:true,
        handleSupplierSection:false,
        handleItemsSection:false,
        handleCustomerSection:false
      })
    }
    handleSupplierSection = () => {
      document.getElementsByClassName('navbar-brand')[0].innerHTML  = "Supplier";
      this.setState({
        handleSupplierSection:true,
        handleQuotationSection:false,
        handleItemsSection:false,
        handleCustomerSection:false,
        sidebarCollapsed:!this.state.sidebarCollapsed
      })
    }
    handleCustomerSection = () => {
      document.getElementsByClassName('navbar-brand')[0].innerHTML  = "Customer List";
      this.setState({
        handleCustomerSection:true,
        handleQuotationSection:false,
        handleItemsSection:false,
        handleSupplierSection:false
      })
    }
    handleItemsSection = () => {
      document.getElementsByClassName('navbar-brand')[0].innerHTML  = "Item List";
      this.setState({
        handleItemsSection:true,
        handleQuotationSection:false,
        handleCustomerSection:false,
        handleSupplierSection:false
      })
    }
    handleCustomerTrash = () => {
      this.setState({
        handleCustomerTrash:true,
        handleQuotationTrashModal:false,
        handleItemsTrash:false,
        handleSupplierTrash:false,
        handleItemsSection:false,
        handleQuotationSection:false,
        handleCustomerSection:false,
        handleSupplierSection:false
      })
    }
    handleSupplierTrash = () => {
      this.setState({
        handleSupplierTrash:true,
        handleCustomerTrash:false,
        handleItemsTrash:false,
        handleQuotationTrashModal:false,
        handleItemsSection:false,
        handleQuotationSection:false,
        handleCustomerSection:false,
        handleSupplierSection:false
      })
    }
    handleItemsTrash = () => {
      this.setState({
        handleItemsTrash:true,
        handleCustomerTrash:false,
        handleQuotationTrashModal:false,
        handleSupplierTrash:false,
        handleItemsSection:false,
        handleQuotationSection:false,
        handleCustomerSection:false,
        handleSupplierSection:false
      })
    }
    handleQuotationTrashModal = () => {
      this.setState({
        handleQuotationTrashModal:true,
        handleCustomerTrash:false,
        handleItemsTrash:false,
        handleSupplierTrash:false,
        handleItemsSection:false,
        handleQuotationSection:false,
        handleCustomerSection:false,
        handleSupplierSection:false
      })
    }
    closeModal = () => {
      console.log('initialLineItemRow '+JSON.stringify(initialLineItemRow))
      this.setState({
        displayModal:!this.state.displayModal,
        lineItemRows:initialLineItemRow
      })
    }
    handleCustomerClick = () => {
      this.setState({
        displayCustomerModal: !this.state.displayCustomerModal
      })
    }
    handleSupplierClick = () => {
      this.setState({
        displaySupplierModal: !this.state.displaySupplierModal
      })
    }
    handleAddCompanyInfoClick = () => {
      this.setState({
        displayCustomerInfoDialog: !this.state.displayCustomerInfoDialog
      })
    }
    handleItemClick = () => {
      this.setState({
        displayItemModal: !this.state.displayItemModal
      })
    }
    handleQouteNoChange = (e) => {
      //alert(e.target.value);
      this.setState({
        qouteNo: e.target.value
      })
    }
    handleQouteDateChange = (e) => {
      this.setState({
        qouteDate: e.text
      })
    }
    itemTotalUpdate = (qty) =>  {
      var itemQty, index;
      itemQty = document.querySelectorAll(".itemQty");
      lineItemsSubTotal=0;
      for (index = 0; index < itemQty.length; index++) {
        var UnitPrice = document.getElementsByClassName('itemUnitPrice')[index];
        UnitPrice = UnitPrice.value;
        var lineItemQty = document.getElementsByClassName('itemQty')[index];
        lineItemQty = lineItemQty.value;
        var lineItemTotal =  parseFloat(UnitPrice)*parseFloat(qty)
        if(UnitPrice != "" && lineItemQty != "" && !isNaN(lineItemQty)){
          lineItemsSubTotal= parseFloat(lineItemsSubTotal) + (parseFloat(UnitPrice)*parseFloat(lineItemQty));
        }
        if(qty == itemQty[index].value){
          document.getElementsByClassName('itemTotal')[index].value = lineItemTotal;
        }
      }
      //alert('lineITemsSubTotal '+this.state.subTotal+' '+this.state.total+' '+lineItemsSubTotal);
      document.getElementsByName('subTotal')[0].innerHTML = lineItemsSubTotal.toFixed(2);
      document.getElementsByName('total')[0].innerHTML = lineItemsSubTotal.toFixed(2);
      this.setState({subTotal:lineItemsSubTotal.toFixed(2),total:lineItemsSubTotal.toFixed(2)})
    }
    subTotalUpdate = () =>  {
      var itemQty, index;
      itemQty = document.querySelectorAll(".itemQty");
      lineItemsSubTotal=0;
      for (index = 0; index < itemQty.length; index++) {
        var UnitPrice = document.getElementsByClassName('itemUnitPrice')[index];
        UnitPrice = UnitPrice.value;
        var lineItemQty = document.getElementsByClassName('itemQty')[index];
        lineItemQty = lineItemQty.value;
        var lineItemTotal =  parseFloat(UnitPrice)*parseFloat(lineItemQty)
        if(UnitPrice != "" && lineItemQty != "" && !isNaN(lineItemQty)){
          lineItemsSubTotal= parseFloat(lineItemsSubTotal) + (parseFloat(UnitPrice)*parseFloat(lineItemQty));
        }
        if(lineItemQty == itemQty[index].value){
          document.getElementsByClassName('itemTotal')[index].value = lineItemTotal;
        }
      }
      document.getElementsByName('subTotal')[0].innerHTML = lineItemsSubTotal.toFixed(2);
      document.getElementsByName('total')[0].innerHTML = lineItemsSubTotal.toFixed(2);
      this.setState({subTotal:lineItemsSubTotal.toFixed(2),total:lineItemsSubTotal.toFixed(2)})
    }
    handleSalesRepChange = (e) => {
      /* alert('sales rep change '+e.text ); */
      this.setState({
        saleRep: e.text
      })
    }
    handleCutomerReportChange = (e) => {
      alert('text '+e);
      ///console.log(util.inspect(e))
      ///var inst = e._targetInst._debugOwner.key;
      this.setState({
        Currency: e
      })
    }
    handleShippingTermChange = (e) => {
      //var i = Object.values(e.target);
      /* console.log('ShippingTerm '+e);
      console.log('ShippingTerm '+e.text); */
      this.setState({
        shipTerm: e.text
      })
    }
    handlePaymentTermChange  = (e) => {
      /* console.log('PaymentTerm '+e.target); */
      this.setState({
        payTerm: e.text
      })
    }
    handleShippingDateChange = (e) => {
      this.setState({
        shipDate: e.target.value
      })
    }
    handleQouteToChange = (e) => {
      //alert(e.target.value);
      this.setState({
        qouteTo: e.target.value
      })
    }
    handleQouteAddressChange = (e) => {
      //alert(e.target.value);
      this.setState({
        qouteAddress: e.target.value
      })
    }
    handleStampChange = (e) => {
      //alert(e.target.value);
      this.setState({
        stamp: e.text
      })
    }
    handleCurrencyChange  = (e) => {
      alert(e.text);
      this.setState({
        currency: e.text
      })
    }
    
     render(){
      /* const [modalIsOpen,setIsOpen] = React.useState(false);
      const [key, setKey] = React.useState('Line Items');  */
      
      /* var state = {
          displayCustomerModal: false
      } */
      
      const { column, data, direction,supplierData,itemsData,quotationData,quotationTrashData,lineItemRows } = this.state
      //console.log('dataa '+JSON.stringify(this.state.quotationTrashData))
      function handleCustomerClick(){
        this.setState({
          displayQuestions: !this.state.displayQuestions
        })
     }
     function handleModal() {
        /* this.setState({
          displayModal: false
        }) */
        this.state.displayModal = false;
    }
      function displayQuestion(){
          this.setState({
              displayQuestions: !this.state.displayCustomerModal
          });
      }
     function onSelectTab(key){
       this.setState({
          key: key
       })
     }
    var subtitle;
    var newCustomer = null;
    
    /* function openModal(value) {
      //setIsOpen(true);
      
      //return !this.state.displayModal;
    } */
    
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      //subtitle.style.color = '#f00';
    }
    function onSelectTab(key) {
        //setKey(key);
    }
  
    function closeModal(){
      //setIsOpen(false);
    }
    
     
      return (        
<div>
  <table id="my-table"  style={{border:'1px solid #000'}}>
    <thead>
      <tr>
        <th style={{textAlign:'center',backgroundColor:'#1ABC9C',color:'#ffff',border:'1px solid #000'}}>ID</th>
        <th style={{textAlign:'center',backgroundColor:'#1ABC9C',color:'#ffff',border:'1px solid #000'}}>DESCRIPTION</th>
        <th style={{textAlign:'center',backgroundColor:'#1ABC9C',color:'#ffff',border:'1px solid #000'}}>UNIT</th>
        <th style={{textAlign:'center',backgroundColor:'#1ABC9C',color:'#ffff',border:'1px solid #000'}}>UNITPRICE</th>
        <th style={{textAlign:'center',backgroundColor:'#1ABC9C',color:'#ffff',border:'1px solid #000'}}>QTY</th>	
        <th style={{textAlign:'center',backgroundColor:'#1ABC9C',color:'#ffff',border:'1px solid #000'}}>TOTAL</th>
      </tr>
    </thead>
    <tbody id="QuotationItemsBodyPDF" style={{border:'5px solid black'}}>
    </tbody>
    <tfoot style={{border:'5px solid #000'}}>
      <tr style={{border:'5px solid #000'}}>
        <td colSpan='5' style={{textAlign:'right',/* border:'none',borderTopColor:'black',borderTopWidth:'1px',borderBottomWidth:'1px',borderBottonColor:'#fff',fontWeight:'bolder', */fontWeight:'bolder'}}>Sub-Total ({this.state.Currency})&nbsp;&nbsp;&nbsp;   </td>
        <td style={{backgroundColor:'#1ABC9C', textAlign:'center',color:'#fff',border:'1px solid #000',fontWeight:'bolder'}}>{this.state.subTotal}</td>
      </tr>
      <tr>
        <td colSpan='5'  style={{textAlign:'right',border:'none',border:'0px solid #fff',fontWeight:'bolder'}}>Discount ({this.state.Currency})&nbsp;&nbsp;&nbsp;   </td>
        <td  style={{textAlign:'center',backgroundColor:'#1ABC9C',color:'#fff',border:'1px solid #000',fontWeight:'bolder'}}>{this.state.discount}</td>
      </tr>
      <tr>
        <td colSpan='5'  style={{textAlign:'right',border:'none',border:'0px solid #fff',fontWeight:'bolder'}}>CGST  ({this.state.Currency})&nbsp;&nbsp;&nbsp;   </td>
        <td  style={{textAlign:'center',backgroundColor:'#1ABC9C',color:'#fff',border:'1px solid #000',fontWeight:'bolder'}}>{this.state.cgst}</td>
      </tr>
      <tr>
        <td colSpan='5'  style={{textAlign:'right',border:'none',border:'0px solid #fff',fontWeight:'bolder'}}>SGST  ({this.state.Currency})&nbsp;&nbsp;&nbsp;    </td>
        <td  style={{textAlign:'center',backgroundColor:'#1ABC9C',color:'#fff',border:'1px solid #000',fontWeight:'bolder'}}>{this.state.sgst}</td>
      </tr>
      <tr>
        <td colSpan='5'  style={{textAlign:'right',border:'none',border:'0px solid #fff',fontWeight:'bolder'}}>IGST  ({this.state.Currency})&nbsp;&nbsp;&nbsp;    </td>
        <td  style={{textAlign:'center',backgroundColor:'#1ABC9C',color:'#fff',border:'1px solid #000',fontWeight:'bolder'}}>{this.state.igst}</td>
      </tr>
      <tr>
        <td colSpan='5'  style={{textAlign:'right',border:'none',border:'0px solid #fff',fontWeight:'bolder'}}>Total ({this.state.Currency})&nbsp;&nbsp;&nbsp;    </td>
        <td  style={{textAlign:'center',backgroundColor:'#1ABC9C',color:'#fff',border:'1px solid #000',fontWeight:'bolder'}}>{this.state.total}</td>
      </tr>
  </tfoot>
</table>
{/* <label for="QuotationNotes" id="QuotationNotesLabel"> */}
{/* <textarea id="QuotationNotes"
onBlur={() => {var value = document.getElementById('QuotationNotes');_QuotationNotesObj=value;this.setState({QuotationNotes:value.value})}} resizable={false}/> */}
      <table id='myTable-Notes-hidden' style={{border:"2px solid #0000",display:'none'}}>
        <thead>
          <tr>
            <td colSpan="5"  style={{backgroundColor:'#1ABC9C'}}>Notes</td>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td colSpan="5">*The Above Budget Quote is exclusive of GST Charges</td>
            </tr>
            <tr>
              <td colSpan="5">The Quote does not include network cable (CAT6) charges which are required to connect the CNC machine and
      the computer terminal, also if any network equipment such as Network Switch which are required for
      wireless/wired connection to the LAN.</td>
            </tr>
        </tbody>
      </table>
{/* </label> */}
<figure id='figure1' style={{display:'none'}}>
  <img src='https://i.ytimg.com/vi/FiXYnh9uFmI/maxresdefault.jpg'></img>
  <figcaption>Image Caption</figcaption>
</figure>

<table id='myTable-Header'>
   <tbody>
      <tr>
         <td>Date</td>
         <td>{this.state.quoteDate}</td>
         <td>Customer Ref No.</td>
         <td>{this.state.cusrefNo}</td>
         <td>Shipping Term</td>
         <td>{this.state.shipTerm}</td>
      </tr>
      <tr>
         <td>Shipping Date</td>
         <td>{this.state.shipDate}</td>
         <td>Sales Rep.</td>
      <td>{this.state.saleRep}</td>
         <td>Payment Term</td>
      <td>{this.state.payTerm}</td>
      </tr>
   </tbody>
</table>
          <div className="row" height="100px" width="1000px" style={{color:'red'}}></div>
          <Popup trigger={<button> Trigger</button>} position="right center">
            <div>Popup content here !!</div>
          </Popup>
          {/* <button onClick={openModal}>Open Modal</button> */}
          <Dialog hidden={!this.state.displayModal} onDismiss={!this.state.displayModal} modalProps={modelProps} style={dialogStyles}
            dialogContentProps={dialogContentProps} id="qDialog"
            containerClassName={ 'ms-dialogMainOverride textDialog'}
          >

          <Pivot aria-label="Basic Pivot Example" styles={{ root: { display: 'flex', justifyContent: 'center' } }}  onLinkClick={this._onLinkClick/* (e)=>{alert(e.itemKey)} *//* {this._onLineItemsLinkClick(this.state.currentStep) */} SelectedKey={this.state.currentStep}>
            <PivotItem
              headerText="Document Details"
              headerButtonProps={{
                'data-order': 1,
                'data-title': 'My Files Title',
              }}
              /* onRenderItemLink={this._onLineItemsLinkClick(this.state.currentStep)} */
              itemKey = "Document Details"
            >
              <form>
              <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}>
                  {/* <label for='qouteno'>Quote No</label> */}
                  <TextField className={controlClass.control} placeholder="Quotation No:" disabled label="Quotation No:"   name="qouteno" onChange={this.handleQouteNoChange} value={this.state.qouteNo}></TextField>
                  
                  {/* <NDropdown
                    search
                    multiple
                    items= {[
                      'Bruce Wayne',
                      'Natasha Romanoff',
                      'Steven Strange',
                      'Alfred Pennyworth',
                      `Scarlett O'Hara`,
                      'Imperator Furiosa',
                      'Bruce Banner',
                      'Peter Parker',
                      'Selina Kyle',
                    ]}
                    placeholder="Start typing a name"
                    noResultsMessage="We couldn't find any matches."
                    required
                    onChanged={this.handleStampChange}
                  /> */} 
                  <FDropdown
                    placeholder="Select an option"
                    label="Currency"
                    className={controlClass.control}
                    /* options={[
                      { 'I am option a.' },
                      { 'USD' },
                      { 'SGD' }
                    ]} */

                    required
                    /* styles={dropdownStyles} */
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
                  {/* <FDropdown
                    placeholder="Select an option"
                    label="Sales Rep."
                    options={[
                      { key: 'A', text: 'Option a', title: 'I am option a.' },
                      { key: 'B', text: 'Option b' },
                      { key: 'C', text: 'Option c', disabled: true },
                      { key: 'D', text: 'Option d' },
                      { key: 'E', text: 'Option e' },
                    ]}
                    required
                    onChange={this.handleQouteDateChange}
                  />*/}
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
                    /* value={quotationFormData.paymentTerm} */
                    required
                    onChanged={this.handlePaymentTermChange}
                    /* styles={dropdownStyles} */
                  />
                  <TextField className={controlCustomerClass.control} placeholder="Quotation To Address:" name="Qaddress1" onBlur={(e) => {var val  = document.getElementsByName('Qaddress1')[0].value;alert(val);this.setState({Qaddress1:val})}} underlined onChange={this.handleQouteToChange}/>
                  <TextField className={controlCustomerClass.control} underlined onBlur={(e) => {var val  = document.getElementsByName('Qaddress2')[0].value;this.setState({Qaddress2:val})}}/* value={quotationFormData.qouteaddress} */name="Qaddress2" onChange={this.handleQouteAddressChange}/>
                  <TextField className={controlCustomerClass.control} onBlur={(e) => {var val  = document.getElementsByName('Qaddress3')[0].value;this.setState({Qaddress3:val})}} underlined name="Qaddress3" />
                  <TextField  className={controlCustomerClass.control} underlined name="Qaddress4"  onBlur={(e) => {var val  = document.getElementsByName('Qaddress4')[0].value;this.setState({Qaddress4:val})}}/>
                  <TextField className={controlCustomerClass.control} underlined name="Qaddress5" onBlur={(e) => {var val  = document.getElementsByName('Qaddress5')[0].value;this.setState({Qaddress5:val})}}/>
                  <TextField  className={controlCustomerClass.control}placeholder='Tel' name="QaddressTel" onBlur={(e) => {var val  = document.getElementsByName('QaddressTel')[0].value;this.setState({QaddressTel:val})}} underlined />
                  {/* <TextField  className={controlCustomerClass.control} placeholder='VAT No.' onBlur={(e) => {var val  = document.getElementsByName('QaddressVAT')[0].value;this.setState({QaddressVAT:val})}} name="QaddressVAT"  underlined /> */}
                  {/* <CommandBarButton
                    iconProps={addIcon}
                    text="Options"
                    menuProps={menuProps}
                  /> */}
                  {OverflowSet123}
                  <Stack horizontal tokens={stackTokens}>
                    <PrimaryButton text="Save" id="QuoteSave" allowDisabledFocus/* onClick={() => { handleQuotationSave() }} */onClick={this.handleQuotationSave()}/>
                    <PrimaryButton text="Preview" onClick={this.handlePDFPreview()} allowDisabledFocus/>
                    <PrimaryButton text="Cancel"  allowDisabledFocus onClick={this.closeModal}/>
                  </Stack>
                </Stack>
                {/* <Stack {...columnProps}>
                  <TextField label="Borderless single-line TextField" borderless placeholder="No borders here, folks." />
                  <TextField label="Borderless multi-line TextField" borderless multiline placeholder="No borders here, folks." />
                </Stack> */}
              </Stack>
              {/* <label>Quotation No:
                <input type='text' id='QuotationNo' disabled/>
              </label>
              <label>Stamp:
                <select id='QuotationStamp'>
                  <option value="0">      </option>
                  <option value="APPROVED">APPROVED</option>
                </select>
              </label>
              <label>Currency:
                <select id='QuotationCurrency'>
                  <option value="0">      </option>
                  <option value="APPROVED">APPROVED</option>
                </select>
              </label>
              <label>Date:
                  <input type='date' id="QuotationDate"/>
              </label>
              <label>Sales Rep:
                <select id='QuotationSalesRep'>
                  <option value="0">      </option>
                  <option value="APPROVED">APPROVED</option>
                </select>
              </label>
              <label>Shipping Date:
                  <input type='date' id="QuotationShippingDate"/>
              </label>
              <label>Shipping Term:
                <select id='QuotationShippingTerm'>
                  <option value="0">      </option>
                  <option value="APPROVED">APPROVED</option>
                </select>
              </label>
              <label>Shipping Term:
                <select id='QuotationPaymentTerm'>
                  <option value="0">      </option>
                  <option value="APPROVED">APPROVED</option>
                </select>
              </label>
              <sectioin>
                <h2>Customer Informatioin</h2>
                <p>
                <label>Shipping Term:
                  <select id='QuotationPaymentTerm'>
                    <option value="0">      </option>
                    <option value="APPROVED">APPROVED</option>
                  </select>
                </label>
                </p>
                <p>
                <label>Shipping Term:
                  <select id='QuotationPaymentTerm'>
                    <option value="0">      </option>
                    <option value="APPROVED">APPROVED</option>
                  </select>
                </label>
                </p>
                <p>
                <label>Shipping Term:
                  <select id='QuotationPaymentTerm'>
                    <option value="0">      </option>
                    <option value="APPROVED">APPROVED</option>
                  </select>
                </label>
                </p>
                <p>
                <label>Shipping Term:
                  <select id='QuotationPaymentTerm'>
                    <option value="0">      </option>
                    <option value="APPROVED">APPROVED</option>
                  </select>
                </label>
                </p>
              </sectioin> */}
              {/* <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button> */}
            </form>
            </PivotItem>
            <PivotItem headerText="Line Items"
            id="lineItemsPivot"
            itemKey = "Line Items"
            /* onFocus={() => {alert('onFocus');  this.setState({currentStep: 'Line Items'})}} */
            /* onSelect={() => {alert('onSelect'); this.setState({currentStep: 'Line Items'})}} */
            /* onRenderItemLink={() => {alert('onRenderItemClick');this.setState({currentStep: 'Line Items'});this._onLineItemsLinkClick(this.state.currentStep)}} */
              /* onClick={()=>{alert('onClick')}}
              onBlur={()=>{alert('onBlur')}} */
            >
                {/* <SandboxApp>
                <LineItems/>
                </SandboxApp> */}
              
            <Table responsive celled selectable sortable  className="QuotationItems" id="QuotationItems"> 
              {/* <VehicleTableHeader
                column={props.column}
                direction={props.direction}
                handleSort={props.handleSort}
              /> */}
              <Table.Header style={thead}>
                <Table.Row>
                  <Table.HeaderCell sorted={column === 'name' ? direction : null}
              onClick={this.handleSort('age')} style={{textAlign:'center',width:'5vw'}}>ID</Table.HeaderCell>
                  <Table.HeaderCell  sorted={column === 'name' ? direction : null}
              onClick={this.handleSort('gender')} style={{textAlign:'center',width:'5vw'}}>Description</Table.HeaderCell>
                  <Table.HeaderCell style={{textAlign:'center',width:'5vw'}}>Unit</Table.HeaderCell>
                  <Table.HeaderCell style={{textAlign:'center',width:'5vw'}}>Unit Price</Table.HeaderCell>
                  <Table.HeaderCell style={{textAlign:'center',width:'5vw'}}>Qty</Table.HeaderCell>
                  <Table.HeaderCell style={{textAlign:'center',width:'5vw'}}>Total</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body id="QuotationItemsBody">
              {this.state.addNewRow==true?_.map(this.state.lineItemRows, ( { id, desc, qty, unit, unitPrice, total},index) => (
                  <Table.Row key={index}>
                    <Table.Cell style={{textAlign:'center',width:'5vw'/* ,borderBottom:'1px solid #FFF' */}}><input type='text' class='itemID' id={'itemID'+(index+1)} value={id} onBlur={(e) => {/* var val  = document.getElementById('itemID1').value;this.setState({id1:val}) *//* this.onLineItemChange(index,e.target.value,'itemID')} */}} onChange={(e) => {/* var val  = document.getElementById('itemID1').value;this.setState({id1:val}) */this.onLineItemChange(index,e.target.value,'itemID')}} name={this.state.id1} /* value={id} *//></Table.Cell>
                    <Table.Cell style={{textAlign:'center',width:'5vw'/* ,borderBottom:'1px solid #FFF' */}}><input type='text' class='itemDesc' id={'itemDesc'+(index+1)} onBlur={(e) => {var val  = document.getElementById('itemDesc1').value;this.setState({desc1:val})}} name={this.state.desc1} value={desc} onChange={(e) => {/* var val  = document.getElementById('itemID1').value;this.setState({id1:val}) */this.onLineItemChange(index,e.target.value,'itemDesc')}}/></Table.Cell>
                    <Table.Cell  style={{textAlign:'center',width:'5vw'/* ,borderBottom:'1px solid #FFF' */}}><input type='text' class='itemUnit'  id={"itemUnit"+(index+1)} onBlur={(e) => {var val  = document.getElementById('itemUnit1').value;this.setState({unit1:val})}} name={this.state.unit1} value={unit} onChange={(e) => {/* var val  = document.getElementById('itemID1').value;this.setState({id1:val}) */this.onLineItemChange(index,e.target.value,'itemUnit')}}/></Table.Cell>
                    <Table.Cell style={{textAlign:'center',width:'5vw'/* ,borderBottom:'1px solid #FFF' */}}><input type='number' class='itemUnitPrice' id={"itemUnitPrice"+(index+1)} onBlur={(e) => {var val  = document.getElementById('itemUnitPrice1').value;this.setState({unitPrice1:val})}} name={this.state.unitPrice1} value={unitPrice} onChange={(e) => {/* var val  = document.getElementById('itemID1').value;this.setState({id1:val}) */this.onLineItemChange(index,e.target.value,'itemUnitPrice')}}/></Table.Cell>
                    <Table.Cell style={{textAlign:'center',width:'5vw'/* ,border:'1px solid #000' */}}><input type='number' class='itemQty' id={"itemQty"+(index+1)} /* onBlur={this.itemTotalUpdate} */ name={this.state.Qty1} value={qty} onChange={(e) => {/* var val  = document.getElementById('itemID1').value;this.setState({id1:val}) */this.onLineItemChange(index,e.target.value,'itemQty');}}/></Table.Cell>
                    <Table.Cell style={{textAlign:'center',width:'5vw'/* ,borderBottom:'1px solid #FFF' */}}><input type='text' class='itemTotal' id={"itemTotal"+(index+1)} onBlur={(e) => {var val  = document.getElementById('itemTotal1').value;this.setState({total1:val})}} name={this.state.total1} value={total} onChange={(e) => {/* var val  = document.getElementById('itemID1').value;this.setState({id1:val}) */this.onLineItemChange(index,e.target.value,'itemTotal')}}/></Table.Cell>
                    <Table.Cell><Button variant="Light" onClick={(e) => {this.deleteLineItemsRow(index)}} id={"itemDelete"+(index+1)} value="DELETE">&times;</Button></Table.Cell>
                  </Table.Row>
              )):null}
                  {/* <Table.Row>
                    <Table.Cell><input type='text' class='itemID' id='itemID1' onBlur={(e) => {var val  = document.getElementById('itemID1').value;this.setState({id1:val})}} name={this.state.id1} /></Table.Cell>
                    <Table.Cell><input type='text' class='itemDesc' id="itemDesc1" onBlur={(e) => {var val  = document.getElementById('itemDesc1').value;this.setState({desc1:val})}} name={this.state.desc1}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemUnit'  id="itemUnit1" onBlur={(e) => {var val  = document.getElementById('itemUnit1').value;this.setState({unit1:val})}} name={this.state.unit1}/></Table.Cell>
                    <Table.Cell><input type='number' class='itemUnitPrice' id="itemUnitPrice1" onBlur={(e) => {var val  = document.getElementById('itemUnitPrice1').value;this.setState({unitPrice1:val})}} name={this.state.unitPrice1}/></Table.Cell>
                    <Table.Cell><input type='number' class='itemQty' id="itemQty1" onBlur={this.itemTotalUpdate} name={this.state.Qty1}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemTotal' id="itemTotal1" onBlur={(e) => {var val  = document.getElementById('itemTotal1').value;this.setState({total1:val})}} name={this.state.total1}/></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><input type='text' class='itemID' id='itemID2' onBlur={(e) => {var val  = document.getElementById('itemID2').value;this.setState({id2:val})}} name={this.state.id2}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemDesc' id="itemDesc2" onBlur={(e) => {var val  = document.getElementById('itemDesc2').value;this.setState({desc2:val})}} name={this.state.desc2}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemUnit' onBlur={(e) => {var val  = document.getElementById('itemUnit2').value;this.setState({unit2:val})}}  id="itemUnit2" name={this.state.unit2}/></Table.Cell>
                    <Table.Cell><input type='number' class='itemUnitPrice' id='itemUnitPrice2' onBlur={(e) => {var val  = document.getElementById('itemUnitPrice2').value;this.setState({unitPrice2:val})}} name={this.state.unitPrice2}/></Table.Cell>
                    <Table.Cell><input type='number' class='itemQty' id='itemQty2' onBlur={(e) => this.setState({ Qty2:e.name })} name={this.state.Qty2}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemTotal' id='itemTotal2' onBlur={(e) => {var val  = document.getElementById('itemTotal2').value;this.setState({total2:val})}}  name={this.state.total2}/></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><input type='text' class='itemID' id='itemID3' onBlur={(e) => {var val  = document.getElementById('itemID3').value;this.setState({id3:val})}} name={this.state.id3}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemDesc' id="itemDesc3" onBlur={(e) => {var val  = document.getElementById('itemDesc3').value;this.setState({desc3:val})}}  name={this.state.desc3}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemUnit'  id="itemUnit3" onBlur={(e) => {var val  = document.getElementById('itemUnit3').value;this.setState({unit3:val})}}  name={this.state.unit3}/></Table.Cell>
                    <Table.Cell><input type='number' class='itemUnitPrice' id="itemUnitPrice3" onBlur={(e) => {var val  = document.getElementById('itemUnitPrice3').value;this.setState({unitPrice3:val})}}  name={this.state.unitPrice3}/></Table.Cell>
                    <Table.Cell><input type='number' class='itemQty' id="itemQty3" onBlur={this.itemTotalUpdate} name={this.state.Qty3}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemTotal' id="itemTotal3" onBlur={(e) => {var val  = document.getElementById('itemTotal3').value;this.setState({total3:val})}}  name={this.state.total3}/></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><input type='text' class='itemID' id='itemID4'  onBlur={(e) => {var val  = document.getElementById('itemID4').value;this.setState({id4:val})}} /></Table.Cell>
                    <Table.Cell><input type='text' class='itemDesc' id="itemDesc4" onBlur={(e) => {var val  = document.getElementById('itemDesc4').value;this.setState({desc4:val})}}  name={this.state.lineItemsArray[1].desc[3]}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemUnit'  id="itemUnit4" onBlur={(e) => {var val  = document.getElementById('itemUnit4').value;this.setState({unit4:val})}}  name={this.state.lineItemsArray[2].unit[3]}/></Table.Cell>
                    <Table.Cell><input type='number' class='itemUnitPrice' onBlur={(e) => {var val  = document.getElementById('itemUnitPrice4').value;this.setState({unitPrice4:val})}} id="itemUnitPrice4" name={this.state.lineItemsArray[3].unitPrice[3]}/></Table.Cell>
                    <Table.Cell><input type='number' class='itemQty' id="itemQty4"  onBlur={this.itemTotalUpdate} name={this.state.lineItemsArray[4].Qty[3]}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemTotal' id="itemTotal4" onBlur={(e) => {var val  = document.getElementById('itemTotal4').value;this.setState({total4:val})}}  name={this.state.lineItemsArray[5].total[3]}/></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><input type='text' class='itemID' id='itemID5'  onBlur={(e) => {var val  = document.getElementById('itemID5').value;this.setState({id5:val})}}  name={this.state.lineItemsArray[0].id[4]}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemDesc' id="itemDesc5" onBlur={(e) => {var val  = document.getElementById('itemDesc5').value;this.setState({desc5:val})}}  /></Table.Cell>
                    <Table.Cell><input type='text' class='itemUnit'   id="itemUnit5" onBlur={(e) => {var val  = document.getElementById('itemUnit5').value;this.setState({unit5:val})}}  name={this.state.lineItemsArray[2].unit[4]}/></Table.Cell>
                    <Table.Cell><input type='number' class='itemUnitPrice'   id="itemUnitPrice5" onBlur={(e) => {var val  = document.getElementById('itemUnitPrice5').value;this.setState({unitPrice5:val})}} name={this.state.lineItemsArray[3].unitPrice[4]}/></Table.Cell>
                    <Table.Cell><input type='number' class='itemQty'   id="itemQty5" onBlur={this.itemTotalUpdate} name={this.state.lineItemsArray[4].Qty[4]}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemTotal'   id="itemTotal5" onBlur={(e) => {alert('onblur');var val  = document.getElementById('itemTotal5').value;this.setState({total5:val})}} onChanged={(e) => {alert('onchanged');var val  = document.getElementById('itemTotal5').value;this.setState({total5:val})}} onChange={(e) => {alert('onchange');var val  = document.getElementById('itemTotal5').value;this.setState({total5:val})}}  name={this.state.lineItemsArray[5].total[4]}/></Table.Cell>
                  </Table.Row> */}
                 {/*  <Table.Row>
                    <Table.Cell><input type='text' class='itemID' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemDesc' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemUnit' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemUnitPrice' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemQty' onBlur={this.itemTotalUpdate}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemTotal' /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><input type='text' class='itemID' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemDesc' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemUnit' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemUnitPrice' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemQty' onBlur={this.itemTotalUpdate}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemTotal' /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><input type='text' class='itemID' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemDesc' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemUnit' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemUnitPrice' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemQty' onBlur={this.itemTotalUpdate}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemTotal' /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><input type='text' class='itemID' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemDesc' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemUnit' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemUnitPrice' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemQty' onBlur={this.itemTotalUpdate}/></Table.Cell>
                    <Table.Cell><input type='text' class='itemTotal' /></Table.Cell>
                  </Table.Row> */}
                  {/* <Table.Row>
                    <Table.Cell><input type='text' class='itemID' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemDesc' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemUnit' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemUnitPrice' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemQty' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemTotal' /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><input type='text' class='itemID' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemDesc' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemUnit' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemUnitPrice' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemQty' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemTotal' /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><input type='text' class='itemID' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemDesc' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemUnit' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemUnitPrice' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemQty' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemTotal' /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><input type='text' class='itemID' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemDesc' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemUnit' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemUnitPrice' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemQty' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemTotal' /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><input type='text' class='itemID' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemDesc' /></Table.Cell>
                    <Table.Cell><input type='text' class='itemUnit' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemUnitPrice' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemQty' /></Table.Cell>
                    <Table.Cell><input type='number' class='itemTotal' /></Table.Cell>
                  </Table.Row> */}
              </Table.Body>
              {/* <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary">Add</Button>
                    <Button variant="secondary">Remove</Button>
                    <Button variant="secondary">Edit</Button>
                    <Button variant="secondary">View</Button>
              </ButtonGroup> */}
              {<Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="1" style={{textAlign:'right'}}><Button variant="secondary" id='lineItemsRowAdd' onClick={this.lineItemRowAdd}>Add</Button>
                  </Table.HeaderCell>
                  <Table.HeaderCell colSpan="4" style={{textAlign:'right'}}>Sub-Total (&#x20B9;)
                  </Table.HeaderCell>
                  <Table.HeaderCell name="subTotal">{this.state.subTotal}
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell colSpan="5"  style={{textAlign:'right'}}>Discount (&#x20B9;)
                  </Table.HeaderCell>
                  <Table.HeaderCell ><input type='number' class='itemTotal' name="discount"  value={this.state.discount} id="discount" onChange={this.handletotalDiscountChange}/>
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell colSpan="5"  style={{textAlign:'right'}}>CGST (&#x20B9;)
                  </Table.HeaderCell>
                  <Table.HeaderCell ><input type='number' class='itemTotal' name="cgst" id="cgst"  value={this.state.cgst} onChange={this.handletotalDiscountChange}/>
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell colSpan="5"  style={{textAlign:'right'}}>SGST (&#x20B9;)
                  </Table.HeaderCell>
                  <Table.HeaderCell ><input type='number' class='itemTotal' name="sgst" id="sgst" value={this.state.sgst} onChange={this.handletotalDiscountChange}/>
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell colSpan="5"  style={{textAlign:'right'}}>IGST (&#x20B9;)
                  </Table.HeaderCell>
                  <Table.HeaderCell ><input type='number' class='itemTotal' name="igst" id="igst"  value={this.state.igst} onChange={this.handletotalDiscountChange}/>
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell colSpan="5" style={{textAlign:'right'}}>Total (&#x20B9;)
                  </Table.HeaderCell>
                  <Table.HeaderCell name="total">{this.state.total}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>}
            </Table>
            {/* <ButtonGroup size="lg" className="mb-2 totalSection" vertical>
              <form>
              <div class="container">
                  <span  class="checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span>
                  <span class="label-holder"><label for="url">Sub-Total</label></span>
                  <span class="input-holder"><input type="text" id="url" name="url"  /></span>
                  <span  class="checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span>
                  <span class="label-holder"><label for="code-base">Discount</label></span>
                  <span class="input-holder"><input type="text" id="code-base" name="Code-Base"  /></span>
                  <span  class="checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span>
                  <span class="label-holder"><label for="from">Shipping</label></span>
                  <span class="input-holder"><input type="text" id="from" name="from"  /></span>
                  <span  class="checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span>
                  <span class="label-holder"><label for="to">Total</label></span>
                  <span class="input-holder"><input type="text" id="to" name="to"  /></span>
                  <span  class="checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span>
                  <span class="label-holder"><label for="email">Tax</label></span>
                  <span class="input-holder"><input type="text" id="email" name="email"  /></span>
                  <span  class="checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span>
                  <span class="label-holder"><label for="email">Tax 2</label></span>
                  <span class="input-holder"><input type="text" id="email" name="email" /></span>
                  <span  class="checkbox-holder"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></span>
                  <span class="label-holder"><label for="email">Total</label></span>
                  <span class="input-holder"><input type="text" id="email" name="email"  /></span>
                </div>
              </form>
            </ButtonGroup> */}
            {/* <ButtonGroup size="lg" className="mb-2 totalSection" vertical>
              <form>
              <div class="container">
                <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                  <Stack {...columnProps}>
                    <TextField label="Sub-Total:" underlined className="subTotal" name="subTotal" onChange={this.handleQouteNoChange}></TextField>
                    <TextField label="Discount:" underlined  name="qouteno" onChange={this.handleQouteNoChange}></TextField>
                    <TextField label="Shipping:" underlined  name="qouteno" onChange={this.handleQouteNoChange}></TextField>
                    <TextField label="Total:" underlined  name="qouteno" onChange={this.handleQouteNoChange}></TextField>
                    <TextField label="Tax 1:" underlined  name="qouteno" onChange={this.handleQouteNoChange}></TextField>
                    <TextField label="Tax 2:" underlined  name="qouteno" onChange={this.handleQouteNoChange}></TextField>
                    <TextField label="Total:" underlined  name="qouteno" onChange={this.handleQouteNoChange}></TextField>
                  </Stack>
                </Stack>
              </div></form></ButtonGroup> */}
            
             <label for="QuotationNotes" id="QuotationNotesLabel">
            {/* <textarea id="QuotationNotes"
        onBlur={() => {var value = document.getElementById('QuotationNotes');_QuotationNotesObj=value;this.setState({QuotationNotes:value.value})}} resizable={false}/> */}
                  <table id='myTable-Notes' style={{border:"2px solid #0000"}}>
                    <thead>
                      <tr>
                        <td colSpan="5">Notes</td>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td colSpan="5">*The Above Budget Quote is exclusive of GST Charges</td>
                        </tr>
                        <tr>
                          <td colSpan="5">The Quote does not include network cable (CAT6) charges which are required to connect the CNC machine and
                  the computer terminal, also if any network equipment such as Network Switch which are required for
                  wireless/wired connection to the LAN.</td>
                        </tr>
                    </tbody>
                  </table>
            </label> <br></br>
		<PrimaryButton onClick={this.loadFromTemplate} text="Select Notes" />{' '}
				{this.state.showLoadTemplateDialog==true?<DialogBlockingExampleWrapper/>:null}
        <PrimaryButton onClick={this.AddNewTemplate} text="Add Notes" />       
        {this.state.showAddTemplateDialog==true?<NewTemplate/>:null}
		<div id="signatureBox">
		  <div id="lhsSign">
		  <label><input type="checkbox" id="lhsSignCheck"/> LHS Signature  </label><br></br>
				<label for="printinA4">
				  <input type="checkbox" id="printinA4" name="printinA4" value={this.state.printinA4} checked={this.state.printinA4} onClick={() => {this.setState({printinA4:!this.state.printinA4})}}/> Print in Plain A4 Sheet 
				</label><br></br>
				<label for="addEsign">
					<input type="checkbox" id="addEsign" name="addEsign"  value={this.state.addEsign} checked={this.state.addEsign} onClick={() => {this.setState({addEsign:!this.state.addEsign})}}/> Add E-Signature & Seal 
				</label>
		  </div>
		</div>
            </PivotItem>
            <PivotItem headerText="Attachment"
            itemKey = "Attachment"
             
            /* onFocus={()=>{alert('onFocus 2')}}
            onSelect={() => {this.setState.bind(this, {currentStep: 'Attachment'})}} */>
                <label>Photos Per Page :
                    {/* <select id='PhotosPerPage' onBlur={this.PhotosPerPage}>
                      <option value="0">      </option>
                      <option value="1">One Photo per Page</option>
                      <option value="2">Two Photos per Page</option>
                      <option value="3">Four Photos per Page</option>
                      <option value="4">Six Photos per Page</option>
                      <option value="5">Eight Photos per Page</option>
                      <option value="6">Ten Photos per Page</option>
                    </select> */}
                    <FDropdown
                    placeholder="Select an option"
                    label="Photos Per Page."
                    className={controlClass.control}
                    options={[
                      { key: '1', text: 'One Photo per Page'},
                      { key: '2', text: 'Two Photos per Page' },
                      { key: '3', text: 'Four Photos per Page' },
                      { key: '4', text: 'Six Photos per Page' },
                      { key: '5', text: 'Eight Photos per Page' },
                      { key: '6', text: 'Ten Photos per Page' },
                    ]}
                    required
                    onChanged={this.PhotosPerPage}
                  />
                </label>
                  <Table celled selectable sortable className="photoAttachTable">
                    <Table.Header style={thead}>
                      <Table.Row>
                        <Table.HeaderCell>Caption</Table.HeaderCell>
                        <Table.HeaderCell>File</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                          <Table.Cell><input type='label' class='photoCaption' /></Table.Cell>
                          <Table.Cell><input name={this.state.qouteNo} id="filesToUpload" type="file" onChange={this.onFileChange}/*  multiple */ /><button onClick={this.onFileUpload}> 
                                Upload! 
                              </button>
                                </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    <Table.Footer>
                      <Table.Row>
                        <Table.HeaderCell colSpan="8">
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary">Add</Button>
                    <Button variant="secondary" id="viewUploadedImage" onClick={this.removeUploadedImage}>Remove</Button>
                    <Button variant="secondary" id="viewUploadedImage" onClick={this.viewUploadedImage}>View</Button>
                </ButtonGroup>
            </PivotItem>
          </Pivot>
          {/* <div>
            <h1>Description</h1>
            <div>
              {' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.{' '}
            </div>
          </div>
          <div>
            <h1>Description</h1>
            <div>
              {' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.{' '}
            </div>
          </div>
          <div>
            <h1>Description</h1>
          </div> */}
        <DialogFooter>
          {/* <PrimaryButton onClick={this.closeModal} text="Save" />
          <DefaultButton onClick={this.closeModal} text="Cancel" /> */}
        </DialogFooter>
      </Dialog>
          <Modal
            isOpen={false}
            onAfterOpen={afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ref={this.modalRef}
          >
 
            {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}
            <Navbar bg="light" expand="lg" style={{ width: 400 }} sticky="top"> 
            <Navbar.Brand href="#home" className="tableHeader">Quotation</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <NavDropdown title="File" id="file-nav-dropdown">
                  <NavDropdown.Item href="https://www.google.co.in">Save</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Version</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="https://www.twitter.com">Preview</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Print</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="https://www.twitter.com">Properties</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Close</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Export" id="export-nav-dropdown">
                  <NavDropdown.Item href="https://www.google.co.in">PDF</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Excel</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">HTML</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Font" id="font-nav-dropdown">
                  <NavDropdown.Item href="https://www.google.co.in">Helvetica</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Times</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Courier</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Chinese Font</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="https://www.twitter.com">Right to Left</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Left to Right</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Font Size" id="fontsize-nav-dropdown">
                  <NavDropdown.Item href="https://www.google.co.in">Extra Large</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Larger</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="https://www.twitter.com">Large</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Medium</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="https://www.twitter.com">Smaill</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Smaller</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Extra Small</NavDropdown.Item>  
                </NavDropdown>
                <Nav.Link href="#link">Password</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Navbar bg="light" expand="lg" style={{ width: 400 }}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
               {/*  <Nav.Link href="#home">Home</Nav.Link> */}
               <Nav.Link href="#link" icon={<FaBars/>}>{/* <figure className="figure" icon={<FaSave/>}><figcaption className="figure-caption text-right">A caption for the above image.</figcaption></figure> */}</Nav.Link>
                <NavDropdown title="File" id="file-nav-dropdown">
                  <NavDropdown.Item href="https://www.google.co.in">Save</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Version</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="https://www.twitter.com">Preview</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Print</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="https://www.twitter.com">Properties</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Close</NavDropdown.Item>
                  
                  {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                </NavDropdown>
                <NavDropdown title="Export" id="export-nav-dropdown">
                  <NavDropdown.Item href="https://www.google.co.in">PDF</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Excel</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">HTML</NavDropdown.Item>
                  
                  {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                </NavDropdown>
                <NavDropdown title="Font" id="font-nav-dropdown">
                  <NavDropdown.Item href="https://www.google.co.in">Helvetica</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Times</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Courier</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Chinese Font</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="https://www.twitter.com">Right to Left</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Left to Right</NavDropdown.Item>
                  
                  {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                </NavDropdown>
                <NavDropdown title="Font Size" id="fontsize-nav-dropdown">
                  <NavDropdown.Item href="https://www.google.co.in">Extra Large</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Larger</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="https://www.twitter.com">Large</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Medium</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="https://www.twitter.com">Smaill</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Smaller</NavDropdown.Item>
                  <NavDropdown.Item href="https://www.twitter.com">Extra Small</NavDropdown.Item>  
                  {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                </NavDropdown>
                <Nav.Link href="#link">Password</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          
          {/* <Tabs id ='Quotation-tab' activateKey={this.state.key} onSelect={onSelectTab}>
            <Tab eventKey='Document Details' title='Document Details' >
            
            
            </Tab>
            <Tab eventKey='Line Items' title='Line Items' >
              
            
            </Tab>
            
            <Tab eventKey='Photo Attachment' title='Photo Attachment' >
                      
            </Tab>
            <Tab eventKey='PDF Attachment' title='PDF Attachment' >
                <Table celled selectable sortable className="pdfAttachTable">
                  <Table.Header style={thead}>
                    <Table.Row>
                      <Table.HeaderCell>File</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                      <Table.Row>
                        <Table.Cell><input type='label' class='pdfFile' /></Table.Cell>
                      </Table.Row>
                  </Table.Body>
                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan="8">
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
                <ButtonGroup aria-label="Basic example" className="pdfAttachbtngroup">
                    <Button variant="secondary">Add</Button>
                    <Button variant="secondary">Remove</Button>
                    <Button variant="secondary">View</Button>
                </ButtonGroup>
            </Tab>
            <Tab eventKey='Private' title='Private' >
              <form>
                <div class="container">
                    <span class="private-label-holder"><label for="url">Status</label></span>
                    <span class="private-input-holder">
                      <select id='QuotationStamp'>
                            <option value="0">      </option>
                            <option value="APPROVED">APPROVED</option>
                      </select>
                    </span>
                    <span class="private-label-holder"><label for="code-base">Comment</label></span>
                    <span class="private-input-holder"><textarea id="privateComment"/></span>
                    <span class="private-label-holder"><label for="code-base">Last Modified</label></span>
                    <span class="private-input-holder"><label id="privateLastModified"/></span>
                  </div>
              </form>
            </Tab>
          </Tabs> */}
            {/* <button onClick={closeModal}>close</button>
            <div>I am a modal</div>
            <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form> */}
          </Modal>

          {/* <div className="center">
            <button
              id="bmi-btn"
              className="calculate-btn"
              type="button"
            >
              Calculate BMI
            </button>
          </div> */}
          
         {/*  <QuotationPopup/> */}
          {/* <Navbar bg="light" expand="lg" style={{ width: 400 }}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">
                <Label icon={<FaPencilAlt />} onClick={this.handleEditClick()}/>
            </Nav.Link>
                <Nav.Link href="#link1"><Label icon={<FaSave />}  onClick={this.handleSaveClick()}/></Nav.Link>
	              <Nav.Link href="#link"><Label icon={<FaPrint />}  onClick={this.handlePrintClick()} /></Nav.Link>
                <Nav.Link href="#link2"><Label icon={<FaTrash/>}  onClick={this.handleDeleteClick()} /></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>  */}
          <div className="flex-panel-main">
            <ProSidebar
            collapsed={false}
            toggled={false}
            breakPoint="md">
              <SidebarHeader>
                <div>Billing Software</div>
              </SidebarHeader>
              <Menu iconShape="square">
                <div class="quotation-submenu-wrapper" onClick={ (e) => this.handleQuotationSection(e)} >
                    <SubMenu title="Quotation" icon={<FaEdit />} suffix={this.state.qouteLength}>
                      <MenuItem onClick={this.handleModal} >Quotation</MenuItem>
                      <div class="quotation-menuitem-trash" onClick={(e) => this.handleQuotationTrashModal(e)}>
                        <MenuItem >Trash</MenuItem>
                      </div>
                    </SubMenu>
                </div>
                <div class="supplier-submenu-wrapper" onClick={ (e) => this.handleSupplierSection(e)}>
                  <SubMenu title="Supplier" icon={<FaRegEnvelope/>} suffix={this.state.supplierLength} collapsed={this.state.sidebarCollapsed}>
                    <MenuItem onClick={this.handleSupplierClick}>New Supplier</MenuItem>
                    {this.state.displaySupplierModal ? <SupplierModal name={this.state.supplierName} onChange={this.onSupplierChange}/> :null}
                    <MenuItem  onClick={this.handleSupplierTrash}>Trash</MenuItem>
                  </SubMenu>
                </div>
                <div class="customer-submenu-wrapper" onClick={ (e) => this.handleCustomerSection(e)}>
                  <SubMenu title="Customer List" icon={<FaUserTie/>} suffix={this.state.customerLength}>
                    <MenuItem onClick={this.handleCustomerClick}>New Customer</MenuItem>
                    {this.state.displayCustomerModal ? <CustomerModal/> :null}
                    <MenuItem onClick={this.handleCustomerTrash}>Trash</MenuItem>
                  </SubMenu>
                </div>
                <div class="item-submenu-wrapper" onClick={ (e) => this.handleItemsSection(e)}>
                  <SubMenu title="Item List" icon={<FaLayerGroup/>} suffix={this.state.itemsLength}>
                    <MenuItem onClick={this.handleItemClick}>New Item</MenuItem>
                    {this.state.displayItemModal ? <ItemModal/> :null}
                    <MenuItem  onClick={this.handleItemsTrash}>Trash</MenuItem>
                  </SubMenu>
                </div>
                <div class="reports-submenu-wrapper" onClick={ (e) => this.handleReportsSection}>
                  <SubMenu title="Reports" icon={<FaVoteYea/>}>
                    {/* <MenuItem  onClick={this.handleCustomerReport}>Customer Wise Report</MenuItem> */}
                    <SubMenu title="Customer Wise Report">
                      <div>
                        <FDropdown
                          placeholder="Select Customer"
                          label="Customer"
                          className={controlClass.control}
                          options={customerList}

                          required
                          styles={{color:'blue'}}
                          onChanged={this.handleCutomerReportChange}
                        />
                        <DefaultButton text="Generate" onClick={this.handleCustomerReportSection}/>
                      </div>
                    </SubMenu>
                    <SubMenu title="Product Wise Report">
                    <div>
                      <FDropdown
                      placeholder="Select Product"
                      label="Product"
                      className={controlClass.control}
                      options={[
                        {key: 'I am option a.' },
                        {key: 'USD' },
                        {key: 'SGD' }
                      ]}
                      style={{}}
                      required
                      /* styles={dropdownStyles} */
                      onChanged={this.handleCurrencyChange}
                      />
                      <DefaultButton text="Generate"/>
                    </div>
                    </SubMenu>
                    <SubMenu title="Monthly Report">
                    <div>
                      <FDropdown
                        placeholder="Select Month"
                        label="Select Month"
                        className={controlClass.control}
                        options={[
                          {key: 'I am option a.' },
                          {key: 'USD' },
                          {key: 'SGD' }
                        ]}

                        required
                        /* styles={dropdownStyles} */
                        onChanged={this.handleCurrencyChange}
                      />
                      <DefaultButton text="Generate"/>
                    </div>
                    </SubMenu>
                    {/* <MenuItem onClick={this.handleProductReport}>Product Wise Report</MenuItem>
                    <MenuItem onClick={this.handleMonthlyReport}>Monthly Report</MenuItem> */}
                  </SubMenu>
                </div>
                {/* <MenuItem icon={<FaVoteYea/>} onClick={(e) => this.handleReportsSection}>Reports</MenuItem> */}
                {/* <MenuItem icon={<FaBars/>} onClick={(e) => this.handleReportsSection}>Options</MenuItem> */}
                <div class="item-submenu-wrapper" onClick={ (e) => this.handleItemsSection(e)}>
                  <SubMenu title="Options" icon={<FaBars/>}>
                    <MenuItem onClick={this.handleAddCompanyInfoClick}>Add Company Details</MenuItem>
                    {this.state.displayCustomerInfoDialog ? <CompanyInfoDialog/> :null}
                    {/* <MenuItem>Trash</MenuItem> */}
                  </SubMenu>
                </div>
              </Menu>
            </ProSidebar>
			
            {/* <Table celled selectable sortable green class="ui green table" color="green">
                <Table.Header style={thead}>
                  <Table.Row>
                    <Table.HeaderCell  sorted={column === 'name' ? direction : null}
                  onClick={this.handleSort('age')}>Type</Table.HeaderCell>
                    <Table.HeaderCell>Number</Table.HeaderCell>
                    <Table.HeaderCell>Customer</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSort('unit')}>Date</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body style={thead}>
                  {_.map(data, ({ age, gender, name,unit }) => (
                      <Table.Row key={name}>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{age}</Table.Cell>
                        <Table.Cell>{gender}</Table.Cell>
                        <Table.Cell>{unit}</Table.Cell>
                      </Table.Row>
                  ))}
                </Table.Body>
        
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="8">
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table> */}
              <div class="flex-panel"><NavHeader/>
              {this.state.handleQuotationSection ? <Table  responsive celled selectable sortable className="quoteTable mainTable">
                
                <Table.Row>
                    <Table.HeaderCell>Number</Table.HeaderCell>
                    <Table.HeaderCell>Customer</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSort('unit')}>Date</Table.HeaderCell>
                  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSort('unit')}>Sales Rep.</Table.HeaderCell>
                  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSort('unit')}>Status</Table.HeaderCell>
                  </Table.Row>
                    <Table.Body>
                      {_.map(quotationData, ({ type, number, customer, date,stamp,saleRep },index) => (
                        <OverlayTrigger trigger="click" placement="bottom-end" overlay={popover} onClick={this.popoverClick(index,quotationData[index])} rootClose={true}>
                            <Table.Row key={number} onClick={this.handleQoutationRowClick(index,quotationData[index])}>
                              <Table.Cell>{number}</Table.Cell>
                              <Table.Cell>{customer}</Table.Cell>
                              <Table.Cell>{date}</Table.Cell>
                              <Table.Cell>{saleRep}</Table.Cell>
                              <Table.Cell>{stamp}</Table.Cell>
                            </Table.Row>
                        </OverlayTrigger>
                      ))}
                    </Table.Body>

                    <Table.Footer>
                      <Table.Row>
                        <Table.HeaderCell colSpan="8">
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>:null}
                  {this.state.handleQuotationTrashModal ? <Table responsive celled selectable sortable className="quoteTable mainTable">
                
                <Table.Row>
                    <Table.HeaderCell>Number</Table.HeaderCell>
                    <Table.HeaderCell>Customer</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSort('unit')}>Date</Table.HeaderCell>
                  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSort('unit')}>Sales Rep.</Table.HeaderCell>
                  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSort('unit')}>Status</Table.HeaderCell>
                  </Table.Row>
                    <Table.Body>
                      {_.map(quotationTrashData, ({ type, number, customer, date,stamp,saleRep },index) => (
                        <OverlayTrigger trigger="click" placement="bottom-end" overlay={trashPopover} onClick={this.popoverClick(index,quotationData[index])} rootClose={true}>
                            <Table.Row key={number} onClick={this.handleQoutationRowClick(index,quotationData[index])}>
                              <Table.Cell>{number}</Table.Cell>
                              <Table.Cell>{customer}</Table.Cell>
                              <Table.Cell>{date}</Table.Cell>
                              <Table.Cell>{saleRep}</Table.Cell>
                              <Table.Cell>{stamp}</Table.Cell>
                            </Table.Row>
                        </OverlayTrigger>
                      ))}
                    </Table.Body>

                    <Table.Footer>
                      <Table.Row>
                        <Table.HeaderCell colSpan="8">
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>:null}
              {/* {this.state.handleCustomerReport ? <Table><Table.Row>
                    <Table.HeaderCell  sorted={column === 'name' ? direction : null}
                  onClick={this.handleSupplierSort('Category')}><Label ribbon>Category</Label></Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'name' ? direction : null}
                  onClick={this.handleSupplierSort('Customer')}>Customer</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'name' ? direction : null}
                  onClick={this.handleSupplierSort('age')}>Tel</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSupplierSort('unit')}>Fax</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'email' ? direction : null}
                  onClick={this.handleSupplierSort('Email')}>Email</Table.HeaderCell>
                  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSupplierSort('unit')}>Suppler Name</Table.HeaderCell>
                  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSupplierSort('unit')}>Suppler Address</Table.HeaderCell>
                  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSupplierSort('unit')}>Tel</Table.HeaderCell>
                  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSupplierSort('unit')}>Vat No</Table.HeaderCell>
                  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSupplierSort('unit')}>Preferred Payment</Table.HeaderCell>
                  </Table.Row>
                    <Table.Body>
                      {_.map(supplierData, ({ category,customer,tel,fax,email,supplierName,address,supplierTel,supplierVat,ShipTo,ShippingAddress,ShippingTel,ShippingVat,preferredPayment },index) => (
                        <OverlayTrigger trigger="click" placement="bottom-end" overlay={popover} onClick={this.popoverClick(index)} rootClose={true}>
                            <Table.Row key={category} onClick={
                              this.handleSupplierRowClick(index,supplierData[index])
                            }>
                              <Table.Cell><Label ribbon>{category}</Label></Table.Cell>
                              <Table.Cell>{customer}</Table.Cell>
                              <Table.Cell>{tel}</Table.Cell>
                              <Table.Cell>{fax}</Table.Cell>
                              <Table.Cell>{email}</Table.Cell>
                              <Table.Cell>{supplierName}</Table.Cell> 
                              <Table.Cell>{address}</Table.Cell>
                              <Table.Cell>{supplierTel}</Table.Cell>
                              <Table.Cell>{supplierVat}</Table.Cell>
                              <Table.Cell>{preferredPayment}</Table.Cell>
                            </Table.Row>
                        </OverlayTrigger>
                      ))}
                    </Table.Body>

                    <Table.Footer>
                      <Table.Row>
                        <Table.HeaderCell colSpan="8">
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer></Table>:null} */}
              {this.state.handleSupplierSection ? <Table ui celled selectable sortable className='mainTable'>
                <Table.Row>
                    <Table.HeaderCell  sorted={column === 'name' ? direction : null}
                  onClick={this.handleSupplierSort('Category')}><Label ribbon>Category</Label></Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'name' ? direction : null}
                  onClick={this.handleSupplierSort('Customer')}>Customer</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'name' ? direction : null}
                  onClick={this.handleSupplierSort('age')}>Tel</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSupplierSort('unit')}>Fax</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'email' ? direction : null}
                  onClick={this.handleSupplierSort('Email')}>Email</Table.HeaderCell>
                  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSupplierSort('unit')}>Suppler Name</Table.HeaderCell>
                  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSupplierSort('unit')}>Suppler Address</Table.HeaderCell>
                  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSupplierSort('unit')}>Tel</Table.HeaderCell>
                  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSupplierSort('unit')}>Vat No</Table.HeaderCell>
                  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSupplierSort('unit')}>Preferred Payment</Table.HeaderCell>
                  </Table.Row>
                    <Table.Body>
                      {_.map(supplierData, ({ category,customer,tel,fax,email,supplierName,address,supplierTel,supplierVat,ShipTo,ShippingAddress,ShippingTel,ShippingVat,preferredPayment },index) => (
                        <OverlayTrigger trigger="click" placement="bottom-end" overlay={popover} onClick={this.popoverClick(index)} rootClose={true}>
                            <Table.Row key={category} onClick={
                              this.handleSupplierRowClick(index,supplierData[index])
                            }>
                              <Table.Cell><Label ribbon>{category}</Label></Table.Cell>
                              <Table.Cell>{customer}</Table.Cell>
                              <Table.Cell>{tel}</Table.Cell>
                              <Table.Cell>{fax}</Table.Cell>
                              <Table.Cell>{email}</Table.Cell>
                              <Table.Cell>{supplierName}</Table.Cell> 
                              <Table.Cell>{address}</Table.Cell>
                              <Table.Cell>{supplierTel}</Table.Cell>
                              <Table.Cell>{supplierVat}</Table.Cell>
                              <Table.Cell>{preferredPayment}</Table.Cell>
                            </Table.Row>
                        </OverlayTrigger>
                        
                      ))}
                    </Table.Body>

                    <Table.Footer>
                      <Table.Row>
                        <Table.HeaderCell colSpan="8">
                          {/* <Pagination
                            totalPages={props.totalPages}
                            activePage={props.currentPage}
                            onPageChange={props.onChangePage}
                          /> */}
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>:null}
              {this.state.handleCustomerSection ? <Table celled selectable sortable className='mainTable'>
                <Table.Row>
                    <Table.HeaderCell  sorted={column === 'name' ? direction : null}
                  onClick={this.handleSort('age')}>Type</Table.HeaderCell>
                    <Table.HeaderCell>Number</Table.HeaderCell>
                    <Table.HeaderCell>Customer</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleSort('unit')}>Date</Table.HeaderCell>
                  </Table.Row>
                    <Table.Body>
                      {_.map(data, ({ customer, category, email },index) => (
                        <OverlayTrigger trigger="click" placement="bottom-end" overlay={popover} onClick={this.popoverClick(index)} rootClose={true}>
                            <Table.Row key={customer} onClick={this.handleCustomerRowClick(data[index])}>
                              <Table.Cell>{customer}</Table.Cell>
                              <Table.Cell>{category}</Table.Cell>
                              <Table.Cell>{email}</Table.Cell>
                             </Table.Row>
                        </OverlayTrigger>
                      ))}
                    </Table.Body>

                    <Table.Footer>
                      <Table.Row>
                        <Table.HeaderCell colSpan="8">
                          {/* <Pagination
                            totalPages={props.totalPages}
                            activePage={props.currentPage}
                            onPageChange={props.onChangePage}
                          /> */}
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>:null}
              {this.state.handleItemsSection ?  <Table celled selectable sortable className='mainTable'>
                <Table.Row>
                    <Table.HeaderCell  sorted={column === 'name' ? direction : null}
                  onClick={this.handleItemsSort('age')}>Category</Table.HeaderCell>
                    <Table.HeaderCell>Supplier</Table.HeaderCell>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleItemsSort('unit')}>Description</Table.HeaderCell>
				  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleItemsSort('unit')}>Spec</Table.HeaderCell>
				  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleItemsSort('unit')}>Weight</Table.HeaderCell>
				  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleItemsSort('unit')}>Unit</Table.HeaderCell>
				  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleItemsSort('unit')}>Cost</Table.HeaderCell>
				  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleItemsSort('unit')}>Price</Table.HeaderCell>
				  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleItemsSort('unit')}>Discount</Table.HeaderCell>
				  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleItemsSort('unit')}>AdditionalInfo1</Table.HeaderCell>
				  <Table.HeaderCell sorted={column === 'unit' ? direction : null}
                  onClick={this.handleItemsSort('unit')}>AdditionalInfo2</Table.HeaderCell>
                  </Table.Row>
                    <Table.Body>
                      {_.map(itemsData, ({ category, supplier, 	ID, Description, Spec, weight, Unit, cost, price, Discount/* , AdditionalInfo1, AdditionalInfo2 */ },index) => (
                        <OverlayTrigger trigger="click" placement="bottom-end" overlay={popover} onClick={this.popoverClick(index)} rootClose={true}>
                            <Table.Row key={category}  onClick={
                              this.handleItemRowClick(itemsData[index])
                            }>
                              <Table.Cell>{category}</Table.Cell>
                              <Table.Cell>{supplier}</Table.Cell>
                              <Table.Cell>{ID}</Table.Cell>
                              <Table.Cell>{Description}</Table.Cell>
                              <Table.Cell>{Spec}</Table.Cell>
                              <Table.Cell>{weight}</Table.Cell>
                              <Table.Cell>{Unit}</Table.Cell>
                              <Table.Cell>{cost}</Table.Cell>
                              <Table.Cell>{price}</Table.Cell>
                              <Table.Cell>{Discount}</Table.Cell>
                              <Table.Cell>{Discount}</Table.Cell>
                              <Table.Cell>{Discount}</Table.Cell>
                            </Table.Row>
                        </OverlayTrigger>
                        
                      ))}
                    </Table.Body>

                    <Table.Footer>
                      <Table.Row>
                        <Table.HeaderCell colSpan="8">
                          {/* <Pagination
                            totalPages={props.totalPages}
                            activePage={props.currentPage}
                            onPageChange={props.onChangePage}
                          /> */}
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>:null}
              </div>
          </div>
        </div>
      );
     }
     getCustomerModal(){
       //console.log('getCustomerModal');
       const [modalIsOpen,setIsOpen] = React.useState(false);
       const [key, setKey] = React.useState('Line Items'); 
     }
     
     componentDidMount(){
      
     /* var customerData = {category:'new category',customer:'Thennarasu',tel:'Software Enginner',email:'Software Enginner',PaymentTerm:"COD",SalesDiscount:"5%",BillToName:"Thennarasu",BillToAddress:"BillToAddress",BillToTel:"543211"}
      axios.post("http://localhost:9000/testAPI/customers",{customerData}).then((response) => {this.setState({apiRespnse:response.data});
      });
      axios.get('http://localhost:9000/testAPI/customers',{
        params: {
          foo: 'bar'
        }
      }).then((res) => {alert(res.data)}); */
      //this.callAPI();
      /* $.ajax({
        url: 'http://localhost/api.php',
        type: 'POST',
        Accepts: "json",
        datatype: "json",
        data: {data:'hello', thens:'thens'} ,
        async: false,
        success: function(result){
          alert('result 1 '+JSON.stringify(result));
        },error: function(error){
          console.log(JSON.stringify(error));
        }
      }); */
      $("#Pivot12-Tab1").on('click',function(e){
        alert('Pivot12-Tabl');
    }); 
    $("#lineItemsPivot").on('click',function(e){
      alert('Pivot12-Tabl');
    }); 

    /* $(".ms-Dialog-button--close").on('click',function(e){

      alert('thens');

    }); */
    /* $('#lineItemsRowAdd').on('click',function(e){
      alert('item add clicked');
    }); */
      //handleQuotationSave = (el) => () => {
        $(document).ready(function(){
          /* $(document).on('click','#lineItemsRowAdd',function(e){
            console.log('stateVar '+JSON.stringify(stateVar));
            var lastRow = $('table#QuotationItems > tbody > tr:last').index();
            const rows = [...stateVar.lineItemRows];
            rows[lastRow] = {
              id:"",
              desc:"",
              unit:"",
              unitPrice:"",
              qty:"",
              total:""
            }
            console.log('lineItemsRows '+JSON.stringify(rows));
            $("table#QuotationItems > tbody").html("");
            $("#QuotationItems > tbody").append("<tr><td><input type'text' class='itemID' onBlur=this.handleModal></input></td><td><input type'text' class='itemDesc'/></td><td><input type'text' class='itemUnit'/></td><td><input type'text' class='itemUnitPrice'/></td><td><input type'text' class='itemQty'/></td><td><input type'text' class='itemTotal'/></td></tr>");
            $("#QuotationItems > tbody").css({"overflow-y":"auto","overflow-x":"scroll"});
            //alert($('table#QuotationItems > tbody > tr:last').index());
          }); */
          $("#Pivot12-Tab1").on('click',function(e){
              //alert('Pivot12-Tabl');
          }); 
          $("#lineItemsPivot").on('click',function(e){
            //alert('Pivot12-Tabl');
           }); 
          $("#QuoteSave").on('click',function(e){
            $.ajax({
              url: 'http://localhost/api.php',
              type: 'POST',
              Accepts: "json",
              datatype: "json",
              //contentType: "application/json",
              //dataType: "json",
              data: {data:'hello'} ,
              async: false,
              //contentType:"application/x-www-form-urlencoded; charset=UTF-8",
              success: function(result){
                alert('result 1 '+JSON.stringify(result));
              },error: function(error){
                alert('error  '+JSON.stringify(error));
              }
            });
          });
          $(document).on('#QuoteSave','click',function(e){
              alert('quotesave ');
          });
          $("#QuoteSave").click('click',function(e){
            alert('quotesave 1 ');
        });
        });
        $("#QuoteSave").on('click',function(e){
          $.ajax({
            url: 'http://localhost/api.php',
            type: 'POST',
            Accepts: "json",
            datatype: "json",
            //contentType: "application/json",
            //dataType: "json",
            data: {data:'hello'} ,
            async: false,
            //contentType:"application/x-www-form-urlencoded; charset=UTF-8",
            success: function(result){
              alert('result 1 '+JSON.stringify(result));
            },error: function(error){
              alert('error  '+JSON.stringify(error));
            }
          });
        });
        $(document).on('#QuoteSave','click',function(e){
            alert('quotesave ');
        });
        $("#QuoteSave").click('click',function(e){
          alert('quotesave 1 ');
        });



      //}
      
      /* const requestOptions = {
        method: 'POST',
        mode:'cors',
        headers: { 'Content-Type': 'application/json',"Access-Control-Allow-Origin":"*" },
        body: JSON.stringify({ title: 'React POST Request Example' }),
        crossDomain:true
    }; */
        //console.log('modalRef '+this.modalRef); // acessing the attributes of img tag when dom loads
        /* axios({
          method: 'post',
          url: 'server/api.php',//`${API_PATH}`,
          headers: { 'content-type': 'application/json' },
        })
          .then(result => {
            alert('result '+result);
            this.setState({
              mailSent: result.data.sent
            })
          }) 
          .catch(error => {this.setState({ error: error.message });alert('axios error1 '+error);});*/
          /* const url = 'http://localhost:3000/api.php'
            axios.get(url).then(response => {alert("hello "+JSON.stringify(response))})
            .then((data) => {
              this.setState({ contacts: data })
              console.log(this.state.contacts)
            })
          fetch('http://localhost:3000/api.php', requestOptions)
            .then(response => { alert('resp12 '+JSON.stringify(response))  })
            .then(data => {alert(data)}); */
      }
      componentWillMount() {
        //this.callAPI();
    }
  
}

export default App;
