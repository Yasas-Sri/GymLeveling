import {api} from './index.js'

const BASE_URL = 'http://192.168.8.125:3000'

export const saveSchedule = async ({ timeText, newEvent,selected }) => {
    try {
        const url = `${BASE_URL}/api/dataRN`;
        const response = await api.post(url, { timeText, newEvent, newEvent,selected });
        // const data = await response.json();
        // setResponseMessage(data.message || 'Data received successfully!');
    }catch (error) {
        // setResponseMessage('Error: ' + error.message);
        console.log(error)
      }
}


export const getSchedule = async () => {
    try {
        const url = `${BASE_URL}/api/dataRN`;
        const response = await api.get(url);
        
        console.log(response)
         
        // setResponseMessage(data.message || 'Data received successfully!');
    }catch (error) {
        // setResponseMessage('Error: ' + error.message);
        console.log(error)
      }
}

export const deleteSchedule = async ({date}) => {
    try {
        const url = `${BASE_URL}/api/dataRN`;
        const response = await api.delete(url,{date});
        
        console.log(response)
         
        // setResponseMessage(data.message || 'Data received successfully!');
    }catch (error) {
        // setResponseMessage('Error: ' + error.message);
        console.log(error)
      }
}