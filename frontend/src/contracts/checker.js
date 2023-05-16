// const Web3 = require('web3');
// const fs=require('fs-extra');
// const contractAbi=fs.readFileSync('./coffee_sol_CoffeeShop.abi','utf8');
// const contractBytecode = fs.readFileSync('./coffee_sol_CoffeeShop.bin','utf8');

// const provider= new ethers.providers.JsonRpcBatchProvider('http://127.0.0.1:7545');
// const wallet=new ethers.Wallet('64e8d837de933c5fb32cf4f134d334672550f9cc9602c31bfec80c7ee9a9d99a',provider)
// const abi=fs.readFileSync('./SimpleStorage_sol_SimpleContract.abi','utf8');
// const binary=fs.readFileSync('./SimpleStorage_sol_SimpleContract.bin','utf8');
// const contractFactory=new ethers.ContractFactory (abi,binary,wallet);
// console.log(`Deploying contract`);
// const contract= await contractFactory.deploy({gasPrice:1000000});
// // console.log(contract.deployTransaction);


// const confirm=await contract.deployTransaction.wait(1);
// // console.log("this is the transaction receipt");
// // console.log(confirm);


// hi()
// .then(() => process.exit(0))
// .catch((error) => {
// console.log(error);
// process.exit(1);
// });
