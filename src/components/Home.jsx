import React from 'react'
import Navbar from './shared/Navbar'
import LandingPage from './LandingPage'
import OcrSection from './OcrSection'
import CtaSection from './CtaSection'
import Testimonial from './Testimonial'
import Faq from './Faq'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <LandingPage/>
        <OcrSection/>
        <Testimonial/>
        <CtaSection/> {/*Join family section */}
        <Faq/>
    </div>
  )
}

export default Home