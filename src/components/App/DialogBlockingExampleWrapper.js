import { DatePicker, DayOfWeek, IDatePickerStrings, mergeStyleSets , TextField, CommandBarButton, IContextualMenuProps, IIconProps, DefaultButton, PrimaryButton,Pivot, PivotItem, Dialog, DialogFooter, DialogType,   ContextualMenu, SpinButton, Toggle, ComboBox, IComboBoxOption, SelectableOptionMenuItemType, Fabric, initializeIcons} from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as util from 'util' 

initializeIcons();
let options = [];



const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
};
const modalPropsStyles = { main: { maxWidth: 450, minHeight:300,height:300, maxHeight:500 } };
const iconProps = { iconName: 'IncreaseIndentLegacy' };
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Choose Template',
  /* subText: 'Do you want to send this message without a subject?', */
};
const log = (text: string): (() => void) => {
  return (): void => {
	console.log(text);
  };
};

class DialogBlockingExampleWrapper extends React.Component{
		constructor(props){
			super(props);
			this.state = {displayCustomerModal:false,modalIsOpen:true}
			this.toggleHideDialog= this.toggleHideDialog.bind(this);
			this.Addtouotation= this.Addtouotation.bind(this);
			axios.get('http://localhost:9000/testAPI/templates').then((res) => {
				//alert('templates '+JSON.stringify(res.data)+"  "+res.data[1].key+"  "+res.data[1].text);
				
				 const options : IComboBoxOption[] =  res.data;//[{key:res.data[0].key, text:res.data[0].text},{key:res.data[1].key, text:res.data[1].text}];
				 //this.setState({options:options});
				 
				 /* const options = [
				  { key: 'A', text: 'Option A' },
				  { key: 'B', text: 'Option B' },
				  { key: 'C', text: 'Option C' },
				  { key: 'D', text: 'Option D' },
				  { key: 'E', text: 'Option E' },
				  { key: 'F', text: 'Option F'},
				  { key: 'G', text: 'Option G' },
				  { key: 'H', text: 'Option H' },
				  { key: 'I', text: 'Option I' },
				  { key: 'J', text: 'Option J' },
				]; */

				this.setState({
					options:options
				})
			});
		}
		toggleHideDialog = () => {
			this.setState({
				displayCustomerModal:!this.state.displayCustomerModal
			})
		}
		Addtouotation = () => {
			
			
			function createCell(cell,template){
				var div = document.createElement('div'), // create DIV element
				txt = document.createTextNode(template); // create text node
				div.appendChild(txt);                    // append text node to the DIV
				div.setAttribute('colSpan', "5");        // set DIV class attribute
				//div.setAttribute('className', style);    // set DIV class attribute for IE (?!)
				cell.appendChild(div);                   // append DIV to the table cell
				//document.getElementById("").colSpan = "1";
			}
			function appendRow(element) {
				var template = document.getElementsByName('template')[0].value;
				
				var tbl = document.getElementById(element); // table reference
				var	row = tbl.insertRow(tbl.rows.length);      // append table row
				var	i = 0;
				///document.getElementById(element).style.colSpan = "5";
				// insert table cells to the new row
				for (i = 0; i < 1; i++) {
					createCell(row.insertCell(i), template, 'row');
				}
			}
			for(var el = 0; el < 2; el++){
				if(el == 0){
					appendRow('myTable-Notes');
				}else if(el == 1){
					appendRow('myTable-Notes-hidden');
				}
			}
			 
			/* var tbl = document.getElementById('my-table'), // table reference
				row = tbl.insertRow(tbl.rows.length),      // append table row
				i;
			// insert table cells to the new row
			for (i = 0; i < tbl.rows[0].cells.length; i++) {
				createCell(row.insertCell(i), i, 'row');
			} */
			//alert(document.getElementById("my-table"));
		}
		handleNotesChange = (e) => {
			//alert(e..value+"  "+e.target.text);
			//console.log('handleNotesChange '+e.dispatchConfig._targetInst._debugOwner.key);
			var inst = e._targetInst._debugOwner.key;
			console.log('dispatchConfig '+inst);
			////console.log('handleNotesChange123 '+util.inspect(e));
			this.setState({
				selectedNote:inst
			})
		}
			  render(){
				  //const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
			  //const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
			  /* const modalProps = React.useMemo(
				() => ({
				  isBlocking: true,
				  styles: modalPropsStyles,
				  dragOptions: true ? dragOptions : undefined,
				}),
				[true],
			  ); */
				return(
				<>]
				  <Dialog
					hidden={this.state.displayCustomerModal}/* 
					onDismiss={toggleHideDialog} */
					dialogContentProps={dialogContentProps}
					/* modalProps={modalProps} */
				  >
					<ComboBox
					  label="Choose Notes from Saved Templates"
					  placeholder="Select or type an option"
					  autoComplete="off"
					  options={this.state.options}
					  onChange={this.handleNotesChange}
					  id="NotesList"
					/>
					<TextField label="Standard" multiline rows={3} disabled resizable={false} value={this.state.selectedNote} name="template"/>
					<DialogFooter>
					  <PrimaryButton onClick={this.Addtouotation} text="Add to Quotation" />
					  <DefaultButton onClick={this.toggleHideDialog} text="Cancel" />
					</DialogFooter>
				  </Dialog>
				</>
			);  
			  }
};


export default DialogBlockingExampleWrapper;