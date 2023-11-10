import './JournalList.css'


const JournalList = (props) => {

    const{children} = props;

    return (
        <div className='journal-list'>
            {children}
        </div>
    )
}
export default JournalList;