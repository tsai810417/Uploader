const productList = [
  {
    id: 96,
    name: 'OmniPod',
    picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/products/OmniPod_OmniPod.png',
    disabled: false,
    brand: {
      name: 'OmniPod',
      picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/brands/OmniPod.png'
    }
  },
  {
    id: 97,
    name: 'YpsoPump',
    picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/products/Ypsomed_YpsoPump.png',
    disabled: false,
    brand: {
      name: 'Ypsomed',
      picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/brands/Ypsomed.png'
    }
  },
  {
    id: 93,
    name: 'Paradigm Veo',
    picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/products/Medtronic_ParadigmVeo.png',
    disabled: true,
    brand: {
      name: 'Medtronic',
      picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/brands/Medtronic.png'
    }
  },
  {
    id: 94,
    name: 'MiniMed 640G',
    picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/products/Medtronic_MiniMed640G.png',
    disabled: true,
    brand: {
      name: 'Medtronic',
      picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/brands/Medtronic.png'
    }
  },
  {
    id: 95,
    name: 'MiniMed 670G',
    picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/products/Medtronic_MiniMed670G.png',
    disabled: true,
    brand: {
      name: 'Medtronic',
      picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/brands/Medtronic.png'
    }
  },
  {
    id: 98,
    name: 'Accu-Chek Insight',
    picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/products/Roche_ACCU-CHEK_Insight.png',
    disabled: true,
    brand: {
      name: 'Roche',
      picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/brands/Roche.png'
    }
  },
  {
    id: 99,
    name: 'Kaleido',
    picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/products/Kaleido_Kaleido.png',
    disabled: true,
    brand: {
      name: 'Kaleido',
      picture_url: 'https://diabnext-app.s3.amazonaws.com/pictures/brands/Kaleido.png'
    }
  },
]

export const requestProductList = () => productList;
