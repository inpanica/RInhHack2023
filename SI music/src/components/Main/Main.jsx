import './main.less'
import Roller from '../Roller/Roller'
import Button from '../Button/Button'

const Main = (props) => {
    return(
        <div className="main_wrap">
            <div className="main">
                <div className="main_welcome">
                    <h1>SI music</h1>
                    <h2>Все музыкальные новинки</h2>
                </div>
                <Button>Слушать</Button>
            </div>
            <Roller/>
        </div>
    )
}

export default Main