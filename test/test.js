const { Signer } = require("@ethersproject/abstract-signer");
const { expect, should } = require("chai");


function waitforme(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}

describe("Lottery contract", function () {

    let owner;
    let addr1;
    let timeLength;
    let block;
    let hardhatLottery;
    
    beforeEach(async function() {

        Lottery = await ethers.getContractFactory("Lottery");
        [owner, addr1] = await ethers.getSigners();
        timeLength = 1;
        block = await ethers.provider.getBlock();
        hardhatLottery = await Lottery.deploy(timeLength);
        overrides = { value: ethers.utils.parseEther("1.0")};
        /*for (let i = 0; i < 5; i++) {
            await hardhatLottery.buyTicket(overrides);
        }*/

    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await hardhatLottery.owner()).to.equal(owner.address);
        });

        it("Should set the right expiration time", async function () {
            expect(await hardhatLottery.expiration()).to.equal(block.timestamp + timeLength+1);
        });
    });
 
    describe("Buy a ticket", function () {

        it("Should increase the number of tickets", async function () {
            const ticketsBefore = await hardhatLottery.numberOfTickets();
            await hardhatLottery.buyTicket(overrides);
            expect(await hardhatLottery.numberOfTickets()).to.equal(ticketsBefore + 1);
        });

        it("Should assign a new ticket to the message sender", async function () {
            const ownedTickets = await hardhatLottery.ownerTicketsCount(owner.address);
            await hardhatLottery.buyTicket(overrides);
            expect(await hardhatLottery.ownerTicketsCount(owner.address)).to.equal(ownedTickets + 1);
        });

        it("should increase the total prize by 1 ether", async function () {
            const prizeBefore = await hardhatLottery.totalPrize();
            await hardhatLottery.buyTicket(overrides);
            expect(await hardhatLottery.totalPrize()).to.equal(prizeBefore + ethers.utils.parseEther("1.0"));
        });

    });

    describe("End lottery", function () {

        it("Should choose a winner", async function () {
            await hardhatLottery.buyTicket(overrides);
            await waitforme(timeLength * 1000);
            await hardhatLottery.lotteryEnd();
            const winner = await hardhatLottery.winner();
            expect(ethers.utils.isAddress(winner)).to.equal(true);
        })

    })
});