import './App.css'
import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import RightPanel from './layouts/RightPanel/RightPanel'
import Header from './components/Header/Header'
import JournalList from './components/JournalList/JournalList'
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useEffect, useState } from 'react';

// Initial Journal data
//const INITIAL_DATA = [];

function App() {

  // Notes in the journal 
  const [items, setItems] = useState([]);


  // Save initial 'data' in localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));

    if(data){
      setItems(data.map(item => ({
        ...item,
      }))
    )}
  }, []);


  // useEffect for items (Updates items data)
  useEffect(() => {
    // Add new notes to localStorage using useEffect()
    if(items.length){
      localStorage.setItem('data', JSON.stringify(items));
    }
    //console.log(items);
  }, [items]);


  // Add new Items(notes) to the Journal
  const addItem = (item) => {
    setItems(previousItems => [{
      post: item.post,
      title: item.title,
      date: item.date
    }, ...previousItems])
  }


  return (
    <div className='app'>
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          {items.length === 0 ? <p>No Notes</p> : items.map((el, index) => {return(
            <CardButton key={index}>
              <JournalItem 
                title={el.title} 
                post={el.post} 
                date={el.date}
                />
            </CardButton>
          )})}
        </JournalList>
      </LeftPanel>

      <RightPanel>
        <JournalForm onSubmit={addItem}/>
      </RightPanel>
    </div>
  )
}

export default App;