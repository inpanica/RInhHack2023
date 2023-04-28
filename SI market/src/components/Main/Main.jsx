import './main.less'
import Button from '../Button/Button'
import GROSS from '../../img/gros.png'

const Main = (props) => {
    return(
        <div className="main_wrap">
            <div className="main_text">
                <h1 className="title">SI market</h1>
                <h2 className="welcome">Самые нужные продукты <br/>по самым низким ценам</h2>
            </div>
            <img src={GROSS} alt="" />
        </div>
    )
}

export default Main