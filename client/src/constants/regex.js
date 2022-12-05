// const  kFirstNameRegex = /^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-\/.]+$/
const  kFirstNameRegex = /^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-]+$/
const kEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const kUsernameRegex = /^[a-zA-Z0-9._]+$/

export { kFirstNameRegex, kEmailRegex, kUsernameRegex }