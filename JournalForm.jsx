import { useEffect, useReducer, useState } from 'react';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

const JournalForm = ({onSubmit}) => {

    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const {isValid, isFormReadyToSubmit, values} = formState;

    // Text Input 
    const [inputData, setInputData] = useState('');

    // inputData change state  / Text Input change state
    const inputChange = (event) => {
    
      setInputData(event.target.value);
      //console.log(inputData)
    }

    // Changing post(description) or title state after 2 seconds
    useEffect(() => {
      let timerId;
      if(!formState.isValid.post || !formState.isValid.title){
        timerId = setTimeout(() => {
          dispatchForm({type: 'RESET_VALIDITY'})
        }, 2000); 
      }

      // Clear useEffect
      return () => {
        clearTimeout(timerId);
      }
    }, [isValid]);


    // useEffect for isFormReadyToSubmit
    useEffect(() => {
      if(isFormReadyToSubmit){
        onSubmit(values)
      }
    }, [isFormReadyToSubmit])

    // Add New Journal Record
    const addJournalItem = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        // Getting Entries from fromData
        const formProps = Object.fromEntries(formData);
        
        const date = new Intl.DateTimeFormat('ru-RU').format(new Date());
        formProps.date === '' ? formProps.date = date : date

        // Dispatch call   
        dispatchForm({type: 'SUBMIT', payload: formProps})

    }

    return (
            <form className={styles['journal-form']} onSubmit={addJournalItem}>
                <div>
                  <input type='text' 
                         name='title' 
                         placeholder='Title' 
                         className={`${styles['input-title']} ${isValid.title ? '' : styles['invalid']}`}
                    />
                </div>
                <div className={styles['form-row']}>
                  <label htmlFor="date" className={styles['form-label']}>
                    <img src="Calendar.svg" alt="CalendarIcon" />
                    <span>Date</span>
                  </label>
                  <input type='date' 
                         name='date' 
                         id='date'
                  />
                </div>

                <div className={styles['form-row']}>
                  <label htmlFor="tag" className={styles['form-label']}>
                    <img src="Folder.svg" alt="FolderIcon" />
                    <span>Cathegory</span>
                  </label>
                  <input type='text' 
                         name='tag' 
                         placeholder='Text' 
                         value={inputData} onChange={inputChange}
                         id='tag'
                         className={`${styles['input']}`}
                  />
                </div>

                <textarea name="post" 
                          placeholder='Description' 
                          id="" 
                          cols="30" 
                          rows="10"
                          className={`${styles['input']} ${isValid.post ? '' : styles['invalid']}`}
                          ></textarea>
                <Button text='Save' />
            </form>  
    )
}
export default JournalForm;