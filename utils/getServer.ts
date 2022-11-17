export default () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://192.168.0.231:3000'
  } else {
    return process.env.SITE_URL
  }
}
