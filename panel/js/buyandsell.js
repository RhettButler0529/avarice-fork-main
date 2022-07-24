let currentTargetStakeId

function userAccConnected() {
    getMyStakes()
    getSellRequests()
    mainContract.methods.soldStakeFunds(user.address).call({shouldPollResponse: true}).then(res => {
        $('.tmn-12')[0].innerHTML = `You have - ${parseInt(res) / 1e18} BNB - collectable from your sold stakes! click to collect.`
    })
}

function refreshMyStakes() {
    $('.stake-ls')[0].innerHTML = ""
    getMyStakes()
}

function sellStakeFinal() {
    if (!parseFloat($('.sell-price')[0].value)) return
    $('.mt-no')[0].innerHTML = "..."
    let val = (BigInt((parseFloat($('.sell-price')[0].value) * 1e18))).toString()
    mainContract.methods.sellStakeRequest(currentTargetStakeId, val).send({
        from: user.address,
        shouldPollResponse: true
    }).then(res => {
        console.log(res)
        doAlert(`Successfully created sell offer for ${parseFloat($('.sell-price')[0].value)} BNB`, 3)
        closeModal()
        $('.mt-no')[0].innerHTML = "Sell"
    }).catch(err => {
        doAlert("Something went wrong!", 2)
        closeModal()
        console.log(err)
    }).finally(res => {
        closeModal()
        $('.mt-no')[0].innerHTML = "Sell"
    })
}

function getMyStakes() {
    setavrgPrice()
    mainContract.methods.calcStakeCount(user.address).call({shouldPollResponse: true}).then(res => {
        if (parseInt(res) > 0) {
            getMyStakes_det(parseInt(res))
            $('.loading-tx-1')[0].remove()
        } else if (parseInt(res) == 0) {
            $('.loading-tx-1')[0].innerHTML = "You have no stakes!"
        }
    })
}

function getMyStakes_det(count) {
    let curentId = 0
    let triedIdLast = 0
    getOneStake(curentId)

    function getOneStake(id) {
        mainContract.methods.mapMemberStake(user.address, id).call({shouldPollResponse: true}).then(res => {
            if (res.stake_hasSold == false) renderAStake(res, id)
            triedIdLast++
            if (triedIdLast < count) getOneStake(triedIdLast)
        })
    }
}

function renderAStake(stake, id) {
    stake.startDay = parseInt(stake.startDay)
    stake.endDay = parseInt(stake.endDay)
    stake.tokenValue = parseInt(stake.tokenValue)
    let isforSell = false
    if (stake.stake_forSell) isforSell = true
    let stake_id = stake.stakeId
    let actBtn = actionButton_sell
    if (stake.stake_forSell) {
        if (stake.price.length < 25) actBtn = actionButton_sell_alreadyforsell + actionButton_sell_alreadyforsell_cancel
    }
    let progress, bonusTokens = "--"
    if (stake.startDay - 1 == currentDay) {
        progress = "starting soon"
    } else if (stake.endDay > currentDay) {
        progress = parseInt(Math.abs((((stake.endDay - currentDay) / (stake.endDay - stake.startDay)) * 100) - 100)) + "%"
        if (progress === "100%") progress = "99%"
        bonusTokens = (calcBonusToken(stake.endDay - stake.startDay, stake.tokenValue / 1e18)).toFixed(5)
    } else {
        progress = "completed"
    }
    let bgRow = ""
    if ((id % 2) == 1) {
        bgRow = "background: #f7f7f7bf"
    } else {
        bgRow = ""
    }
    if (progress !== "completed") {
        $('.stake-ls')[0].innerHTML = `<tr role="row" class="" style="${bgRow}">
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb="" class="d-flex align-items-center">
                    <div data-v-254b7dbb="" class="font-small-2 text-muted">${stake.startDay}</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb="" class="d-flex align-items-center">
                    <div data-v-254b7dbb="" class="font-small-2 text-muted">${stake.endDay}</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb="" class="d-flex align-items-center">
                    <div class="ltv-3-${id}" data-v-254b7dbb="" class="font-small-2 text-muted" style="font-weight:900; color: #24d8a4;">${progress}</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb="" class="d-flex align-items-center">
                    <div class="ltv-4-${id}" data-v-254b7dbb="" class="font-small-2 text-muted">${(stake.tokenValue / 1e18).toFixed(0)}</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb="" class="d-flex align-items-center">
                    <div class="ltv-5-${id}" data-v-254b7dbb="" class="font-small-2 text-muted">--</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb="" class="d-flex align-items-center">
                    <div class="ltv-6-${id}" data-v-254b7dbb="" class="font-small-2 text-muted">${bonusTokens}</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" id="${stake_id}" class="ltv-7-${id}" style=" width="20%" height: 0px;  padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
            ${actBtn}
            </td>
        </tr>` + $('.stake-ls')[0].innerHTML
        getStakeDivs(id)

        function getStakeDivs(id) {
            mainContract.methods.calcStakeCollecting(user.address, id).call({shouldPollResponse: true}).then(res => {
                $(`.ltv-5-${id}`)[0].innerHTML = (parseInt(res) / 1e18).toFixed(5)
            })
        }
    }
}

