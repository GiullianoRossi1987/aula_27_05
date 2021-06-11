import { StatusBar } from 'expo-status-bar';
import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
// import Pessoa from "./components/Pessoa.js";
import Api_Pessoa from "./components/Api_Pessoa";



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
      alignItems: "center",
      justifyContent: "center",
      fontSize: 40,
  },
  input_d: {
      alignItems: "flex-start",
      justifyContent: "left",
      borderColor: "#11a9f5",
      borderWidth: 2,
      padding: 10
  },
  controls: {
      flex: 1,
      flexWrap: "wrap",
      flexDirection: "row",
      alignItems: "flex-start"
  },
  opts:{
      marginLeft: 20,
      padding: 10,
      marginRight: 20
  }
});

class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: "",
            curso: "",
            id: ''
        };
        this.carregar = this.carregar.bind(this);
        this.cadastro = this.cadastro.bind(this);
        this.alterar = this.alterar.bind(this);
        this.deletar = this.deletar.bind(this);
    }

    async carregar(){
        const response = await Api_Pessoa.get(`exemplo_api/pessoa/${this.state.id}`);
        this.setState({
            nome: response.data.nome,
            curso: response.data.curso,
            id: response.data.id
        });
        console.warn(this.state)
    }

    cadastro(){
        let bodyFormData = new FormData();
        bodyFormData.append("nome", `${this.state.nome}`);
        bodyFormData.append("curso", `${this.state.curso}`);

        Api_Pessoa({
            method: "post",
            url: "exemplo_api/pessoa",
            data: bodyFormData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(
            function(response){console.log(response);}
        ).catch(function(response){console.error(response);});
    }

    async alterar(){
        const response = await ApiPessoa.put(`exemplo_api/pessoa/${this.state.id}`,
        {nome: `${this.state.nome}`, curso: `${this.state.curso}`});
    }

    deletar(){
        api.delete(`exemplo_api/pessoa/${this.state.id}`);
    }

    render(){
        return (
          <View style={styles.container}>
            <Text h1 style={styles.titulo}>Api de pessoas</Text>
            <br/>
            <TextInput style={styles.input_d} label="Id" placeholder="ID" keyboardType="numeric"
            onChangeText={(text) => this.setState({id: text})} value={this.state.id}/>
            <br/>
            <TextInput style={styles.input_d} label="Id" placeholder="Nome"
            onChangeText={(text) => this.setState({nome:text})} value={this.state.nome}/>
            <br/>
            <TextInput style={styles.input_d} label="Id" placeholder="Curso"
            onChangeText={(text) => this.setState({curso: text})} value={this.state.curso}/>
            <br/>
            <View style={styles.controls}>
                <Button title="Adicionar" style={styles.opts} onPress={this.cadastro}/>
                <Button title="Deletar" style={styles.opts} onPress={this.deletar}/>
                <Button title="Alterar" style={styles.opts} onPress={this.alterar}/>
                <Button title="Pesquisar" style={styles.opts} onPress={this.carregar}/>
            </View>
            <StatusBar style="auto" />
          </View>
        );
    }
}

export default App;
