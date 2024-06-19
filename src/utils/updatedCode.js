const axios = require('axios');

class WhatsappService {
    constructor(){
        this.accessToken = process.env.WHATSAPP_TOKEN
        this.url = process.env.WHATSAPP_URL
    }

    checkValidPhoneNumber = (phoneNumber) => {
     
      const phoneNumberRegex = /^(?:\+91|91)?\d{10}$/;
  
      // Check if phoneNumber is not null, undefined, or empty and matches the regex
      if (phoneNumber && phoneNumberRegex.test(phoneNumber)) {
          if ((phoneNumber.startsWith("+91") && phoneNumber.length === 13) || 
              (phoneNumber.startsWith("91") && phoneNumber.length === 12) ||
              (!phoneNumber.startsWith("+91") && !phoneNumber.startsWith("91") && phoneNumber.length === 10)) {
              return true; // Valid phoneNumber
          }
      }
      return false; // Invalid phoneNumber
  }
  
  // updated
  sendWhatsappMessageTemplate = (phoneNumber, templateName, category, languageCode, templateParameters) => {
    return new Promise((resolve, reject) => {
      const data = {
        "messaging_product": "whatsapp",
        "to": phoneNumber,
        "type": "template",
        "category": category,
        "template": {
          "name": templateName,
          "language": {
            "code": languageCode
          },
          "components": [
            {
              "type": "header",
              "parameters": [
                {
                  "type": "image",
                  "image": {
                    "link": "https://via.placeholder.com/400"
                  }
                },
                // {
                //   "type" : 'body',
                //   "parameters": templateParameters 
                // }
              ]
            }
          ]
        }
      };
      axios.post(this.url, data, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        console.log('Response:', response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
        reject(error);
      });
    });
  };
  // updated
      sendMultipleWhatsappMessages = (data) => {
        return new Promise(async (resolve, reject) => {
          try {
            const {phoneList,templateParameters,templateName, category, languageCode} = data
           
            const uniquePhoneList = [...new Set(phoneList)];
            const whatsappMessagePromiseArr = []
            for (let phoneNumberIndex = 0; phoneNumberIndex < uniquePhoneList.length; phoneNumberIndex++) {
              if(this.checkValidPhoneNumber(uniquePhoneList[phoneNumberIndex])){
                whatsappMessagePromiseArr.push(await this.sendWhatsappMessageTemplate(uniquePhoneList[phoneNumberIndex], templateName, category, languageCode, templateParameters));
                console.log("valid")
              } else{
                console.error("Invalid phone number")
              }
            }
            Promise.allSettled(whatsappMessagePromiseArr).then((result) => {
              console.log("🚀 ~ WhatsappService ~ Promise.allSettled ~ result:", result)
              resolve(true)
            }).catch((error) => {
              reject(error)
            })
          } catch (error) {
            reject(error)
          }
        })
      }






















  sendWhatsappMessageTemplate = (phoneNumber, templateName, templateParameters) => {
    return new Promise((resolve, reject) => {
      const data = {
        "messaging_product": "whatsapp",
        "to": phoneNumber,
        "type": "template",
        "template": {
          "name": templateName,
          "language": {
            "code": "en_US" 
          },
          // "components": [
          //   {
          //     "type": "body",
          //     "parameters": templateParameters 
          //   }
          // ]
        }
      };
  
      axios.post(this.url, data, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        console.log('Response:', response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
        reject(error);
      });
    });
  };
  
  
      sendMultipleWhatsappMessages = (data) => {
        return new Promise(async (resolve, reject) => {
          try {
            const {phoneList,templateParameters,templateName} = data
           
            const uniquePhoneList = [...new Set(phoneList)];
            const whatsappMessagePromiseArr = []
            for (let phoneNumberIndex = 0; phoneNumberIndex < uniquePhoneList.length; phoneNumberIndex++) {
              if(this.checkValidPhoneNumber(uniquePhoneList[phoneNumberIndex])){
                whatsappMessagePromiseArr.push(await this.sendWhatsappMessageTemplate(uniquePhoneList[phoneNumberIndex], templateName,templateParameters));
                console.log("valid")
              } else{
                console.error("Invalid phone number")
              }
            }
            Promise.allSettled(whatsappMessagePromiseArr).then((result) => {
          
              resolve(true)
            }).catch((error) => {
              reject(error)
            })
          } catch (error) {
            reject(error)
          }
        })
      }
}

module.exports = WhatsappService;
