async function main(){
  //get the contract and deployed on ethereum address test one.
  const [deployer] = await hre.ethers.getSigners();
  const buyMeCoffee = await hre.ethers.getContractFactory('buyMeCoffee');
  const contract = await buyMeCoffee.deploy();
  
  await contract.target;
  console.log('address of deployed target : ',contract.target);
  console.log('adress of the deployer : ',deployer.address);
}

main().then(()=>{
  process.exit(0);
}).catch((error)=>{
  console.error(error);
  process.exit(1);
})

//adress of the contract -> 0xd580442b44B08F39AEF96d52E4a984f4Ee84894B
//address of the deployer -> 0xAe5486C5d4F710ded1Be53E2D6085901507f4A5D