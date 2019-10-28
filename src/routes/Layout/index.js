import styles from './index.scss'
import React,{ Component,Fragment } from 'react'
import { connect } from "dva"
import { TabBar,NavBar, Icon } from 'antd-mobile'
import Index from "../Index"
import My from "../My"
import Shop from "../Shop"

export default class Layout extends Component {
  state = {
    selectedTab: 'index',
    hidden: false,
    fullScreen: false,
  }
  render(){
    const { selectedTab } = this.state
    return (
      <Fragment>
      	<div>
      	    <NavBar
      	      mode="dark"
      	      icon={<Icon type="left" />}
      	      onLeftClick={(e) => this.props.history.goBack}
      	    >dva-demo</NavBar>
      	</div>
      	<div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 'calc(100vh - 45px)' }}>
      	        <TabBar
      	          unselectedTintColor="#999999"
      	          tintColor="#424651"
      	          barTintColor="white"
      	          hidden={this.state.hidden}
      	        >
                  <TabBar.Item
                    icon={
                      <div style={{
                        width: '22px',
                        height: '22px',
                        background: `url(${require('../../assets/images/index2.png')}) center center /  21px 21px no-repeat`}}
                      />
                    }
                    selectedIcon={
                      <div style={{
                        width: '22px',
                        height: '22px',
                        background: `url(${require('../../assets/images/index1.png')}) center center /  21px 21px no-repeat`}}
                      />
                    }
                    title="首页"
                    key=""
                    selected={this.state.selectedTab === "index"}
                    onPress={() => {
                      this.setState({
                        selectedTab: "index",
                      })
                      this.props.history.push('/index')
                    }}
                    data-seed="logId1"
                  >
                    {selectedTab === "index" && <Index/>}
                  </TabBar.Item>
                  <TabBar.Item
                    icon={
                      <div style={{
                        width: '22px',
                        height: '22px',
                        background: `url(${require('../../assets/images/shop2.png')}) center center /  21px 21px no-repeat`}}
                      />
                    }
                    selectedIcon={
                      <div style={{
                        width: '22px',
                        height: '22px',
                        background: `url(${require('../../assets/images/shop1.png')}) center center /  21px 21px no-repeat`}}
                      />
                    }
                    title="分类"
                    key=""
                    selected={this.state.selectedTab === "shop"}
                    onPress={() => {
                      this.setState({
                        selectedTab: "shop",
                      })
                      this.props.history.push('/shop')
                    }}
                    data-seed="logId2"
                  >
                    {selectedTab === "shop" && <Shop/>}
                  </TabBar.Item>
                  <TabBar.Item
                    icon={
                      <div style={{
                        width: '22px',
                        height: '22px',
                        background: `url(${require('../../assets/images/my2.png')}) center center /  21px 21px no-repeat`}}
                      />
                    }
                    selectedIcon={
                      <div style={{
                        width: '22px',
                        height: '22px',
                        background: `url(${require('../../assets/images/my1.png')}) center center /  21px 21px no-repeat`}}
                      />
                    }
                    title="我的"
                    key=""
                    selected={this.state.selectedTab === "my"}
                    onPress={() => {
                      this.setState({
                        selectedTab: "my",
                      })
                      this.props.history.push('/my')
                    }}
                    data-seed="logId3"
                  >
                    {selectedTab === "my" && <My/>}
                  </TabBar.Item>
      	        </TabBar>
      	      </div>
      	</Fragment>
    )
  }
}
