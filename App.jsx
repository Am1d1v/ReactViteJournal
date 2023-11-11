import './App.css'
import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import RightPanel from './layouts/RightPanel/RightPanel'
import Header from './components/Header/Header'
import JournalList from './components/JournalList/JournalList'
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useState } from 'react';

// Initial Journal data
const INITIAL_DATA = [
  // {
  //   title: 'Title1',
  //   text: 'some text1',
  //   date: new Date()
  // },
  // {
  //   title: 'Title2',
  //   text: 'some text2',
  //   date: new Date()
  // }
];

function App() {

  // Notes in the journal 
  const [items, setItems] = useState(INITIAL_DATA);


  // Add new Items(notes) to the Journal
  const addItem = (item) => {
    setItems(previousItems => [{
      text: item.text,
      title: item.title,
      date: new Date(item.date)
    }, ...previousItems])
  }


  return (
    <div className='app'>
      {items.length}
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          {items.length === 0 ? <p>No Notes</p> : items.map((el, index) => {return(
            <CardButton key={index}>
              <JournalItem 
                title={el.title} 
                text={el.text} 
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