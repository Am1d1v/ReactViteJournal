import { useState } from 'react'
import './Button.css'


const Button = () => {

    const [btnText, setBtnText] = useState('Open');

    const clicked = () => {
        
        setBtnText((text) => {
            return text + ' !' // Previous state + ' !'
        })
        console.log('Clicked')
    }

    return (
        <button className='button accent' onClick={clicked}>{btnText}</button>
    )
}
export default Button;