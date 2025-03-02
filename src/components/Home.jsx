
import LandingPage from './LandingPage'
import OcrSection from './OcrSection'
import CtaSection from './CtaSection'
import Testimonial from './Testimonial'
import Faq from './Faq'
import Footer from './shared/Footer'

const Home = () => {
  return (
    <div>
        
        <LandingPage/>
        <OcrSection/>
        <Testimonial/>
        <CtaSection/> {/*Join family section */}
        <Faq/>
        <Footer/>
    </div>
  )
}

export default Home