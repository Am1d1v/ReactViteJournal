import { useEffect, useReducer, useRef, useState } from 'react';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

const JournalForm = ({onSubmit}) => {

    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const {isValid, isFormReadyToSubmit, values} = formState;

    // Date formated
    const date = new Intl.DateTimeFormat('ru-RU').format(new Date());
        
  // If title or post input form are empty this function will focus on empty input fields  
  const focusError = (isValid) => {
      switch(true){
        case !isValid.title:
          titleRef.current.focus();
          break;
        case !isValid.post:
          postRef.current.focus();
          break; 
      }
  };

    // Changing post(description) or title state after 2 seconds
    useEffect(() => {
      let timerId;
      if(!formState.isValid.post || !formState.isValid.title){

        focusError(isValid)

        timerId = setTimeout(() => {
          dispatchForm({type: 'RESET_VALIDITY'})
        }, 2000); 
      }

      // Clear useEffect
      return () => {
        clearTimeout(timerId);
      }
    }, [isValid]);

    // References
    const titleRef = useRef();
    const postRef = useRef();


    // useEffect for isFormReadyToSubmit, is isFormReadyToSubmit == true, we can submit form
    useEffect(() => {
      if(isFormReadyToSubmit){
        onSubmit(values, values.date = date);
        // Call clear forms
        dispatchForm({type: 'CLEAR'})
      }
    }, [isFormReadyToSubmit])

    // Add New Journal Record
    const addJournalItem = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        // Getting Entries from fromData
        const formProps = Object.fromEntries(formData);
        
        const date = new Intl.DateTimeFormat('ru-RU').format(new Date());
        formProps.date === '' || undefined || null ? formProps.date = date : date

        // Dispatch call   
        dispatchForm({type: 'SUBMIT'})
    }

    // Controll input fields
    const onChange = (event) => {
      dispatchForm({type: 'SET_VALUE', payload: {[event.target.name]: event.target.value}})
    }

    return (
            <form className={styles['journal-form']} onSubmit={addJournalItem}>
                <div>
                  <input type='text' 
                         name='title' 
                         placeholder='Title' 
                         className={`${styles['input-title']} ${isValid.title ? '' : styles['invalid']}`}
                         value={values.title}
                         onChange={onChange}
                         ref={titleRef}
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
                         onChange={onChange}
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
                         id='tag'
                         className={`${styles['input']}`}
                         value={values.tag}
                         onChange={onChange} 
                  />
                </div>

                <textarea name="post" 
                          placeholder='Post' 
                          id="" 
                          cols="30" 
                          rows="10"
                          className={`${styles['input']} ${isValid.post ? '' : styles['invalid']}`}
                          value={values.post}
                          onChange={onChange}
                          ref={postRef}
                          ></textarea>
                <Button text='Save' />
            </form>  
    )
}
export default JournalForm;