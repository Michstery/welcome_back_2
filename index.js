const fs = require('fs');
const superagent = require('superagent');
const promise = require('promise');

// =============== building Promises ===================
const readFilePro = file => {
    return new promise((resolve, rejected) => {
        fs.readFile(file, (err, data) => {
            if (err) rejected('Could not locate your file');
            resolve(data);
        })
    })
}
const writeFilePro = (file, data) => {
    return new promise((resolve, rejected) => {
       fs.writeFile(file, data, err => {
        if (err) rejected(err.message);
        resolve('file entered successfully')
       })
    }) 
}



// =============== using the new built promise ===================
// ============ example (1.) ===============
// readFilePro(`${__dirname}/dog.txt`).then(data => {
//     console.log(`Breed : ${data}`);
//         superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(res => {
//         console.log(res.body.message);
        
//         fs.writeFile('dog-img.txt', res.body.message, err => {
//             if (err) return console.log(err.message);
//             console.log('Random dog image saved to file !!');
//         })
//     }).catch(err => {
//         console.log(err.message);
//     });
// })

// ========== example (2.) ===========
// readFilePro(`${__dirname}/dog.txt`).then(data => {
//     console.log(`Breed : ${data}`);
//        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
// }).then(res => {
//         console.log(res.body.message);
        
//      return writeFilePro('dog-img.txt', res.body.message);
//     }).then(() => {
//         console.log('Random dog image saved to file');
//     }).catch(err => {
//         console.log(err);
//     });


// =============== example (3. ) using asyncAwait ==============
// step 1 : create Async function
const getDogPic = async () => {
// step 2 : create try block
try{
    // step 3 : create await promise function
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
// repeat step 3 await get-response function
    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body.message);
//repeat step 3 dazall
    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file !!')
// step 4 : catch block for err
} catch (err){
    console.log(err)
}
}
//step (5 .) : call the async promise
getDogPic();

// ======================= 5_lesson 6 ==================
(()=>{
try{
    console.log('1: first line statement');
    // second line statement
    const x = await getDogPic();
    console.log(x);
    console.log('3: third line statement after dog name in second statement');
}catch(err){
    console.log('ERROR!!!!!')
}
})()

// ========================= 5_lesson 7 ======================
// step 1 : create Async function
const getDogPic = async () => {
    // step 2 : create try block
    try{
        // step 3 : create await promise function
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
    // repeat step 3 await get-response function from 3 calls saved to an array
        const res1pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const all = await Promise.all([res1pro, res2pro, res3pro]);
    // map through the array calls
        const imgs = all.map(el => el.body.message);
    // console.log the results
        console.log(imgs)
    //repeat step 3 dazall
        await writeFilePro('dog-img.txt', res.body.message);
        console.log('Random dog image saved to file !!')
    // step 4 : catch block for err
    } catch (err){
        console.log(err)
    }
    }
    //step (5 .) : call the async promise
    getDogPic();



// ======================================================================================
// fs.readFile(`${__dirname}/dog.txt`, (err, data)=>{
//     console.log(`Breed : ${data}`);

    // ----------------- callback Hell -----------------

    // superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
    //     console.log(res.body.message);

    //     fs.writeFile('dog-img.txt', res.body.message, err => {
    //         if (err) return console.log(err.message);
    //         console.log('Random dog image saved to file !!');
    //     })
    // })


    // --------------------- Using Promises ---------------------------

//         superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(res => {
//         console.log(res.body.message);
        
//         fs.writeFile('dog-img.txt', res.body.message, err => {
//             if (err) return console.log(err.message);
//             console.log('Random dog image saved to file !!');
//         })
//     }).catch(err => {
//         console.log(err.message);
//     });

// })