// const { ethers } = require("hardhat")

describe("OpenField", function () {
    it("Should create and execute openField contract", async function () {

        const OpenField = await ethers.getContractFactory("OpenField")
        // console.log(OpenField)
        const openField = await OpenField.deploy()
        // await openField.deployed()

        await openField.addPesticide(
            1,
            100,
            "ABCD",
            "B001",
            "16/12/2002",
            "7/03/2003"
        )
        await openField.addPesticide(
            1,
            100,
            "cd",
            "B001",
            "16/12/2002",
            "7/03/2003"
        )
        await openField.addPesticide(
            5,
            100,
            "ABCD",
            "B001",
            "16/12/2002",
            "7/03/2003"
        )


        items = await openField.getProcudersPesticides(1);

        console.log('items: ', items)

    })
})