import env from '../environment'

let w: any = typeof window === 'undefined' ? undefined : window

export const pageview = (url: string) => {
  w?.gtag && w?.gtag('config', env.GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value, ...others }: Record<string, any>) => {
  w?.gtag && w?.gtag('event', action, {
    ...others,
    event_category: category,
    event_label: label,
    value: value,
  })
}
