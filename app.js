const axios = require("axios");
const Twitter = require('twitter'); 
const config = require('./config.js'); 

// passing configuration details to new T class 
const T = new Twitter(config); 
const url = "https://api.stackexchange.com/2.2/questions?page=1&pagesize=1&order=desc&sort=hot&tagged=r%3Bdata.table&site=stackoverflow"

const getData = async url => {
    try {
      const response = await axios.get(url);
      //console.log(response.data.items[0].link)
      const status = response.data.items[0].link;
      console.log(status)
      return status
    } catch (err) {
      console.log(err)
    }
};

getData(url)
 .then(status => T.post('statuses/update', {status:status}))
 .then(tweet => console.log("tweet successfully sent", tweet.text))
 .catch(err => console.log(err))

// .catch(err => console.log('Error', err.message));
//then(status => T.post('statuses/update', {status :"trying this"}))

// create event emitter for fetching question every 10 hours 