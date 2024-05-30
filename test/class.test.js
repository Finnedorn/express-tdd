// Bonus

// Creiamo una classe Model la quale dovrà superare i seguenti test:
// Model dovrebbe essere una classe (crea un'istanza della classe Model)
// L'istanza di model dovrebbe richiedere il nome del file json da usare in fase di creazione dell'istanza
// L'istanza di model dovrebbe avere il metodo read
// L'istanza di model dovrebbe avere il metodo add
// read dovrebbe ritornare un array
// add dovrebbe aggiungere un elemento all’array dei dati e ritornare tutta la lista

const fs = require("fs");
const path = require("path");
const { test, expect } = require('@jest/globals');

class Model {

    constructor(jsonFile) {
        this.filePath = path.join(__dirname, jsonFile);
        this.data = this.read();
    }

    read(){
        const jsonContent = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(jsonContent, null, 2);
    }
    add(newElement){
        this.data = [];
        this.data = this.read();
        this.data.push(newElement);
        return this.data;        
    }
}

test('Model dovrebbe essere una classe (crea un istanza della classe Model)', () => {
    const test = new Model();
    expect(test).toBeInstanceOf(Model);
});

test('L\'istanza di model dovrebbe richiedere il nome del file json da usare in fase di creazione dell\'istanza', () => {
    const test = new Model();
    expect(Model).toThrow();
});

test('L\'istanza di model dovrebbe avere il metodo read', () => {
    const test = new Model('../db/users.json');
    expect(test).toHaveProperty('read');
});

test('L\'istanza di model dovrebbe avere il metodo add', () => {
    const test = new Model('../db/users.json');
    expect(test).toHaveProperty('add');
});

test('read dovrebbe ritornare un array', () =>{
    const test = new Model('../db/users.json');
    const myArr = test.read('../db/users.json');
    expect(Array.isArray(myArr)).toBe(true);           
});

test('add dovrebbe aggiungere un elemento all’array dei dati e ritornare tutta la lista', () =>{
    const test = new Model('../db/users.json');
    test.add(
        {
            "username": "Daniele",
            "password": "password123",
            "role": "admin"
        }
    );
    expect(test.data).toHaveLength(6);           
});