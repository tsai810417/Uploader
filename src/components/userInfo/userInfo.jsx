import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '../uiElements/Paper';
import Avatar from '../uiElements/Avatar';
import './userInfo.style.css';

class UserInfo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestUserInfo(this.props.token);
  }

  render() {
    const {
      id,
      firstname,
      lastname,
      maiden_name,
      email,
      url_picture,
      diabete_type,
      diabete_type_color,
      address1,
      address2,
      zip,
      city,
      country,
      nirpp
    } = this.props.user;
    return (
      <Paper elevation={ 3 } variant='outlined'>
        <Grid container justify="space-around" alignItems="center" spacing={ 2 }>
          <Grid item xs={ 12 } sm={ 12 } md={ 2 } id='avatar-and-email'>
            <Avatar alt="user-pic" src={ url_picture } />
            <a href={`mailto:${email}`}>{ email }</a>
          </Grid>
          <Grid item xs={ 12 } sm={ 5 } md={ 4 }>
            <p>
              <strong>Prénom : </strong>
              { firstname }
            </p>
            <p>
              <strong>Nom : </strong>
              { lastname }
            </p>
            <p>
              <strong>Nom de jeune fille : </strong>
              { maiden_name }
            </p>
            <p>
              <strong>Type de diabète : </strong>
              { diabete_type }
            </p>
            <p>
              <strong>Numéro de sécurité sociale : </strong>
              { nirpp }
            </p>
          </Grid>
          <Grid item xs={ 12 } sm={ 5 } md={ 4 }>
            <p>
            <strong>Adresse du patient ligne 1 : </strong>
            { address1 }
            </p>
            <p>
            <strong>Adresse du patient ligne 2 : </strong>
            { address2 }
            </p>
            <p>
            <strong>Code postal : </strong>
            { zip }
            </p>
            <p>
            <strong>Ville : </strong>
            { city }
            </p>
            <p>
            <strong>Pays : </strong>
            { country }
            </p>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default UserInfo;
