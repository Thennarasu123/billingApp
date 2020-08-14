import React from 'react';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { DatePicker, DayOfWeek, IDatePickerStrings, mergeStyleSets , CommandBarButton, IContextualMenuProps, IIconProps, DefaultButton, Pivot, PivotItem, Dialog, DialogFooter, DialogType, TextField, PrimaryButton} from 'office-ui-fabric-react';
import axios from 'axios';

class CompanyInfoDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {displayCompanyInfoModal:false,modalIsOpen:true}
        this.handleCompanyInfoCloseBtnClick = this.handleCompanyInfoCloseBtnClick.bind(this);
    }

    handleComapnyInfoSave = () => {
        var companyName = document.getElementsByName('companyName')[0].value;
        var companyAddress = document.getElementsByName('companyAddress')[0].value;
        var companyAddress1 = document.getElementsByName('companyAddress1')[0].value;
        var companyAddress2 = document.getElementsByName('companyAddress2')[0].value;
        var tel = document.getElementsByName('tel')[0].value;
        var email = document.getElementsByName('email')[0].value;
        var website = document.getElementsByName('website')[0].value;
        var VATNo = document.getElementsByName('VATNo')[0].value;
        var RegNo = document.getElementsByName('RegNo')[0].value;
        axios.post("http://localhost:9000/testAPI/companyDetail",{companyName:companyName,companyAddress:companyAddress,companyAddress1:companyAddress1,companyAddress2:companyAddress2,tel:tel,email:email,website:website,VATNo:VATNo,RegNo:RegNo}).then((response) => {this.setState({apiRespnse:response.data});
      });
    }
    handleCompanyInfoCloseBtnClick = () => {
        this.setState({
            displayCompanyInfoModal:!this.state.displayCompanyInfoModal
        })
    }
    render(){
        return(
            <Dialog hidden={this.state.displayCompanyInfoModal} onDismiss={!this.state.displayCompanyInfoModal} /* modalProps={modelProps} style={dialogStyles} */
            id="qDialog"
            containerClassName={ 'ms-dialogMainOverride textDialog'}
          >
              <h1>Add Customer Details</h1>
              <Stack horizontal/*  tokens={stackTokens} styles={stackStyles} */>
            <Stack /* {...columnProps} */>
                <TextField placeholder="Company Name:" underlined  name="companyName"></TextField>
                <TextField placeholder="Address:" underlined  name="companyAddress"></TextField>
                <TextField  underlined  name="companyAddress1" ></TextField>
                <TextField  underlined  name="companyAddress2" ></TextField>
                <TextField placeholder="Tel:" underlined  name="tel" ></TextField>
                <TextField placeholder="Email:" underlined  name="email" ></TextField>
                <TextField placeholder="Website:" underlined  name="website" ></TextField>
                <TextField placeholder="VAT No:" underlined  name="VATNo" ></TextField>
                <TextField placeholder="Company Reg. No:" underlined  name="RegNo" ></TextField>
                <Stack horizontal>
                <PrimaryButton text="Save" id="QuoteSave" allowDisabledFocus onClick={this.handleComapnyInfoSave}/>
                <PrimaryButton text="Cancel"  allowDisabledFocus onClick={this.handleCompanyInfoCloseBtnClick}/>
                </Stack>
                {/* <TextField placeholder="Quotation No:" underlined  name="qouteno" onChange={this.handleQouteNoChange}></TextField>
                <FDropdown
                placeholder="Select an option"
                placeholder="Stamp"
                options={[
                    { key: 'A', text: 'APPROVED', title: 'I am option a.' },
                    { key: 'B', text: 'NOT APPROVED' },
                    { key: 'C', text: 'PENDING'}
                ]}
                required
                onChanged={this.handleStampChange}
                />
                <FDropdown
                placeholder="Select an option"
                placeholder="Currency"
                options={[
                    { key: 'A', text: 'Rupees', title: 'I am option a.' },
                    { key: 'B', text: 'USD' },
                    { key: 'D', text: 'SGD' }
                ]}

                required
                onChanged={this.handleCurrencyChange}
                />
                <FDropdown
                placeholder="Select an option"
                placeholder="Sales Rep."
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
                ariaplaceholder="Select a date"
                onBlur={this.handleQouteDateChange}
                />
                <DatePicker
                className={controlClass.control}
                strings={DayPickerStrings}
                placeholder="Select Shipping date..."
                ariaplaceholder="Shipping date"
                onBlur={this.handleShippingDateChange}
                /> 
                <FDropdown
                placeholder="Select an option"
                placeholder="Shipping Term."
                options={[
                    { key: 'A', text: 'CIF', title: 'I am option a.' },
                    { key: 'B', text: 'FOB' }
                ]}
                value={this.state.shipTerm}
                required
                onChanged={this.handleShippingTermChange}
                />
                <FDropdown
                placeholder="Select an option"
                placeholder="Payment Term."
                options={[
                    { key: 'A', text: 'COD', title: 'I am option a.' },
                    { key: 'B', text: 'D/A' },
                    { key: 'C', text: 'D/P'},
                    { key: 'D', text: 'T/T' }
                ]}
                required
                onChanged={this.handlePaymentTermChange}
                />
                <TextField placeholder="Quotation To Address:" underlined onChange={this.handleQouteToChange}/>
                <TextField underlined onChange={this.handleQouteAddressChange}/>
                <TextField underlined />
                <TextField underlined />
                <TextField underlined />
                <TextField placeholder='Tel' underlined />
                <TextField placeholder='VAT No.' underlined />
                <CommandBarButton
                iconProps={addIcon}
                text="New item"
                menuProps={menuProps}
                /> */}
                {/* <Stack horizontal tokens={stackTokens}>
                <PrimaryButton text="Save" id="QuoteSave" allowDisabledFocus onClick={this.handleQuotationSave()}/>
                <PrimaryButton text="Preview" onClick={this.handlePDFPreview()} allowDisabledFocus/>
                <PrimaryButton text="Cancel"  allowDisabledFocus onClick={this.closeModal}/>
                </Stack> */}
            </Stack>
            </Stack>
          </Dialog>
            
        )
    }
    
}

export default CompanyInfoDialog;