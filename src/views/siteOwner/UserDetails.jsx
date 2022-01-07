import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import {
    Grid,
    Row,
    Col,
    ControlLabel,
    FormControl,
    FormGroup,
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

import { Card } from '../../components/Card/Card'

import * as orderAction from '../../store/actions/burgerIndex'

const UserDetails = (props) => {
    const [userDeposits, setUserDeposits] = useState([])
    const [profitData, setProfitData] = useState([])

    const [accountBalance, setAccountBalance] = useState(0)
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [bitcoin, setBitcoin] = useState('')
    const [ethereum, setEthereum] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmNewPassword] = useState('')

    const [oldEmail, setOldEmail] = useState('')
    const [activeReferrals, setActiveReferrals] = useState(0)
    const [totalReferrals, setTotalReferrals] = useState(0)
    const [dailyEarning, setDailyEarning] = useState(0)
    const [totalEarnings, setTotalEarnings] = useState(0)
    const [totalReferralCommission, setTotalReferralCommission] = useState(0)

    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    const gottenAllUser = useRef()
    const profitRef = useRef()
    const parsed = queryString.parse(window.location.search)

    useEffect(() => {
        if (!gottenAllUser.current) {
            if (props.tokenId) {
                props.onInitGetMember(parsed.id, props.tokenId)
            }
            gottenAllUser.current = true
        } else {
            if (props.memberDeposits) {
                setUserDeposits(props.memberDeposits)
            }
        }
    }, [props, parsed.id])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        if (name === 'fullname') {
            setFullname(value)
        }
        if (name === 'dailyEarning') {
            setDailyEarning(value)
        }
        if (name === 'totalEarnings') {
            setTotalEarnings(value)
        }
        if (name === 'accountBalance') {
            setAccountBalance(value)
        }
        if (name === 'activeReferrals') {
            setActiveReferrals(value)
        }
        if (name === 'totalReferrals') {
            setTotalReferrals(value)
        }
        if (name === 'totalReferralCommission') {
            setTotalReferralCommission(value)
        }
        if (name === 'username') {
            setUsername(value)
        }
        if (name === 'email') {
            setEmail(value)
        }
        if (name === 'bitcoin') {
            setBitcoin(value)
        }
        if (name === 'ethereum') {
            setEthereum(value)
        }
        if (name === 'phone') {
            setPhone(value)
        }
        if (name === 'country') {
            setCountry(value)
        }
        if (name === 'city') {
            setCity(value)
        }
        if (name === 'password') {
            setPassword(value)
        }
        if (name === 'confirmNewPassword') {
            setConfirmNewPassword(value)
        }
    }

    const handleMember = (e, fundNO) => {
        e.persist()
        const value = Number(e.target.value)

        const index = profitData.findIndex((index) => {
            return Number(Object.keys(index)) === fundNO
        })

        if (index > -1) {
            const newProfitData = [...profitData]
            newProfitData[index] = {
                [fundNO]: value,
            }

            setProfitData(newProfitData)
        }
    }

    const updateMemberProfit = (id, buttonId) => {
        for (let i = 0; i < props.memberId.length; i++) {
            if (id === i) {
                props.onInitUpdateProfit(
                    profitData[i][i + 1],
                    props.memberId[i]._id,
                    props.tokenId,
                    buttonId
                )
            }
        }
    }

    useEffect(() => {
        if (props.member) {
            const fetchedBitcoin = props.member.bitcoinAccount
            const fetchedEmail = props.member.email
            const fetchedEthereum = props.member.ethereumAccount
            const fetchedFullname = props.member.fullname
            const fetchedUsername = props.member.username
            const fetchedCity = props.member.city
            const fetchedCountry = props.member.country
            const fetchedPhone = props.member.phone
            const fetchedDailyEarning = props.member.dailyEarning
            const fetchedTotalEarnings = props.member.totalEarnings
            const fetchedAccountBalance = props.member.accountBalance
            const fetchedActiveReferrals = props.member.activeReferrals
            const fetchedTotalReferrals = props.member.totalReferrals
            const fetchedTotalReferralCommission =
                props.member.totalReferralCommission

            setFullname(fetchedFullname)

            setCity(fetchedCity)
            setCountry(fetchedCountry)
            setPhone(fetchedPhone)
            setUsername(fetchedUsername)

            setEmail(fetchedEmail)
            setOldEmail(fetchedEmail)
            setBitcoin(fetchedBitcoin)

            setEthereum(fetchedEthereum)

            setDailyEarning(fetchedDailyEarning)
            setTotalEarnings(fetchedTotalEarnings)
            setActiveReferrals(fetchedActiveReferrals)
            setTotalReferrals(fetchedTotalReferrals)
            setTotalReferralCommission(fetchedTotalReferralCommission)
            setAccountBalance(fetchedAccountBalance)
        }
    }, [props])

    useEffect(() => {
        if (userDeposits.length > 0) {
            userDeposits.map((value) => {
                const { fundNO, profit } = value

                return setProfitData((oldArr) => [
                    ...oldArr,
                    { [fundNO]: profit },
                ])
            })
        }
    }, [userDeposits])

    const handleSubmit = (e) => {
        const formId = '#userDetails'
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
            setError(true)
            return
        } else {
            setMessage('Updated successfully')
            setError(false)
        }
        const formData = {
            accountBalance: Number(accountBalance),
            fullname,
            username,
            password,
            oldEmail,
            email,
            city,
            dailyEarning: Number(dailyEarning),
            totalEarnings: Number(totalEarnings),
            activeReferrals: Number(activeReferrals),
            totalReferrals: Number(totalReferrals),
            totalReferralCommission: Number(totalReferralCommission),
            country,
            phone,
            ethereum,
            bitcoin,
            confirmPassword,
        }

        props.onInitUpdateMember(formData, props.tokenId, formId)
    }

    const usersDepositData = []

    if (userDeposits.length > 0) {
        userDeposits.map((value, index) => {
            const { fundNO, amount, planName, updatedAt } = value

            let keepProfitIndex = {
                [fundNO]: 'initialState',
            }

            if (profitData[index]) {
                profitRef.current = profitData[index]
                keepProfitIndex = profitRef.current
            }

            return usersDepositData.push({
                id: fundNO,
                amount,
                plan: planName,
                profit: (
                    <>
                        <input
                            type='number'
                            value={keepProfitIndex[fundNO]}
                            onChange={(e) => handleMember(e, fundNO)}
                            name={fundNO}
                            className='member__profit'
                        />
                    </>
                ),
                date: updatedAt,
                action: (
                    <>
                        <button
                            className='btn1'
                            onClick={() =>
                                updateMemberProfit(fundNO - 1, fundNO)
                            }
                        >
                            {props.loading && props.buttonId === fundNO
                                ? 'Loading...'
                                : 'Update Profit'}
                        </button>
                    </>
                ),
            })
        })
    }

    const columns = [
        { dataField: 'id', text: 'Id', sort: true },
        { dataField: 'amount', text: 'Amount Invested', sort: true },
        { dataField: 'plan', text: 'plan', sort: true },
        { dataField: 'profit', text: 'profit', sort: true },
        { dataField: 'date', text: 'Date', sort: true },
        { dataField: 'action', text: 'Action', sort: true },
    ]

    const defaultSorted = [
        {
            dataField: 'name',
            order: 'desc',
        },
    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log('page', page)
            console.log('sizePerPage', sizePerPage)
        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log('page', page)
            console.log('sizePerPage', sizePerPage)
        },
    })

    const { SearchBar, ClearSearchButton } = Search

    const MyExportCSV = (props) => {
        const handleClick = () => {
            props.onExport()
        }
        return (
            <div>
                <button className='btn btn-success' onClick={handleClick}>
                    Export to CSV
                </button>
            </div>
        )
    }

    return (
        <div className='center' style={{ margin: '2rem 0' }}>
            <Grid fluid>
                <Row style={{ display: 'grid' }}>
                    <Col md={8} style={{ justifySelf: 'center' }}>
                        <Card
                            title='User Details'
                            content={
                                <form onSubmit={handleSubmit}>
                                    {message && (
                                        <p
                                            className={
                                                error
                                                    ? 'message message__error'
                                                    : 'message'
                                            }
                                        >
                                            {message}
                                        </p>
                                    )}
                                    <Row>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                Account Balance
                                            </ControlLabel>
                                            <FormControl
                                                type='number'
                                                name='accountBalance'
                                                onChange={handleChange}
                                                value={accountBalance}
                                            />
                                        </FormGroup>
                                    </Row>
                                    <Row>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                Full Name
                                            </ControlLabel>
                                            <FormControl
                                                type='text'
                                                name='fullname'
                                                onChange={handleChange}
                                                value={fullname}
                                            />
                                        </FormGroup>
                                    </Row>
                                    <Row>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                Username
                                            </ControlLabel>
                                            <FormControl
                                                name='username'
                                                type='text'
                                                value={username}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>Email</ControlLabel>
                                            <FormControl
                                                minLength={5}
                                                type='text'
                                                name='email'
                                                value={email}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Row>
                                    <Row>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                Phone Number
                                            </ControlLabel>
                                            <FormControl
                                                type='number'
                                                name='phone'
                                                value={phone}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>City</ControlLabel>
                                            <FormControl
                                                type='text'
                                                name='city'
                                                value={city}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>

                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>Country</ControlLabel>
                                            <FormControl
                                                type='text'
                                                name='country'
                                                value={country}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Row>

                                    <Row>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                Total Profit
                                            </ControlLabel>
                                            <FormControl
                                                type='number'
                                                value={totalEarnings}
                                                name='totalEarnings'
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                Active Referrals
                                            </ControlLabel>
                                            <FormControl
                                                type='number'
                                                value={activeReferrals}
                                                name='activeReferrals'
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                Total Referrals
                                            </ControlLabel>
                                            <FormControl
                                                type='number'
                                                value={totalReferrals}
                                                name='totalReferrals'
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                Total Referral Commission
                                            </ControlLabel>
                                            <FormControl
                                                type='number'
                                                value={totalReferralCommission}
                                                name='totalReferralCommission'
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Row>

                                    <Row>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                Bitcoin Address
                                            </ControlLabel>
                                            <FormControl
                                                type='text'
                                                name='bitcoin'
                                                value={bitcoin}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                Ethereum Address
                                            </ControlLabel>
                                            <FormControl
                                                type='text'
                                                name='ethereum'
                                                value={ethereum}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Row>
                                    <div>
                                        <h4>Change Password</h4>
                                    </div>
                                    <Row>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                New Password
                                            </ControlLabel>
                                            <FormControl
                                                type='password'
                                                value={password}
                                                name='password'
                                                onChange={handleChange}
                                            />
                                        </FormGroup>

                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                Retype Password
                                            </ControlLabel>
                                            <FormControl
                                                type='password'
                                                value={confirmPassword}
                                                name='confirmNewPassword'
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Row>
                                    <button
                                        className='button btn__profile'
                                        type='submit'
                                    >
                                        {props.loading &&
                                        props.buttonId === '#userDetails'
                                            ? 'Loading...'
                                            : 'Update Profile'}
                                    </button>
                                </form>
                            }
                        />
                    </Col>
                </Row>
            </Grid>

            <Grid fluid>
                <Row>
                    <Col md={12}>
                        <Card
                            plain
                            title={`${username} Investment`}
                            category='History'
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <ToolkitProvider
                                    bootstrap4
                                    data={usersDepositData}
                                    keyField='id'
                                    columns={columns}
                                    search
                                    exportCSV
                                >
                                    {(props) => (
                                        <div>
                                            <SearchBar {...props.searchProps} />{' '}
                                            <ClearSearchButton
                                                {...props.searchProps}
                                            />
                                            <hr />
                                            <MyExportCSV {...props.csvProps} />
                                            <BootstrapTable
                                                defaultSorted={defaultSorted}
                                                classes='table-layout-auto custom-table'
                                                pagination={pagination}
                                                {...props.baseProps}
                                            />
                                        </div>
                                    )}
                                </ToolkitProvider>
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
        buttonId: state.user.buttonId,
        loading: state.user.loading,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
        member: state.auth.member,
        memberDeposits: state.auth.memberDeposits,
        memberId: state.auth.memberId,
        memberWithdrawals: state.auth.memberWithdrawals,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetMember: (token, id) =>
            dispatch(orderAction.initGetMember(token, id)),
        onInitUpdateMember: (updateMemberData, token, formId) =>
            dispatch(
                orderAction.initUpdateMember(updateMemberData, token, formId)
            ),
        onInitUpdateProfit: (updateProfitData, memberId, token, buttonId) =>
            dispatch(
                orderAction.initUpdateProfit(
                    updateProfitData,
                    memberId,
                    token,
                    buttonId
                )
            ),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)
