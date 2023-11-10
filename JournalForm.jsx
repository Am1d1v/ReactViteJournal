import { useState } from 'react';
import './JournalForm.css';
import Button from '../Button/Button';

const JournalForm = () => {

  const [inputData, setInputData] = useState('');

  const inputChange = (event) => {
      setInputData(event.target.value);
      console.log(inputData)
  }

    // Add New Journal Record
    const addJournalItem = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        // Getting Entries from fromData
        const formProps = Object.fromEntries(formData);

        
        console.log(formProps)
    }

    return (
            <form className='journal-form' onSubmit={addJournalItem}>
                <input type='text' name='title'/>
                <input type='date' name='date' />
                <input type='text' name='tag' value={inputData} onChange={inputChange} />
                <textarea name="post" id="" cols="30" rows="10"></textarea>
                <Button text='Save'/>
            </form>  
    )
}
export default JournalForm;