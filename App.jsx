import './App.css'
import Button from './components/Button/Button';
import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import RightPanel from './layouts/RightPanel/RightPanel'
import Header from './components/Header/Header'
import JournalList from './components/JournalList/JournalList'
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';


function App() {

  const data = [
    {
      title: 'Title1',
      text: 'some text1',
      date: new Date()
    },
    {
      title: 'Title2',
      text: 'some text2',
      date: new Date()
    }
  ];


  return (
    <div className='app'>
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          <CardButton >
            <JournalItem title={data[0].title} text={data[0].text} date={data[0].date}/>
          </CardButton>
          <CardButton>
            <JournalItem title={data[1].title} text={data[1].text} date={data[1].date}/>
          </CardButton>
        </JournalList>
      </LeftPanel>

      <RightPanel>
        <JournalForm />
      </RightPanel>
    </div>
  )
}

export default App;