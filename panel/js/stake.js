function doStake() {
    if (user.balance / 1e18 < parseFloat($('.stake-inp-amount')[0].value)) {
        doAlert("Not enough balance!", 2)
    } else if (!$('.stake-inp-amount')[0].value || !$('.stake-inp-days')[0].value) {
        doAlert("Undefined Entered Data", 2)
    } else {
        $('.do-stake-btn-txt')[0].innerHTML = "..."
        
        mainContract.methods.EnterStake(web3.utils.toWei($('.stake-inp-amount')[0].value,'ether'), parseInt($('.stake-inp-days')[0].value)).send({
            from: user.address,
            shouldPollResponse: false
        }).then(res => {
            doAlert(`Successfully staked ${parseFloat($('.stake-inp-amount')[0].value)} LAVA for ${parseInt($('.stake-inp-days')[0].value)} days.`, 3)
            $('.do-stake-btn-txt')[0].innerHTML = "Stake"

            refreshMyStakes()
        }).catch(err => {
            doAlert("Something went wrong!", 2)
            $('.do-stake-btn-txt')[0].innerHTML = "Stake"
            console.log(err)
        }).finally(res => {
            $('.do-stake-btn-txt')[0].innerHTML = "Stake"
        })
    }
}

function endStake(stake_id) {console.log(stake_id, "675")
    $('.bt-cl')[0].innerHTML = "..."
    
    mainContract.methods.EndStake(stake_id).send({
        from: user.address,
        shouldPollResponse: false
    }).then(res => {
        doAlert(`Successfully collected the stake.`, 3)

        refreshMyStakes()
    }).catch(err => {
        doAlert("Something went wrong!", 2)
        $('.bt-cl')[0].innerHTML = "Collect"
        console.log(err)
    }).finally(res => {
        $('.bt-cl')[0].innerHTML = "Collect"
    })
}

let onlyUnfinished = false
function userAccConnected() {
    onlyUnfinished = false
    getMyStakes()
}

function refreshClick() {
    $('.stake-ls')[0].innerHTML = ""
    getMyStakes()
}

function hideFinished() {
    onlyUnfinished = true
    $('.stake-ls')[0].innerHTML = ""
    getMyStakes()
}

function getMyStakes() {
    totaldata.staked = 0
    totaldata.divs = 0
    totaldata.bonus = 0

    
    mainContract.methods.calcStakeCount(user.address).call({
        shouldPollResponse: true
    }).then(res => { 
        if (parseInt(res) > 0) {
            getMyStakes_det(parseInt(res))
            if ($('.loading-tx-1')[0]) $('.loading-tx-1')[0].remove()
        } else if (parseInt(res) == 0) {
            $('.loading-tx-1')[0].innerHTML = "You have no stakes!"
        }
    })  

    getLobbyData()
}

function getMyStakes_det(count) {
    let curentId = 0
    let triedIdLast = 0
    getOneStake(curentId)

    function getOneStake(id) {
        mainContract.methods.mapMemberStake(user.address, id).call({
            shouldPollResponse: true
        }).then(res => { 

            if (onlyUnfinished) {
                if(res.stake_hasSold == false && parseInt(res.endDay) > currentDay) renderAStake(res, id)
            } else {
                if (res.stake_hasSold == false) renderAStake(res, id)
            }
            


            triedIdLast++
            if (triedIdLast < count){
                getOneStake(triedIdLast)
            } else if(triedIdLast == count) {
                setTimeout(() => {
                    doTotalRow()
                }, 1000)
            }

        })  
    }
}


const actionButton_collect = 
`<div data-v-254b7dbb="" class="d-flex align-items-center" onclick="endStake(this.parentNode.id)" style="background: linear-gradient(to bottom right, #3ade8b 0%, #0bb8ae 100%) !important; border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;cursor: pointer;box-shadow: 1px 2px 5px #2cd2968f;">
<div data-v-254b7dbb="" class="font-small-2 text-muted bt-cl">Collect</div>
</div>`

