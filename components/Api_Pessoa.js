import axios from 'axios';

const Api_Pessoa = axios.create({
    baseURL: "https://www.jussimarleal.com.br/",
    proxy: "https://www.jussimarleal.com.br/"
});

export default Api_Pessoa;
