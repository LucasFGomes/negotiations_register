export default class DateHelper {

  static convertTextToDate(text) {
    return new Date(...text.split('-').map((item, i) => item - i % 2))
  }

  static convertDateToText = (date) => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

}