const actionButton_cancel = 
`<div onclick="location.href='buyandsell.html'" data-v-254b7dbb="" class="d-flex align-items-center" style="background: linear-gradient(to bottom right, #fc614b 0%, #ed3593 100%) !important; border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;cursor: pointer;box-shadow: 1px 2px 5px #57193354;">
<div data-v-254b7dbb="" class="font-small-2 text-muted">Sell Stake</div>
</div>`

const actionButton_collected = 
`<div data-v-254b7dbb="" class="d-flex align-items-center" style="background: linear-gradient(to bottom right, #34e28a8f 0%, #1a625d9e 100%) !important;border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;box-shadow: none;">
<div data-v-254b7dbb="" class="font-small-2 text-muted">Collected</div>
</div>`

function doTotalRow() {
    let bgRow = "background: #f3f2f7"
    $('.stake-ls')[0].innerHTML += 
    `<tr role="row" class="" style="${bgRow}">
        <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
            <div data-v-254b7dbb="" class="d-flex align-items-center">
                <div data-v-254b7dbb="" class="font-small-2 text-muted">--</div>
            </div>
        </td>
        <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
            <div data-v-254b7dbb="" class="d-flex align-items-center">
                <div data-v-254b7dbb="" class="font-small-2 text-muted">--</div>
            </div>
        </td>
        <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
            <div data-v-254b7dbb="" class="d-flex align-items-center">
                <div class="ltv-3-${133}" data-v-254b7dbb="" class="font-small-2 text-muted" style="font-weight:900; color: #24d8a4;">Totals:</div>
            </div>
        </td>
        <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
            <div data-v-254b7dbb="" class="d-flex align-items-center">
                <div class="ltv-4-${133}" data-v-254b7dbb="" class="font-small-2 text-muted">${(totaldata.staked).toFixed(0)}</div>
            </div>
        </td>
        <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
            <div data-v-254b7dbb="" class="d-flex align-items-center">
                <div class="ltv-5-${133}" data-v-254b7dbb="" class="font-small-2 text-muted">${(totaldata.divs).toFixed(3)}</div>
            </div>
        </td>
        <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
            <div data-v-254b7dbb="" class="d-flex align-items-center">
                <div class="ltv-6-${133}" data-v-254b7dbb="" class="font-small-2 text-muted">${(totaldata.bonus.toFixed(3))}</div>
            </div>
        </td>
        <td aria-colindex="1" role="cell" style="  height: 0px;  padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
        
        </td>
    </tr>`

    $('.ltv-4-133')[0].innerHTML
}

let totaldata = {
    staked: 0,
    divs: 0,
    bonus: 0
}

function renderAStake(stake, id) {
    if (!stake.stake_hasLoan)  {

        stake.startDay = parseInt(stake.startDay)
        stake.endDay = parseInt(stake.endDay)
        stake.tokenValue = parseInt(stake.tokenValue)
    
        let stake_id = stake.stakeId
        let actBtn = actionButton_cancel
        let progress
        let bonusTokens = (calcBonusToken(stake.endDay - stake.startDay, stake.tokenValue / 1e18)).toFixed(3)
    
        if (stake.startDay - 1 == currentDay) {
            progress = "starting soon"
        } else 
        if ( (stake.startDay - 1 == currentDay) || stake.endDay > currentDay) {
            progress = Math.abs((((stake.endDay - currentDay) / (stake.endDay - stake.startDay)) * 100) - 100)
            if (progress == 0) progress = 3
            progress = `<div style="
                    background-color: #c9c9c9;
                    height: 10px;
                    margin-left: 10px;
                    margin-right: 10px;
                    border-radius: 50px;
                "><div style="
                background-image:linear-gradient(45deg, #6beee6 0%, #22a6ce 100%);
                    height: 10px;
                    border-radius: 50px;
                    width: ${progress}%;
                    box-shadow: 0 0px 6px #43cad4
                "></div></div>`
    
        } else {
            progress = "completed"
            actBtn = actionButton_collect
            if (stake.stakeCollected) actBtn = actionButton_collected
        }
    
        
    
        let bgRow = ""
        if ((id % 2) == 1) {
            bgRow = "background: #f7f7f7bf"
        } else {
            bgRow = ""
        }
    
    
        totaldata.staked += stake.tokenValue / 1e18
        totaldata.bonus += parseInt(bonusTokens)
        
        $('.stake-ls')[0].innerHTML = 
        `<tr role="row" class="" style="${bgRow}">
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
            <td aria-colindex="1" role="cell" id="${stake_id}" class="ltv-7-${id}" style="  height: 0px;  padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
            ${actBtn}
            </td>
        </tr>` + $('.stake-ls')[0].innerHTML
    
        getStakeDivs(id)
    
        function getStakeDivs(id) {
            mainContract.methods.calcStakeCollecting(user.address, id).call({
                shouldPollResponse: true
            }).then(res => { 
                $(`.ltv-5-${id}`)[0].innerHTML = (parseInt(res) /1e18).toFixed(3)
    
                totaldata.divs += parseInt(res) /1e18
            })  
        }
    }


}

