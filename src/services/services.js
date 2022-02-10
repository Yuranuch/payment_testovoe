export const getOperators = () => {
  return new Promise(r =>
    setTimeout(
      () =>
        r([
          {
            id: 1,
            name: 'MTS',
            url: 'https://papik.pro/uploads/posts/2021-11/thumbs/1636090259_61-papik-pro-p-mts-logotip-foto-65.jpg',
          },
          {
            id: 2,
            name: 'Beeline',
            url: 'https://papik.pro/uploads/posts/2021-11/thumbs/1636097932_46-papik-pro-p-bilain-logotip-foto-47.jpg',
          },
          {
            id: 3,
            name: 'Megafon',
            url: 'https://rb7.ru/system/images/image_links/354385/page_medium_new_logo_MegaFon.jpg',
          },
        ]),
      1000
    )
  )
}

export const getOperator = id => {
  return new Promise(r =>
    setTimeout(
      () =>
        r(
          [
            {
              id: 1,
              name: 'MTS',
              url: 'https://papik.pro/uploads/posts/2021-11/thumbs/1636090259_61-papik-pro-p-mts-logotip-foto-65.jpg',
              slogan: '"Be better every day"',
            },
            {
              id: 2,
              name: 'Beeline',
              url: 'https://papik.pro/uploads/posts/2021-11/thumbs/1636097932_46-papik-pro-p-bilain-logotip-foto-47.jpg',
              slogan: '"By your side"',
            },
            {
              id: 3,
              name: 'Megafon',
              url: 'https://rb7.ru/system/images/image_links/354385/page_medium_new_logo_MegaFon.jpg',
              slogan: '"Megaphone starts with you"',
            },
          ].filter(({ id: operatorId }) => operatorId === id)
        ),
      1000
    )
  )
}

export const onSubmit = () => {
  return new Promise(r => setTimeout(() => r(Math.random() < 0.5), 1000))
}
