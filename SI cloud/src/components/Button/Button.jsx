import React from 'react'
import '../Button/Button.less'

const Button = ({children, ...props}) =>{
    return(
        <button {...props} className={[props.className, 'button btn-7'].join(' ')} type={props.type? props.type : 'button'}>
            <span>{children}</span>
        </button>
    );
};

export default Button;