import './CardButton.css'


const CardButton = (props) => {

    const{children} = props;

    return (
        <button className='card-button'>{children}</button>
    )
}
export default CardButton;