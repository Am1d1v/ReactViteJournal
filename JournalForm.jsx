import { useState } from 'react';
import './JournalForm.css';
import Button from '../Button/Button';

const JournalForm = ({onSubmit}) => {

  // Text Input 
  const [inputData, setInputData] = useState('');

    // Checking form validation
    const [formValidState, setFormValidState] = useState({
      title: true,
      text: true, 
    });

    // inputData change state  / Text Input change state
    const inputChange = (event) => {
    
      setInputData(event.target.value);
      //console.log(inputData)
    }

    // Add New Journal Record
    const addJournalItem = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        // Getting Entries from fromData
        const formProps = Object.fromEntries(formData);
        //console.log(formProps);

        // Invalid time value fix
        //console.log(formProps.date === '');
        formProps.date === '' ? formProps.date = new Date() : new Date()

        // Checking form validation
        let isFormValid = true;

        if(!formProps.title.trim().length){
          setFormValidState(state => ({...state, title: false}));
          isFormValid = false;
        } else {
          setFormValidState(state => ({...state, title: true}));
        }

        if(!formProps.text.trim().length){
          setFormValidState(state => ({...state, text: false}));
          isFormValid = false;
        } else {
          setFormValidState(state => ({...state, text: true}));
        }

        // If isFormValid false(title or text is missing), user cannot submit his note 
        if(!isFormValid){
          return;
        }

        onSubmit(formProps);
    }

    return (
            <form className='journal-form' onSubmit={addJournalItem}>
                <input type='text' 
                       name='title' 
                       placeholder='Title' 
                       style={{border: formValidState.title ? 'none' : '2px solid red'}}
                       />
                <input type='date' 
                       name='date' />
                <input type='text' 
                       name='tag' 
                       placeholder='Text' 
                       value={inputData} onChange={inputChange}
                       style={{border: formValidState.text ? 'none' : '2px solid red'}} 
                       />
                <textarea name="text" 
                          placeholder='Description' 
                          id="" 
                          cols="30" 
                          rows="10"
                          style={{border: formValidState.text ? 'none' : '2px solid red'}}
                          ></textarea>
                <Button text='Save' />
            </form>  
    )
}
export default JournalForm;