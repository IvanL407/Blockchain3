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
            
            //
            
        }
    }
}

let btCoin = new Blockchain();
btCoin.addBlock(new Block(1, "1/2/2022", {name:"TM", amount:4}));
btCoin.addBlock(new Block(2, "2/2/2022", {name:"TMI",amount:4}));
console.log(JSON.stringify(btCoin, null, 4));