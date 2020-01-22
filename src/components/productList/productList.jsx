import React, { Component } from 'react';
import Paper from '../uiElements/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import HoverEffectCard from '../uiElements/HoverEffectCard';
import Card from '../uiElements/Card';
import YpsomedModal from '../ypsomedModal/ypsomedModalContainer';

import './productList.style.css';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showYpsomedModal: false
    };
    this.handleSelectProduct = this.handleSelectProduct.bind(this);
    this.handleShowYpsomedModal = this.handleShowYpsomedModal.bind(this);
    this.handleCloseYpsomedModal = this.handleCloseYpsomedModal.bind(this);
  }

  componentDidMount() {
    this.props.requestProductList();
  }

  handleSelectProduct(id) {
    this.props.history.push(`/dashboard/${id}`);
  }

  handleShowYpsomedModal() {
    this.setState({ showYpsomedModal: true });
  }

  handleCloseYpsomedModal() {
    this.setState({ showYpsomedModal: false });
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
                      if (p.id === 97) {
                        this.handleShowYpsomedModal();
                      } else {
                        this.handleSelectProduct(p.id);
                      }
                    }
                  }
                }
                className={ p.disabled ? 'disabled-card' : '' }
              >
                <img
                  className='brand-img'
                  alt={ p.brand.name }
                  src={ p.brand.picture_url }
                />
                <img
                  className='product-img'
                  alt={ p.name }
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
        <YpsomedModal
          showModal={ this.state.showYpsomedModal }
          handleCloseModal={ this.handleCloseYpsomedModal }
        />
      </Paper>
    )
  }
}

export default ProductList;
