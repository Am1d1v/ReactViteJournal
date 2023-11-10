import './Button.css'


const Button = () => {

    const clicked = () => {
        console.log('Clicked')
    }

    return (
        <button className='button accent' onClick={clicked}>Click</button>
    )
}
export default Button;