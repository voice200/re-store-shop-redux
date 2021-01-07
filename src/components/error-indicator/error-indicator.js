import React from 'react';
import icon from './death-star.png'

const ErrorIndicator = (error) =>{
	return (
		<div className="error-indicator">
			<img src={icon} alt="error icon"/>
			<span className="boom">BOOM!</span>
			<span>
				{error.message}
            </span>
		</div>
	);
}

export default ErrorIndicator;