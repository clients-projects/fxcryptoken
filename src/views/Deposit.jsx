import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { FormGroup, FormControl, Row, Col } from 'react-bootstrap'
import { StatsCard } from '../components/StatsCard/StatsCard'

import * as orderAction from '../store/actions/burgerIndex'

function Deposit(props) {
    const [packageProfit, setPackageProfit] = useState(0)
    const [amountToDeposit, setAmountToDeposit] = useState()
    const [packageName, setPackageName] = useState('')
    const [userAccountBalance, setUserAccountBalance] = useState(0)

    const [planDetails, setPlanDetails] = useState({})
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [adminBitcoinAddress, setAdminBitcoinAddress] = useState('')
    const [adminEthereumAddress, setAdminEthereumAddress] = useState('')

    const options = [
        { label: 'STARTER ($300 - $4,999) - Daily', value: 'STARTER' },
        { label: 'AMATEUR ($5000 - $9,999)', value: 'AMATEUR' },
        { label: 'PROFESSIONAL ($10,000 - $49,999)', value: 'PROFESSIONAL' },
        { label: 'STARTER ($300 - $4,999)', value: 'STARTER' },
        { label: 'AMATEUR ($5000 - $9,999)', value: 'AMATEUR' },
        { label: 'PROFESSIONAL ($10,000 - $49,999)', value: 'PROFESSIONAL' },
        { label: 'STARTER ($300 - $4,999)', value: 'STARTER' },
        { label: 'AMATEUR ($5000 - $9,999)', value: 'AMATEUR' },
        { label: 'PROFESSIONAL ($10,000 - $49,999)', value: 'PROFESSIONAL' },
     
    ]

    const customStyles = {
        option: (styles, state) => ({
            ...styles,
            cursor: 'pointer',
        }),
        control: (styles) => ({
            ...styles,
            cursor: 'pointer',
        }),
    }

    const onPackageChange = (newValue) => {
        let selectedPackage = ''
        if (newValue) {
            selectedPackage = newValue.value
        }

        if (selectedPackage === 'STARTER') {
            setPackageName('STARTER')
            setPackageProfit(amountToDeposit * 0.02)
        }
        if (selectedPackage === 'AMATEUR') {
            setPackageName('AMATEUR')

            setPackageProfit(amountToDeposit * 0.03)
        }
        if (selectedPackage === 'PROFESSIONAL') {
            setPackageName('PROFESSIONAL')

            setPackageProfit(amountToDeposit * 0.04)
        }
        if (selectedPackage === 'MASTER') {
            setPackageName('MASTER')

            setPackageProfit(amountToDeposit * 0.06)
        }
        if (selectedPackage === 'DIAMOND') {
            setPackageName('DIAMOND')

            setPackageProfit(amountToDeposit * 0.1)
        }
    }

    const onAmountChange = (e) => {
        let amountValue = e.target.value
        amountValue = parseInt(amountValue)

        if (!amountValue) {
            setMessage('Please enter a value')
            setError(true)
            setAmountToDeposit(amountValue)
        } else {
            setError(false)
            setMessage('')

            if (packageName === 'STARTER') {
                setPackageName('STARTER')
                setPackageProfit(amountValue * 0.02)
            }
            if (packageName === 'AMATEUR') {
                setPackageName('AMATEUR')

                setPackageProfit(amountValue * 0.03)
            }
            if (packageName === 'PROFESSIONAL') {
                setPackageName('PROFESSIONAL')

                setPackageProfit(amountValue * 0.04)
            }
            if (packageName === 'MASTER') {
                setPackageName('MASTER')

                setPackageProfit(amountValue * 0.06)
            }
            if (packageName === 'DIAMOND') {
                setPackageName('DIAMOND')

                setPackageProfit(amountValue * 0.1)
            }

            setAmountToDeposit(amountValue)
        }
    }

    useEffect(() => {
        switch (packageName) {
            case 'STARTER':
                setPlanDetails({
                    name: 'STARTER',
                    percent: 2,
                    hours: 24,
                    minimum: 300,
                    maximum: 4999,
                })
                break
            case 'AMATEUR':
                setPlanDetails({
                    name: 'AMATEUR',
                    percent: 3,
                    hours: 24,
                    minimum: 5000,
                    maximum: 9999,
                })
                break
            case 'PROFESSIONAL':
                setPlanDetails({
                    name: 'PROFESSIONAL',
                    percent: 4,
                    hours: 24,
                    minimum: 10000,
                    maximum: 49999,
                })
                break
            case 'MASTER':
                setPlanDetails({
                    name: 'MASTER',
                    percent: 6,
                    hours: 24,
                    minimum: 50000,
                    maximum: 99999,
                })
                break
            case 'DIAMOND':
                setPlanDetails({
                    name: 'DIAMOND',
                    percent: 10,
                    hours: 24,
                    minimum: 100000,
                    maximum: 500000,
                })
                break

            default:
                setPlanDetails({})
                break
        }
    }, [packageName])

    useEffect(() => {
        if (props.adminData) {
            setAdminBitcoinAddress(props.adminData.bitcoinAccount)
            setAdminEthereumAddress(props.adminData.ethereumAccount)
        }
        if (props.userData.hasOwnProperty('username')) {
            setUserAccountBalance(props.userData.accountBalance)
        }
    }, [props])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            packageName,
            amountToDeposit: Math.floor(amountToDeposit),
            currency: 'Bitcoin',
        }

        if (packageName === '') {
            setMessage('Select a package')
            return setError(true)
        }
        if (!amountToDeposit || amountToDeposit === 0) {
            setMessage('Please enter a value')
            return setError(true)
        } else {
            setError(false)
            setMessage('')

            if (!error) {
                props.onInitInvestNow(formData, props.tokenId)

                props.history.push('/admin/plan-confirmation/:' + packageName, {
                    ...formData,
                    packageName,
                    planDetails,
                    adminBitcoinAddress,
                    adminEthereumAddress,
                })
            }
        }
    }

    const displayUserFunds = `$${userAccountBalance}`

    return (
        <>
            <div className='fundAccount'>
                <Row className='fundAccount__balance'>
                    <Col lg={12} sm={12}>
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
                </Row>
                <form className='fundAccount__form' onSubmit={handleSubmit}>
                    {message && (
                        <p
                            className={
                                error ? 'message message__error' : 'message'
                            }
                        >
                            {message}
                        </p>
                    )}
                    <>
                        <label style={{ color: 'white' }}>Package:</label>
                        <Select
                            options={options}
                            isClearable
                            styles={customStyles}
                            onChange={onPackageChange}
                        />
                    </>
                    <input
                        type='number'
                        className='fundAccount__form--input'
                        placeholder='Enter amount - USD'
                        name='amount'
                        id='amount'
                        value={amountToDeposit || ''}
                        onChange={onAmountChange}
                    />

                    <h2
                        style={{
                            textAlign: 'center',
                            margin: '20px',
                            color: 'white',
                        }}
                    >
                        Total Profit:{' '}
                        {amountToDeposit ? (
                            <strong>
                                ${Math.floor(amountToDeposit + packageProfit)}
                            </strong>
                        ) : (
                            ''
                        )}
                    </h2>

                    <FormGroup className='fundAccount__form--instruction'>
                        <FormControl.Static>
                            INSTRUCTIONS: Transfer the equivalent amount in
                            bitcoin.
                        </FormControl.Static>
                    </FormGroup>

                    <div className='fundAccount__form--btn'>
                        <button type='submit' className='button'>
                            {props.fundLoading ? 'Loading...' : 'Proceed'}
                        </button>
                    </div>
                </form>

                <div className='fundAccount__form'>
                    <FormGroup className='fundAccount__form--contact'>
                        <FormControl.Static>
                            Contact management at
                            support@fxcryptotokeninvestment.com for other
                            payment methods
                        </FormControl.Static>
                    </FormGroup>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        err: state.auth.error,
        loading: state.user.loading,
        tokenId: state.auth.tokenId,
        userData: state.auth.userData,
        userFundAccount: state.auth.userFundAccount,
        userId: state.auth.userId,
        totalUserDeposits: state.auth.totalUserDeposits,
        totalUserWithdrawals: state.auth.totalUserWithdrawals,
        fundAccountCount: state.auth.fundAccountCount,
        adminData: state.user.adminData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //onInitGetUser: (token) => dispatch(actionTypes.initGetUser(token)),
        onInitInvestNow: (data, token) =>
            dispatch(orderAction.initInvestNow(data, token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Deposit)