function calcBonusToken(StakeDuration, tokenValue) {
    return(tokenValue * ((StakeDuration **2) * 128) / 1e7)
}

function refreshGlobalData() {
    if(!mainContract) return;
    mainContract.methods.overall_stakedTokens().call({
        shouldPollResponse: true,
    }).then(res => {
        $('.gd-31')[0].innerHTML = ((parseInt(res)/1e18) - 412330).toFixed(2)
    })

    mainContract.methods.overall_collectedDivs().call({
        shouldPollResponse: true,
    }).then(res => {
        $('.gd-32')[0].innerHTML = (parseInt(res)/1e18).toFixed(2)
    })
    
    mainContract.methods.overall_collectedBonusTokens().call({
        shouldPollResponse: true,
    }).then(res => {
        $('.gd-33')[0].innerHTML = (parseInt(res)/1e18).toFixed(2)
    })
        
    mainContract.methods.mapMemberLobby_overallData(user.address).call({
        shouldPollResponse: true,
    }).then(res => {
        $('.user-data-3')[0].value = (parseInt(res.overall_stakedTokens)/1e18).toFixed(2)
    })

    mainContract.methods.mapMemberLobby_overallData(user.address).call({
        shouldPollResponse: true,
    }).then(res => {
        $('.user-data-4')[0].value = (parseInt(res.overall_collectedDivs)/1e18).toFixed(3)
    })
    
    mainContract.methods.referrerBonusesPaid(user.address).call({
        shouldPollResponse: true,
    }).then(res => {
        $('.user-data-5')[0].value = (parseInt(res)/1e18).toFixed(3)
    })

    mainContract.methods.daysActiveInStakeTokensIncrese(currentDay +1).call({
        shouldPollResponse: true,
    }).then(res => {
        $('.uns-12')[0].innerHTML = (parseInt(res)/1e18).toFixed(2) + " LAVA"
    })

    web3.eth.getBalance("0xaef3f73a20d19b998e85e6fcdb89cf4279be2853", function(err, result) {
        if (err) {
          console.log(err)
        } else {
            $('.uns-13')[0].innerHTML = (web3.utils.fromWei(result) *94 /100).toFixed(2) + " BNB"
        }
      })
    
}
setInterval(() => {
    refreshGlobalData()
}, 1000 * 30)

$('.pg_tt_staking')[0].style.color = "white"



$('.stake-inp-amount')[0].addEventListener('input', function (evt) {
    if ($('.stake-inp-days')[0].value) {
        $('.uns-11')[0].innerHTML = calcBonusToken($('.stake-inp-days')[0].value, this.value) + " LAVA"
        $('.uns-11')[0].style.color = "#000000b3"
    }
});

$('.stake-inp-days')[0].addEventListener('input', function (evt) {
    if ($('.stake-inp-amount')[0].value) {
        $('.uns-11')[0].innerHTML = calcBonusToken(this.value, $('.stake-inp-amount')[0].value) + " LAVA"
        $('.uns-11')[0].style.color = "#000000b3"
    }
});