const actionButton_sell = `<div data-v-254b7dbb="" class="d-flex align-items-center" style="background: linear-gradient(to bottom right, #3ade8b 0%, #0bb8ae 100%) !important; border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;cursor: pointer;box-shadow: 1px 2px 5px #2cd2968f;">
<div data-v-254b7dbb="" class="mt-no font-small-2 text-muted" onclick="openModal(this.parentNode.parentNode.id)">Sell</div>
</div>`
const actionButton_sell_alreadyforsell = `<div data-v-254b7dbb="" class="d-flex align-items-center" style="background: linear-gradient(to bottom right, #afdc39 0%, #51ba75 100%) !important; border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;cursor: pointer;box-shadow: 1px 2px 5px #2cd2968f;">
<div data-v-254b7dbb="" class="mt-no font-small-2 text-muted" onclick="openModal(this.parentNode.parentNode.id)">Update sell price</div>
</div>`
const actionButton_sell_alreadyforsell_cancel = `<div data-v-254b7dbb="" class="d-flex align-items-center" style="margin-top: 4px; background: linear-gradient(to bottom right, #afdc39 0%, #51ba75 100%) !important; border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;cursor: pointer;box-shadow: 1px 2px 5px #2cd2968f;">
<div data-v-254b7dbb="" class="mt-no font-small-2 text-muted" onclick="cancelSellOffer(this.parentNode.parentNode.id)">Cancel sell offer</div>
</div>`

function cancelSellOffer(id) {
    mainContract.methods.sellStakeRequest(id, web3.utils.toWei('1000000', 'ether')).send({
        from: user.address,
        shouldPollResponse: true
    }).then(res => {
        doAlert(`Successfully cancelled sell offer.`, 3)
        refreshClick
        refreshClick(2)
    }).catch(err => {
        doAlert("Something went wrong!", 2)
        console.log(err)
    })
}

function openModal(stakeId) {
    currentTargetStakeId = stakeId
    $('.modal')[0].style.marginTop = "auto"
    $('.modal')[0].style.marginLeft = "auto"
    $('.modal')[0].style.visibility = "visible"
    $('.modal')[0].style.opacity = "1"
}

function closeModal() {
    $('.modal')[0].style.marginTop = "-10000px"
    $('.modal')[0].style.marginLeft = "-10000px"
    $('.modal')[0].style.visibility = "invisible"
    $('.modal')[0].style.opacity = "0"
}

function openModal2() {
    $('.modal2')[0].style.marginTop = "auto"
    $('.modal2')[0].style.marginLeft = "auto"
    $('.modal2')[0].style.visibility = "visible"
    $('.modal2')[0].style.opacity = "1"
}

function closeModal2() {
    $('.modal2')[0].style.marginTop = "-10000px"
    $('.modal2')[0].style.marginLeft = "-10000px"
    $('.modal2')[0].style.visibility = "invisible"
    $('.modal2')[0].style.opacity = "0"
}

$('.pg_tt_buyandsell')[0].style.color = "white"

function getSellRequests() {
    // beforeRender_checkTimeStamp(moralisRecentEvents[3]);
    // return;
    if (!moralisRecentEvents || !moralisRecentEvents[3]) {
        setTimeout(() => {
            getSellRequests()
        }, 500)
    } else {
        beforeRender_checkTimeStamp(moralisRecentEvents[3])
        console.log(moralisRecentEvents[3])
    }
}

function beforeRender_checkTimeStamp(data) {
    console.log("============ beforeRender_checkTimeStamp ===========", data);
    let expireAtDayCount = 10 * (24 * 60 * 60)
    let newData = []
    fetchedStakes = []
    data.forEach(el => {
        el = el
        if (BigInt(parseInt(el.price)) < 900000n * 1000000000000000000n) {
            if (parseInt(el.timestamp) > (Date.now() / 1000) - expireAtDayCount) newData.push(el)
        }
    })
    console.log(newData)
    beforeRender_getFullStake(newData)
}

function beforeRender_getFullStake(data) {
    data.forEach(el => {
        getStake(el.addr, el.stakeId, el.timestamp)
    })
}

let stakesToBeRendered = []
let fetchedStakes = []

