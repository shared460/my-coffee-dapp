
//returns the ether balance of given address
async function getBalance(address){
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    //provider is the which network we are using like sepolia
    //they have remove the utils library
    return hre.ethers.formatEther(balanceBigInt);
    //it convert the wei into ethers
}

//log the ether balances for a list of addresses
async function printBalancees(addresses){
    let idx = 0;
    for(const address of addresses){
        console.log(`address ${idx} balance : `, await getBalance(address));
        idx++;
    }
}

//logs the memos  stored on-chain from coffee purchase
async function Memos(memos){
    for(const memo of memos){
        const timestamp = memo.timestamp;
        const name = memo.name;
        const message = memo.message;
        const tipperAddress = memo.from;
        console.log(`At ${timestamp}, ${name} from ${tipperAddress} said : ${message}`);
    }
}


//this is the main function
async function main(){
    //get example accounts
    //here deployer is owner, getSigners takes the address and other info
    const [deployer, tipper1, tipper2, tipper3] = await hre.ethers.getSigners();

    //deploy contract
    const coffeeContract = await hre.ethers.getContractFactory('buyMeCoffee');
    const coffContract = await coffeeContract.deploy();
    await coffContract.target;
    console.log('address of deployed contract is : ',coffContract.target);

    //check the balances before the coffee purchase
    const addresses = [deployer.address, tipper1.address, tipper2.address, tipper3.address, coffContract.target];
    console.log("---start----");
    await printBalancees(addresses);
    console.log("----end-----");

    //buy the owner a few coffess
    //this is the amount is transfered
    const tip = {value: hre.ethers.parseEther('1')};
    await coffContract.buyCoffee("deployer", "I am deployer or owner", tip);
    await coffContract.connect(tipper1).buyCoffee("tipper1", "I am tipper1", tip);
    await coffContract.connect(tipper2).buyCoffee("tipper1", "I am tipper2", tip);
    await coffContract.connect(tipper3).buyCoffee("tipper1", "I am tipper3", tip);


    //check the balance after coffee purchases
    console.log("---start----");
    await printBalancees(addresses);
    console.log("----end-----");

    //withdrwan the funds
    await coffContract.connect(deployer).withDrawnTips();
    
    //checkbalance after withdrw
    console.log("---start----");
    await printBalancees(addresses);
    console.log("----end-----");

    //read all the memos from the memos
    console.log("---memos----");
    const memosList = await coffContract.getMemos();
    await Memos(memosList);
}

main().then(()=>{
    process.exit(0);
}).catch((error)=>{
    console.error(error);
    process.exit(1);
})