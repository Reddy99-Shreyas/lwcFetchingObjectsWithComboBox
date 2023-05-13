import { LightningElement, track } from 'lwc';
import fetchAllObjectList from '@salesforce/apex/RecordFetchHelper.fetchAllObjectList';
import fetchAllFieldsForSelectedObject from '@salesforce/apex/RecordFetchHelper.fetchAllFieldsForSelectedObject';
import fetchAllRecordsOfSelectedObject from '@salesforce/apex/RecordFetchHelper.fetchAllRecordsOfSelectedObject';

export default class CustomRecordFetcher extends LightningElement {
    @track objectList = [];
    @track lstFields = [];
    objectName = '';
    showButton = false;
    arrayToSend = [];
    allRecordsOfSelectedObject = [];
    columnsMap = [];
    arrayToSend = [];

    connectedCallback() {
        fetchAllObjectList()
            .then((result) => {
                if (result) {
                    this.objectList = [];
                    for (let key in result) {
                        this.objectList.push({ label: key, value: key });
                    }
                } else {
                    console.log('Objects are no found');
                }
            }).catch((error) => {
                console.log('Objects are not found');
            });
    }

    onObjectChange(event) {
        this.lstFields = [];
        this.allRecordsOfSelectedObject = [];
        this.columnsMap = [];
        this.lab = [];
        this.val = [];
        this.arrayToSend = [];
        this.objectName = event.detail.value;
        this.showButton = true;
        this.getFieldsOnObjectChange();
    }
    getFieldsOnObjectChange() {
        fetchAllFieldsForSelectedObject({ strObjectName: this.objectName })
            .then((result) => {
                this.lstFields = [];
                for (let key in result) {
                    this.lstFields.push({ label: key, value: key, type: 'action' });
                }
            })
            .catch((error) => {
                console.log('All fields are not Feteched');
            })
    }

    handleCheckBoxClick(event) {
        this.arrayToSend = [];
        for (let index in event.detail.value) {
            this.arrayToSend.push(event.detail.value[index]);
        }
        var val = this.arrayToSend;

        this.columnsMap = val.map((v, i) =>
            ({ label: val[i], fieldName: v })
        )
    }
    handleShowData() {
        fetchAllRecordsOfSelectedObject({ strObjectName: this.objectName })
            .then(result => {
                this.allRecordsOfSelectedObject = result;
            })
            .catch(error => {
                console.log('Error While Getting Records: ', error);
            })
    }
}