import { useState } from 'react';
import './JournalForm.css';
import Button from '../Button/Button';

const JournalForm = ({onSubmit}) => {

  const [inputData, setInputData] = useState('');

    // inputData change state  / Text Input
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
        onSubmit(formProps);

    }

    return (
            <form className='journal-form' onSubmit={addJournalItem}>
                <input type='text' name='title' placeholder='Title'/>
                <input type='date' name='date' placeholder='Date'/>
                <input type='text' name='tag' placeholder='Text' value={inputData} onChange={inputChange} />
                <textarea name="text" placeholder='Descripstion' id="" cols="30" rows="10"></textarea>
                <Button text='Save' />
            </form>  
    )
}
export default JournalForm;