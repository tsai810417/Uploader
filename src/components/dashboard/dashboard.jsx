import React, { Component } from 'react';
import UserInfo from '../userInfo/userInfoContainer';
import ProductList from '../productList/productListContainer';
import ProductDetail from '../productDetail/productDetailContainer';
import './dashboard.style.css';

class Dashboard extends Component {
  render() {
    const productId = this.props.match.params.id;
    return (
      <div id='dashboard'>
        <UserInfo />
        {
          productId ?
          <ProductDetail
            history={ this.props.history }
            id={ productId }
          /> :
          <ProductList
            history={ this.props.history }
          />
        }
      </div>
    )
  }
}

export default Dashboard;
