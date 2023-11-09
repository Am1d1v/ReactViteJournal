import './App.css'
import Button from './components/Button/Button';
import JournalItem from './components/JournalItem/JournalItem';


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
    <>
      <h1>Some Title</h1>
      <Button />
      <JournalItem title={data[0].title} text={data[0].text} date={data[0].date}/>
      <JournalItem title={data[1].title} text={data[1].text} date={data[1].date}/>
    </>
  )
}

export default App;