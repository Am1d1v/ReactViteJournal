import { useState } from 'react';
import './JournalForm.css';
import Button from '../Button/Button';

const JournalForm = ({onSubmit}) => {

  // Text Input 
  const [inputData, setInputData] = useState('');

    // Checking form validation
    const [formValidState, setFormValidState] = useState({
      title: true,
      post: true, 
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

        if(!formProps.post.trim().length){
          setFormValidState(state => ({...state, post: false}));
          isFormValid = false;
        } else {
          setFormValidState(state => ({...state, post: true}));
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
                       className={`input ${formValidState.title ? '' : 'invalid'}`}
                       />
                <input type='date' 
                       name='date' 
                       />
                <input type='text' 
                       name='tag' 
                       placeholder='Text' 
                       value={inputData} onChange={inputChange}
                       />
                <textarea name="post" 
                          placeholder='Description' 
                          id="" 
                          cols="30" 
                          rows="10"
                          className={`input ${formValidState.post ? '' : 'invalid'}`}
                          ></textarea>
                <Button text='Save' />
            </form>  
    )
}
export default JournalForm;