function getStake(address, stakeId, timestamp) {
    stakesToBeRendered = []
    let alreadyProccesesOffer = false
    fetchedStakes.forEach(itm => {
        if (itm[0] == address && itm[1] == stakeId) alreadyProccesesOffer = true
    })
    if (alreadyProccesesOffer == false) {
        mainContract.methods.mapMemberStake(address, stakeId).call({shouldPollResponse: true}).then(res => {
            res.timestamp = timestamp
            if (res.price.length < 25) {
                stakesToBeRendered.push(res)
                runRenderIn()
            }
        })
        fetchedStakes.push([address, stakeId])
    }
}

let timOut

function runRenderIn() {
    clearTimeout(timOut)
    timOut = setTimeout(() => {
        renderForSales()
    }, 1000 * 1)
}

function renderForSales() {
    doSort(1, stakesToBeRendered)
    let ide = 0
    $('.grid-container-fs')[0].innerHTML = ""
    stakesToBeRendered.forEach(itm => {
        ide++
        if (itm.stake_forSell == true && parseInt(itm.endDay) > currentDay && itm.tokenValue.length > 14) {
            let progress = parseInt(Math.abs((((itm.endDay - currentDay) / (itm.endDay - itm.startDay)) * 100) - 100))
            if (progress > 100) progress = 100
            if (progress == 0) progress = 2
            $('.cd-t-se')[0].innerHTML = "For sell Stakes (" + (parseInt($('.grid-container-fs')[0].children.length) + 1) + ")"
            $('.grid-container-fs')[0].innerHTML += `
            <div class="itm" style="
            display: inline-block;
            width: 200px;
            height: 130px;
            background: #2d303e;
            border-radius: 8px;
            margin: 10px;
            box-shadow: 0 1px 6px #0000005e;
        "><div style="
            padding-top: 6px;
        "><p  class="v-i-1" style="
            color: #b6e7e7ab;
            display: inline-block;
            float: left;
            padding-left: 20px;
            font-weight: 500;
        ">Day ${itm.startDay}</p><p  class="v-i-2" style="
            color: #b6e7e7ab;
            font-weight: 500;
            display: inline-block;
            float: right;
            padding-right: 20px;
        ">Day  ${itm.endDay}</p><div style="
                        background-color: #c8c8c82b;
                        height: 8px;
                        margin-left: 15px;
                        margin-right: 15px;
                        border-radius: 50px;
                        margin-top: 20px;
                    "><div  class="v-i-3"style="
                    background-image:linear-gradient(45deg, #6beee6 0%, #22a6ce 100%);
                    height: 8px;
                    border-radius: 50px;
                    width: ${progress}%;
                    box-shadow: 0 0px 6px #43cad4
                    "></div></div></div><div style="
            padding-top: 10px;
        "><span style="
            color: #ffffffb0;
            display: inline-block;
            float: left;
            padding-left: 10px;
        ">Staked:</span><span class="v-i-4" style="
            color: #b6e7e7ab;
            display: inline-block;
            float: left;
            padding-left: 10px;
        ">${(parseInt(itm.tokenValue) / 1e18).toFixed(3)} LAVA</span><span style="
            color: #ffffffb0;
            display: inline-block;
            float: left;
            padding-left: 10px;
        ">Dividends:</span><span  class="v-i-5-${ide}" style="
            color: #b6e7e7ab;
            display: inline-block;
            float: left;
            padding-left: 10px;
        ">-- BNB</span><span style="
            color: #ffffffb0;
            display: inline-block;
            float: left;
            padding-left: 10px;
        ">Bonus:</span><span class="v-i-6" style="
            color: #b6e7e7ab;
            display: inline-block;
            float: left;
            padding-left: 10px;
        ">${calcBonusToken(parseInt(itm.endDay) - parseInt(itm.startDay), parseInt(itm.tokenValue) / 1e18).toFixed(2)} LAVA</span><div class="v-i-77-${ide} v-i-7" onclick="buyAStake('${itm.userAddress}', ${itm.stakeId})" style="
            background: linear-gradient(to bottom right, #f3dc57 0%, #fd991a 100%) !important;
            /* border-radius: 25px; */
            color: #ffffffc9;
            font-weight: 900;
            font-size: 15px;
            padding: 0;
            cursor: pointer;
            /* box-shadow: 1px 2px 5px #fba322a6; */
            bottom: 0px;
            position: relative;
            border-bottom-left-radius: 7px;
            border-bottom-right-radius: 7px;
            height: 20px;
            text-align: center;
            width: inherit;
            /* display: none; */
            margin-top: 66px;
        ">Buy For ${(parseInt(itm.price) / 1e18).toFixed(4)} BNB</div></div></div>
        `
            if ((itm.userAddress).toLocaleUpperCase() === (user.address).toLocaleUpperCase()) {
                $(`.v-i-77-${ide}`)[0].innerHTML = `Selling For ${(parseInt(itm.price) / 1e18).toFixed(4)} BNB`
                $(`.v-i-77-${ide}`)[0].style.background = "linear-gradient(to bottom right, #cddc39 0%, #4caf50 100%)"
            }
            getStakeDivs(itm.stakeId, ide)

            function getStakeDivs(id, ide) {
                mainContract.methods.calcStakeCollecting(itm.userAddress, id).call({shouldPollResponse: true}).then(res => {
                    $(`.v-i-5-${ide}`)[0].innerHTML = (parseInt(res) / 1e18).toFixed(3) + " BNB"
                })
            }
        }
    })
}

