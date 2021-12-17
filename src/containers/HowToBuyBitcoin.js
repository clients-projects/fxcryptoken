import React from 'react'
import CryptoMarketWatch from '../tradeviewWidgets/CryptoMarketWatch'
import ReactParticles from '../components/ReactParticles'
import vd1 from '../videos/vd1.mp4'
import vd2 from '../videos/vd2.mp4'

function HowToBuyBitcoin() {
    return (
        <>
            <ReactParticles />

            <div className='about'>
                <h2 className='heading-2 about__header'>HOW TO BUY BITCOIN</h2>
                <div className='about__content'>
                
                    <p className='about__text'>How to use Bitcoin ATM: step by step</p>
                    <video width='320' height='240' controls>
                        <source src={vd1} type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>{' '}
                    <video width='320' height='240' controls>
                        <source src={vd2} type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>{' '}
                    <p className='about__text'>How to buy Bitcoin on Cash App instantly</p>
                    <p className='about__text'>
                        fxcryptotokeninvestment.com is one of the largest crypto
                        investment. We have been servicing our clients since
                        2010 and we are expanding our market share till this
                        day. Our exclusive location brings us an opportunity to
                        work with clients anywhere from the coast of the
                        Norwegian Sea to the shores of Western Europe.
                    </p>
                    <h3 className='heading-3 about__heading'>Our Vision</h3>
                   
                </div>

                <div className='about__cryptoMarket'>
                    <CryptoMarketWatch />
                </div>
            </div>
        </>
    )
}

export default HowToBuyBitcoin
