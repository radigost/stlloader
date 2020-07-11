import axios from "axios";
import initSqlJs from "sql.js";

const getOAS = async () => {
    const res = await axios.get('http://localhost:3005/test2.oas', {
        responseType: 'arraybuffer',
        headers: {
            'Accept': '*/*'
        }
    })
    return res.data
}

const generateDbFromDefaultOAS = async () => {
    const SQL = await initSqlJs(
        {
            locateFile: filename => `/static/js/${filename}`
        })
    const data = await getOAS();
    const uInt8Array = new Uint8Array(data);

    const database = new SQL.Database(uInt8Array);
    return database
}

export {generateDbFromDefaultOAS}
