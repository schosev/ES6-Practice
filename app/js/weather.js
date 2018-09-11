export class Weather {
  static fetchData(url) {
    return new Promise((resolve, reject) => {
      //javascript built in ajax request
      const WEATHER = new XMLHttpRequest();  
      //opens the request as a GET method
      WEATHER.open('GET', url);
      //looks for any changes
      WEATHER.onreadystatechange = function() {
        if (WEATHER.readyState == XMLHttpRequest.DONE && WEATHER.status == 200) {
          const RESPONSE_DATA = JSON.parse(WEATHER.responseText);
          //calls resolve function and passes response
          resolve(RESPONSE_DATA);
        } else if (WEATHER.readyState == XMLHttpRequest.DONE) {
          reject("API received an error");
        }
      };
      //this will send the request
      WEATHER.send();
    });
  }
}