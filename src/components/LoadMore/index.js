import './index.scss'
import React,{ Component,Fragment } from 'react'
import { Spinner } from 'reactstrap'

export default class LoadMore extends Component {
  render(){
    const { moreStatus } = this.props
    return (
      <Fragment>
        {
          moreStatus && <div className="moreMsg"><Spinner color="primary" size="sm"/></div>
          || <div className="moreMsg">- 到底了 -</div>
        }
      </Fragment>
    )
  }
}
