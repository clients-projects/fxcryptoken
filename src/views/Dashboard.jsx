import React, { useState, useEffect } from 'react'
import ChartistGraph from 'react-chartist'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

import { Card } from '../components/Card/Card'
import { StatsCard } from '../components/StatsCard/StatsCard'
import { dataPie, legendPie } from '../variables/Variables'

import CrytoMarketWatch from '../tradeviewWidgets/CryptoMarketWatch'

const Dashboard = (props) => {
    const createLegend = (json) => {
        var legend = []
        for (var i = 0; i < json['names'].length; i++) {
            var type = 'fa fa-circle text-' + json['types'][i]
            legend.push(<i className={type} key={i} />)
            legend.push(' ')
            legend.push(json['names'][i])
        }
        return legend
    }

    //Have to fetch the user account balance
    const [userAccountBalance, setUserAccountBalance] = useState(0)
    const [activeDeposit, setActiveDeposit] = useState(0)
    const [profit, setProfit] = useState(0)
    const [referralBonus, setReferralBonus] = useState(0)
    const [totalEarnings, setTotalEarnings] = useState(0)

    useEffect(() => {
        if (props.userData.hasOwnProperty('username')) {
            let keepProfits = 0

            props.userDeposits.map((p) => {
                return (keepProfits += p.profit)
            })

            const accountBalandProfits =
                props.userData.accountBalance + keepProfits

            setUserAccountBalance(accountBalandProfits)
            setProfit(keepProfits)
            setTotalEarnings(props.totalEarnings)
        }

        if (props.userDeposits) {
            setActiveDeposit(props.userData.accountBalance)
            setReferralBonus(props.totalReferralCommission)
        }
    }, [props])

    const displayUserFunds = `$${userAccountBalance}`
    const displayActiveDeposits = `$${activeDeposit}`
    const displayProfit = `$${totalEarnings > 1 ? totalEarnings : profit}`
    const displayReferralBonus = `$${referralBonus}`

    return (
        <div className='content'>
            <Grid fluid>
                <Row>
                    <Col lg={3} sm={6}>
                        <StatsCard
                            bigIcon={
                                <i className='pe-7s-server text-warning' />
                            }
                            statsText='Account Balance'
                            statsValue={displayUserFunds}
                            statsIcon={<i className='fa fa-refresh' />}
                            statsIconText='Updated now'
                        />
                    </Col>
                    <Col lg={3} sm={6}>
                        <StatsCard
                            bigIcon={
                                <i className='pe-7s-wallet text-success' />
                            }
                            statsText='Active Deposit'
                            statsValue={displayActiveDeposits}
                            statsIcon={<i className='fa fa-calendar-o' />}
                            statsIconText='Updated now'
                        />
                    </Col>
                    <Col lg={3} sm={6}>
                        <StatsCard
                            bigIcon={<i className='pe-7s-graph1 text-danger' />}
                            statsText='Total Profit'
                            statsValue={displayProfit}
                            statsIcon={<i className='fa fa-clock-o' />}
                            statsIconText='Updated now'
                        />
                    </Col>
                    <Col lg={3} sm={6}>
                        <StatsCard
                            bigIcon={<i className='pe-7s-cash text-info' />}
                            statsText='Referral Bonus'
                            statsValue={displayReferralBonus}
                            statsIcon={<i className='fa fa-refresh' />}
                            statsIconText='Updated now'
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '4rem' }}>
                    <Col md={8}>
                        <div style={{ height: '70vh' }}>
                            <CrytoMarketWatch />
                        </div>
                    </Col>
                    <Col md={4}>
                        <Card
                            statsIcon='fa fa-clock-o'
                            title='Transactions'
                            category='investment activities'
                            stats='Updated now'
                            content={
                                <div
                                    id='chartPreferences'
                                    className='ct-chart ct-perfect-fourth'
                                >
                                    <ChartistGraph data={dataPie} type='Pie' />
                                </div>
                            }
                            legend={
                                <div className='legend'>
                                    {createLegend(legendPie)}
                                </div>
                            }
                        />
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        err: state.auth.error,
        loading: state.user.loading,
        tokenId: state.auth.tokenId,
        userData: state.auth.userData,
        userId: state.auth.userId,
        userDeposits: state.auth.userDeposits,
        totalReferralCommission: state.auth.userData.totalReferralCommission,
        totalEarnings: state.auth.userData.totalEarnings,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //onInitGetUser: (token) => dispatch(actionTypes.initGetUser(token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
