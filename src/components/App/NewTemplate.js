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
  title: 'Add Notes',
  /* subText: 'Do you want to send this message without a subject?', */
};
const log = (text: string): (() => void) => {
  return (): void => {
	console.log(text);
  };
};

class NewTemplate extends React.Component{
		constructor(props){
			super(props);
			this.state = {displayCustomerModal:false,modalIsOpen:true}
            this.toggleHideDialog= this.toggleHideDialog.bind(this);
            this.saveTemplate = this.saveTemplate.bind(this);
			
		}
		toggleHideDialog = () => {
			this.setState({
				displayCustomerModal:!this.state.displayCustomerModal
			})
        }
        
        saveTemplate = () => {
            var key = document.getElementsByName('newtemplate')[0].value;
            var text = key;//"This is a Sample Notes which is good";
            alert(text.length);
            if(text.length > 40){
                text = text.substring(0, 40);
                text = text + "...";
            }
            alert('key '+key);
            axios.post('http://localhost:9000/testAPI/templates',{key:key,text:text}).then((res) => {
				this.setState({
                    displayCustomerModal:!this.state.displayCustomerModal
                })
			});
        }

		handleNotesChange = (e) => {
			//alert(e..value+"  "+e.target.text);
			//console.log('handleNotesChange '+e.dispatchConfig._targetInst._debugOwner.key);
			var inst = e._targetInst._debugOwner.key;
			////console.log('handleNotesChange123 '+util.inspect(e));
			this.setState({
				selectedNote:inst
			})
		}
			  render(){
				return(
				<>]
				  <Dialog
					hidden={this.state.displayCustomerModal}/* 
					onDismiss={toggleHideDialog} */
					dialogContentProps={dialogContentProps}
					/* modalProps={modalProps} */
				  >
					{/* <ComboBox
					  label="Choose Notes from Saved Templates"
					  placeholder="Select or type an option"
					  autoComplete="off"
					  options={this.state.options}
					  onChange={this.handleNotesChange}
					  id="NotesList"
					/> */}
					<TextField multiline rows={3} resizable={false} /* value={this.state.selectedNote} */name='newtemplate'/>
					<DialogFooter>
					  <PrimaryButton onClick={this.saveTemplate} text="Save Template" />
					  <DefaultButton onClick={this.toggleHideDialog} text="Cancel" />
					</DialogFooter>
				  </Dialog>
				</>
			);  
			  }
};


export default NewTemplate;