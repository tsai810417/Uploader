import React, { Component } from 'react';
import Paper from '../uiElements/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import HoverEffectCard from '../uiElements/HoverEffectCard';
import Card from '../uiElements/Card';

import './productList.style.css';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.handleSelectProduct = this.handleSelectProduct.bind(this);
  }

  componentDidMount() {
    this.props.requestProductList();
  }

  handleSelectProduct(id) {
    this.props.history.push(`/dashboard/${id}`);
  }

  renderProducts() {
    return this.props.products.map(p =>
      {
        if (p.disabled) {
          return (
            <Grid item key={ p.name } md={ 4 } lg={ 3 } xl={ 2 }>
              <Card variant="outlined">
                <img
                  className='brand-img transparent-img'
                  alt={ p.brand.name }
                  src={ p.brand.picture_url }
                />
                <img
                  className='product-img  transparent-img'
                  alt={ p.name }
                  src={ p.picture_url }
                />
              </Card>
            </Grid>
          )
        } else {
          return (
            <Grid item key={ p.name } md={ 4 } lg={ 3 } xl={ 2 }>
              <HoverEffectCard
                variant="outlined"
                onClick={
                  () => {
                    if (!p.disabled) {
                      this.handleSelectProduct(p.id);
                    }
                  }
                }
                className={ p.disabled ? 'disabled-card' : '' }
              >
                <img
                  className='brand-img'
                  src={ p.brand.picture_url }
                />
                <img
                  className='product-img'
                  src={ p.picture_url }
                />
              </HoverEffectCard>
            </Grid>
          )
        }
      }
    )
  }

  render() {
    return (
      <Paper variant='outlined'>
        <h3>Télécharger</h3>
        <Divider />
        <Grid container>
          {this.renderProducts()}
        </Grid>
      </Paper>
    )
  }
}

export default ProductList;
