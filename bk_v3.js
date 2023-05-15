const  SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash=""){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
    }

    calculateHash()
    {
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(0, "03/01/2009", "Genesis Block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
        }
        addBlock(newBlock){
            newBlock.previousHash=this.getLatestBlock().hash;
            newBlock.hash = newBlock.calculateHash();
            this.chain.push(newBlock);
        } 
    isChainValid(){
        for(let i = 1; i<this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock= this.chain[i-1];
            
            if (currentBlock.hash != (currentBlock.calculateHash()))
            {
                return false;
            }
            else if (currentBlock.previousHash != prevBlock.previousHash)
            {
                return false;
            }
            return true;
        }
    }
}

let btCoin = new Blockchain();
btCoin.addBlock(new Block(1, "1/2/2022", {name:"TM", amount:4}));
btCoin.addBlock(new Block(2, "2/2/2022", {name:"TMI",amount:4}));
console.log(JSON.stringify(btCoin, null, 4));

console.log("Is the chain valid?" + btCoin.isChainValid()); //returns false
btCoin.chain[1].data = {amount: 100};
console.log("Is the chain valid?" + btCoin.isChainValid()); //returns false

btCoin.Chain[1].hash = btCoin.chain[1].calculateHash(); //returns an error

console.log("Is the chain valid?" + btCoin.isChainValid());

//We attempted to test the hashes of different blocks. We got to see if they matched or not., and they did not.
//The code creates different hashes for each block, allowing them to be more unique in identity.
//What happens if the hashes are the same?
