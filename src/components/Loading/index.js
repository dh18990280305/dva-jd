import React,{ Component } from 'react'
import './index.scss'
import { Spinner } from 'reactstrap'

export default class Loading extends Component {
	constructor(props){
		super(props)
		this.state = {
			fullScreen: this.props.fullScreen ? true : false
		}
	}
	render(){
		const { fullScreen } = this.state
		return (
			<div className={fullScreen ? 'fullScreen loading' : 'loading' }>
				<div className="loadBox">
					<Spinner type="grow" size="sm" color="primary" />
					<Spinner type="grow" size="sm" color="primary" />
					<Spinner type="grow" size="sm" color="primary" />
				</div>
			</div>
		)
	}
}
