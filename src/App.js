import React, { Component } from 'react';
import {generate} from 'randomstring';
import AddressBook  from './AddressBook/AddressBook';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Emoji from 'react-emoji-render';
import Modal from 'react-bootstrap/Modal';


import './App.css';

class App extends Component {

  state = {
    addressBook: [
      {
        id : generate(10),
        FirstName : 'Cathy',
        LastName : 'Pierce',
        Birthday : '9/14/1996',
        Telephone : '200-910-8132'
      },
      {
        id : generate(10),
        FirstName: 'Alfonso',
        LastName: 'Cooley',
        Birthday: '8/10/1973',
        Telephone: '200-657-9362'
      },
      {
        id : generate(10),
        FirstName: 'Victor',
        LastName: 'Gordon',
        Birthday: '8/3/1970',
        Telephone: '200-661-9407'
      },
      {
        id : generate(10),
        FirstName: 'Colleen',
        LastName: 'Wright',
        Birthday: '10/28/1967',
        Telephone: '200-250-7949'
      },
      {
        id : generate(10),
        FirstName: 'James',
        LastName: 'Johnston',
        Birthday: '5/11/1972',
        Telephone: '200-645-3176'
      },
      {
        id : generate(10),
        FirstName: 'Anna',
        LastName: 'Reyes',
        Birthday: '9/10/1975',
        Telephone: '200-707-8670'
      }
    ],
    show: false,
    newFirstName: '',
    newLastName: '',
    newBirthday: '',
    newTelephone: '',
    searchWord: '',
    selectedId: ''
  };


  addContactHandler = (event) => {
    event.preventDefault();

    let newContact = {
      id: generate(10),
      FirstName: this.state.newFirstName,
      LastName: this.state.newLastName,
      Birthday: this.state.newBirthday,
      Telephone: this.state.newTelephone
    };

    this.setState({
      addressBook: [...this.state.addressBook, newContact],
      newFirstName: '',
      newLastName: '',
      newBirthday: '',
      newTelephone: ''
    });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = (id, e) => {
     
    this.setState({ 
      show: true,
      selectedId : id
    });
    console.log(`1111this is the id: ${id}`)
  }


  searchHander = () => {
    let contactList = this.state.addressBook;
    console.log(`this is contactList: ${contactList}`);
    // console.log(this.state.searchWord);
    let keyWord = new RegExp(this.state.searchWord, 'i'); 
    // console.log(reg);
    contactList = contactList.filter(
        (contact) =>   
        keyWord.test(contact.FirstName) || keyWord.test(contact.LastName) || keyWord.test(contact.Birthday) || keyWord.test(contact.Telephone)
        
      );
    console.log(contactList);
    return contactList;
  }

  deleteHander = (key, e) => {
    let contactList = [...this.state.addressBook];  
    let deleteIndex = contactList.findIndex((item) => item.id === key);
    contactList.splice(deleteIndex, 1);
    this.setState({
      addressBook : contactList,
      selectedId : '',
      show: !this.state.show
    });
    

  }


  render() {
    
    return (
      <div className="App">
        <Container>
          <header>
            <h1>React Addressbook</h1>
          </header>
          <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure about this?</Modal.Body>
         
          <Modal.Footer>
            <Button variant="secondary" onClick = {this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.deleteHander.bind(null, this.state.selectedId)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
          
          <input 
            id = "searchBar" 
            type="text" 
            placeholder = "Search"
            value = {this.state.searchWord}
            onChange = {(e) => this.setState({searchWord : e.target.value})}
          />
          
          <AddressBook
            addressbook = {this.searchHander()}
            delete = {this.handleShow}
          ></AddressBook>
        
          
          <br/>
          {/* display form for user to enter new contact information */}
          <Form onSubmit = {this.addContactHandler}> 
            <h2>Add New Contact Information</h2>
          <Form.Row>
            <Col>
              <Form.Control 
                type = "text" 
                placeholder="First Name" 
                value = {this.state.newFirstName}
                onChange = {(e) => this.setState({newFirstName : e.target.value})}
              />
            </Col>
            <Col>
              <Form.Control 
                type = "text" 
                placeholder = "Last Name"
                value = {this.state.newLastName}
                onChange = {(e) => this.setState({newLastName : e.target.value})}
              />
            </Col>
          </Form.Row>
          <br/>
          <Form.Row>
            <Col>
              <Form.Control 
                type = "date" 
                placeholder="Birthday" 
                value = {this.state.newBirthday}
                onChange = {(e) => this.setState({newBirthday : e.target.value})}
              />
            </Col>
            <Col>
              <Form.Control 
                type = "tel" 
                placeholder = "Telephone"
                value = {this.state.newTelephone}
                onChange = {(e) => this.setState({newTelephone : e.target.value})}
              />
            </Col>
          </Form.Row> 
          <br/>  
          <Form.Row>
              <Col>
              <Button variant = "primary" type = "submit" onClick = {this.formChecker}>
              <Emoji text=":package: Add New Contact" />
              </Button>
              </Col>
             
          </Form.Row>       
        </Form>
        </Container>
      </div>
    );
  }
}

export default App;
