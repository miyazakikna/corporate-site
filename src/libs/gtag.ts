import TagManager from 'react-gtm-module';

const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || ''

export const initGTM = () => {
  // ルートGTMの初期化（本番のみ）
  if (GTM_ID) {
    TagManager.initialize({ gtmId: GTM_ID })
  }
}

export const clickEvent = (dataGtmClick: string) => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'clickEvent',
      dataGtmClick: dataGtmClick
    }
  })
}