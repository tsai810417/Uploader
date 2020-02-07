const productDetails = {
  96: {
    id: 96,
    name: 'OmniPod',
    product_picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/products/OmniPod_OmniPod.png',
    brand_picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/brands/OmniPod.png',
    ios: {
      note: 'Note : La pompe Omnipod fonctionne comme une clef USB',
      steps: [
        'Connectez l’Omnipod au PC, grâce au cable.',
        'Cliquez et ouvrez le lecteur USB : exemple : « NO NAME » ',
        'Faites glisser le fichier trouvé ci-dessous. Il s’agit d’un format .ibf',
        'Vous pouvez consulter les données sur votre application DIABNEXT.'
      ]
    },
    android: {
      note: null,
      steps: [
        'Connectez-vous à l’app DIABNEXT',
        'Connectez l’Omnipod à votre smartphone, grâce au cable.',
        'Veuillez confirmer qu’il s’agit bien de la pompe Omnipod.',
        'Attendez que la barre de chargement soit complétée.',
        'Vous pouvez consulter les données sur votre app DIABNEXT',
      ]
    }
  }
};

export const requestProductDetail = id => {
  if (productDetails[id]) {
    return productDetails[id];
  } else {
    return null;
  }
};
