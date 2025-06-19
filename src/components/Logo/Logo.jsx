import Tilt from 'react-parallax-tilt';
import './logo.css'
import brain from './brain-icon.png'

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className='tilt-container br2 shadow-2' perspective={500}>
                <div className='logo'>
                    <img src={brain} alt='logo'/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;