function calcBonusToken(StakeDuration, tokenValue) {
    return (tokenValue * ((StakeDuration ** 2) * 128) / 1e7)
}

function refreshClick(val) {
    console.log('refreshClick --------------', val);
    if (val == 1) {
        $('.stake-ls')[0].innerHTML = ""
        getMyStakes()
    } else {
        $('.grid-container-fs')[0].innerHTML = ""
        getSellRequests()
    }
}

let buyingStake = {address: void 0, id: void 0, price: void 0}

function buyAStake(sellerAddress, stakeId) {
    openModal2()
    mainContract.methods.mapMemberStake(sellerAddress, stakeId).call({shouldPollResponse: true}).then(res => {
        $('.mod-txt')[0].innerHTML = "You are buying A stake for " + (parseInt(res.price) / 1e18).toFixed(5) + " BNB"
        buyingStake.price = res.price
        buyingStake.address = sellerAddress
        buyingStake.stakeId = stakeId
    })
}

function buyAStake_B() {
    mainContract.methods.buyStakeRequest(buyingStake.address, buyingStake.stakeId).send({
        from: user.address,
        shouldPollResponse: true,
        value: parseInt(buyingStake.price)
    }).then(res => {
        console.log(res)
        doAlert(`Successfully Bought A Stake!`, 3)
        closeModal()
        refreshClick(1)
        refreshClick(2)
    }).catch(err => {
        doAlert("Something went wrong!", 2)
        closeModal()
        console.log(err)
    }).finally(res => {
        closeModal()
        refreshClick(1)
        refreshClick(2)
    })
}

function collectStakeSoldReward() {
    mainContract.methods.withdrawSoldStakeFunds().send({from: user.address, shouldPollResponse: true}).then(res => {
        doAlert(`Successfully Collected!`, 3)
    }).catch(err => {
        doAlert("Something went wrong!", 2)
        console.log(err)
    })
}

function refreshGlobalData() {
    mainContract.methods.totalTradeAmount().call({shouldPollResponse: true,}).then(res => {
        $('.gd-31')[0].innerHTML = (parseInt(res) / 1e18).toFixed(2)
    })
    mainContract.methods.totalStakesSold().call({shouldPollResponse: true,}).then(res => {
        $('.gd-32')[0].innerHTML = parseInt(res)
    })
    mainContract.methods.totalStakeTradeAmount(user.address).call({shouldPollResponse: true,}).then(res => {
        $('.user-data-3')[0].value = (parseInt(res) / 1e18).toFixed(2)
    })
    mainContract.methods.referrerBonusesPaid(user.address).call({shouldPollResponse: true,}).then(res => {
        $('.user-data-5')[0].value = (parseInt(res) / 1e18).toFixed(4)
    })
}

let incomingSortType = 1

function sortOffers(sortby) {
    incomingSortType = sortby
    refreshClick(2)
}

function doSort(noused, data) {
    if (incomingSortType == 1) {
        data.sort((b, a) => parseInt(a.timestamp) - parseInt(b.timestamp));
    } else if (incomingSortType == 2) {
        data.sort((b, a) => parseInt(a.price) - parseInt(b.price));
    } else if (incomingSortType == 3) {
        data.sort((b, a) => parseInt(a.tokenValue) - parseInt(b.tokenValue));
    } else if (incomingSortType == 4) {
        data.sort((b, a) => parseInt(a.endDay) - parseInt(b.endDay));
    }
}

function setavrgPrice() {
    tryagaavg()

    function tryagaavg() {
        setTimeout(() => {
            if (avgPrice) {
                setAvgPriceFinal()
            } else {
                tryagaavg()
            }
        }, 500)
    }

    function setAvgPriceFinal() {
        $('.price-avr-txt')[0].innerHTML = `Average LAVA price [past 3 days]: ${avgPrice.toFixed(5)} BNB`
    }
}

window.addEventListener('load', async ()=>{
    beforeRender_checkTimeStamp(moralisRecentEvents[3])
})

setInterval(async ()=>{
    beforeRender_checkTimeStamp(moralisRecentEvents[3])
}, 1000 * 30);