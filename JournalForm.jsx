import { useEffect, useReducer, useState } from 'react';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

const JournalForm = ({onSubmit}) => {

    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const {isValid, isFormReadyToSubmit, values} = formState;

    // Text Input 
    const [inputData, setInputData] = useState('');

    // Initial Data State
    // const INITIAL_STATE = {
    //   title: true,
    //   post: true, 
    // };
    // Checking form validation
    //const [formValidState, setFormValidState] = useState(INITIAL_STATE);

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


    // Add New Journal Record
    const addJournalItem = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        // Getting Entries from fromData
        const formProps = Object.fromEntries(formData);
        //console.log(formProps);

        // Invalid time value fix
          //console.log(formProps.date === '');
          // const date = formProps.date;
          // const formatedDate =  new Intl.DateTimeFormat('ru-RU').format(date);
          // formProps.date === '' ? formProps.date = new Date() : new Date()

        const date = new Intl.DateTimeFormat('ru-RU').format(new Date());
        formProps.date === '' ? formProps.date = date : date
        //console.log(formProps.date, formProps)

        // Checking form validation
        //let isFormValid = true;

        // if(!formProps.title.trim().length){
        //   setFormValidState(state => ({...state, title: false}));
        //   formState.isValid.title = false;
        // } else {
        //   setFormValidState(state => ({...state, title: true}));
        // }

        // if(!formProps.post.trim().length){
        //   setFormValidState(state => ({...state, post: false}));
        //   formState.isValid.post = false;
        // } else {
        //   setFormValidState(state => ({...state, post: true}));
        // }

        // // If isFormValid false(title or text is missing), user cannot submit his note 
        // if(!isFormValid){
        //   return;
        // }

        // useEffect for isFormReadyToSubmit
          useEffect(() => {
            if(isFormReadyToSubmit){
              onSubmit(values)
            }
          }, [isFormReadyToSubmit])


        // Dispatch call   
        dispatchForm({type: 'SUBMIT', payload: formProps})

        //onSubmit(formProps);
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