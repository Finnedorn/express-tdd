// createSlug dovrebbe ritornare una stringa
// createSlug dovrebbe ritornare una stringa in lowercase
// createSlug dovrebbe ritornare una stringa con gli spazi sostituiti da -
// createSlug dovrebbe incrementare di 1 lo slug quando esiste già
// createSlug dovrebbe lanciare un errore in caso di titolo non presente o formato errato
// createSlug dovrebbe lanciare un errore se manca l'array dei post

const { test, expect } = require('@jest/globals');
const posts = ["test-test","test-test-0"]

// createSlug dovrebbe ritornare una stringa
test('createSlug dovrebbe ritornare una stringa', () => {
    function createSlug(title) {
        if (typeof title !== 'string') {
            return title.toString();
        }
        return title;
    }
    expect(typeof createSlug('test')).toBe('string');
    expect(typeof createSlug(123)).toBe('string');
    expect(typeof createSlug({ key: 'test' })).toBe('string');
    expect(typeof createSlug(0)).toBe('string');
});


// // createSlug dovrebbe ritornare una stringa in lowercase
test('createSlug dovrebbe ritornare una stringa in lowercase', () => {
    function createSlug(title) {
        if (typeof title !== 'string') {
            return title.toString();
        }
        return title.toLowerCase();
    }
    expect(createSlug('TEST')).toBe('test');
})


// createSlug dovrebbe ritornare una stringa con gli spazi sostituiti da -
test('createSlug dovrebbe ritornare una stringa con gli spazi sostituiti da -', () => {
    function createSlug(title) {
        if (typeof title !== 'string') {
            return title.toString();
        }
        return title.split(' ').join('-');
    }
    expect(createSlug('test test')).toBe('test-test');
})


// createSlug dovrebbe incrementare di 1 lo slug quando esiste già
test('createSlug dovrebbe incrementare di 1 lo slug quando esiste già', ()=>{
    function createSlug(array, title) {
        if (typeof title !== 'string') {
            title = title.toString();
        }

        let baseSlug = title.split(' ').join('-');
        let titleToSlug = baseSlug;

        let counter = 0;

        while (array.includes(titleToSlug)) {
            counter++;
            titleToSlug = `${baseSlug}-${counter}`;
        }

        return titleToSlug;
    }

    expect(createSlug(posts, 'test test')).toBe('test-test-1');
})

// createSlug dovrebbe lanciare un errore in caso di titolo non presente o formato errato
test('createSlug dovrebbe lanciare un errore in caso di titolo non presente o formato errato', () => {
    
    function createSlug(array, title) {

        if (!title || typeof title !== 'string') {
            throw new Error('Titolo non presente o formato errato');
        }

        let baseSlug = title.split(' ').join('-');
        let titleToSlug = baseSlug;

        let counter = 0;

        while (array.includes(titleToSlug)) {
            counter++;
            titleToSlug = `${baseSlug}-${counter}`;
        }

        return titleToSlug;
    }
    expect(()=> createSlug(posts, 0)).toThrow();
    expect(()=> createSlug(posts,null)).toThrow();
    expect(()=> createSlug(posts,false)).toThrow();
    expect(()=> createSlug(posts,undefined)).toThrow();
});


// createSlug dovrebbe lanciare un errore se manca l'array dei post
test('createSlug dovrebbe lanciare un errore se manca l array dei post', () => {
    
    function createSlug(array, title) {

        if (!title || typeof title !== 'string') {
            throw new Error('Titolo non presente o formato errato');
        }

        if (!array || !Array.isArray(array)) {
            throw new Error('Array non presente o formato errato');
        }

        let baseSlug = title.split(' ').join('-');
        let titleToSlug = baseSlug;

        let counter = 0;

        while (array.includes(titleToSlug)) {
            counter++;
            titleToSlug = `${baseSlug}-${counter}`;
        }

        return titleToSlug;
    }
    expect(()=> createSlug(0,0)).toThrow();
    expect(()=> createSlug(null,'test test')).toThrow();
    expect(()=> createSlug(false,'test test')).toThrow();
    expect(()=> createSlug(undefined,'test test')).toThrow();
});


